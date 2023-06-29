import { Box, Button, Text, useMediaQuery } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { SideDrawer } from "./SideDrawer";
import { useEffect, useState } from "react";

function Navbar() {
    const [isLessthan550]=useMediaQuery('(max-width: 550px)') 
    const [name, setName] = useState("")
    const [token,setToken]=useState(localStorage.getItem("user_token"))
    
    const handleLogout = () => {
        localStorage.setItem("user_token", "")
        setToken(localStorage.getItem("user_token"))
    }

    const getUserName = () => {
        
            fetch(`https://mess-backend-wueq.onrender.com/users/getuser`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('user_token'),
                    'Content-Type': 'application/json',
                }
            })
                .then((res) => res.json())
                .then((res) => setName(`${res.user.firstName} ${res.user.lastName}`))
    }
    console.log(name)
    useEffect(()=>{
        // setToken(localStorage.getItem("user_token"))
        // if(token){
        //     getUserName()
        // }
            getUserName()
    },[])
        
    return (
        <Box bgGradient='linear(to-l, #7928CA, #FF0080)' display="flex" justifyContent="space-between" mb="20px">
            <Text fontSize="18px" color="white" fontWeight="bold" display="flex" alignItems="center" ml="20px"><RouterLink to="/">{name}</RouterLink></Text>
            {
                isLessthan550 ?  <Box display="flex" justifyContent="end" mr="20px"><SideDrawer/></Box>
                :
                <Box>
                <RouterLink to="/"><Button>Order</Button></RouterLink>
                <RouterLink to="/login"><Button display={!token ? "none" : ""} onClick={handleLogout}>Logout</Button></RouterLink>
                <RouterLink to="/profile"><Button>Profile</Button></RouterLink>
                </Box>
            }
           
        </Box>
    )
}
export default Navbar