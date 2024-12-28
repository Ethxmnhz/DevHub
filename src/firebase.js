import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, push, get, child } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDX25nwzQc-STovWztgtw2aCycvWXJxA3Y",
    authDomain: "dash-13064.firebaseapp.com",
    databaseURL: "https://dash-13064-default-rtdb.firebaseio.com",
    projectId: "dash-13064",
    storageBucket: "dash-13064.appspot.com",
    messagingSenderId: "409540597555",
    appId: "1:409540597555:web:5cc48d3ab4046fbd309046",
    measurementId: "G-78JL7PXFPJ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);

// Function to send a new message to Firebase
const sendMessage = (projectId, userEmail, message) => {
    const messagesRef = ref(database, `projects/${projectId}/messages`);
    const newMessageRef = push(messagesRef);

    set(newMessageRef, {
        sender: userEmail,
        message: message,
        timestamp: Date.now(),
    });
};

// Function to fetch messages for a specific project
const fetchMessages = (projectId, callback) => {
    const messagesRef = ref(database, `projects/${projectId}/messages`);

    get(messagesRef).then((snapshot) => {
        const messages = snapshot.val();
        callback(messages ? Object.values(messages) : []);
    });
};

export { auth, database, sendMessage, fetchMessages };
