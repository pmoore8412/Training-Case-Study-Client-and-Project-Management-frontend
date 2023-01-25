
export default function ContactUs() {

    return <div className="container py-4">
        <div className="h-100 p-5 text-bg-dark rounded-3">
            <h1 className="display-4">Contact Us</h1>
            <p className="lead">Thank you for visiting our site.</p>
            <p>please fill out the form below to send us an email if you have any questions.</p>
        </div>
        <br />
        <hr />
        <div className="container py-5">
            <form>
                <h4>Your email:</h4>
                <input type="email" name="yourEmail" className="form-control" style={{width: "300px"}} />
                <br />
                <h3>Message:</h3>
                <textarea name="message" className="form-control" rows="6" style={{width: "800px"}} />
                <br />
                <button className="btn btn-primary btn-lg">Send</button>
            </form>
        </div>
    </div>

}