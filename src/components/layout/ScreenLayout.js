import React from 'react';
import { View, StyleSheet, SafeAreaView, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../../styles/theme';

export const ScreenLayout = ({ children, style }) => {
    return (
        <View style={styles.container}>
            {/* Unified Dynamic Background */}
            <LinearGradient
                colors={['#050508', '#0a0a0f', '#1a1a2e']}
                style={StyleSheet.absoluteFillObject}
            />

            {/* Ambient Floating Orbs */}
            <View style={styles.orbContainer}>
                <View style={[styles.orb, styles.orb1]} />
                <View style={[styles.orb, styles.orb2]} />
                <View style={[styles.orb, styles.orb3]} />
            </View>

            {/* Content Content - Safe Area handled if needed, or raw */}
            <SafeAreaView style={[styles.content, style]}>
                {children}
            </SafeAreaView>

            <StatusBar style="light" backgroundColor="transparent" translucent />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050508',
    },
    orbContainer: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
    orb: {
        position: 'absolute',
        borderRadius: 9999,
        opacity: 0.12, // Slightly increased for visibility
    },
    orb1: {
        width: 350,
        height: 350,
        backgroundColor: theme.colors.primary,
        top: -100,
        right: -80,
    },
    orb2: {
        width: 300,
        height: 300,
        backgroundColor: theme.colors.accent || '#764ba2',
        bottom: -50,
        left: -80,
    },
    orb3: {
        width: 250,
        height: 250,
        backgroundColor: theme.colors.accentCyan || '#06b6d4',
        top: '45%',
        left: -100,
        opacity: 0.08,
    },
    content: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
    },
});
