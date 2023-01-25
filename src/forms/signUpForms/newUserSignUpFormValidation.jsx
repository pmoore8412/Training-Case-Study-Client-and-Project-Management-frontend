
export default function newUserValidation(inputs) {

    const errors = {}

    if(!inputs.firstName) {
        errors.firstName = 'First Name cannot be left blank'
    }

    if(!inputs.lastName) {
        errors.lastName = 'Last Name cannot be left blank'
    }

    if (!inputs.email) {
        errors.email = 'Email connot be left blank'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.email)) {
        errors.email = 'Please enter a vailed email address'
    }

    if (!inputs.password) {
        errors.password = 'Password cannot be left blank'
    } else if (inputs.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long'
    } 

    return errors

}