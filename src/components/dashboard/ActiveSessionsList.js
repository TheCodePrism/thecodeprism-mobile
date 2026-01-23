import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../styles/theme';

export const ActiveSessionsList = ({ activeSessions, handleTerminateSession, handleAdjustTime }) => {

    const getTimeRemaining = (expiresAt) => {
        const now = new Date().getTime();
        const expiry = new Date(expiresAt).getTime();
        const diff = expiry - now;

        if (diff <= 0) return { text: 'Expired', percent: 0 };

        const totalMinutes = Math.floor(diff / 60000);
        if (totalMinutes < 60) {
            return { text: `${totalMinutes}m`, percent: (totalMinutes / 60) * 100 };
        }

        const hours = Math.floor(totalMinutes / 60);
        const remainingMins = totalMinutes % 60;
        return { text: `${hours}h ${remainingMins}m`, percent: 100 };
    };

    if (activeSessions.length === 0) return null;

    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Ionicons name="link-outline" size={18} color={theme.colors.primary} />
                <Text style={styles.sectionTitle}>Active Sessions</Text>
                <View style={styles.countBadge}>
                    <Text style={styles.countBadgeText}>{activeSessions.length}</Text>
                </View>
            </View>

            {activeSessions.map((session) => {
                const timeData = getTimeRemaining(session.expiresAt);
                const isShared = session.sessionType === 'shared';

                return (
                    <View key={session.id} style={styles.sessionCard}>
                        <LinearGradient
                            colors={isShared
                                ? ['rgba(102, 126, 234, 0.08)', 'rgba(118, 75, 162, 0.08)']
                                : ['rgba(79, 172, 254, 0.08)', 'rgba(0, 242, 254, 0.08)']
                            }
                            style={styles.sessionCardGradient}
                        >
                            <View style={styles.sessionHeader}>
                                <View style={styles.sessionInfo}>
                                    <View style={[styles.sessionDot, isShared && { backgroundColor: theme.colors.secondary }]} />
                                    <Text style={styles.sessionId}>
                                        {session.id.substring(0, 10)}...
                                    </Text>
                                    {isShared && (
                                        <View style={styles.sharedBadge}>
                                            <Text style={styles.sharedBadgeText}>SHARED</Text>
                                        </View>
                                    )}
                                </View>
                                <TouchableOpacity onPress={() => handleTerminateSession(session.id, isShared)}>
                                    <View style={styles.terminateButton}>
                                        <Ionicons name="close-circle" size={20} color={theme.colors.danger} />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.progressSection}>
                                <View style={styles.progressHeader}>
                                    <Text style={styles.progressLabel}>
                                        {timeData.text} remaining
                                    </Text>
                                    <Text style={styles.progressExpiry}>
                                        {new Date(session.expiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Text>
                                </View>
                                <View style={styles.progressBarBg}>
                                    <LinearGradient
                                        colors={['#4facfe', '#00f2fe']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={[styles.progressBarFill, { width: `${timeData.percent}%` }]}
                                    />
                                </View>
                            </View>

                            <View style={styles.sessionActions}>
                                <TouchableOpacity
                                    style={styles.timeButton}
                                    onPress={() => handleAdjustTime(session.id, -15)}
                                >
                                    <Ionicons name="remove-circle-outline" size={16} color={theme.colors.textSecondary} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.timeButton, styles.timeButtonPrimary]}
                                    onPress={() => handleAdjustTime(session.id, 15)}
                                >
                                    <Ionicons name="add-circle-outline" size={16} color="#000" />
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: theme.colors.textPrimary,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    countBadge: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 9999,
        minWidth: 20,
        alignItems: 'center',
    },
    countBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#000',
    },
    sessionCard: {
        marginBottom: 12,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        backgroundColor: 'rgba(20,20,30,0.4)',
    },
    sessionCardGradient: {
        padding: 16,
    },
    sessionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sessionInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    sessionDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.success,
    },
    sessionId: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.textPrimary,
        fontFamily: 'monospace',
    },
    sharedBadge: {
        backgroundColor: 'rgba(102, 126, 234, 0.25)',
        borderWidth: 1,
        borderColor: theme.colors.secondary,
        borderRadius: 4,
        paddingHorizontal: 4,
        paddingVertical: 2,
    },
    sharedBadgeText: {
        fontSize: 8,
        fontWeight: 'bold',
        color: theme.colors.secondary,
    },
    terminateButton: {
        padding: 4,
    },
    progressSection: {
        marginBottom: 16,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    progressLabel: {
        fontSize: 11,
        color: theme.colors.textSecondary,
    },
    progressExpiry: {
        fontSize: 11,
        color: theme.colors.textSecondary,
        fontFamily: 'monospace',
    },
    progressBarBg: {
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 2,
    },
    sessionActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 8,
    },
    timeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    timeButtonPrimary: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
});
