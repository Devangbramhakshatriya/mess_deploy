import { Box, Button, Grid, Heading, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function TodaysOrder() {
    const [data, setData] = useState([])
    const fetchtodaysorder = () => {
        fetch(`https://ruby-muddy-earthworm.cyclic.app/orders/gettodaysorder`)
            .then((res) => res.json())
            .then((res) => setData(res))
    }
    console.log(data)
    useEffect(() => {
        fetchtodaysorder()
    }, [])
    let todaysMornningOrders = 0
    let todaysEveningOrders = 0
    let todaysOrder = 0
    for (const item of data) {
        // Extract the orders array from the item
        const orders = item.orders;

        // Iterate over the orders array
        for (const order of orders) {
            // Add the quantity of each order to the total quantity
            todaysOrder += order.quantity;

            const time = order.time;
            const hour = parseInt(time.split(':')[0]);
            if (time == "AM") {
                todaysMornningOrders += order.quantity;
            } else {
                todaysEveningOrders += order.quantity;
            }
        }
    }
    return (
        <Box>
            <Navbar />
            <Box>
                <Box display="flex" gap={["15px", "25px", "25px", "30px", "30px", "30px"]} m="auto" justifyContent="center">
                    <Box bg="green.100" borderRadius="20px" p={["15px", "20px", "20px", "25px", "25px", "25px"]} _hover={{boxShadow:"md", mt:"-10px", transition:"0.1s"}}>
                        <Text>Today's Orders</Text>
                        <Text>{todaysOrder}</Text>
                        {/* <Link to="/admin/todaysorder"><Button>View</Button></Link> */}
                    </Box>

                    <Box bg="green.100" borderRadius="20px" p={["15px", "20px", "20px", "25px", "25px", "25px"]} _hover={{boxShadow:"md", mt:"-10px", transition:"0.1s"}}>
                        <Text>Today's Mornning Orders</Text>
                        <Text>{todaysMornningOrders}</Text>
                    </Box>

                    <Box bg="green.100" borderRadius="20px" p={["15px", "20px", "20px", "25px", "25px", "25px"]} _hover={{boxShadow:"md", mt:"-10px", transition:"0.1s"}}>
                        <Text>Today's Evening Orders</Text>
                        <Text>{todaysEveningOrders}</Text>
                    </Box>

                </Box>

                <Text fontSize={["22px", "25px", "25px", "25px", "30px", "30px"]} fontWeight="bold">Morning</Text>
                <Box overflow="auto">
                    <Table mb="70px" >
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
                                                    e.time == "AM" ? <Tr>
                                                        <Td>{e.date}</Td>
                                                        <Td>{e.time}</Td>
                                                        <Td>{e.quantity}</Td>
                                                    </Tr>

                                                        : ""


                                                ))
                                            }
                                        </Tbody>
                                        <Td>{el.user.mobileNumber}</Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </Box>

                
                    <Text fontSize={["22px", "25px", "25px", "25px", "30px", "30px"]} fontWeight="bold">Evening</Text>
                    <Box overflow="auto">
                    <Table>
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
                                                    e.time == "PM" ? <Tr>
                                                        <Td>{e.date}</Td>
                                                        <Td>{e.time}</Td>
                                                        <Td>{e.quantity}</Td>
                                                    </Tr>

                                                        : ""


                                                ))
                                            }
                                        </Tbody>
                                        <Td>{el.user.mobileNumber}</Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </Box>
    )
}
export default TodaysOrder