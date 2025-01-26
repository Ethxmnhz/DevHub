import React, { useState } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { loginWithEmailAndPassword } from './firebase'; // Import the correct login function
import './styles.css';

function VideoChat() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [meetingStarted, setMeetingStarted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Function to handle login
    const handleLogin = async () => {
        setLoading(true);
        setErrorMessage("");  // Reset error message on every login attempt

        try {
            await loginWithEmailAndPassword(email, password);
            setAuthenticated(true);
            setErrorMessage("");  // Clear error if successful
        } catch (error) {
            setAuthenticated(false);
            setErrorMessage(error.message); // Display error message if authentication fails
        } finally {
            setLoading(false);
        }
    };

    // Function to start the meeting
    const startMeeting = () => {
        if (!authenticated) {
            setErrorMessage('Please log in to start a meeting.');
            return;
        }
        setMeetingStarted(true);
    };

    return (
        <div style={{ height: '100vh', width: '100vw', margin: 0, padding: 0, overflow: 'hidden' }}>
            {!meetingStarted ? (
                <div className="meeting-options">
                    <h2>Video Chat Options</h2>
                    <button onClick={startMeeting}>Start a Meeting</button>
                    <button onClick={() => alert('Scheduling feature not implemented yet')}>
                        Schedule a Meeting
                    </button>

                    {!authenticated && (
                        <div className="auth-popup">
                            <h3>Log In</h3>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button onClick={handleLogin} disabled={loading}>
                                {loading ? 'Authenticating...' : 'Log In'}
                            </button>
                            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error if any */}
                        </div>
                    )}
                </div>
            ) : (
                <JitsiMeeting
                    roomName="MyProjectRoom"
                    configOverwrite={{
                        startWithAudioMuted: true,
                        startWithVideoMuted: false,
                    }}
                    userInfo={{
                        displayName: 'Your Name',
                    }}
                    getIFrameRef={(iframe) => {
                        iframe.style.height = '100%';
                        iframe.style.width = '100%';
                    }}
                />
            )}
        </div>
    );
}

export default VideoChat;
