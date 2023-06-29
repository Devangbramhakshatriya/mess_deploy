import {Route, Routes} from "react-router-dom"
import Home from "../Pages/Home"
import Login from "../Pages/Login"
import Signup from "../Pages/Signup"
import Profile from "../Pages/Profile"
import PrivateRoute from "./PrivateRoute"
import Dashboard from "../Admin/Pages/Dashboard"
import AdminProtectedRoute from "./AdminPrivateRoute"
import Users from "../Admin/Pages/Users"
import AdminLogin from "../Admin/Pages/AdminLogin"
import UserDetails from "../Admin/Pages/UserDetails"
import TodaysOrder from "../Admin/Pages/TodaysOrder"
import TomorrowsOrder from "../Admin/Pages/TomorrowsOrder"
import YesterdaysOrder from "../Admin/Pages/YesterdaysOrder"
function AllRoutes(){
    return(
        <Routes>
            <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/adminlogin" element={<AdminLogin/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
            <Route path="/admin" element={<AdminProtectedRoute><Dashboard/></AdminProtectedRoute>}/>
            <Route path="/admin/users" element={<AdminProtectedRoute><Users/></AdminProtectedRoute>}/>
            <Route path="/admin/userdetails/:id" element={<AdminProtectedRoute><UserDetails/></AdminProtectedRoute>}/>
            <Route path="/admin/todaysorder" element={<AdminProtectedRoute><TodaysOrder/></AdminProtectedRoute>}/>
            <Route path="/admin/tomorrowsorder" element={<AdminProtectedRoute><TomorrowsOrder/></AdminProtectedRoute>}/>
            <Route path="/admin/yesterdaysorder" element={<AdminProtectedRoute><YesterdaysOrder/></AdminProtectedRoute>}/>
        </Routes>
    )
}
export default AllRoutes