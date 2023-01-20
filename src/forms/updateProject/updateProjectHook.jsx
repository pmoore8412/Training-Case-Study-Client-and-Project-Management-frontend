import axios from "axios";
import { useState } from "react";

export default function updateProjectHook(initialProjectValues, validateProject) {

    const [projectInputs, setProjectInputs] = useState(initialProjectValues);
    const [projectErrors, setprojectErrors] = useState({});

    const handleProjectSubmit = () => {
        event.preventDefault()
        const projectValidationErrors = validateProject(projectInputs)
        const noErrors = Object.keys(projectValidationErrors).length === 0
        setprojectErrors(projectValidationErrors)
        if(noErrors) {
            axios.put("http://localhost:9000/client-projects/update-project/" + localStorage.getItem("projectID"), projectInputs)
            .then((responseProject) => {
                console.log(responseProject)
                alert("Project Updated")
                window.location.reload()
            })
            .catch(error => {
                alert("Error " + error)
                console.log(error)
            })
        } else {
            console.log("Errors, please try again", projectValidationErrors)
        }
    }

    const handleProjectInputChange = (event) => {
        event.persist()
        setProjectInputs((projectInputs) => ({...projectInputs, [event.target.name]: event.target.value}))
    }

    return {
        handleProjectSubmit,
        handleProjectInputChange,
        projectInputs,
        projectErrors
    }

}