import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from './firebase';
import * as LocalAuthentication from 'expo-local-authentication';

// Services
import { setupNotificationHandler, registerForPushNotificationsAsync, savePushTokenToFirestore } from './src/services/notificationService';
import { loginAdmin, logoutAdmin, updateAdminPanelStatus, adjustSessionTime, terminateSession, authenticateAdminSession } from './src/services/authService';

// Hooks
import { useAuth } from './src/hooks/useAuth';
import { useSessions } from './src/hooks/useSessions';
import { useSharedLinks } from './src/hooks/useSharedLinks';

// Components
import { LoginView } from './src/components/LoginView';
import { ScannerView } from './src/components/ScannerView';
import { AdminDashboard } from './src/components/AdminDashboard';

setupNotificationHandler();

export default function App() {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [isAdminEnabled, setIsAdminEnabled] = useState(false);
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const activeSessions = useSessions(user);
  const sharedLinksProps = useSharedLinks(user);

  useEffect(() => {
    // Listen for remote toggle changes (e.g. from web logout)
    const unsub = onSnapshot(doc(db, 'config', 'admin_status'), (doc) => {
      if (doc.exists()) {
        setIsAdminEnabled(doc.data().remoteEnabled);
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (user) {
      registerForPushNotificationsAsync().then(token => {
        if (token) savePushTokenToFirestore(token);
      });
    }
  }, [user]);

  const handleLogin = async () => {
    if (!email || !password) return;
    setIsLoggingIn(true);
    try {
      await loginAdmin(email, password);
    } catch (error) {
      Alert.alert('Login Error', error.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setIsAdminEnabled(false);
  };

  const handleBarCodeScanned = async ({ data }) => {
    if (scanned) return;
    setScanned(true);
    try {
      const { qrId, action } = JSON.parse(data);
      if (action === 'authenticate_admin') {
        // Biometric Check
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (hasHardware && isEnrolled) {
          const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate to access Admin Panel',
            fallbackLabel: 'Enter Passcode',
          });

          if (!result.success) {
            Alert.alert('Authentication Failed', 'Biometric verification required.');
            return;
          }
        }

        await authenticateAdminSession(qrId, user.email);
        Alert.alert('Success', 'Admin panel authenticated for 1 hour!');
        setIsScannerActive(false);
      }
    } catch (error) {
      console.log('Scanned data:', data);
    } finally {
      setTimeout(() => setScanned(false), 3000);
    }
  };

  const handleOpenScanner = async () => {
    if (!permission || !permission.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert('Permission Required', 'Camera access is needed to scan QR codes.');
        return;
      }
    }
    setIsScannerActive(true);
  };

  if (loading || isLoggingIn) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4facfe" />
      </View>
    );
  }

  if (!user) {
    return (
      <LoginView
        email={email} setEmail={setEmail}
        password={password} setPassword={setPassword}
        handleLogin={handleLogin}
      />
    );
  }

  if (isScannerActive) {
    return (
      <ScannerView
        scanned={scanned}
        handleBarCodeScanned={handleBarCodeScanned}
        setIsScannerActive={setIsScannerActive}
      />
    );
  }

  return (
    <AdminDashboard
      user={user}
      isAdminEnabled={isAdminEnabled}
      handleToggleAdmin={updateAdminPanelStatus}
      handleOpenScanner={handleOpenScanner}
      activeSessions={activeSessions}
      handleTerminateSession={terminateSession}
      handleAdjustTime={adjustSessionTime}
      sharedLinksProps={sharedLinksProps}
      handleLogout={handleLogout}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
