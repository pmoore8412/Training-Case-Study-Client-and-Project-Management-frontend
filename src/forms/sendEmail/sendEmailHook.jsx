import axios from "axios";
import { useState } from "react";

export default function sendEmailHook(initialValues, validate) {

    const [inputs, setInputs] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleSubmit = () => {
        event.preventDefault()
        const validationErrors = validate(inputs)
        const noErros = Object.keys(validationErrors).length === 0
        setErrors(validationErrors)
        if(noErros) {
            axios.post("http://localhost:9000/contact-us/send-email", inputs)
            .then((responseClient) => {
                console.log(responseClient)
                alert("Email Sent")
                window.location.reload()
            })
            .catch(error => {
                alert("Failed to send email " + error)
                console.log(error)
            })
        } else {
            console.log("Errors, please try again", validationErrors)
        }
    }

    const handleInputChange = (event) => {
        event.persist()
        setInputs((inputs) => ({...inputs, [event.target.name]: event.target.value}))
    }

    return {
        handleSubmit,
        handleInputChange,
        inputs,
        errors
    }

}