// Firebase Authentication Configuration
// This file is imported by all pages that need authentication

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getDatabase, ref, set, get } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAlrfBLg-yJtUzYYJKGfGICS_PQuGE8caY",
    authDomain: "tcsignlab-admin.firebaseapp.com",
    databaseURL: "https://tcsignlab-admin-default-rtdb.firebaseio.com",
    projectId: "tcsignlab-admin",
    storageBucket: "tcsignlab-admin.firebasestorage.app",
    messagingSenderId: "382892123645",
    appId: "1:382892123645:web:cf45e472749c66165d6594"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Export for use in other files
export { auth, database, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, ref, set, get };

// Check if user is logged in
export function requireAuth() {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user);
            } else {
                window.location.href = '/login.html';
                reject('Not authenticated');
            }
        });
    });
}

// Check if user is guest (not logged in)
export function isGuest() {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            resolve(!user);
        });
    });
}

// Get current user
export function getCurrentUser() {
    return auth.currentUser;
}

// Check if user is admin
export async function isAdmin(userId) {
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);
    const userData = snapshot.val();
    return userData && userData.role === 'admin';
}
