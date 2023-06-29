import { Td, Tr } from "@chakra-ui/react"
import { useState } from "react"

function TableList({date,time,total,quantity}){
    let t=""
    if(time>="12"){
        t="PM"
    }else if(time<"12"){
        t="AM"
    }
    return(
        <Tr>
            <Td>{date}</Td>
            <Td>{time}</Td>
            <Td>{quantity}</Td>
            <Td>{total}</Td>
        </Tr>
    )
}
export default TableList