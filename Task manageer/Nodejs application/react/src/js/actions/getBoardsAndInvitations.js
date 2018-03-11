import axios from "axios";

export function getBoardsAndInvitations() {
    return function(dispatch) {
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