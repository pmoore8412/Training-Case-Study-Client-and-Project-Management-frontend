import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import updateProjectFormValidatoin from "../forms/updateProject/updateProjectFormValidation";
import updateProjectHook from "../forms/updateProject/updateProjectHook";

export default function Project() {

    const {projectId} = useParams();

    const [project, setProject] = useState([])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { projectInputs, handleProjectInputChange, handleProjectSubmit, projectErrors } = updateProjectHook({id: project.id, projectName: project.projectName,
        projectLead: "", projectLeadEmail: "", projectDescription: "", clientId: project.clientId}, updateProjectFormValidatoin)

    const error = projectErrors

    const fetchProject = async () => {
        return axios.get("http://localhost:9000/client-projects/project/" + projectId)
        .then((responce) => setProject(responce.data))
    }

    const deleteProject = () => {
        return axios.delete("http://localhost:9000/client-projects/remove-project/" + projectId)
        .then(alert("Project removed"))
        .then(window.location.replace(`/client/${localStorage.getItem("clientID")}`))
        .catch(error => {
            console.log(error)
        })
    }

    const updateProjectForm = () => {
        return(
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header>
                <Modal.Title>Update Project: {project.projectName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleProjectSubmit}>
                    <h6>Project Lead:</h6>
                    <input type="text" name="projectLead" id="projectLead" className="form-control" style={{width: "300px"}} onChange={handleProjectInputChange} value={projectInputs.projectLead} />
                    {error.projectLead && <p>{error.projectLead}</p>}
                    <h6>Project Lead Email:</h6>
                    <input type="email" name="projectLeadEmail" id="projectLeadEmail" className="form-control" style={{width: "300px"}}
                        onChange={handleProjectInputChange} value={projectInputs.projectLeadEmail} />
                    {error.projectLeadEmail && <p>{error.projectLeadEmail}</p>}
                    <h6>Project Description:</h6>
                    <textarea name="projectDescription" id="projectDescription" className="form-control" rows="4" cols="50"
                        onChange={handleProjectInputChange} value={projectInputs.projectDescription} />
                    {error.projectDescription && <p>{error.projectDescription}</p>}
                    <hr />
                    <button type="submit" className="btn btn-primary">Update Project</button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>)
    }

    useEffect(() => {
        fetchProject();
    }, [])

    let loginCheck = null

    if(localStorage.getItem("admin") || localStorage.getItem("user")) {
        loginCheck = <>
            <h1>Project: {project.projectName}</h1>
            <p><Button variant="warning" onClick={handleShow}>Edit</Button>  <Button variant="danger" onClick={() => {deleteProject()}}>Delete</Button></p>
            <h4>Project Lead: {project.projectLead}</h4>
            <h6>Lead's Email: {project.projectLeadEmail}</h6>
            <p>Project Details: {project.projectDescription}</p>
            {updateProjectForm()}
        </>
    } else {
        loginCheck = (
        <div className="h-100 p-5 text-bg-dark rounded-3">
            <h1 className="display-4">Unauthorized Access</h1>
            <p className="lead">You do not have the permissions to access this page</p>
            <p>Please create an account or login to access this page</p>
        </div>)
    }

    localStorage.setItem("clientID", project.clientId)
    localStorage.setItem("projectID", project.id)

    return <div className="container py-4">
        {loginCheck}
    </div>

}