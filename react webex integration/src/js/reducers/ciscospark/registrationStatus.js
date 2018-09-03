import statuses from "../../lib/statuses"

export default function registrationStatusHelper(action, state){
    if (typeof action.payload === "object")
    return {
        ...state, 
        registrationStatus: {
            status: action.payload.status,
            info: action.payload.info
        }
    }
    return {
        ...state, 
        registrationStatus: {
            status: action.payload,
            info: ""
        }
    }
}