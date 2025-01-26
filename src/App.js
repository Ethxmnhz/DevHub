import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

import ProjectManagementPage from "./ProjectManagementPage";
import VideoChat from "./VideoChat";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import RedirectToEditor from './RedirectToEditor';

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      {user ? (
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/ProjectManagementPage" element={<ProjectManagementPage />} />
          <Route path="/videochat" element={<VideoChat />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login />} /> 
          <Route path="/editor" element={<RedirectToEditor />} />
          

        </Routes>
      )}
    </Router>
  );
}

export default App;
