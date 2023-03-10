import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function ClientList() {

    const [clients, setClients] = useState([]);

    const fetchClients = async () => {
        const response = await axios.get("http://localhost:9000/client/list-all-clients");
        return setClients(response.data);
    }

    useEffect(() => {
        fetchClients();
    }, [])

    const showClientList = () => {
        if (clients.length === 0) {
            return (<li className="nav-item root-li-spacing">No Clients Availible</li>)
        }
        return clients.map((clientObj) => {
            return (<li className="nav-item root-li-spacing" key={clientObj.id}><Link to={`/client/${clientObj.id}`}><h4>{clientObj.clientName}</h4></Link></li>)
        })
    }

    let loginCheck = null

    if(localStorage.getItem("admin") || localStorage.getItem("user")) {
        loginCheck = <>
            <h1>Client List</h1>
            <ul className="nav nav-pills flex-column mb-auto">
                {showClientList()}
            </ul>
        </>
    } else {
        loginCheck = (
        <div className="h-100 p-5 text-bg-dark rounded-3">
            <h1 className="display-4">Unauthorized Access</h1>
            <p className="lead">You do not have the permissions to access this page</p>
            <p>Please create an account or login to access this page</p>
        </div>)
    }

    return <div className="container py-4">
        {loginCheck}
    </div>

}