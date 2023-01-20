
export default function newProjectFormValidation(inputs) {

    const errors = {}

    if(!inputs.id) {
        errors.id = "project id cannot be left blank"
    }

    if(!inputs.projectName) {
        errors.projectName = "project name cannot be left blank"
    }

    if(!inputs.projectLead) {
        errors.projectLead = "project lead cannot be left blank"
    }

    if(!inputs.projectLeadEmail) {
        errors.projectLeadEmail = "project leads email cannot be left blank"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.projectLeadEmail)) {
        errors.projectLeadEmail = "please enter a vailed email address"
    }

    return errors

}