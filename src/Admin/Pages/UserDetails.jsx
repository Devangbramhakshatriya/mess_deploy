import { Box, Button, Select, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { RiDeleteBin6Line } from "react-icons/ri"
import DepositeModel from "../Components/DepositeModel";

function UserDetails() {
    const [order, setOrder] = useState([])
    const { id } = useParams()
    const [user, setUser] = useState([])
    const date1 = new Date()

    let d = date1.getDate()
    if (d < 10) {
        d = `0${d}`
    }
    let mm = date1.getMonth() + 1
    if (mm < 10) {
        mm = `0${mm}`
    }
    let m = date1.getMonth() + 1
    if (m < 10) {
        m = `0${m}`
    }
    let y = date1.getFullYear()
    let minDate = `${y}-${m}-${d}`
    let filterDate = `${y}-${mm}`

    let obj = {
        // params: {
        //   filter: SearchParams.get('filter'),
        // },
        filter: filterDate
    }

    const handleDate = (val) => {
        let d = +mm + val
        if (d < 10) {
            d = `0${d}`
        }
        filterDate = `${+y}-${d}`
        console.log(filterDate)
        fetchDetals(filterDate)
    }

    const fetchUsers = () => {
        fetch(`https://mess-backend-wueq.onrender.com/users/${id}`)
            .then((res) => res.json())
            .then((res) => setUser(res.user))
    }
    console.log(process.env.LINK)
    const fetchDetals = (date) => {
        fetch(`https://mess-backend-wueq.onrender.com/orders/userorder/${id}?filter=${date}`)
            .then((res) => res.json())
            .then((res) => setOrder(res))
    }
    useEffect(() => {
        fetchDetals(filterDate)
        fetchUsers()
    }, [])

    let q = 0;
    let t = 0;
    order.length > 0 && order.map((e) => {
        q += e.quantity
        t = q * 50
    })

    const handleDelete = (id) => {
        fetch(`https://mess-backend-wueq.onrender.com/orders/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(() => fetchDetals())
    }
    return (
        <Box>
            <Navbar />
            {
                user.diposite ?
                    <Box>
                        <Box fontFamily="sans-serif" display="flex" justifyContent="space-around">
                            <Text>{user.firstName} {user.lastName}</Text>
                            <Box display="flex" gap="5px">
                                <Text>Deposite {user.diposite}</Text> <Text bg={user.dipositeStatus == "Pending" ? "red.300" : user.dipositeStatus == "Paid" ? "green.200" : user.dipositeStatus == "Refunded" ? "yellow.200" : ""}>{user.dipositeStatus}</Text>
                            </Box>
                        </Box>

                        <Box>
                            <DepositeModel />
                        </Box>
                    </Box>

                    : "...Loading"
            }
            <Button onClick={() => handleDate(-1)}>Prev</Button>
            <Button onClick={() => handleDate(0)}>Next</Button>
            <Box overflow="auto">
                {order.length > 0 ?
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Sr. No.</Th>
                                <Th>Date</Th>
                                <Th>Time</Th>
                                <Th>Quantity</Th>
                                <Th>Total</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                order.map((el, i) => (
                                    <Tr>
                                        <Td>{i + 1}</Td>
                                        <Td>{el.date}</Td>
                                        <Td>{el.time}</Td>
                                        <Td>{el.quantity}</Td>
                                        <Td>{el.total}</Td>
                                        <Td><RiDeleteBin6Line color="red" onClick={() => handleDelete(el._id)} /></Td>
                                    </Tr>
                                ))
                            }
                            <Tr>
                                <Th>Total :-</Th>
                                <Th></Th>
                                <Th></Th>
                                <Th>{q}</Th>
                                <Th>{t}</Th>
                            </Tr>
                        </Tbody>
                    </Table>
                    :
                    "No Data"
                }

            </Box>
        </Box>
    )
}
export default UserDetails