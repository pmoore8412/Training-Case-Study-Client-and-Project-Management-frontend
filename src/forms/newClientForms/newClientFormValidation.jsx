
export default function newClientFormValidation(inputs) {

    const errors = {}

    if(!inputs.clientName){
        errors.clientName = "client Name cannot be left blank"
    }

    if(!inputs.clientPOC) {
        errors.clientPOC = "client point of contact cannot be left blank"
    }

    if(!inputs.clientPOCEmail) {
        errors.clientPOCEmail = "point of contact email cannot be left blank"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.clientPOCEmail)) {
        errors.clientPOCEmail = "please enter a vailed email address"
    }

    if(!inputs.agreementFile) {
        errors.agreementFile = "A signed agreement file is required"
    } else if(!/(\.pdf)$/i.test(inputs.agreementFile)) {
        errors.agreementFile = "File must be in pdf format"
    }

    return errors;

}