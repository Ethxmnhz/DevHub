// RedirectToEditor.js
import React, { useEffect } from 'react';

const RedirectToEditor = () => {
  useEffect(() => {
    // Redirect to the external URL
    window.location.href = 'http://localhost:5000';
  }, []);

  return null; // This component doesn't render anything
};

export default RedirectToEditor;
