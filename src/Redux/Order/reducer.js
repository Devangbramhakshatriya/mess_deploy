import { DELETEORDERSUCCESS, GETORDERSUCCESS, ORDERFAIL, ORDERREQUEST, POSTORDERSUCCESS } from "./actionType"

const init={
    isLoading:false,
    order:[],
    isError:false
}
export const reducer=(state=init,{type,payload})=>{
    switch(type){
        case ORDERREQUEST:{
            return{...state,isLoading:true}
        }
        case ORDERFAIL:{
            return{...state,isLoading:false,isError:true}
        }
        case GETORDERSUCCESS:{
            return{...state,isLoading:false,order:payload}
        }
        case POSTORDERSUCCESS:{
            return{...state,isLoading:false}
        }
        case DELETEORDERSUCCESS:{
            return{...state,isLoading:false}
        }
        default:{
            return state
        }
    }
}