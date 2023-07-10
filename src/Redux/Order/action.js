import { DELETEORDERSUCCESS, GETORDERSUCCESS, ORDERFAIL, ORDERREQUEST, POSTORDERSUCCESS } from "./actionType"

export const orderRequest = () => {
    return { type: ORDERREQUEST }
}
export const orderFail = () => {
    return { type: ORDERFAIL }
}
export const getOrderSuccess = (payload) => {
    return { type: GETORDERSUCCESS, payload }
}

export const postOrderSuccess = () => {
    return { type: POSTORDERSUCCESS }
}

export const delteOrderSuccess = () => {
    return { type: DELETEORDERSUCCESS }
}
export const getData = (obj) => async (dispatch) => {
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
    dispatch(orderRequest())
    fetch(`https://ruby-muddy-earthworm.cyclic.app/orders/getorder?filter=${obj}`, {
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('user_token'),
            'Content-Type': 'application/json',
        }
    })
        .then((res) => res.json())
        .then((res) =>
            dispatch(getOrderSuccess(res.order))
        )
        .catch(()=>dispatch(orderFail()))
}
export const postData = (obj) => async (dispatch) => {
    return await fetch("https://ruby-muddy-earthworm.cyclic.app/orders/addorder", {
        method: 'POST',
        headers: {
            Authorization: localStorage.getItem('user_token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    })
    
}