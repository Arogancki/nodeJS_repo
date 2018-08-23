export default function reducer(state={
    boards: [],
    active: -1
}, action) {
    switch (action.type) {
        case "getBoardsAndInvitations_FULFILLED": {
            window.x= action.payload.boards;
            return {...state, boards: action.payload.boards}
        }
        case "getBoardsAndInvitations_REJECTED": {
            return {...state}
        }
        case "SET_ACTIVE_BOARD": {
            return {...state, active: action.payload}
        }
    }
    return state;
}
