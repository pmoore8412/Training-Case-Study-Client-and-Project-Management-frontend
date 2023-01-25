import 'bootstrap/dist/css/bootstrap.min.css';
import loginFormValidation from "./loginFormValidation";
import loginFormHook from "./loginFormHook";


export default function LoginForm() {

    const {inputs, handleInputChange, handleSubmit, errors} = loginFormHook({email:'', password:''}, loginFormValidation)

    const error = errors;

    return <>
        <form onSubmit={handleSubmit}>
            <h6>Email:</h6>
            <input type="text" className="form-control" style={{width: "300px"}} name="email" id="email" onChange={handleInputChange} value={inputs.email} />
            {error.email && <p>{error.email}</p>}
            <h6>Password:</h6>
            <input type="password" className="form-control" style={{width: "300px"}} name="password" id="password" onChange={handleInputChange} value={inputs.password} />
            {error.password && <p>{error.password}</p>}
            <hr />
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </>

}