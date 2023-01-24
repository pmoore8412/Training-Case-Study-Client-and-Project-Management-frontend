import { useCookies } from "react-cookie";

export default function Root() {

    const [cookies] = useCookies()

    let logedIn = <h1>Client and Project Management System</h1>

    if(cookies['user'] && cookies['user'].admin === false) {
        logedIn = <h1>Welcome {cookies['user'].firstName} {cookies['user'].lastName}</h1>
    } else if(cookies['admin'] && cookies['admin'].admin === true) {
        logedIn = <h1>Welcome Admin {cookies['admin'].firstName} {cookies['admin'].lastName}</h1>
    }


    return (
        <>
            {logedIn}
        </>
    );
}