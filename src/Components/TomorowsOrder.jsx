import axios from "axios";
import { useEffect, useState } from "react";
import { getData } from "../Redux/Order/action";
import { useDispatch, useSelector } from "react-redux";
import { Box, Text, Image, Button, useToast } from "@chakra-ui/react"
function TomorowsOrder() {
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const toast = useToast()
    const { order, isLoading, isError } = useSelector((store) => store)
    const date1 = new Date()
    let d = date1.getDate()
    if (d < 10) {
        d = `0${d}`
    }
    let md = date1.getDate() + 1
    if (md < 10) {
        md = `0${md}`
    }
    let m = date1.getMonth() + 1
    if (m < 10) {
        m = `0${m}`
    }
    let y = date1.getFullYear()
    const minDate = `${y}-${m}-${d+1}`
    const todaysDate=`${y}-${m}-${d}`
    let or=order.filter((e)=>e.date==minDate)

    // Get the current date
var currentDate = new Date();

// Get tomorrow's date
var tomorrowDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

// Check if the year has changed
if (tomorrowDate.getFullYear() > currentDate.getFullYear()) {
  tomorrowDate = new Date(currentDate.getFullYear(), 0, 1); // Set to January 1st of the next year
} else {
  // Check if the month has changed
  if (tomorrowDate.getMonth() > currentDate.getMonth()) {
    tomorrowDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1); // Set to the 1st day of the next month
  }
}

// Extract the individual components of tomorrow's date
var year = tomorrowDate.getFullYear();
var month = tomorrowDate.getMonth() + 1; // Month is zero-based, so we add 1
var day = tomorrowDate.getDate();

// Format the date as desired (e.g., "YYYY-MM-DD")
var formattedDate = year + '-' + month.toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0');

console.log(formattedDate);

    const handleDelete = (e) => {

        let time1 = ""
        if (e.time < "12" && e.date==todaysDate ) {
            time1 = "10:00"
        } else if (e.time > "12" && e.date==todaysDate) {
            time1 = "18:00"
        }
        console.log(time1)
        var d = new Date(); // for now
        let h = d.getHours(); // => 9
        let m = d.getMinutes(); // =>  30
        let time = `${h}:${m}`
        if (time > time1 && e.date==todaysDate ) {
            toast({
                title: "You can't delete order",
                description: "Becaous order will be deliver in 2 hours ",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "top"
            })
        } else {
            fetch(`https://mess-backend-wueq.onrender.com/orders/${e._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('user_token'),
                }
            }).then(() => getTodaysOrder())
        }
    }
    const getTodaysOrder=()=>{
        fetch(`https://mess-backend-wueq.onrender.com/orders/getorder?filter=${formattedDate}`, {
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem('user_token'),
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((res) => setData(res.order))
    }
    console.log(or)
    console.log(data)
    useEffect(() => {
        dispatch(getData())
        getTodaysOrder()
    }, [])
    return (
        <Box>{isLoading ? <Image src="https://cdn.dribbble.com/users/645440/screenshots/3266490/loader-2_food.gif" m="auto" />

            :

            data.length > 0 ? <Box><Text>Tomorows Order</Text>
               
                {
                    data.map((e) => (
                        <Box display="flex" w={["90%","70%","70%","60%","60%","60%"]} bg="blue.100" justifyContent="space-around" m="auto" mt="20px" alignItems="center" key={e._id}>
                            <Box w={["30%","40%","40%","50%","50%","50%"]}>
                                <Image src="https://media4.giphy.com/media/gg8Q0J4HD2rFm5LTHe/giphy.gif" w={["60%","40%","40%","30%","30%","30%"]} />
                            </Box>
                            <Box>
                                <Text>Tomorow's Order</Text>
                                <Text>Qunatity:{e.quantity}</Text>
                                <Text>Time:{e.time}</Text>
                            </Box>
                            <Box>
                                <Button m="auto" onClick={() => handleDelete(e)}>Delete</Button>
                            </Box>
                        </Box>
                    ))
                }</Box>
                :
                ""
                // <Box>
                //     <Text>You Not Ordered Anything For Today!</Text>
                //     <Text>Order Food For Today</Text>
                //     <Image src="https://media.tenor.com/W532CY2SqesAAAAM/brunch-order-up.gif" m="auto" />
                //     {/* https://media.tenor.com/4EauhAI5810AAAAM/lets-order-menu.gif */}
                // </Box>
        }
        </Box>
    )
}

export default TomorowsOrder