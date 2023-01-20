import axios from "axios";
import { useState } from "react";

export default function newProjectFormHook(initialProjectValues, validateProject) {

    const [projectInputs, setProjectInputs] = useState(initialProjectValues);
    const [projectErrors, setprojectErrors] = useState({});

    const handleProjectSubmit = () => {
        event.preventDefault()
        const projectValidationErrors = validateProject(projectInputs)
        const noErrors = Object.keys(projectValidationErrors).length === 0
        setprojectErrors(projectValidationErrors)
        if(noErrors) {
            axios.post("http://localhost:9000/client-projects/new-project", projectInputs)
            .then((responseProject) => {
                console.log(responseProject)
                alert("Project Added")
                window.location.reload()
            })
            .catch(error => {
                alert("Error " + error)
                console.log(error)
            })
        } else {
            console.log("Errors, please try again", projectvalidationErrors)
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