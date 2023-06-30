import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar(){
    const [token,setToken]=useState(localStorage.getItem("admin_token"))
    
    const handleLogout = () => {
        localStorage.setItem("admin_token", "")
        setToken(localStorage.getItem("admin_token"))
    }
    return(
        <Box display="flex" justifyContent="space-around" h={["35px","40px","40px","50px","50px","50px"]} boxShadow="md" mb="30px" alignItems="center" fontSize={["18px","20px","25px","25px","25px","25px"]} fontWeight="bold">
            <Link to="/admin"><Text>Dashboard</Text></Link>
            <Link to="/admin/users"><Text>Users</Text></Link>
            <Link to="/adminlogin"><Button display={!token ? "none" : ""} onClick={handleLogout}>Logout</Button></Link>
        </Box>
    )
}
export default Navbar