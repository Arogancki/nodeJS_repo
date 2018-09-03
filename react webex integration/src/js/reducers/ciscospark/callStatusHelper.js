export default function callStatusHelper(action, state){
    return {
        ...state,
        callStatus: {
            ...state.callStatus,
            ...action.payload
        }
    }
}