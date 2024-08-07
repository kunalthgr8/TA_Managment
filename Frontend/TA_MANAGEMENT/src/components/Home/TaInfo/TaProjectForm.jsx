import React, { useState, useEffect, useCallback } from "react";
import { Input, Button } from "../../index";
import { FaLightbulb } from "react-icons/fa6";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { VscGithub } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PROJECT } from "../../../graphql/mutations/project.mutations";
import { GET_PROJECT } from "../../../graphql/queries/project.query";
import { useSelector } from "react-redux";

function TaProjectForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState({
    Title: "",
    Role: "",
    description: "",
    githubLink: "",
    liveLink: "",
    techStack: [],
  });
  const userData = useSelector((state) => state.auth.user);

  const { data: projectData } = useQuery(GET_PROJECT, {
    variables: { idNumber: userData.idNumber },
    skip: !userData.idNumber,
  });

  const [createProject, { data, loading }] = useMutation(CREATE_PROJECT);

  useEffect(() => {
    if (projectData?.getProjects?.data?.projects) {
      const fetchedProjects = projectData.getProjects.data.projects.map((project) => ({
        Title: project.title,
        Role: project.role,
        description: project.description,
        githubLink: project.githubLink,
        liveLink: project.liveLink,
        techStack: project.techstack,
      }));
      setProjects(fetchedProjects);
    }
  }, [projectData]);

  const resetForm = () => {
    setIsFormVisible(false);
    setCurrentProject({
      Title: "",
      Role: "",
      description: "",
      githubLink: "",
      liveLink: "",
      techStack: [],
    });
    setEditIndex(null);
  };

  const handleSave = useCallback(() => {
    const updatedProjects = [...projects];
    if (editIndex !== null) {
      updatedProjects[editIndex] = currentProject;
    } else {
      updatedProjects.push(currentProject);
    }
    setProjects(updatedProjects);
  }, [currentProject, editIndex, projects]);

  useEffect(() => {
      const updateProjectInBackend = async () => {
        try {
          const response = await createProject({
            variables: {
              input: {
                idNumber: userData.idNumber,
                projects: projects.map((project) => ({
                  title: project.Title,
                  role: project.Role,
                  description: project.description,
                  githubLink: project.githubLink,
                  liveLink: project.liveLink,
                  techstack: project.techStack,
                })),
              },
            },
          });
          if (response.data.createProject.status === 201) {
            setError('Project added successfully');
            resetForm();
          }
        } catch (error) {
          setError(error.message);
        }
      };
      updateProjectInBackend();
    
  }, [projects, userData.idNumber, createProject]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCurrentProject((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleTechStackChange = useCallback((e, index) => {
    const newTechStack = [...currentProject.techStack];
    newTechStack[index] = e.target.value;
    setCurrentProject((prev) => ({ ...prev, techStack: newTechStack }));
  }, [currentProject.techStack]);

  const addTechStackField = useCallback(() => {
    setCurrentProject((prev) => ({ ...prev, techStack: [...prev.techStack, ""] }));
  }, []);

  const removeTechStackField = useCallback((index) => {
    setCurrentProject((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((_, i) => i !== index),
    }));
  }, []);

  const deleteProject = useCallback((index) => {
    setProjects((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleEdit = useCallback((index) => {
    setIsFormVisible(true);
    setCurrentProject(projects[index]);
    setEditIndex(index);
  }, [projects]);

  const handleAddAnother = () => {
    setIsFormVisible(true);
    setCurrentProject({
      Title: "",
      Role: "",
      description: "",
      githubLink: "",
      liveLink: "",
      techStack: [],
    });
  };

  return (
    <div className="flex flex-col gap-5 m-2 lg:m-5 mt-4">
      <h1 className="text-lg font-bold text-gray-800 pl-4">Projects</h1>
      {projects.map((project, index) => (
        <div key={index} className="flex flex-row justify-center self-center gap-4 w-4/5 lg:w-3/4 bg-custom-gray rounded-xl p-4">
          <div className="flex justify-center self-center m-4">
            <FaLightbulb className="text-7xl text-custom-purple" />
          </div>
          <div className="w-full mt-2 mb-3 bg-custom-gray py-3 px-3 rounded-xl">
            <div className="flex justify-between mr-4">
              <div>
                <h1 className="text-gray-500 text-lg font-semibold tracking-wide">{project.Title}</h1>
                <div className="flex flex-row justify-start self-center gap-3 text-lg">
                  <Link to={project.githubLink} className="text-lg flex justify-center self-center cursor-pointer text-gray-500" title="Github">
                    <VscGithub />
                  </Link>
                  <Link to={project.liveLink} className="text-sm flex justify-center self-center cursor-pointer text-gray-500" title="Live Link">
                    Website
                  </Link>
                </div>
              </div>
              <div className="flex justify-center self-center">
                <MdDelete className="text-gray-500 text-lg font-semibold cursor-pointer tracking-wide" onClick={() => deleteProject(index)} />
              </div>
            </div>
            <h2 className="text-custom-black font-medium text-base">{project.Role}</h2>
            <p className="text-gray-500 text-xs"><strong>Tech Stack:</strong> {project.techStack.join(", ")}</p>
            <p className="text-gray-500 text-xs">{project.description.substring(0, 40) + "......"}</p>
            <p className="text-right text-custom-purple flex justify-end self-center gap-2 cursor-pointer" onClick={() => handleEdit(index)}>
              <MdOutlineEdit /> Edit
            </p>
          </div>
        </div>
      ))}

      {isFormVisible && (
        <div className="flex flex-col justify-center self-center gap-4 w-3/4 bg-custom-gray rounded-xl p-4">
          {["Title", "Role", "description", "githubLink", "liveLink"].map((field) => (
            <Input
              key={field}
              type="text"
              name={field}
              value={currentProject[field]}
              placeholder={field}
              className="rounded-md bg-white"
              label={field}
              onChange={handleChange}
            />
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tech Stack</label>
            {currentProject.techStack.map((tech, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <Input
                  type="text"
                  name={`techStack-${index}`}
                  value={tech}
                  placeholder="Tech Stack"
                  className="rounded-md bg-white flex-grow"
                  onChange={(e) => handleTechStackChange(e, index)}
                />
                <Button className="bg-red-500 text-sm px-2 py-1 rounded-lg text-white" onClick={() => removeTechStackField(index)}>Remove</Button>
              </div>
            ))}
            <Button className="bg-custom-black text-sm px-4 py-2 rounded-lg text-white mt-2" onClick={addTechStackField}>Add Tech Stack</Button>
          </div>
          <div className="flex gap-5 m-5 w-1/2">
            <Button className="bg-custom-black text-sm px-4 py-2 rounded-lg text-white" width="w-1/4" onClick={handleSave}>Save</Button>
            <Button className="bg-custom-black text-sm px-4 py-2 rounded-lg text-white" onClick={resetForm}>Cancel</Button>
          </div>
        </div>
      )}

      {!isFormVisible && (
        <p className="text-sm font-medium tracking-wide text-custom-purple pl-4 cursor-pointer w-1/3" onClick={handleAddAnother}>+ Add Another Project</p>
      )}
    </div>
  );
}

export default TaProjectForm;
