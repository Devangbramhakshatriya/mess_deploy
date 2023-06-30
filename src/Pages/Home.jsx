import { Box, Input, Select, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import TodaysOrder from "../Components/TodaysOrder";
import { useDispatch } from "react-redux";
import { getData, postData } from "../Redux/Order/action";
import TomorowsOrder from "../Components/TomorowsOrder";
let init = {
    date: "",
    time: "",
    quantity: "",
    price: ""
}
function Home() {
    const [text, setText] = useState(init)
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [quantity, setQuantity] = useState("")
    const toast = useToast()
    const dispatch = useDispatch()
    const todaysDate = new Date().toISOString().split("T")[0];
    console.log(todaysDate)
    const date1 = new Date()
    const hour = date1.getHours()
    console.log(hour)
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
    const minDate = `${y}-${m}-${d}`
    const maxDate = `${y}-${m}-${md}`
    const filterData = `${y}-${m}`
    const tomorrowsDate = `${y}-${m}-${md}`
    let datePickerId = new Date().toISOString().split("T")[0];
    console.log(datePickerId)
    console.log(m)

    let total = quantity * 50
    let obj = { date, time, quantity, total }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(obj)
        // axios.post('http://localhost:4500/orders/addorder', {
        //     headers: {
        //         Authorization: localStorage.getItem('user_token'),
        //         'Content-Type': 'application/json',
        //     }
        //     , obj
        // })
        //     .then((res) => console.log(res))
        //     .catch((err) => console.log(err))
        // fetch('http://localhost:4500/orders/addorder', {
        //     method: 'POST',
        //     headers: {
        //         Authorization: localStorage.getItem('user_token'),
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(obj)
        // })
        // .then((res)=>{
        //     toast({
        //         title: 'Order Placed Successfuly.',
        //         // description: "Book Your Food 🥘",
        //         status: 'success',
        //         duration: 4000,
        //         isClosable: true,
        //         position:"top"
        //       })
        // })
        dispatch(postData(obj)).then(() => {
            toast({
                title: 'Order Placed Successfuly.',
                // description: "Book Your Food 🥘",
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: "top"
            })
        })
            .then(() => dispatch(getData(filterData)))
    }
    useEffect(() => {
        dispatch(getData(filterData))
    }, [])


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
    return (
        <Box>
            <Navbar />
            <Box>
                <Box w={["70%", "50%", "40%", "40%", "40%", "40%"]} m="auto" mb="30px">
                    <form action="" onSubmit={handleSubmit} >
                        {/* <Input type="date" onChange={(e) => setDate(e.target.value)} name="date" min={minDate} max={maxDate} required={true} /> */}
                        <Select onChange={(e) => setDate(e.target.value)} required={true} >
                            <option value="">Select Date</option>
                            <option value={todaysDate}>Today ({todaysDate}) </option>
                            <option value={formattedDate}>Tomorrow ({formattedDate})</option>
                        </Select>
                        {/* <Input type="time" onChange={(e) => setTime(e.target.value)} name="time" required={true} /> */}
                        <Select onChange={(e) => setTime(e.target.value)} required={true}>
                            <option value="">Select Time</option>
                            <option value="AM" disabled={date == todaysDate && hour > 12 ? true : false}>Moring</option>
                            <option value="PM">Evening</option>
                        </Select>
                        <Select onChange={(e) => setQuantity(e.target.value)} name="quantity" required={true}>
                            <option value="">Select Quntity</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </Select>
                        <Input type="submit" bg="green.100" />
                    </form>
                </Box>
                <TodaysOrder />
                <TomorowsOrder />
            </Box>
        </Box>
    )
}
export default Home