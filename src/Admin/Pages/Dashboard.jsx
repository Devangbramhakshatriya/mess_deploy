import { Box, Button, Grid, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
    const [data, setData] = useState([])
    const [tomorrow, setTomorrow] = useState([])
    const [yesterday, setYesterday] = useState([])
    const fetchtodaysorder = () => {
        fetch(`https://ruby-muddy-earthworm.cyclic.app/orders/gettodaysorder`)
            .then((res) => res.json())
            .then((res) => setData(res))
    }
    const fetchtomorrowsorder = () => {
        fetch(`https://ruby-muddy-earthworm.cyclic.app/orders/gettomorrowsorder`)
            .then((res) => res.json())
            .then((res) => setTomorrow(res))
    }
    const fetchyesterdaysorder = () => {
        fetch(`https://ruby-muddy-earthworm.cyclic.app/orders/getyesterdaysorder`)
            .then((res) => res.json())
            .then((res) => setYesterday(res))
    }
    console.log(data)
    useEffect(() => {
        fetchtodaysorder()
        fetchtomorrowsorder()
        fetchyesterdaysorder()
    }, [])
    let todaysMornningOrders = 0
    let yesterdaysOrder = 0
    let todaysOrder = 0
    let tomorrowsOrder = 0
    for (const item of data) {
        // Extract the orders array from the item
        const orders = item.orders;

        // Iterate over the orders array
        for (const order of orders) {
            // Add the quantity of each order to the total quantity
            todaysOrder += order.quantity;

            // const time = order.time;
            // const hour = parseInt(time.split(':')[0]);
            // if (hour < 12) {
            //     todaysMornningOrders += order.quantity;
            // } else {
            //     todaysEveningOrders += order.quantity;
            // }
        }
    }

    for (const item of tomorrow) {
        const orders = item.orders;
        for (const order of orders) {
            tomorrowsOrder += order.quantity
        }
    }

    for (const item of yesterday) {
        const orders = item.orders;
        for (const order of orders) {
            yesterdaysOrder += order.quantity
        }
    }
    return (
        <Box>
            <Navbar />
            <Box>
                <Box display="flex" gap={["15px", "25px", "25px", "30px", "30px", "30px"]} m="auto" justifyContent="center">
                    <Box bg="green.100" borderRadius="20px" p={["15px", "20px", "20px", "25px", "25px", "25px"]} _hover={{ boxShadow: "md", mt: "-10px", transition: "0.1s" }}>
                        <Text>Yesterday's Orders</Text>
                        <Text>{yesterdaysOrder}</Text>
                        <Link to="/admin/yesterdaysorder"><Button>View</Button></Link>
                    </Box>

                    <Box bg="green.100" borderRadius="20px" p={["15px", "20px", "20px", "25px", "25px", "25px"]} _hover={{ boxShadow: "md", mt: "-10px", transition: "0.1s" }}>
                        <Text>Today's Orders</Text>
                        <Text>{todaysOrder}</Text>
                        <Link to="/admin/todaysorder"><Button>View</Button></Link>
                    </Box>

                    <Box bg="green.100" borderRadius="20px" p={["15px", "20px", "20px", "25px", "25px", "25px"]} _hover={{ boxShadow: "md", mt: "-10px", transition: "0.1s" }}>
                        <Text>Tomorrow's Orders</Text>
                        <Text>{tomorrowsOrder}</Text>
                        <Link to="/admin/tomorrowsorder"><Button>View</Button></Link>
                    </Box>

                </Box>
                <Box overflow="auto">
                    {
                        data.length > 0 ?
                            <Table >
                                <Thead>
                                    <Tr>
                                        <Th>Sr.No.</Th>
                                        <Th>Name</Th>
                                        <Th>Details</Th>
                                        <Th>Contact</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        data.map((el, i) => (
                                            <Tr key={i}>
                                                <Td>{i + 1}</Td>
                                                <Td>{el.user.firstName} {el.user.lastName}</Td>
                                                <Thead>
                                                    <Tr>
                                                        <Th>Date</Th>
                                                        <Th>Time</Th>
                                                        <Th>Qunatity</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    {
                                                        el.orders.map((e) => (
                                                            <Tr>
                                                                <Td>{e.date}</Td>
                                                                <Td>{e.time}</Td>
                                                                <Td>{e.quantity}</Td>
                                                            </Tr>
                                                        ))
                                                    }
                                                </Tbody>
                                                <Td>{el.user.mobileNumber}</Td>
                                            </Tr>
                                        ))
                                    }
                                </Tbody>
                            </Table>
                            :
                            "No Data"
                    }

                </Box>
            </Box>
        </Box>
    )
}
export default Dashboard