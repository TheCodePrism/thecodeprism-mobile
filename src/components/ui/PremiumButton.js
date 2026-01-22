import React, { useRef } from 'react';
import { Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../styles/theme';

export const PremiumButton = ({
    onPress,
    title,
    icon,
    colors,
    variant = 'primary', // primary, secondary, danger, ghost
    disabled = false,
    loading = false,
    style,
    textStyle
}) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.96,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const getColors = () => {
        if (disabled) return [theme.colors.gray700, theme.colors.gray800];
        if (colors) return colors;

        switch (variant) {
            case 'secondary':
                return ['rgba(79, 172, 254, 0.15)', 'rgba(79, 172, 254, 0.05)'];
            case 'danger':
                return ['transparent', 'transparent'];
            case 'ghost':
                return ['transparent', 'transparent'];
            case 'primary':
            default:
                return theme.gradients?.primary || ['#4facfe', '#00f2fe'];
        }
    };

    const getBorder = () => {
        if (variant === 'secondary') return { borderWidth: 1, borderColor: theme.colors.primary };
        if (variant === 'danger') return { borderWidth: 1, borderColor: theme.colors.danger };
        return {};
    };

    const getTextColor = () => {
        if (disabled) return theme.colors.gray400;
        if (variant === 'secondary') return theme.colors.primary;
        if (variant === 'danger') return theme.colors.danger;
        if (variant === 'ghost') return theme.colors.textSecondary;
        return '#000000'; // Primary usually has dark text on bright gradient
    };

    return (
        <Animated.View style={[{ transform: [{ scale: scaleValue }] }, style]}>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.9}
                disabled={disabled || loading}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={[styles.container, getBorder()]}
            >
                <LinearGradient
                    colors={getColors()}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}
                >
                    {icon && (
                        <Ionicons
                            name={icon}
                            size={20}
                            color={getTextColor()}
                            style={{ marginRight: 8 }}
                        />
                    )}
                    <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
                        {loading ? 'Processing...' : title}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        overflow: 'hidden',
        // Shadow handled by elevation prop in usage if needed, or added here
    },
    gradient: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 0.5,
    },
});
