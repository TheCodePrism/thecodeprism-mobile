import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, updateDoc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

export const loginAdmin = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const logoutAdmin = async () => {
    return signOut(auth);
};

export const updateAdminPanelStatus = async (isEnabled) => {
    try {
        await updateDoc(doc(db, 'config', 'admin_status'), {
            remoteEnabled: isEnabled,
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        await setDoc(doc(db, 'config', 'admin_status'), {
            remoteEnabled: isEnabled,
            updatedAt: new Date().toISOString()
        }, { merge: true });
    }
};

export const adjustSessionTime = async (sessionId, minutes) => {
    const sessionRef = doc(db, 'sessions', sessionId);
    const sessionSnap = await getDoc(sessionRef);
    if (sessionSnap.exists()) {
        const currentExpiry = new Date(sessionSnap.data().expiresAt);
        const newExpiry = new Date(currentExpiry.getTime() + minutes * 60000);
        await updateDoc(sessionRef, {
            expiresAt: newExpiry.toISOString()
        });
    }
};

export const terminateSession = async (sessionId, isShared = false) => {
    const collectionName = isShared ? 'shared_links' : 'sessions';
    await deleteDoc(doc(db, collectionName, sessionId));
};

export const authenticateAdminSession = async (sessionId, userEmail) => {
    const sessionRef = doc(db, 'sessions', sessionId);
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    await updateDoc(sessionRef, {
        status: 'authenticated',
        authenticatedAt: new Date().toISOString(),
        expiresAt: expiryDate.toISOString(),
        authenticatedBy: userEmail
    });
};
