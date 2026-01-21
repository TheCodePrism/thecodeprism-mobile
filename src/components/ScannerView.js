import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { CameraView } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../styles/theme';

export const ScannerView = ({ scanned, handleBarCodeScanned, setIsScannerActive }) => {
    const [pulseAnim] = useState(new Animated.Value(1));
    const [rotateAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        // Pulse animation for scan frame
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.05,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Rotation animation for corners
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#050505', '#0a0a0a']}
                style={StyleSheet.absoluteFillObject}
            />

            {/* Floating orb */}
            <View style={styles.orbContainer}>
                <View style={styles.orb} />
            </View>

            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.scanBadge}>
                        <View style={styles.scanDot} />
                        <Text style={styles.scanBadgeText}>SCANNING</Text>
                    </View>
                    <Text style={styles.title}>Scan QR Code</Text>
                    <Text style={styles.subtitle}>
                        Align the QR code within the frame to authenticate
                    </Text>
                </View>

                {/* Camera Container */}
                <Animated.View style={[styles.cameraWrapper, { transform: [{ scale: pulseAnim }] }]}>
                    <View style={styles.cameraContainer}>
                        <CameraView
                            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                            barcodeScannerSettings={{
                                barcodeTypes: ["qr"],
                            }}
                            style={StyleSheet.absoluteFillObject}
                        />

                        {/* Scan Frame Overlay */}
                        <View style={styles.scanFrame}>
                            {/* Corners */}
                            <Animated.View style={[styles.corner, styles.cornerTL, { transform: [{ rotate }] }]} />
                            <Animated.View style={[styles.corner, styles.cornerTR, { transform: [{ rotate }] }]} />
                            <Animated.View style={[styles.corner, styles.cornerBL, { transform: [{ rotate }] }]} />
                            <Animated.View style={[styles.corner, styles.cornerBR, { transform: [{ rotate }] }]} />

                            {/* Center Cross */}
                            <View style={styles.centerCross}>
                                <View style={styles.crossH} />
                                <View style={styles.crossV} />
                            </View>
                        </View>
                    </View>
                </Animated.View>

                {/* Instructions */}
                <View style={styles.instructions}>
                    <View style={styles.instructionItem}>
                        <Text style={styles.instructionNumber}>1</Text>
                        <Text style={styles.instructionText}>Open Admin Panel on web</Text>
                    </View>
                    <View style={styles.instructionItem}>
                        <Text style={styles.instructionNumber}>2</Text>
                        <Text style={styles.instructionText}>Position QR code in frame</Text>
                    </View>
                    <View style={styles.instructionItem}>
                        <Text style={styles.instructionNumber}>3</Text>
                        <Text style={styles.instructionText}>Complete biometric verification</Text>
                    </View>
                </View>

                {/* Cancel Button */}
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setIsScannerActive(false)}
                >
                    <Text style={styles.cancelButtonText}>Cancel Scan</Text>
                </TouchableOpacity>
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
        width: 350,
        height: 350,
        borderRadius: 175,
        backgroundColor: theme.colors.primary,
        opacity: 0.1,
        bottom: -100,
        left: -100,
    },
    content: {
        flex: 1,
        padding: theme.spacing.xl,
        justifyContent: 'space-between',
        paddingTop: theme.spacing['3xl'] + 20,
    },
    header: {
        alignItems: 'center',
    },
    scanBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
        backgroundColor: 'rgba(79, 172, 254, 0.15)',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.radius.full,
        borderWidth: 1,
        borderColor: 'rgba(79, 172, 254, 0.5)',
        marginBottom: theme.spacing.lg,
    },
    scanDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: theme.colors.primary,
    },
    scanBadgeText: {
        fontSize: theme.typography.sizes.xs,
        color: theme.colors.primary,
        fontWeight: theme.typography.weights.bold,
        letterSpacing: 1,
    },
    title: {
        fontSize: theme.typography.sizes['2xl'],
        fontWeight: theme.typography.weights.extrabold,
        color: theme.colors.textPrimary,
        letterSpacing: theme.typography.letterSpacing.tight,
        marginBottom: theme.spacing.sm,
    },
    subtitle: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: theme.spacing.xl,
    },
    cameraWrapper: {
        alignItems: 'center',
    },
    cameraContainer: {
        width: 300,
        height: 300,
        borderRadius: theme.radius.xl,
        overflow: 'hidden',
        backgroundColor: theme.colors.backgroundCard,
        ...theme.elevation[4],
    },
    scanFrame: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    corner: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderColor: theme.colors.primary,
        borderWidth: 3,
    },
    cornerTL: {
        top: 20,
        left: 20,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    cornerTR: {
        top: 20,
        right: 20,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
    },
    cornerBL: {
        bottom: 20,
        left: 20,
        borderRightWidth: 0,
        borderTopWidth: 0,
    },
    cornerBR: {
        bottom: 20,
        right: 20,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    centerCross: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    crossH: {
        position: 'absolute',
        width: 30,
        height: 2,
        backgroundColor: theme.colors.primary,
    },
    crossV: {
        position: 'absolute',
        width: 2,
        height: 30,
        backgroundColor: theme.colors.primary,
    },
    instructions: {
        gap: theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
    },
    instructionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
        backgroundColor: 'rgba(17, 17, 17, 0.6)',
        borderRadius: theme.radius.md,
        padding: theme.spacing.md,
        borderWidth: 1,
        borderColor: 'rgba(79, 172, 254, 0.1)',
    },
    instructionNumber: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: theme.colors.primary,
        color: '#000',
        fontSize: theme.typography.sizes.sm,
        fontWeight: theme.typography.weights.bold,
        textAlign: 'center',
        lineHeight: 28,
    },
    instructionText: {
        flex: 1,
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.textSecondary,
        fontWeight: theme.typography.weights.medium,
    },
    cancelButton: {
        borderWidth: 1,
        borderColor: theme.colors.gray700,
        borderRadius: theme.radius.md,
        paddingVertical: theme.spacing.lg,
        alignItems: 'center',
        marginTop: theme.spacing.lg,
    },
    cancelButtonText: {
        fontSize: theme.typography.sizes.md,
        fontWeight: theme.typography.weights.semibold,
        color: theme.colors.textSecondary,
    },
});
