
export default function updateClientFormValidation(inputs) {

    const errors = {}

    if(!inputs.clientPOC) {
        errors.clientPOC = "client point of contact cannot be left blank"
    }

    if(!inputs.clientPOCEmail) {
        errors.clientPOCEmail = "point of contact email cannot be left blank"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.clientPOCEmail)) {
        errors.clientPOCEmail = "please enter a vailed email address"
    }

    return errors

}