import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

export const useSessions = (user) => {
    const [activeSessions, setActiveSessions] = useState([]);

    useEffect(() => {
        if (user) {
            const unsubscribers = [];

            // Listen to regular sessions
            const regularSessionsQuery = query(
                collection(db, 'sessions'),
                where('status', '==', 'authenticated')
            );

            const regularUnsubscribe = onSnapshot(regularSessionsQuery, (snapshot) => {
                const sessions = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    expiresAtDate: new Date(doc.data().expiresAt),
                    sessionType: 'regular'
                }));

                // Update with regular sessions
                setActiveSessions(prev => {
                    const shared = prev.filter(s => s.sessionType === 'shared');
                    const combined = [...sessions, ...shared];
                    return combined.sort((a, b) => a.expiresAtDate - b.expiresAtDate);
                });
            });
            unsubscribers.push(regularUnsubscribe);

            // Listen to authenticated shared links
            const sharedLinksQuery = query(
                collection(db, 'shared_links'),
                where('status', '==', 'authenticated')
            );

            const sharedUnsubscribe = onSnapshot(sharedLinksQuery, (snapshot) => {
                const sharedSessions = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    expiresAtDate: new Date(doc.data().expiresAt),
                    sessionType: 'shared'
                }));

                // Update with shared sessions
                setActiveSessions(prev => {
                    const regular = prev.filter(s => s.sessionType === 'regular');
                    const combined = [...regular, ...sharedSessions];
                    return combined.sort((a, b) => a.expiresAtDate - b.expiresAtDate);
                });
            });
            unsubscribers.push(sharedUnsubscribe);

            // Cleanup function
            return () => {
                unsubscribers.forEach(unsub => unsub());
            };
        }
    }, [user]);

    return activeSessions;
};
