import { combineReducers } from "redux"

import boards from "./boardsReducer"
import invitations from "./invitationsReducer"

export default combineReducers({
  boards: boards,
  invitations: invitations
})