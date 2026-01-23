import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native';
import { ScreenLayout } from './layout/ScreenLayout';
import { GlassCard } from './ui/GlassCard';
import { AnimatedInput } from './ui/AnimatedInput';
import { PremiumButton } from './ui/PremiumButton';
import theme from '../styles/theme';

export const LoginView = ({ email, setEmail, password, setPassword, handleLogin }) => {
    const logoScale = useRef(new Animated.Value(0.8)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(logoScale, {
                toValue: 1,
                friction: 4,
                tension: 10,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <ScreenLayout style={styles.container}>
            <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                {/* Header */}
                <View style={styles.header}>
                    <Animated.View style={[styles.logoWrapper, { transform: [{ scale: logoScale }] }]}>
                        <Image
                            source={require('../../assets/icon.png')}
                            style={styles.logoIcon}
                            resizeMode="contain"
                        />
                    </Animated.View>
                    <Text style={styles.title}>TheCodePrism</Text>
                    <Text style={styles.subtitle}>Admin Control Centre</Text>
                </View>

                {/* Glassmorphic Card */}
                <GlassCard variant="premium" style={styles.loginCard}>
                    <Text style={styles.cardTitle}>Welcome Back</Text>
                    <Text style={styles.cardSubtitle}>Sign in to access your dashboard</Text>

                    <View style={styles.form}>
                        <AnimatedInput
                            label="Email Address"
                            placeholder="admin@thecodeprism.com"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                        <AnimatedInput
                            label="Password"
                            placeholder="••••••••"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />

                        <PremiumButton
                            title="Access Dashboard"
                            onPress={handleLogin}
                            icon="log-in-outline"
                            style={{ mt: 10 }}
                        />
                    </View>
                </GlassCard>

                {/* Footer Badge */}
                <View style={styles.footer}>
                    <View style={styles.badge}>
                        <View style={styles.badgeDot} />
                        <Text style={styles.badgeText}>Secure Connection</Text>
                    </View>
                </View>
            </Animated.View>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoWrapper: {
        width: 90,
        height: 90,
        marginBottom: 20,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 20,
        elevation: 15,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 20,
        padding: 10,
    },
    logoIcon: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: theme.colors.textPrimary,
        letterSpacing: -1,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    loginCard: {
        marginBottom: 40,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.textPrimary,
        marginBottom: 8,
    },
    cardSubtitle: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginBottom: 24,
    },
    form: {
        gap: 8,
    },
    footer: {
        alignItems: 'center',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: 'rgba(16, 185, 129, 0.2)',
    },
    badgeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: theme.colors.success,
    },
    badgeText: {
        fontSize: 10,
        color: theme.colors.success,
        fontWeight: '600',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
});
