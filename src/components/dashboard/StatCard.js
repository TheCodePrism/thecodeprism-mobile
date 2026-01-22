import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../styles/theme';

export const StatCard = ({ icon, label, value, color, gradient }) => {
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
                    colors={gradient || ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']}
                    style={styles.statCardGradient}
                >
                    <View style={[styles.iconContainer, { backgroundColor: `${cardColor}15` }]}>
                        <Ionicons name={icon} size={20} color={cardColor} />
                    </View>
                    <View>
                        <Text style={styles.statValue} numberOfLines={1} adjustsFontSizeToFit>{value}</Text>
                        <Text style={styles.statLabel}>{label}</Text>
                    </View>
                </LinearGradient>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    statCard: {
        flex: 1,
        minWidth: '47%',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
    },
    statCardGradient: {
        padding: 16,
        gap: 12,
        height: 110,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statLabel: {
        fontSize: 11,
        color: theme.colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginTop: 2,
    },
    statValue: {
        fontSize: 20,
        fontWeight: '900',
        color: theme.colors.textPrimary,
    },
});
