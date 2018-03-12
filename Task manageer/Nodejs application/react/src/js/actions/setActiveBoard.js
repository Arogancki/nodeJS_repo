import axios from "axios";

let timer;
export function setActiveBoardAction(key) {
    return {type: "SET_ACTIVE_BOARD", payload: key}
  }