import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../styles/theme';

export const DashboardHeader = ({ user, isAdminEnabled, pulseAnim, onOpenSettings }) => {
    return (
        <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../../assets/icon.png')}
                        style={{ width: 32, height: 32 }}
                        resizeMode="contain"
                    />
                </View>
                <View>
                    <Text style={styles.greeting}>Control Center</Text>
                    <Text style={styles.userName}>{user.email.split('@')[0]}</Text>
                </View>
            </View>
            <View style={styles.headerActions}>
                <View style={[styles.adminBadge, isAdminEnabled && styles.adminBadgeActive]}>
                    {isAdminEnabled && (
                        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                            <View style={styles.badgeDot} />
                        </Animated.View>
                    )}
                    <Text style={[styles.badgeText, isAdminEnabled && styles.badgeTextActive]}>
                        {isAdminEnabled ? 'LIVE' : 'OFFLINE'}
                    </Text>
                </View>
                <TouchableOpacity style={styles.settingsIconButton} onPress={onOpenSettings}>
                    <Ionicons name="settings-outline" size={24} color={theme.colors.textPrimary} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 20,
    },
    logoContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    greeting: {
        fontSize: 10,
        color: theme.colors.textSecondary,
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    userName: {
        fontSize: 18,
        fontWeight: '900',
        color: theme.colors.textPrimary,
        letterSpacing: -0.5,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    settingsIconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    adminBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(115, 115, 128, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: 'rgba(115, 115, 128, 0.2)',
    },
    adminBadgeActive: {
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: 'rgba(16, 185, 129, 0.3)',
    },
    badgeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: theme.colors.success,
    },
    badgeText: {
        fontSize: 10,
        color: theme.colors.gray500,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    badgeTextActive: {
        color: theme.colors.success,
    },
});
