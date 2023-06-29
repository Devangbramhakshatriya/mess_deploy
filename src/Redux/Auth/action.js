import { SIGNUPREQUEST, SIGNUPSUCCESS } from "./actionType"

export const signupReuest=()=>{
    return {type:SIGNUPREQUEST}
}

export const signupSuccess=(payload)=>{
    return {type:SIGNUPSUCCESS}
}