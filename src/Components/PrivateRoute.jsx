import { Navigate } from "react-router-dom"

function PrivateRoute({children}){
    let token=localStorage.getItem("user_token")
    if(!token){
        return <Navigate to="/login"/>
    }
    return children
}
export default PrivateRoute;