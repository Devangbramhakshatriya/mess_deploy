import axios from "axios";
import { useEffect, useState } from "react";
import { getData } from "../Redux/Order/action";
import { useDispatch, useSelector } from "react-redux";
import { Box, Text, Image, Button, useToast } from "@chakra-ui/react"
function TodaysOrder() {
    const [isDeleteding,setIsDeleteding]=useState(false)
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
    const minDate = `${y}-${m}-${d}`
    let or=order.filter((e)=>e.date==minDate)

    const handleDelete = (e) => {
        let time1 = ""
        if (e.time == "AM") {
            time1 = "9"
        } else if (e.time == "PM") {
            time1 = "18"
        }
        console.log(time1)
        var d = new Date(); // for now
        let h = d.getHours(); // => 9
        let m = d.getMinutes(); // =>  30
        let time = `${h}`
        console.log(time)
        if (time > time1) {
            toast({
                title: "You can't delete order",
                description: "Becouse order will be deliver in 2 hours ",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "top"
            })
        } else {
            setIsDeleteding(true)
            fetch(`https://ruby-muddy-earthworm.cyclic.app/orders/${e._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('user_token'),
                }
            }).then(() => getTodaysOrder())
            .then(()=>setIsDeleteding(false))
            .catch(()=>setIsDeleteding(false))
        }
    }
    const getTodaysOrder=()=>{
        fetch(`https://ruby-muddy-earthworm.cyclic.app/orders/getorder?filter=${minDate}`, {
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
        getTodaysOrder(minDate)
    }, [])
    return (
        <Box>{isLoading ? <Image src="https://cdn.dribbble.com/users/645440/screenshots/3266490/loader-2_food.gif" m="auto" />

            :

            data.length > 0 ? <Box><Text>Don't Warry Your Food Will Diliver On Time</Text>
                <Image src="https://cdn.dribbble.com/users/2243442/screenshots/11362056/cooking-at-home.gif" w={["40%", "40%", "30%", "30%", "30%", "30%"]} m="auto" />
                {
                    data.map((e) => (
                        <Box borderRadius="10px" display="flex" w={["90%","70%","70%","60%","60%","60%"]} bg="green.300" justifyContent="space-around" m="auto" mt="20px" alignItems="center" key={e._id}>
                            <Box w={["30%","40%","40%","50%","50%","50%"]}>
                                <Image src="https://media4.giphy.com/media/gg8Q0J4HD2rFm5LTHe/giphy.gif" w={["60%","40%","40%","30%","30%","30%"]} />
                            </Box>
                            <Box>
                                <Text>Today's Order</Text>
                                <Text>{e.date}</Text>
                                <Text>Qunatity:{e.quantity}</Text>
                                <Text>Time:{e.time}</Text>
                            </Box>
                            <Box>
                                <Button isLoading={isDeleteding} loadingText="Deleteing" m="auto" onClick={() => handleDelete(e)}>Delete</Button>
                            </Box>
                        </Box>
                    ))
                }</Box>
                :
                <Box>
                    <Text>You Not Ordered Anything For Today!</Text>
                    <Text>Order Food For Today</Text>
                    <Image src="https://media.tenor.com/W532CY2SqesAAAAM/brunch-order-up.gif" m="auto" />
                    {/* https://media.tenor.com/4EauhAI5810AAAAM/lets-order-menu.gif */}
                </Box>
        }
        </Box>
    )
}

export default TodaysOrder