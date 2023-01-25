import 'bootstrap/dist/css/bootstrap.min.css';
import newUserValidation from './newUserSignUpFormValidation';
import newUserHook from './newUserSignUpHook';

export default function NewUserForm() {

    const {inputs, handleInputChange, handleSubmit, errors} = newUserHook({firstName: "", lastName: "", email: "", password: "", admin: false}, newUserValidation)

    const error = errors;

    return (
        <form onSubmit={handleSubmit}>
            <h6>First Name:</h6>
            <input type="text" name="firstName" id="firstName" className="form-input" onChange={handleInputChange} value={inputs.firstName} />
            {error.firstName && <p>{error.firstName}</p>}
            <h6>Last Name:</h6>
            <input type="text" name="lastName" id="lastName" className="form-input" onChange={handleInputChange} value={inputs.lastName} />
            {error.lastName && <p>{error.lastName}</p>}
            <h6>Email:</h6>
            <input type="email" name="email" id="email" className="form-input" onChange={handleInputChange} value={inputs.email} />
            {error.email && <p>{error.email}</p>}
            <h6>Password:</h6>
            <input type="password" name="password" id="password" className="form-input" onChange={handleInputChange} value={inputs.password} />
            {error.password && <p>{error.password}</p>}
            <input type="hidden" name="admin" id="admin" value={false} />
            <hr />
            <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
    )

}