import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css"
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import newProjectFormHook from '../forms/newProjectForms/newProjectFormHook';
import newProjectFormValidation from "../forms/newProjectForms/newProjectFormValidation"
import updateClientHook from '../forms/updateClient/updateClientHook';
import updateClientFormValidation from '../forms/updateClient/updateClientFormValidation';
import { useCookies } from "react-cookie";

export default function Client() {

    const { clientId } = useParams()

    const [client, setClient] = useState([])
    const [projects, setProjects] = useState([])

    const { projectInputs, handleProjectInputChange, handleProjectSubmit, projectErrors } = newProjectFormHook({id:"", projectName: "", projectLead: "",
     projectLeadEmail: "", projectDescription: "", clientId: clientId}, newProjectFormValidation)

    const {inputs, handleInputChange, handleSubmit, errors} = updateClientHook({clientPOC: "", clientPOCEmail: ""}, updateClientFormValidation)

    const error = projectErrors
    const clientError = errors

    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseUpdate = () => setShowUpdate(false)
    const handleShowUpdate = () => setShowUpdate(true)

    const [cookies] = useCookies()
    

    const fetchClient = async () => {
        return axios.get("http://localhost:9000/client/" + clientId)
            .then((response) => setClient(response.data))
            .catch(error => {
                console.log(error)
            })
    }

    const fetchProjects = async () => {
        return axios.get("http://localhost:9000/client-projects/project/get-all-by-client-id/" + clientId)
            .then((response) => setProjects(response.data))
            .catch(error => {
                console.log(error)
            })
    }

    const removeProject = (projectId) => {
        return axios.delete("http://localhost:9000/client-projects/remove-project/" + projectId)
        .then(alert("Project removed"),
        window.location.reload())
        .catch(error => {
            console.log(error)
        })
    }

    const removeClient = () => {

        return axios.delete("http://localhost:9000/client/remove-client/" + clientId)
        .then(alert("Client removed"))
        .then(window.location.replace("/client/list"))
        .catch(error => {console.log(error)})

    }

    useEffect(() => {
        fetchClient();
        fetchProjects();
    }, [], [])

    let formDisplayForUpdateClient = (
        <Modal show={showUpdate} onHide={handleCloseUpdate} backdrop="static">
            <Modal.Header>
                <Modal.Title>Update CLient</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} >
                    <h6>Point of Contact</h6>
                    <input type="text" name="clientPOC" id="clientPOC" className="form-input" onChange={handleInputChange} value={inputs.clientPOC} />
                    {clientError.clientPOC && <p>{clientError.clientPOC}</p>}
                    <h6>Point of Contact Email</h6>
                    <input type="email" name="clientPOCEmail" id="clientPOCEmail" className="form-input" onChange={handleInputChange} value={inputs.clientPOCEmail} />
                    {clientError.clientPOCEmail && <p>{clientError.clientPOCEmail}</p>}
                    <hr />
                    <button type="submit" className="btn btn-primary">Update Client</button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseUpdate}>Close</Button>
            </Modal.Footer>
        </Modal>
    )

    let formDisplayForNewProject = (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header>
                <Modal.Title>Add New Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleProjectSubmit}>
                    <h6>Project ID</h6>
                    <input type="text" name="id" id="id" className="form-input" onChange={handleProjectInputChange} value={projectInputs.id}/>
                    {error.id && <p>{error.id}</p>}
                    <h6>Projecct Name:</h6>
                    <input type="text" name="projectName" id="projectName" className="form-input" onChange={handleProjectInputChange} value={projectInputs.projectName} />
                    {error.projectName && <p>{error.projectName}</p>}
                    <h6>Project Lead:</h6>
                    <input type="text" name="projectLead" id="projectLead" className="form-input" onChange={handleProjectInputChange} value={projectInputs.projectLead} />
                    {error.projectLead && <p>{error.projectLead}</p>}
                    <h6>Project Lead Email:</h6>
                    <input type="email" name="projectLeadEmail" id="projectLeadEmail" className="form-input" onChange={handleProjectInputChange} value={projectInputs.projectLeadEmail} />
                    {error.projectLeadEmail && <p>{error.projectLeadEmail}</p>}
                    <h6>Project Description:</h6>
                    <textarea name="projectDescription" id="projectDescription" className="form-input" onChange={handleProjectInputChange} value={projectInputs.projectDescription} />
                    {error.projectDescription && <p>{error.projectDescription}</p>}
                    <input type="hidden" name="clientId" id="clientId" value={clientId} />
                    <hr />
                    <button type="submit" className="btn btn-primary">Add Project</button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )

    const tableBody = () => {
        return projects.map((projectObj) => {
            return (
                <tr key={projectObj.id}>
                    <th scope="row">{projectObj.id}</th>
                    <td>{projectObj.projectName}</td>
                    <td>{projectObj.projectLead}</td>
                    <td>{projectObj.projectLeadEmail}</td>
                    <td><Link to={`/project/${projectObj.id}`}><Button variant="primary">Project Page</Button></Link></td>
                    <td><Button variant="danger" onClick={() => {removeProject(projectObj.id)}}>Delete Project</Button></td>
                </tr>
            )
        })
    }

    let showProjectList = (
        <Table className="table table-dark">
            <thead>
                <tr>
                    <th scope="col">Project ID</th>
                    <th scope="col">Project Name</th>
                    <th scope="col">Project Lead</th>
                    <th scope="col">Project Lead Email</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {tableBody()}
            </tbody>
        </Table>
    )

    const showTable = () => {
        if (projects.length === 0) {
            return (<p><i>No Projects avalible for {client.clientName}</i></p>)
        }
        return (showProjectList)
    }

    let adminDelete = null

    if(cookies['admin'] && cookies['admin'].admin === true) {
        adminDelete = <Button variant="danger" onClick={() => removeClient()}>Delete</Button>
    }

    localStorage.setItem("clientID", client.id)

    return <div>
        <h1>{client.clientName}</h1>
        <p><Button variant="warning" onClick={handleShowUpdate} >Edit</Button>  {adminDelete}</p>
        {formDisplayForUpdateClient}
        <h4>Point of contact: {client.clientPOC}</h4>
        <h6>Point of contact email: {client.clientPOCEmail}</h6>
        <p>Client Details: {client.clientDescription}</p>
        {formDisplayForNewProject}
        <Button variant="primary" onClick={handleShow}>New Project</Button>
        <br />
        <h3>Projects:</h3>
        <br />
        {showTable()}
    </div>


}