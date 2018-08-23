import axios from "axios";

let timer;
export function getBoardsAndInvitations() {
    return function(dispatch) {
        timer && clearTimeout(timer);
        timer = setTimeout(()=>{dispatch(getBoardsAndInvitations())}, 30000);
        axios.post("/getBoardsAndInvitations")
        .then((response) => {
            dispatch({type: "getBoardsAndInvitations_FULFILLED", payload: response.data})
        },(err)=>{
            dispatch({type: "getBoardsAndInvitations_REJECTED", payload: err})
        })
        .catch((err) => {
            dispatch({type: "getBoardsAndInvitations_REJECTED", payload: err})
        })
    }
  }