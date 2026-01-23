import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { CameraView } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { ScreenLayout } from './layout/ScreenLayout';
import { GlassCard } from './ui/GlassCard';
import theme from '../styles/theme';

const { width } = Dimensions.get('window');
const SCAN_SIZE = width * 0.7;

export const ScannerView = ({ scanned, handleBarCodeScanned, setIsScannerActive }) => {
    return (
        <ScreenLayout style={styles.container}>
            <View style={styles.cameraContainer}>
                <CameraView
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr", "pdf417"],
                    }}
                    style={StyleSheet.absoluteFillObject}
                />

                {/* Overlay */}
                <View style={styles.overlay}>
                    <View style={styles.unfocusedContainer}></View>
                    <View style={styles.middleContainer}>
                        <View style={styles.unfocusedContainer}></View>
                        <View style={styles.focusedContainer}>
                            <View style={[styles.corner, styles.topLeft]} />
                            <View style={[styles.corner, styles.topRight]} />
                            <View style={[styles.corner, styles.bottomLeft]} />
                            <View style={[styles.corner, styles.bottomRight]} />

                            {/* Scanning Animation Shim */}
                            <View style={styles.scanLine} />
                        </View>
                        <View style={styles.unfocusedContainer}></View>
                    </View>
                    <View style={styles.unfocusedContainer}></View>
                </View>
            </View>

            <View style={styles.uiContainer}>
                <GlassCard style={styles.infoCard}>
                    <Ionicons name="scan-outline" size={24} color={theme.colors.primary} style={{ marginBottom: 8, alignSelf: 'center' }} />
                    <Text style={styles.infoText}>
                        Align the QR code within the frame to authenticate
                    </Text>
                </GlassCard>

                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setIsScannerActive(false)}
                >
                    <View style={styles.closeButtonBlur}>
                        <Ionicons name="close" size={32} color="#fff" />
                    </View>
                </TouchableOpacity>
            </View>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    cameraContainer: {
        flex: 1,
        overflow: 'hidden',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    unfocusedContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    middleContainer: {
        flexDirection: 'row',
        height: SCAN_SIZE,
    },
    focusedContainer: {
        width: SCAN_SIZE,
        height: SCAN_SIZE,
        backgroundColor: 'transparent',
    },
    corner: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderColor: theme.colors.primary,
        borderWidth: 4,
        borderRadius: 4,
    },
    topLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
    topRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
    bottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
    bottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
    scanLine: {
        height: 2,
        width: '100%',
        backgroundColor: theme.colors.primary,
        opacity: 0.5,
        position: 'absolute',
        top: '50%',
        // In a real app, I'd animate this top value
    },
    uiContainer: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    infoCard: {
        marginBottom: 30,
        paddingVertical: 16,
        paddingHorizontal: 24,
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderRadius: 20,
        width: '90%',
    },
    infoText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 0.5,
    },
    closeButton: {
        marginBottom: 10,
    },
    closeButtonBlur: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    }
});
