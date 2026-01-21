import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, setDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

export const useSharedLinks = (user) => {
    const [showLinkGen, setShowLinkGen] = useState(false);
    const [userType, setUserType] = useState('Guest');
    const [accessType, setAccessType] = useState('View-only');
    const [duration, setDuration] = useState('15m');
    const [generatedLink, setGeneratedLink] = useState('');

    useEffect(() => {
        if (user) {
            const q = query(collection(db, 'shared_links'), where('status', '==', 'awaiting_auth'));
            const unsub = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach(async (change) => {
                    if (change.type === 'added' || change.type === 'modified') {
                        const linkData = change.doc.data();
                        if (linkData.status === 'awaiting_auth') {
                            handleRemoteAuthRequest(change.doc.id, linkData);
                        }
                    }
                });
            });
            return unsub;
        }
    }, [user]);

    const handleRemoteAuthRequest = async (linkId, data) => {
        Alert.alert(
            'Access Request',
            `Remote access request for ${data.userType} (${data.accessType})`,
            [
                {
                    text: 'Deny',
                    onPress: () => updateDoc(doc(db, 'shared_links', linkId), { status: 'active', visitorId: null }),
                    style: 'cancel'
                },
                {
                    text: 'Approve',
                    onPress: () => authenticateRemoteLink(linkId, data)
                }
            ]
        );
    };

    const authenticateRemoteLink = async (linkId, data) => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (hasHardware && isEnrolled) {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: `Authorize ${data.userType} Access`,
                fallbackLabel: 'Enter Passcode',
            });

            if (!result.success) return;
        }

        const expiryDate = new Date();
        const mins = parseInt(data.duration) || 15;
        expiryDate.setMinutes(expiryDate.getMinutes() + mins);

        await updateDoc(doc(db, 'shared_links', linkId), {
            status: 'authenticated',
            authenticatedAt: new Date().toISOString(),
            expiresAt: expiryDate.toISOString(),
            authenticatedBy: user.email
        });

        Alert.alert('Success', 'Remote link authorized!');
    };

    const handleGenerateLink = async () => {
        const linkId = Math.random().toString(36).substring(2, 11);
        const newLink = {
            id: linkId,
            userType,
            accessType,
            duration,
            status: 'active',
            createdAt: new Date().toISOString(),
            createdBy: user.email
        };

        try {
            await setDoc(doc(db, 'shared_links', linkId), newLink);
            const baseUrl = process.env.EXPO_PUBLIC_WEB_URL || 'https://933dd900144b.ngrok-free.app';
            const webUrl = `${baseUrl}/thecodeprism-admin/shared/${linkId}`;
            setGeneratedLink(webUrl);
            Alert.alert('Link Generated', 'Share this link with the user.');
        } catch (error) {
            Alert.alert('Error', 'Failed to generate link.');
        }
    };

    return {
        showLinkGen, setShowLinkGen,
        userType, setUserType,
        accessType, setAccessType,
        duration, setDuration,
        generatedLink, setGeneratedLink,
        handleGenerateLink
    };
};
