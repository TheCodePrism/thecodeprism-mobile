import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet, Alert, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import { ScreenLayout } from './layout/ScreenLayout';
import { GlassCard } from './ui/GlassCard';
import { PremiumButton } from './ui/PremiumButton';
import { AnimatedInput } from './ui/AnimatedInput';
import theme from '../styles/theme';

export const SettingsView = ({
    onBack,
    themeSettings,
    handleUpdateTheme,
    handleUpdatePassword
}) => {
    const [localSettings, setLocalSettings] = useState(themeSettings || {});
    const [newPassword, setNewPassword] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (themeSettings) {
            setLocalSettings(themeSettings);
        }
    }, [themeSettings]);

    const handleToggle = (key, value) => {
        setLocalSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleScaleChange = (key, value) => {
        setLocalSettings(prev => ({ ...prev, [key]: parseFloat(value) }));
    };

    const handleSave = async () => {
        try {
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();

            if (hasHardware && isEnrolled) {
                const authResult = await LocalAuthentication.authenticateAsync({
                    promptMessage: 'Authenticate to Save Changes',
                    fallbackLabel: 'Enter Passcode',
                });
                if (!authResult.success) {
                    Alert.alert('Authentication Failed', 'Verification required.');
                    return;
                }
            }

            setIsSaving(true);
            await handleUpdateTheme(localSettings);

            if (newPassword.trim().length > 0) {
                if (newPassword.length < 6) {
                    Alert.alert('Error', 'Password must be at least 6 characters');
                    setIsSaving(false);
                    return;
                }
                await handleUpdatePassword(newPassword);
                setNewPassword('');
            }
            Alert.alert('Success', 'Settings synchronized successfully!');
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const SettingRow = ({ label, subtext, value, onValueChange }) => (
        <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>{label}</Text>
                {subtext && <Text style={styles.settingSubtext}>{subtext}</Text>}
            </View>
            <Switch
                trackColor={{ false: theme.colors.gray700, true: theme.colors.primary }}
                thumbColor={value ? '#fff' : theme.colors.gray400}
                onValueChange={onValueChange}
                value={value ?? true}
            />
        </View>
    );

    return (
        <ScreenLayout>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.title}>System Settings</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Visual Effects */}
                <GlassCard style={styles.section}>
                    <Text style={styles.sectionTitle}>Visual Experience</Text>
                    <SettingRow
                        label="Matrix Rain"
                        subtext="Cyberpunk background effect"
                        value={localSettings.showMatrix}
                        onValueChange={(v) => handleToggle('showMatrix', v)}
                    />
                    <SettingRow
                        label="Tesseract"
                        subtext="4D hypercube wireframe"
                        value={localSettings.showTesseract}
                        onValueChange={(v) => handleToggle('showTesseract', v)}
                    />
                    <SettingRow
                        label="Geodesic Shell"
                        subtext="Outer organic wireframe"
                        value={localSettings.showGeodesicShell}
                        onValueChange={(v) => handleToggle('showGeodesicShell', v)}
                    />
                    <SettingRow
                        label="Glassmorphism"
                        subtext="Blur and transparency"
                        value={localSettings.glassmorphism}
                        onValueChange={(v) => handleToggle('glassmorphism', v)}
                    />
                    <SettingRow
                        label="Custom Cursor"
                        subtext="Dual-cursor interaction"
                        value={localSettings.showCustomCursor}
                        onValueChange={(v) => handleToggle('showCustomCursor', v)}
                    />
                </GlassCard>

                {/* Physics */}
                <GlassCard style={styles.section}>
                    <Text style={styles.sectionTitle}>Physics & Motion</Text>
                    <SettingRow
                        label="Gravitational Lensing"
                        subtext="Cursor-based spatial warping"
                        value={localSettings.enableLensing}
                        onValueChange={(v) => handleToggle('enableLensing', v)}
                    />
                    <SettingRow
                        label="Lorenz Attractor"
                        subtext="Chaotic particle system"
                        value={localSettings.showAttractor}
                        onValueChange={(v) => handleToggle('showAttractor', v)}
                    />
                    <SettingRow
                        label="Navier-Stokes Fluid"
                        subtext="Fluid dynamics background"
                        value={localSettings.fluidBackground}
                        onValueChange={(v) => handleToggle('fluidBackground', v)}
                    />
                </GlassCard>

                {/* Scaling */}
                <GlassCard style={styles.section}>
                    <Text style={styles.sectionTitle}>Scale Configuration</Text>
                    <AnimatedInput
                        label={`Tesseract Scale (${localSettings.tesseractScale || 1.0}x)`}
                        value={String(localSettings.tesseractScale || 1.0)}
                        onChangeText={(v) => handleScaleChange('tesseractScale', v)}
                        keyboardType="numeric"
                        placeholder="1.0"
                    />
                    <AnimatedInput
                        label={`Geodesic Scale (${localSettings.geodesicScale || 1.0}x)`}
                        value={String(localSettings.geodesicScale || 1.0)}
                        onChangeText={(v) => handleScaleChange('geodesicScale', v)}
                        keyboardType="numeric"
                        placeholder="1.0"
                    />
                </GlassCard>

                {/* Security */}
                <GlassCard style={styles.section}>
                    <Text style={styles.sectionTitle}>Security</Text>
                    <AnimatedInput
                        label="Update Admin Password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry
                        placeholder="New Password"
                    />
                </GlassCard>

                <View style={styles.actionContainer}>
                    <PremiumButton
                        title="Sync with Matrix"
                        onPress={handleSave}
                        loading={isSaving}
                        icon="cloud-upload-outline"
                    />
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.textPrimary,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        gap: 24,
    },
    section: {

    },
    sectionTitle: {
        fontSize: 12,
        color: theme.colors.primary,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 16,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    settingInfo: {
        flex: 1,
        paddingRight: 16,
    },
    settingLabel: {
        fontSize: 16,
        color: theme.colors.textPrimary,
        fontWeight: '600',
    },
    settingSubtext: {
        fontSize: 12,
        color: theme.colors.textSecondary,
        marginTop: 4,
    },
    actionContainer: {
        marginTop: 10,
    }
});
