import { Box, Button, Image, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getData } from "../Redux/Order/action"
import TableList from "../Components/TableList"
import { useSearchParams } from "react-router-dom"
import Navbar from "../Components/Navbar"

function Profile() {
    const [user, setUser] = useState([])
    const [SearchParams] = useSearchParams()
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const { isLoading, order, isError } = useSelector((store) => store)
    console.log(order)

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
        dispatch(getData(filterDate))
    }
    console.log(data)
    const getUserName = () => {
        fetch(`https://mess-backend-wueq.onrender.com/users/getuser`, {
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem('user_token'),
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((res) => setUser(res.user))
    }
    console.log(user)
    let q = 0;
    let t = 0;
    order.length > 0 && order.map((e) => {
        q += e.quantity
        t = q * 50
    })
    console.log(t)
    useEffect(() => {
        getUserName()
        dispatch(getData(filterDate))
    }, [])

    return (
        <Box>
            <Navbar />
            <Box>
                <Box fontFamily="sans-serif">{user.firstName ?
                    <Box display="flex" justifyContent="space-around">
                        <Text>{user.firstName} {user.lastName}</Text>
                        <Box display="flex" gap="5px">
                            <Text>Deposite {user.diposite}</Text> <Text bg={user.dipositeStatus == "Pending" ? "red.300" : user.dipositeStatus == "Paid" ? "green.200" : user.dipositeStatus == "Refunded" ? "yellow.200" : ""}>{user.dipositeStatus}</Text>
                        </Box>
                    </Box>
                    : "...Loading"}</Box>
                <Button onClick={() => handleDate(-1)}>Prev</Button>
                <Button onClick={() => handleDate(0)}>Next</Button>
                <Box>
                    {isLoading ? <Image src="https://cdn.dribbble.com/users/645440/screenshots/3266490/loader-2_food.gif" m="auto" /> :
                        <Box overflow="auto">
                            {
                                order.length > 0 ?
                                    <Table>
                                        <Thead>
                                            <Tr>
                                                <Th>Date</Th>
                                                <Th>Time</Th>
                                                <Th>Quantity</Th>
                                                <Th>Price</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {order.map((el) => (

                                                <TableList key={el._id} date={el.date} time={el.time} quantity={el.quantity} total={el.total} />

                                            ))}
                                            <Tr>
                                                <Th>Total :-</Th>
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
                    }
                </Box>
            </Box>
        </Box>
    )
}
export default Profile