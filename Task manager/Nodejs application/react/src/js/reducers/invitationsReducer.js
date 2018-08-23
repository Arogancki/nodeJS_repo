export default function reducer(state={
    invitations: []
}, action) {
    switch (action.type) {
        case "getBoardsAndInvitations_FULFILLED": {
            return {...state, invitations: action.payload.invitations}
        }
        case "getBoardsAndInvitations_REJECTED": {
            return {...state}
        }
    }
    return state;
}
