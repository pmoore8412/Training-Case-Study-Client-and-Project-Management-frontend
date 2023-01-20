import { Link, Route, Routes } from "react-router-dom";
import Root from "./routes/root";
import 'bootstrap/dist/css/bootstrap.min.css';
import Client from "./routes/client";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import NewClientForm from "./forms/newClientForms/newClientForm";
import { Outlet } from "react-router-dom";
import ClientList from "./routes/clientList";
import Project from "./routes/project";

export default function App() {

    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    localStorage.clear()

    

    let formDisplayForNewClient = (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header>
                <Modal.Title>Add New Client</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <NewClientForm />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    ) 

    return <>

        <header className="p-3 text-bg-dark header-custom">

            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <h3 className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none extra-spaceing">
                    Case Study: Client and Project Management
                </h3>

                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    {formDisplayForNewClient}
                    <p className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <Link to="/"><button type="button" className="btn btn-light new-button-custom">Home</button></Link>
                        <Link to="/client/list"><button type="button" className="btn btn-light new-button-custom">Client List</button></Link>
                        <button type="button" className="btn btn-light new-button-custom" onClick={handleShow}>New Client</button>
                    </p>
                </ul>

                <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                    <input type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search" />
                </form>

                <div className="text-end">
                    <button type="button" className="btn btn-outline-light me-2">Login</button>
                    <button type="button" className="btn btn-outline-warning">Sign-up</button>
                </div>
            </div>

        </header>
        <div>
            <Outlet />
        </div>

        <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/client/:clientId" element={<Client />} />
            <Route path="/client/list" element={<ClientList />} />
            <Route path="/project/:projectId" element={<Project />} />
        </Routes>
    </>
}