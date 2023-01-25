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
import LoginForm from "./forms/loginForms/loginForm";
import NewUserForm from "./forms/signUpForms/newUserSignUpForm";
import ContactUs from "./routes/contactUs";

export default function App() {

    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showLogin, setShowLogin] = useState(false)
    const handleLoginClose = () => setShowLogin(false)
    const handleLoginShow = () => setShowLogin(true)

    const [showSignUp, setShowSignUp] = useState(false)
    const handleSignUpClose = () => setShowSignUp(false)
    const handleSignUpShow = () => setShowSignUp(true)

    const handleUserLogout = () => {
        localStorage.clear()
        window.location.replace("/")
    }

    const handleAdminLogout = () => {
        localStorage.clear()
        window.location.replace("/")
    }
    

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

    let formDisplayForLogin = (
        <Modal show={showLogin} onHide={handleLoginClose} backdrop="static">
            <Modal.Header>
                <Modal.Title>User Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LoginForm />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleLoginClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )

    let formDisplayForSignUp = (
        <Modal show={showSignUp} onHide={handleSignUpClose} backdrop="static">
            <Modal.Header>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <NewUserForm />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleSignUpClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )

    let loginButton = <button type="button" className="btn btn-outline-light me-2" onClick={handleLoginShow}>Login</button>
    let pathToClientList = <button type="button" className="btn btn-light new-button-custom" disabled >Client List</button>
    let pathToNewClientForm = <button type="button" className="btn btn-light new-button-custom" disabled >New Client</button>
    let signUpButton = <button type="button" className="btn btn-outline-warning" onClick={handleSignUpShow}>Sign-up</button>

    if(localStorage.getItem("user")) {
        loginButton = <button type="button" className="btn btn-outline-light me-2" onClick={handleUserLogout}>Logout</button>
        pathToClientList = <Link to="/client/list"><button type="button" className="btn btn-light new-button-custom">Client List</button></Link>
        pathToNewClientForm = <button type="button" className="btn btn-light new-button-custom" onClick={handleShow}>New Client</button>
        signUpButton = <button type="button" className="btn btn-outline-warning">Update Profile</button>
    } else if (localStorage.getItem("admin")) {
        loginButton = <button type="button" className="btn btn-outline-light me-2" onClick={handleAdminLogout}>Logout</button>
        pathToClientList = <Link to="/client/list"><button type="button" className="btn btn-light new-button-custom">Client List</button></Link>
        pathToNewClientForm = <button type="button" className="btn btn-light new-button-custom" onClick={handleShow}>New Client</button>
        signUpButton = <button type="button" className="btn btn-outline-warning">Update Profile</button>
    }

    return <>

        <header className="p-3 text-bg-dark header-custom">

            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <h3 className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none extra-spaceing">
                    Client and Project Management
                </h3>

                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    {formDisplayForNewClient}
                    <p className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <Link to="/"><button type="button" className="btn btn-light new-button-custom">Home</button></Link>
                        {pathToClientList}
                        {pathToNewClientForm}
                        <Link to="/contact-us" ><button type="button" className="btn btn-light new-button-custom">Contact Us</button></Link>
                    </p>
                </ul>

                <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                    <input type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search" />
                </form>

                <div className="text-end">
                    {formDisplayForSignUp}
                    {formDisplayForLogin}
                    {loginButton}
                    {signUpButton}
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
            <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
    </>
}