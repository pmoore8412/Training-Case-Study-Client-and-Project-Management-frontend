import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Table, Button } from "react-bootstrap";

export default function Root() {

    const [cookies] = useCookies()

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

    let logedIn = (
        <div className="jumbotron">
            <h1 className="display-4"> Welcome to the Client and Project Management System</h1>
            <p className="lead">Here you can manage your clients and client projects.</p>
            <p>Please login or sign up to access the full fetures of this system.</p>
        </div>
    )

    const adminView = () => {
        if(cookies['admin'] && cookies['admin'].admin === true) {
            if(users.length === 0) {
                return <p>No users avalible</p>
            } else {
                return (userTable)
            }
        } else if (cookies['user'] && cookies['user'].admin === false) {
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
                    <td></td>
                    <td><Button variant="danger">Remove User</Button></td>
                </tr>
            )
        })
    }

    let userNormal = (
        <div className="jumbotron">
            <h1 className="display-4">Welcome {cookies['user'].firstName} {cookies['user'].lastName}</h1>
            <p className="lead">As a user you are able to view clients, add clients, and update clients.</p>
            <p className="lead">You are also able to view, update, and add client projects.</p>
        </div>
    )

    let userTable = (<>    
        <div className="jumbotron">
            <h1 className="display-4">Welcome Admin {cookies['admin'].firstName} {cookies['admin'].lastName}</h1>
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
        <>
            {adminView()}
        </>
    );
}