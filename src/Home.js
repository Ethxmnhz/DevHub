import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { sendMessage, fetchMessages } from "./firebase";
import "./styles.css";

const Home = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [projectId, setProjectId] = useState("your_project_id"); // Replace with actual project ID

    // Fetch messages when chat is open
    useEffect(() => {
        if (isChatOpen) {
            fetchMessages(projectId, (fetchedMessages) => {
                setMessages(fetchedMessages);
            });
        }
    }, [isChatOpen, projectId]);

    // Toggle chat window
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    // Logout function
    const handleLogout = () => {
        auth.signOut();
        navigate("/login");
    };

    // Handle sending a message
    const handleSendMessage = () => {
        if (newMessage.trim() === "") return;

        sendMessage(projectId, user.email, newMessage);
        setMessages([
            ...messages,
            { sender: user.email, message: newMessage, timestamp: Date.now() }
        ]);
        setNewMessage(""); // Clear input
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-left">
                    <h1 className="logo">DevHub</h1>
                    <p className="slogan">A Product by Minhaz</p>
                </div>
                <div className="navbar-right">
                    {user && <p className="user-email">{user.email}</p>}
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </nav>

            {/* Features Section */}
            <div className="features-container">
                <div
                    className="feature-card"
                    onClick={() => navigate("/editor")}
                    style={{ cursor: "pointer" }}
                >
                    <i className="icon editor-icon"></i>
                    <h3>Editor</h3>
                    <p>Collaborate on documents and code in real-time.</p>
                </div>
                <div className="feature-card">
                    <i className="icon video-icon"></i>
                    <h3>Video Meet</h3>
                    <p>Connect with your team via high-quality video meetings.</p>
                </div>
                <div
                    className="feature-card"
                    onClick={() => navigate("/ProjectManagementPage")}
                    style={{ cursor: "pointer" }}
                >
                    <i className="icon project-icon"></i>
                    <h3>Project Management</h3>
                    <p>Organize and track your projects effortlessly.</p>
                </div>
                <div className="feature-card">
                    <i className="icon mail-icon"></i>
                    <h3>Mails</h3>
                    <p>Manage your emails with our integrated tools.</p>
                </div>
            </div>

            {/* Floating Chat Icon */}
            <div className="chat-icon" onClick={toggleChat}>
                <i className="icon chat-icon"></i>
            </div>

            {/* Chat Window */}
            {isChatOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <h4>Team Chat</h4>
                        <button className="close-chat" onClick={toggleChat}>X</button>
                    </div>
                    <div className="chat-messages">
                        {messages.length > 0 ? (
                            messages.map((msg, index) => (
                                <div key={index} className="message">
                                    <strong>{msg.sender}</strong>: {msg.message}
                                </div>
                            ))
                        ) : (
                            <p>No messages yet...</p>
                        )}
                    </div>
                    <div className="chat-input">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
