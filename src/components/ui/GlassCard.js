import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../../styles/theme';

export const GlassCard = ({ children, style, variant = 'base' }) => {
    // Select style based on variant
    const variantStyle = theme.componentStyles?.card?.[variant] || theme.componentStyles?.card?.base;

    return (
        <View style={[styles.card, variantStyle, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        // Fallback basics if theme fails
        backgroundColor: 'rgba(15, 15, 20, 0.7)',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
    },
});
