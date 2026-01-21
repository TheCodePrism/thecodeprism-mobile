import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform, Alert } from 'react-native';
import { doc, setDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase';

export const setupNotificationHandler = () => {
    try {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            }),
        });
    } catch (error) {
        console.log('Notification handler failed:', error);
    }
};

export async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            Alert.alert('Failed to get push token for push notification!');
            return;
        }
        try {
            token = (await Notifications.getExpoPushTokenAsync({
                projectId: 'your-expo-project-id',
            })).data;
        } catch (e) {
            console.log('Push token fetch failed (likely Expo Go limitation):', e);
            return;
        }
    } else {
        console.log('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        try {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        } catch (e) {
            console.log('Channel setup failed:', e);
        }
    }

    return token;
}

export const savePushTokenToFirestore = async (token) => {
    try {
        await setDoc(doc(db, 'config', 'push_tokens'), {
            tokens: arrayUnion(token)
        }, { merge: true });
    } catch (error) {
        console.error('Error saving push token:', error);
    }
};
