import 'bootstrap/dist/css/bootstrap.min.css';
import newClientFormValidation from './newClientFormValidation';
import newClientFormValidationHook from './newClientFormValidationHook';

export default function NewClientForm() {

    const {inputs, handleInputChange, handleSubmit, errors} = newClientFormValidationHook({clientName: "", clientPOC: "", clientPOCEmail: "", 
    clientDescription: "", agreementFile: ""}, newClientFormValidation)

    const error = errors
    
    return(
        <>
            <form onSubmit={handleSubmit}>
                <h6>Client Name:</h6>
                <input type="text" name="clientName" id="clientName" className="form-input" onChange={handleInputChange} value={inputs.clientName} />
                {error.clientName && <p>{error.clientName}</p>}
                <h6>Point of Contact:</h6>
                <input type="text" name="clientPOC" id="clientPOC" className="form-input" onChange={handleInputChange} value={inputs.clientPOC} />
                {error.clientPOC && <p>{error.clientPOC}</p>}
                <h6>Poit of Contact email:</h6>
                <input type="email" name="clientPOCEmail" id="clientPOCEmail" className="form-input" onChange={handleInputChange} value={inputs.clientPOCEmail} />
                {error.clientPOCEmail && <p>{error.clientPOCEmail}</p>}
                <h6>Client Discription:</h6>
                <textarea name="clientDescription" id="clientDescription" className="form-input" rows="5" cols="50" 
                    onChange={handleInputChange} value={inputs.clientDescription}/>
                {error.clientDescription && <p>{error.clientDescription}</p>}
                <h6>Client Agreement File:</h6>
                <input type="file" name="agreementFile" id="agreementFile" className="form-input" onChange={handleInputChange} value={inputs.agreementFile} />
                {error.agreementFile && <p>{error.agreementFile}</p> }
                <hr />
                <button type="submit" className="btn btn-primary">Add Client</button>
            </form> 
        </>
    );

}