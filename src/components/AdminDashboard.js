import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet, Alert, Animated, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import theme from '../styles/theme';

export const AdminDashboard = ({
    user,
    isAdminEnabled,
    handleToggleAdmin,
    handleOpenScanner,
    activeSessions,
    handleTerminateSession,
    handleAdjustTime,
    sharedLinksProps,
    handleLogout
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
        // Pulsing animation for live indicators
        if (isAdminEnabled) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.3,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        }
    }, [isAdminEnabled]);

    // Animated counter for stats
    useEffect(() => {
        const interval = setInterval(() => {
            setStatsCount(prev => (prev < activeSessions.length ? prev + 1 : activeSessions.length));
        }, 100);
        return () => clearInterval(interval);
    }, [activeSessions.length]);

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

    const StatCard = ({ icon, label, value, color, gradient }) => {
        const [pressAnim] = useState(new Animated.Value(1));
        const cardColor = color || theme.colors.primary;

        const handlePressIn = () => {
            Animated.spring(pressAnim, {
                toValue: 0.95,
                useNativeDriver: true,
            }).start();
        };

        const handlePressOut = () => {
            Animated.spring(pressAnim, {
                toValue: 1,
                friction: 3,
                useNativeDriver: true,
            }).start();
        };

        return (
            <Animated.View style={[styles.statCard, { transform: [{ scale: pressAnim }] }]}>
                <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
                    <LinearGradient
                        colors={gradient || ['rgba(79, 172, 254, 0.1)', 'rgba(0, 242, 254, 0.05)']}
                        style={styles.statCardGradient}
                    >
                        <View style={[styles.iconContainer, { backgroundColor: `${cardColor}15` }]}>
                            <Ionicons name={icon} size={24} color={cardColor} />
                        </View>
                        <Text style={styles.statLabel}>{label}</Text>
                        <Text style={[styles.statValue, { color: cardColor }]}>{value}</Text>
                    </LinearGradient>
                </Pressable>
            </Animated.View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Animated Mesh Gradient Background */}
            <LinearGradient
                colors={['#050508', '#0a0a0f', '#0f0f14']}
                style={StyleSheet.absoluteFillObject}
            />

            {/* Floating Orbs */}
            <View style={styles.orbContainer}>
                <View style={[styles.orb, styles.orb1]} />
                <View style={[styles.orb, styles.orb2]} />
                <View style={[styles.orb, styles.orb3]} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Control Center</Text>
                        <Text style={styles.userName}>{user.email.split('@')[0]}</Text>
                    </View>
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
                </View>

                {/* Dashboard Stats Grid */}
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
                        label="Response"
                        value="<50ms"
                        color={theme.colors.accentCyan}
                        gradient={['rgba(6, 182, 212, 0.15)', 'rgba(34, 211, 238, 0.05)']}
                    />
                </View>

                {/* System Control Card */}
                <View style={[styles.card, styles.controlCard]}>
                    <View style={styles.cardHeader}>
                        <View style={styles.cardTitleRow}>
                            <Ionicons name="settings-outline" size={22} color={theme.colors.primary} />
                            <Text style={styles.cardTitle}>System Control</Text>
                        </View>
                    </View>

                    <View style={styles.controlRow}>
                        <View style={styles.controlInfo}>
                            <Text style={styles.controlLabel}>Admin Panel</Text>
                            <Text style={styles.controlSubtext}>QR Code Authentication</Text>
                        </View>
                        <Switch
                            trackColor={{ false: theme.colors.gray700, true: theme.colors.primary }}
                            thumbColor={isAdminEnabled ? '#fff' : theme.colors.gray400}
                            onValueChange={handleToggleAdmin}
                            value={isAdminEnabled}
                        />
                    </View>

                    {isAdminEnabled && (
                        <TouchableOpacity style={styles.scanButton} onPress={handleOpenScanner}>
                            <LinearGradient
                                colors={['#4facfe', '#00f2fe']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.scanButtonGradient}
                            >
                                <Ionicons name="qr-code-outline" size={20} color="#000" />
                                <Text style={styles.scanButtonText}>Scan QR Code</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Active Sessions */}
                {activeSessions.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="link-outline" size={20} color={theme.colors.primary} />
                            <Text style={styles.sectionTitle}>Active Sessions</Text>
                            <View style={styles.countBadge}>
                                <Text style={styles.countBadgeText}>{activeSessions.length}</Text>
                            </View>
                        </View>

                        {activeSessions.map((session) => {
                            const timeData = getTimeRemaining(session.expiresAt);

                            return (
                                <View key={session.id} style={styles.sessionCard}>
                                    <LinearGradient
                                        colors={session.sessionType === 'shared'
                                            ? ['rgba(102, 126, 234, 0.08)', 'rgba(118, 75, 162, 0.08)']
                                            : ['rgba(79, 172, 254, 0.08)', 'rgba(0, 242, 254, 0.08)']
                                        }
                                        style={styles.sessionCardGradient}
                                    >
                                        <View style={styles.sessionHeader}>
                                            <View style={styles.sessionInfo}>
                                                <View style={[styles.sessionDot, session.sessionType === 'shared' && { backgroundColor: theme.colors.secondary }]} />
                                                <Text style={styles.sessionId}>
                                                    {session.id.substring(0, 10)}...
                                                </Text>
                                                {session.sessionType === 'shared' && (
                                                    <View style={styles.sharedBadge}>
                                                        <Ionicons name="share-social" size={10} color={theme.colors.secondary} />
                                                        <Text style={styles.sharedBadgeText}>SHARED</Text>
                                                    </View>
                                                )}
                                            </View>
                                            <TouchableOpacity onPress={() => handleTerminateSession(session.id, session.sessionType === 'shared')}>
                                                <View style={styles.terminateButton}>
                                                    <Ionicons name="close-circle" size={18} color={theme.colors.danger} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                        {session.sessionType === 'shared' && (
                                            <View style={styles.sharedInfo}>
                                                <View style={styles.sharedInfoChip}>
                                                    <Ionicons name="person" size={12} color={theme.colors.secondary} />
                                                    <Text style={styles.sharedInfoText}>{session.userType}</Text>
                                                </View>
                                                <View style={styles.sharedInfoChip}>
                                                    <Ionicons name="key" size={12} color={theme.colors.secondary} />
                                                    <Text style={styles.sharedInfoText}>{session.accessType}</Text>
                                                </View>
                                            </View>
                                        )}

                                        {/* Progress Bar */}
                                        <View style={styles.progressSection}>
                                            <View style={styles.progressHeader}>
                                                <Text style={styles.progressLabel}>
                                                    <Ionicons name="time-outline" size={12} color={theme.colors.textSecondary} />
                                                    {' '}{timeData.text} remaining
                                                </Text>
                                                <Text style={styles.progressExpiry}>
                                                    {new Date(session.expiresAt).toLocaleTimeString()}
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
                                                <Text style={styles.timeButtonText}>15m</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.timeButton, styles.timeButtonPrimary]}
                                                onPress={() => handleAdjustTime(session.id, 15)}
                                            >
                                                <Ionicons name="add-circle-outline" size={16} color="#000" />
                                                <Text style={[styles.timeButtonText, styles.timeButtonTextPrimary]}>15m</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </LinearGradient>
                                </View>
                            );
                        })}
                    </View>
                )}

                {/* Share Admin Access */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.cardTitleRow}>
                            <Ionicons name="share-social-outline" size={22} color={theme.colors.accentPurple} />
                            <Text style={styles.cardTitle}>Share Access</Text>
                        </View>
                        <Text style={styles.cardSubtitle}>Generate temporary access links</Text>
                    </View>

                    {!showLinkGen ? (
                        <TouchableOpacity style={styles.generateButton} onPress={() => setShowLinkGen(true)}>
                            <LinearGradient
                                colors={['rgba(168, 85, 247, 0.2)', 'rgba(102, 126, 234, 0.2)']}
                                style={styles.generateButtonGradient}
                            >
                                <Ionicons name="link" size={18} color={theme.colors.accentPurple} />
                                <Text style={styles.generateButtonText}>Generate New Link</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.linkGenForm}>
                            {/* User Type */}
                            <View style={styles.formGroup}>
                                <Text style={styles.formLabel}>
                                    <Ionicons name="person-outline" size={14} color={theme.colors.textSecondary} />
                                    {' '}User Type
                                </Text>
                                <View style={styles.chipRow}>
                                    {['Guest', 'Auditor', 'Developer'].map(t => (
                                        <TouchableOpacity
                                            key={t}
                                            style={[styles.chip, userType === t && styles.chipActive]}
                                            onPress={() => setUserType(t)}
                                        >
                                            <Text style={[styles.chipText, userType === t && styles.chipTextActive]}>
                                                {t}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* Access Type */}
                            <View style={styles.formGroup}>
                                <Text style={styles.formLabel}>
                                    <Ionicons name="key-outline" size={14} color={theme.colors.textSecondary} />
                                    {' '}Access Level
                                </Text>
                                <View style={styles.chipRow}>
                                    {['View-only', 'Analytics', 'Full'].map(t => (
                                        <TouchableOpacity
                                            key={t}
                                            style={[styles.chip, accessType === t && styles.chipActive]}
                                            onPress={() => setAccessType(t)}
                                        >
                                            <Text style={[styles.chipText, accessType === t && styles.chipTextActive]}>
                                                {t}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* Duration */}
                            <View style={styles.formGroup}>
                                <Text style={styles.formLabel}>
                                    <Ionicons name="timer-outline" size={14} color={theme.colors.textSecondary} />
                                    {' '}Duration
                                </Text>
                                <View style={styles.chipRow}>
                                    {['15m', '1h', '4h', '24h'].map(t => (
                                        <TouchableOpacity
                                            key={t}
                                            style={[styles.chip, duration === t && styles.chipActive]}
                                            onPress={() => setDuration(t)}
                                        >
                                            <Text style={[styles.chipText, duration === t && styles.chipTextActive]}>
                                                {t}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            <TouchableOpacity style={styles.primaryButton} onPress={handleGenerateLink}>
                                <LinearGradient
                                    colors={['#a855f7', '#667eea']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.buttonGradient}
                                >
                                    <Ionicons name="create-outline" size={18} color="#fff" />
                                    <Text style={styles.primaryButtonText}>Generate Link</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            {generatedLink !== '' && (
                                <View style={styles.generatedLinkContainer}>
                                    <View style={styles.linkDisplay}>
                                        <Ionicons name="link" size={14} color={theme.colors.accentPurple} style={{ marginRight: 8 }} />
                                        <Text style={styles.linkText} numberOfLines={1}>{generatedLink}</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.copyButton}
                                        onPress={async () => {
                                            await Clipboard.setStringAsync(generatedLink);
                                            Alert.alert('✓ Success', 'Link copied to clipboard');
                                        }}
                                    >
                                        <Ionicons name="copy-outline" size={16} color="#000" />
                                        <Text style={styles.copyButtonText}>Copy Link</Text>
                                    </TouchableOpacity>
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
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="exit-outline" size={20} color={theme.colors.danger} />
                    <Text style={styles.logoutButtonText}>Sign Out</Text>
                </TouchableOpacity>

                <View style={{ height: 60 }} />
            </ScrollView>

            <StatusBar style="light" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    orbContainer: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
    orb: {
        position: 'absolute',
        borderRadius: 9999,
        opacity: 0.06,
    },
    orb1: {
        width: 400,
        height: 400,
        backgroundColor: theme.colors.primary,
        top: -200,
        right: -100,
    },
    orb2: {
        width: 300,
        height: 300,
        backgroundColor: theme.colors.accentPurple,
        bottom: -100,
        left: -100,
    },
    orb3: {
        width: 200,
        height: 200,
        backgroundColor: theme.colors.accentCyan,
        top: '40%',
        left: -50,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: theme.spacing.xl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.xl,
        marginTop: theme.spacing['2xl'],
    },
    greeting: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.textSecondary,
        letterSpacing: theme.typography.letterSpacing.wider,
        textTransform: 'uppercase',
        marginBottom: theme.spacing.xs,
    },
    userName: {
        fontSize: theme.typography.sizes['3xl'],
        fontWeight: theme.typography.weights.black,
        color: theme.colors.textPrimary,
        letterSpacing: theme.typography.letterSpacing.tighter,
    },
    adminBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
        backgroundColor: 'rgba(115, 115, 128, 0.2)',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.radius.full,
        borderWidth: theme.borderWidths.thin,
        borderColor: 'rgba(115, 115, 128, 0.4)',
    },
    adminBadgeActive: {
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgba(16, 185, 129, 0.6)',
        ...theme.glow.small,
        shadowColor: theme.colors.success,
    },
    badgeDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.success,
    },
    badgeText: {
        fontSize: theme.typography.sizes.xs,
        color: theme.colors.gray500,
        fontWeight: theme.typography.weights.black,
        letterSpacing: 1,
    },
    badgeTextActive: {
        color: theme.colors.successLight,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.xl,
    },
    statCard: {
        flex: 1,
        minWidth: '47%',
        borderRadius: theme.radius.lg,
        overflow: 'hidden',
        borderWidth: theme.borderWidths.thin,
        borderColor: 'rgba(79, 172, 254, 0.2)',
        ...theme.elevation[2],
    },
    statCardGradient: {
        padding: theme.spacing.lg,
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: theme.radius.md,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.xs,
    },
    statLabel: {
        fontSize: theme.typography.sizes.xs,
        color: theme.colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    statValue: {
        fontSize: theme.typography.sizes.xl,
        fontWeight: theme.typography.weights.black,
        color: theme.colors.primary,
    },
    card: {
        backgroundColor: 'rgba(15, 15, 20, 0.9)',
        borderRadius: theme.radius['2xl'],
        borderWidth: theme.borderWidths.thin,
        borderColor: 'rgba(79, 172, 254, 0.2)',
        padding: theme.spacing.xl,
        marginBottom: theme.spacing.lg,
        ...theme.elevation[2],
    },
    controlCard: {
        borderColor: 'rgba(79, 172, 254, 0.3)',
        ...theme.elevation[3],
    },
    cardHeader: {
        marginBottom: theme.spacing.lg,
    },
    cardTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    cardTitle: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: theme.typography.weights.bold,
        color: theme.colors.textPrimary,
    },
    cardSubtitle: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },
    controlRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
    },
    controlInfo: {
        flex: 1,
    },
    controlLabel: {
        fontSize: theme.typography.sizes.md,
        fontWeight: theme.typography.weights.semibold,
        color: theme.colors.textPrimary,
        marginBottom: 2,
    },
    controlSubtext: {
        fontSize: theme.typography.sizes.xs,
        color: theme.colors.textTertiary,
    },
    scanButton: {
        borderRadius: theme.radius.md,
        overflow: 'hidden',
        ...theme.elevation[2],
    },
    scanButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.sm,
        paddingVertical: theme.spacing.lg,
    },
    scanButtonText: {
        fontSize: theme.typography.sizes.md,
        fontWeight: theme.typography.weights.bold,
        color: '#000',
    },
    section: {
        marginBottom: theme.spacing.xl,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
        marginBottom: theme.spacing.md,
    },
    sectionTitle: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: theme.typography.weights.bold,
        color: theme.colors.textPrimary,
    },
    countBadge: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 2,
        borderRadius: theme.radius.full,
        minWidth: 24,
        alignItems: 'center',
        ...theme.glow.small,
    },
    countBadgeText: {
        fontSize: theme.typography.sizes.xs,
        fontWeight: theme.typography.weights.black,
        color: '#000',
    },
    sessionCard: {
        marginBottom: theme.spacing.md,
        borderRadius: theme.radius.xl,
        overflow: 'hidden',
        borderWidth: theme.borderWidths.thin,
        borderColor: 'rgba(79, 172, 254, 0.25)',
        ...theme.elevation[2],
    },
    sessionCardGradient: {
        padding: theme.spacing.lg,
    },
    sessionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    sessionInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
        flex: 1,
    },
    sessionDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.success,
    },
    sessionId: {
        fontSize: theme.typography.sizes.sm,
        fontWeight: theme.typography.weights.semibold,
        color: theme.colors.textPrimary,
        fontFamily: 'monospace',
    },
    sharedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(102, 126, 234, 0.25)',
        borderWidth: theme.borderWidths.thin,
        borderColor: theme.colors.secondary,
        borderRadius: theme.radius.full,
        paddingHorizontal: theme.spacing.xs,
        paddingVertical: 2,
    },
    sharedBadgeText: {
        fontSize: 9,
        fontWeight: theme.typography.weights.black,
        color: theme.colors.secondary,
        letterSpacing: 0.5,
    },
    terminateButton: {
        padding: 4,
    },
    sharedInfo: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
        marginBottom: theme.spacing.md,
    },
    sharedInfoChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(102, 126, 234, 0.15)',
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 4,
        borderRadius: theme.radius.sm,
        borderWidth: theme.borderWidths.thin,
        borderColor: 'rgba(102, 126, 234, 0.3)',
    },
    sharedInfoText: {
        fontSize: theme.typography.sizes.xs,
        fontWeight: theme.typography.weights.semibold,
        color: theme.colors.secondary,
    },
    progressSection: {
        marginBottom: theme.spacing.md,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.xs,
    },
    progressLabel: {
        fontSize: theme.typography.sizes.xs,
        color: theme.colors.textSecondary,
    },
    progressExpiry: {
        fontSize: theme.typography.sizes.xs,
        color: theme.colors.textTertiary,
        fontFamily: 'monospace',
    },
    progressBarBg: {
        height: 6,
        backgroundColor: 'rgba(79, 172, 254, 0.1)',
        borderRadius: theme.radius.full,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: theme.radius.full,
    },
    sessionActions: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
    },
    timeButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        backgroundColor: 'rgba(79, 172, 254, 0.1)',
        borderWidth: theme.borderWidths.thin,
        borderColor: 'rgba(79, 172, 254, 0.3)',
        borderRadius: theme.radius.sm,
        paddingVertical: theme.spacing.sm,
    },
    timeButtonPrimary: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    timeButtonText: {
        fontSize: theme.typography.sizes.sm,
        fontWeight: theme.typography.weights.semibold,
        color: theme.colors.textSecondary,
    },
    timeButtonTextPrimary: {
        color: '#000',
    },
    generateButton: {
        borderRadius: theme.radius.md,
        overflow: 'hidden',
        borderWidth: theme.borderWidths.thin,
        borderColor: 'rgba(168, 85, 247, 0.3)',
    },
    generateButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.sm,
        paddingVertical: theme.spacing.lg,
    },
    generateButtonText: {
        fontSize: theme.typography.sizes.md,
        fontWeight: theme.typography.weights.semibold,
        color: theme.colors.accentPurple,
    },
    linkGenForm: {
        gap: theme.spacing.lg,
    },
    formGroup: {
        gap: theme.spacing.sm,
    },
    formLabel: {
        fontSize: theme.typography.sizes.sm,
        fontWeight: theme.typography.weights.medium,
        color: theme.colors.textSecondary,
    },
    chipRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.sm,
    },
    chip: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.radius.full,
        backgroundColor: 'rgba(79, 172, 254, 0.08)',
        borderWidth: theme.borderWidths.thin,
        borderColor: 'rgba(79, 172, 254, 0.25)',
    },
    chipActive: {
        backgroundColor: 'rgba(79, 172, 254, 0.25)',
        borderColor: theme.colors.primary,
        ...theme.elevation[1],
    },
    chipText: {
        fontSize: theme.typography.sizes.sm,
        fontWeight: theme.typography.weights.medium,
        color: theme.colors.textSecondary,
    },
    chipTextActive: {
        color: theme.colors.primary,
        fontWeight: theme.typography.weights.bold,
    },
    primaryButton: {
        borderRadius: theme.radius.md,
        overflow: 'hidden',
        ...theme.elevation[2],
    },
    buttonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.sm,
        paddingVertical: theme.spacing.lg,
    },
    primaryButtonText: {
        fontSize: theme.typography.sizes.md,
        fontWeight: theme.typography.weights.bold,
        color: '#fff',
    },
    generatedLinkContainer: {
        gap: theme.spacing.sm,
    },
    linkDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: theme.radius.sm,
        padding: theme.spacing.md,
        borderWidth: theme.borderWidths.thin,
        borderColor: 'rgba(168, 85, 247, 0.3)',
    },
    linkText: {
        flex: 1,
        fontSize: theme.typography.sizes.xs,
        color: theme.colors.accentPurple,
        fontFamily: 'monospace',
    },
    copyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.sm,
        backgroundColor: theme.colors.accentPurple,
        borderRadius: theme.radius.sm,
        paddingVertical: theme.spacing.md,
    },
    copyButtonText: {
        fontSize: theme.typography.sizes.sm,
        fontWeight: theme.typography.weights.bold,
        color: '#fff',
    },
    cancelButton: {
        paddingVertical: theme.spacing.sm,
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.textTertiary,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.sm,
        borderWidth: theme.borderWidths.base,
        borderColor: theme.colors.danger,
        borderRadius: theme.radius.md,
        paddingVertical: theme.spacing.lg,
        marginTop: theme.spacing.xl,
    },
    logoutButtonText: {
        fontSize: theme.typography.sizes.md,
        fontWeight: theme.typography.weights.semibold,
        color: theme.colors.danger,
    },
});
