import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";

export default function Root() {

    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        return axios.get("http://localhost:9000/users/all-users")
            .then((response) => setUsers(response.data))
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        fetchUsers();        
    }, [])

    const removeUser = (userId, isAdmin) => {
        if(isAdmin === false) {
            return axios.delete("http://localhost:9000/users/user/remove/" + userId)
                .then(alert("User Removed"))
                .then(window.location.reload())
                .catch(error => {console.log(error)})
        } else if(isAdmin === true) {
            return alert("Cannot remove a system admin!!! If you need an admin removed; please email a database admin to remove the system admin")
        }
    }

    const promoteUser = (userId, isAdmin) => {
        if(isAdmin === false) {
            return axios.put("http://localhost:9000/users/user/admin/update/" + userId)
                .then(alert("User has been promoted to System Admin"))
                .then(window.location.reload())
                .catch(error => {console.log(error)})
        } else if(isAdmin === true) {
            return alert("Cannot promote to System Admin. User is already a System Admin")
        }
    }

    let logedIn = (
        <div className="h-100 p-5 text-bg-dark rounded-3">
            <h1 className="display-4"> Welcome to the Client and Project Management System</h1>
            <p className="lead">Here you can manage your clients and client projects.</p>
            <p>Please login or sign up to access the full fetures of this system.</p>
        </div>
    )

    const adminView = () => {
        if(localStorage.getItem("admin")) {
            if(users.length === 0) {
                return <p>No users avalible</p>
            } else {
                return (userTable)
            }
        } else if (localStorage.getItem("user")) {
            return (userNormal)
        } else {
            return (logedIn)
        }
    }

    const tableBody = () => {
        return users.map((userObj) => {
            return (
                <tr key={userObj.id}>
                    <th scope="row">{userObj.id}</th>
                    <td>{userObj.firstName}</td>
                    <td>{userObj.lastName}</td>
                    <td>{userObj.email}</td>
                    <td><Button variant="warning" onClick={() => promoteUser(userObj.id, userObj.admin)}>Promote</Button></td>
                    <td><Button variant="danger" onClick={() => removeUser(userObj.id, userObj.admin)}>Remove User</Button></td>
                </tr>
            )
        })
    }

    let userNormal = (
        <div className="h-100 p-5 text-bg-dark rounded-3">
            <h1 className="display-4">Welcome {localStorage.getItem("userFirstName")} {localStorage.getItem("userLastName")}</h1>
            <p className="lead">As a user you are able to view clients, add clients, and update clients.</p>
            <p className="lead">You are also able to view, update, and add client projects.</p>
        </div>
    )

    let userTable = (<>    
        <div className="h-100 p-5 text-bg-dark rounded-3">
            <h1 className="display-4">Welcome System Admin {localStorage.getItem("adminFirstName")} {localStorage.getItem("adminLastName")}</h1>
            <p className="lead">Admins have the power to remove any user and promote users to admin.</p>
            <p className="lead">Along with being able to create, remove, and update clients and client projects; Admins also have the sole athority to remove clients.</p>
            <p><i>Use this power wisely</i></p>
        </div>
        <hr />
        <h3>User List:</h3>
        <br />
        <Table className="table table-dark">
            <thead>
                <tr>
                    <th scope="col">User's ID</th>
                    <th scope="col">User's First Name</th>
                    <th scope="col">User's Last Name</th>
                    <th scope="col">User's Email</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {tableBody()}
            </tbody>
        </Table>
    </>)

    return (
        <div className="container py-4">
            {adminView()}
        </div>
    );
}