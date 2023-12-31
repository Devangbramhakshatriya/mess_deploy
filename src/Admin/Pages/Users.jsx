import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users() {
    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const fetchUsers = () => {
        setIsLoading(true)
        fetch(`https://ruby-muddy-earthworm.cyclic.app/users/allusers`)
            .then((res) => res.json())
            .then((res) => setUser(res.users))
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false))
    }
    useEffect(() => {
        fetchUsers()
    }, [])
    return (
        <Box minH="100vh">
            <Navbar />
            {
                isLoading ? "...Loading" 
                    :
                    <Box overflow="auto" minH="100vh">
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Sr.No.</Th>
                                    <Th>Name</Th>
                                    <Th>Contact No.</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    user.map((el, i) => (
                                        <Tr>
                                            <Td>{i + 1}</Td>
                                            <Td>{el.firstName} {el.lastName}</Td>
                                            <Td>{el.mobileNumber}</Td>
                                            <Td><Link to={`/admin/userdetails/${el._id}`}><Button>View</Button></Link></Td>
                                        </Tr>
                                    ))
                                }
                            </Tbody>
                        </Table>
                    </Box>
                }
        </Box>
    )
}
export default Users