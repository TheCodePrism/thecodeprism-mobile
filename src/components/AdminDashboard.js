import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet, Alert, Animated, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { LinearGradient } from 'expo-linear-gradient';

import theme from '../styles/theme';
import { ScreenLayout } from './layout/ScreenLayout';
import { GlassCard } from './ui/GlassCard';
import { PremiumButton } from './ui/PremiumButton';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { StatCard } from './dashboard/StatCard';
import { ActiveSessionsList } from './dashboard/ActiveSessionsList';

export const AdminDashboard = ({
    user,
    isAdminEnabled,
    handleToggleAdmin,
    handleOpenScanner,
    activeSessions,
    handleTerminateSession,
    handleAdjustTime,
    sharedLinksProps,
    handleLogout,
    onOpenSettings
}) => {
    const {
        showLinkGen, setShowLinkGen,
        userType, setUserType,
        accessType, setAccessType,
        duration, setDuration,
        generatedLink, setGeneratedLink,
        handleGenerateLink
    } = sharedLinksProps;

    const [pulseAnim] = useState(new Animated.Value(1));
    const [statsCount, setStatsCount] = useState(0);

    useEffect(() => {
        if (isAdminEnabled) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, { toValue: 1.2, duration: 1000, useNativeDriver: true }),
                    Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
                ])
            ).start();
        } else {
            pulseAnim.setValue(1);
        }
    }, [isAdminEnabled]);

    useEffect(() => {
        setStatsCount(activeSessions.length);
    }, [activeSessions.length]);

    return (
        <ScreenLayout>
            <DashboardHeader
                user={user}
                isAdminEnabled={isAdminEnabled}
                pulseAnim={pulseAnim}
                onOpenSettings={onOpenSettings}
            />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <StatCard
                        icon="pulse"
                        label="Active Sessions"
                        value={statsCount}
                        color={theme.colors.success}
                        gradient={['rgba(16, 185, 129, 0.15)', 'rgba(52, 211, 153, 0.05)']}
                    />
                    <StatCard
                        icon="shield-checkmark"
                        label="System Status"
                        value={isAdminEnabled ? 'ONLINE' : 'OFFLINE'}
                        color={isAdminEnabled ? theme.colors.success : theme.colors.gray500}
                        gradient={isAdminEnabled ? ['rgba(16, 185, 129, 0.15)', 'rgba(52, 211, 153, 0.05)'] : ['rgba(115, 115, 128, 0.15)', 'rgba(163, 163, 171, 0.05)']}
                    />
                    <StatCard
                        icon="time"
                        label="Uptime"
                        value="24h"
                        color={theme.colors.info}
                        gradient={['rgba(59, 130, 246, 0.15)', 'rgba(96, 165, 250, 0.05)']}
                    />
                    <StatCard
                        icon="flash"
                        label="Avg Response"
                        value="45ms"
                        color={theme.colors.accentCyan}
                        gradient={['rgba(6, 182, 212, 0.15)', 'rgba(34, 211, 238, 0.05)']}
                    />
                </View>

                {/* System Control */}
                <GlassCard style={styles.section}>
                    <View style={styles.cardHeader}>
                        <View style={styles.cardTitleRow}>
                            <Ionicons name="settings-outline" size={20} color={theme.colors.primary} />
                            <Text style={styles.cardTitle}>System Control</Text>
                        </View>
                    </View>

                    <View style={styles.controlRow}>
                        <View style={styles.controlInfo}>
                            <Text style={styles.controlLabel}>Admin Panel Access</Text>
                            <Text style={styles.controlSubtext}>Enable secure remote access</Text>
                        </View>
                        <Switch
                            trackColor={{ false: theme.colors.gray700, true: theme.colors.primary }}
                            thumbColor={isAdminEnabled ? '#fff' : theme.colors.gray400}
                            onValueChange={handleToggleAdmin}
                            value={isAdminEnabled}
                        />
                    </View>

                    {isAdminEnabled && (
                        <PremiumButton
                            title="Scan QR Code"
                            icon="qr-code-outline"
                            onPress={handleOpenScanner}
                            style={{ marginTop: 16 }}
                        />
                    )}
                </GlassCard>

                {/* Active Sessions List */}
                <ActiveSessionsList
                    activeSessions={activeSessions}
                    handleTerminateSession={handleTerminateSession}
                    handleAdjustTime={handleAdjustTime}
                />

                {/* Share Access */}
                <GlassCard style={styles.section}>
                    <View style={styles.cardHeader}>
                        <View style={styles.cardTitleRow}>
                            <Ionicons name="share-social-outline" size={20} color={theme.colors.accentPurple} />
                            <Text style={styles.cardTitle}>Share Access</Text>
                        </View>
                        <Text style={styles.cardSubtitle}>Generate temporary access links</Text>
                    </View>

                    {!showLinkGen ? (
                        <PremiumButton
                            title="Generate New Link"
                            icon="link"
                            onPress={() => setShowLinkGen(true)}
                            variant="secondary"
                            colors={['rgba(168, 85, 247, 0.2)', 'rgba(102, 126, 234, 0.2)']}
                            textStyle={{ color: theme.colors.accentPurple }}
                        />
                    ) : (
                        <View style={styles.linkGenForm}>
                            {/* User Type */}
                            <View style={styles.formGroup}>
                                <Text style={styles.formLabel}>User Type</Text>
                                <View style={styles.chipRow}>
                                    {['Guest', 'Auditor', 'Developer'].map(t => (
                                        <TouchableOpacity
                                            key={t}
                                            style={[styles.chip, userType === t && styles.chipActive]}
                                            onPress={() => setUserType(t)}
                                        >
                                            <Text style={[styles.chipText, userType === t && styles.chipTextActive]}>{t}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* Access Level */}
                            <View style={styles.formGroup}>
                                <Text style={styles.formLabel}>Access Level</Text>
                                <View style={styles.chipRow}>
                                    {['View-only', 'Analytics', 'Full'].map(t => (
                                        <TouchableOpacity
                                            key={t}
                                            style={[styles.chip, accessType === t && styles.chipActive]}
                                            onPress={() => setAccessType(t)}
                                        >
                                            <Text style={[styles.chipText, accessType === t && styles.chipTextActive]}>{t}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* Duration */}
                            <View style={styles.formGroup}>
                                <Text style={styles.formLabel}>Duration</Text>
                                <View style={styles.chipRow}>
                                    {['15m', '1h', '4h', '24h'].map(t => (
                                        <TouchableOpacity
                                            key={t}
                                            style={[styles.chip, duration === t && styles.chipActive]}
                                            onPress={() => setDuration(t)}
                                        >
                                            <Text style={[styles.chipText, duration === t && styles.chipTextActive]}>{t}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            <PremiumButton
                                title="Generate Link"
                                onPress={handleGenerateLink}
                                variant="primary"
                                colors={['#a855f7', '#667eea']}
                                style={{ marginVertical: 16 }}
                            />

                            {generatedLink !== '' && (
                                <View style={styles.generatedLinkContainer}>
                                    <Text style={styles.linkLabel}>Generated Link:</Text>
                                    <View style={styles.linkDisplay}>
                                        <Text style={styles.linkText} numberOfLines={1}>{generatedLink}</Text>
                                        <TouchableOpacity onPress={async () => {
                                            await Clipboard.setStringAsync(generatedLink);
                                            Alert.alert('Copied', 'Link copied to clipboard');
                                        }}>
                                            <Ionicons name="copy-outline" size={20} color={theme.colors.primary} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}

                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => { setShowLinkGen(false); setGeneratedLink(''); }}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </GlassCard>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={20} color={theme.colors.danger} />
                    <Text style={styles.logoutButtonText}>Sign Out Securely</Text>
                </TouchableOpacity>

                <View style={{ height: 60 }} />
            </ScrollView>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
    },
    section: {
        marginBottom: 24,
    },
    cardHeader: {
        marginBottom: 16,
    },
    cardTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.textPrimary,
    },
    cardSubtitle: {
        fontSize: 12,
        color: theme.colors.textSecondary,
        marginTop: 4,
    },
    controlRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    controlInfo: {
        flex: 1,
    },
    controlLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.textPrimary,
    },
    controlSubtext: {
        fontSize: 11,
        color: theme.colors.textSecondary,
        marginTop: 2,
    },
    linkGenForm: {
        marginTop: 16,
    },
    formGroup: {
        marginBottom: 16,
    },
    formLabel: {
        fontSize: 11,
        color: theme.colors.textSecondary,
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    chipRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    chipActive: {
        backgroundColor: 'rgba(168, 85, 247, 0.15)',
        borderColor: '#a855f7',
    },
    chipText: {
        fontSize: 12,
        color: theme.colors.textSecondary,
    },
    chipTextActive: {
        color: '#a855f7',
        fontWeight: 'bold',
    },
    generatedLinkContainer: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    linkLabel: {
        fontSize: 10,
        color: theme.colors.textSecondary,
        marginBottom: 4,
    },
    linkDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    linkText: {
        fontSize: 13,
        color: theme.colors.primary,
        fontFamily: 'monospace',
        flex: 1,
        marginRight: 10,
    },
    cancelButton: {
        alignItems: 'center',
        padding: 10,
    },
    cancelButtonText: {
        color: theme.colors.textSecondary,
        fontSize: 14,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.3)',
        backgroundColor: 'rgba(239, 68, 68, 0.05)',
    },
    logoutButtonText: {
        color: theme.colors.danger,
        fontWeight: 'bold',
    },
});
