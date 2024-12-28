import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import { auth } from "./firebase";
import "./styles.css";

const ProjectManagementPage = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  const user = auth.currentUser;
  const database = getDatabase();

  // Fetch projects from Firebase
  useEffect(() => {
    if (user) {
      const userProjectsRef = ref(database, `users/${user.uid}/projects`);
      onValue(userProjectsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setProjects(Object.keys(data).map((key) => ({ id: key, ...data[key] })));
        }
      });
    }
  }, [user, database]);

  // Handle creating a new project
  const createProject = () => {
    if (projectName) {
      const newProjectRef = ref(database, `users/${user.uid}/projects/${projectName}`);
      set(newProjectRef, {
        projectName: projectName,
        members: [user.email], // Initial member is the logged-in user
      }).then(() => {
        setProjectName(""); // Clear project name input after creation
      });
    }
  };

  // Add member to the project
  const addMember = () => {
    if (newMemberEmail && selectedProject) {
      const updatedMembers = [...selectedProject.members, newMemberEmail];
      const projectRef = ref(database, `users/${user.uid}/projects/${selectedProject.id}`);
      update(projectRef, { members: updatedMembers });

      setNewMemberEmail(""); // Clear the input after adding member
    }
  };

  // Remove member from the project
  const removeMember = (memberEmail) => {
    const updatedMembers = selectedProject.members.filter(
      (email) => email !== memberEmail
    );
    const projectRef = ref(database, `users/${user.uid}/projects/${selectedProject.id}`);
    update(projectRef, { members: updatedMembers });
  };

  return (
    <div className="project-management-page">
      <h1>Project Management</h1>

      {/* Create Project Section */}
      <div className="create-project">
        <input
          type="text"
          placeholder="Enter project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <button onClick={createProject}>Create Project</button>
      </div>

      {/* List of Projects */}
      <div className="project-list">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-card"
            onClick={() => setSelectedProject(project)}
          >
            <h3>{project.projectName}</h3>
            <p>{project.members.length} members</p>
          </div>
        ))}
      </div>

      {/* Manage Members Section */}
      {selectedProject && (
        <div className="project-details">
          <h2>{selectedProject.projectName}</h2>
          <h3>Members</h3>
          <ul>
            {selectedProject.members.map((member, index) => (
              <li key={index}>
                {member}
                <button onClick={() => removeMember(member)} className="remove-button">
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="add-member-form">
            <input
              type="email"
              placeholder="Enter member email"
              value={newMemberEmail}
              onChange={(e) => setNewMemberEmail(e.target.value)}
            />
            <button onClick={addMember} className="add-button">
              Add Member
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagementPage;
