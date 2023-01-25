import { useState } from "react";
import axios from "axios";

export default function loginFormHook(initialValues, loginValidation) {

    const [inputs, setInputs] = useState(initialValues)
    const [errors, setErrors] = useState({})

    const handleSubmit = (event) => {
        event.preventDefault()
        const validationErrors = loginValidation(inputs)
        const noErrors = Object.keys(validationErrors).length === 0
        setErrors(validationErrors)
        console.log(inputs)
        if (noErrors) {
            let email = inputs.email
            let password = inputs.password
            axios.post("http://localhost:9000/users/user/login", null, { headers: { email, password} })
                .then(response => {
                    if (response.data.admin !== true) {
                        localStorage.setItem("user", response.data.admin)
                        localStorage.setItem("userFirstName", response.data.firstName)
                        localStorage.setItem("userLastName", response.data.lastName)
                        alert("Login was successful. Welcome " + response.data.firstName + " " + response.data.lastName)
                        window.location.pathname = "./"
                    } else if (response.data.admin === true) {
                        localStorage.setItem("admin", response.data.admin)
                        localStorage.setItem("adminFirstName", response.data.firstName)
                        localStorage.setItem("adminLastName", response.data.lastName)
                        alert("Admin login was successful. Welcome " + response.data.firstName + " " + response.data.lastName)
                        window.location.pathname = "./"
                    }
                })
                .catch(error => {
                    alert(error)
                })

        } else {
            console.log("Errors, please try again", validationErrors)
        }

    }

    const handleInputChange = (event) => {
        event.persist()
        setInputs((inputs) => ({ ...inputs, [event.target.name]: event.target.value }))
    }

    return {
        handleSubmit,
        handleInputChange,
        inputs,
        errors
    }

}