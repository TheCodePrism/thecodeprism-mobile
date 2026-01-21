import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../styles/theme';

export const LoginView = ({ email, setEmail, password, setPassword, handleLogin }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#050505', '#0a0a0a', '#0f0f14']}
                style={StyleSheet.absoluteFillObject}
            />

            {/* Floating orbs for background effect */}
            <View style={styles.orbContainer}>
                <View style={[styles.orb, styles.orb1]} />
                <View style={[styles.orb, styles.orb2]} />
            </View>

            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>TheCodePrism</Text>
                    <View style={styles.titleUnderline} />
                    <Text style={styles.subtitle}>Admin Control Centre</Text>
                </View>

                {/* Glassmorphic Card */}
                <View style={styles.glassCard}>
                    <Text style={styles.cardTitle}>Welcome Back</Text>
                    <Text style={styles.cardSubtitle}>Sign in to access your dashboard</Text>

                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email Address</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="admin@thecodeprism.com"
                                placeholderTextColor={theme.colors.textTertiary}
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                placeholderTextColor={theme.colors.textTertiary}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <LinearGradient
                                colors={['#4facfe', '#00f2fe']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.buttonGradient}
                            >
                                <Text style={styles.buttonText}>Access Dashboard</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Footer Badge */}
                <View style={styles.footer}>
                    <View style={styles.badge}>
                        <View style={styles.badgeDot} />
                        <Text style={styles.badgeText}>Secure Connection</Text>
                    </View>
                </View>
            </View>

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
        opacity: 0.15,
    },
    orb1: {
        width: 300,
        height: 300,
        backgroundColor: theme.colors.primary,
        top: -100,
        right: -100,
    },
    orb2: {
        width: 250,
        height: 250,
        backgroundColor: theme.colors.secondary,
        bottom: -80,
        left: -80,
    },
    content: {
        flex: 1,
        padding: theme.spacing.xl,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: theme.spacing['3xl'],
    },
    title: {
        fontSize: theme.typography.sizes['3xl'],
        fontWeight: theme.typography.weights.extrabold,
        color: theme.colors.textPrimary,
        letterSpacing: theme.typography.letterSpacing.tight,
    },
    titleUnderline: {
        width: 60,
        height: 4,
        backgroundColor: theme.colors.primary,
        borderRadius: 2,
        marginTop: theme.spacing.sm,
    },
    subtitle: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.textSecondary,
        letterSpacing: theme.typography.letterSpacing.wide,
        marginTop: theme.spacing.sm,
        textTransform: 'uppercase',
    },
    glassCard: {
        backgroundColor: 'rgba(17, 17, 17, 0.8)',
        borderRadius: theme.radius.xl,
        borderWidth: 1,
        borderColor: 'rgba(79, 172, 254, 0.2)',
        padding: theme.spacing.xl,
        ...theme.elevation[3],
    },
    cardTitle: {
        fontSize: theme.typography.sizes.xl,
        fontWeight: theme.typography.weights.bold,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.xs,
    },
    cardSubtitle: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xl,
    },
    form: {
        gap: theme.spacing.lg,
    },
    inputContainer: {
        gap: theme.spacing.sm,
    },
    label: {
        fontSize: theme.typography.sizes.sm,
        fontWeight: theme.typography.weights.medium,
        color: theme.colors.textSecondary,
        letterSpacing: 0.5,
    },
    input: {
        backgroundColor: 'rgba(10, 10, 10, 0.8)',
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderColor: 'rgba(79, 172, 254, 0.2)',
        padding: theme.spacing.lg,
        color: theme.colors.textPrimary,
        fontSize: theme.typography.sizes.md,
    },
    button: {
        marginTop: theme.spacing.md,
        borderRadius: theme.radius.md,
        overflow: 'hidden',
        ...theme.elevation[3],
    },
    buttonGradient: {
        paddingVertical: theme.spacing.lg,
        paddingHorizontal: theme.spacing.xl,
        alignItems: 'center',
    },
    buttonText: {
        color: '#000',
        fontSize: theme.typography.sizes.md,
        fontWeight: theme.typography.weights.bold,
        letterSpacing: 0.5,
    },
    footer: {
        marginTop: theme.spacing['2xl'],
        alignItems: 'center',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.radius.full,
        borderWidth: 1,
        borderColor: 'rgba(16, 185, 129, 0.3)',
    },
    badgeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: theme.colors.success,
    },
    badgeText: {
        fontSize: theme.typography.sizes.xs,
        color: theme.colors.success,
        fontWeight: theme.typography.weights.medium,
    },
});
