import ciscospark from "ciscospark"

import types from "../../actions/types"
import accessTokenHelper from "./accesTokenHelper"
import registrationStatusHelper from "./registrationStatus"
import callStatusHelper from "./callStatusHelper"
import newCallHelper from "./newCallHelper"
import statuses from "../../lib/statuses"
import { connect } from "./helper"

export default function ciscosparkReducer(state={
    ciscospark: ciscospark,
    spark: null,
    accessToken: null,
    registrationStatus: {
        status: statuses.READY,
        info: ''
    },
    callStatus: {
        roomId: null,
        status: 'ready',
        info: '',
        members: [],
        selfView: null,
        remoteView: null,
        sendingAudio: false,
        sendingVideo: false,
        receivingVideo: false,
        receivingAudio: false,
        localVideoSwitch: null,
        localAudioSwitch: null,
        remoteVideoSwitch: null,
        remoteAudioSwitch: null,
        remoteVideoMuted: false,
        remoteAudioMuted: false,
        screenShareSwitch: null,
        applicationShareSwitch: null,
        localScreenShare: null,
        activeParticipantsCount: 0,
        hangup: null,
        call: null,
        fakedata: 0,
    }
}, action) {
    switch (action.type) {
        case types.ACCES_TOKEN_GIVEN: {
            return accessTokenHelper(action, state)
        }
        case types.REGISTRATION_STATUS_CHANGED: {
            return registrationStatusHelper(action, state)
        }
        case types.INCOMING_CALL: {
            return newCallHelper(action, state)
        }
        case types.OUTCOMING_CALL: {
            connect(state.spark, action)
            .then(_=>{
                const roomId = action.payload
                action.payload = state.spark.phone.dial(roomId)
                action.payload.roomId = roomId
                return newCallHelper(action, state)
            }).catch(()=>{})
            return state
        }
        case types.CALL_STATUS_CHANGED: {
            return callStatusHelper(action, state)
        }
    }
    return state
}