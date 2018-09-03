import actionFactory from "../../actions/actionFactory"
import types from "../../actions/types"
import { connect } from "./helper"
import statuses from "../../lib/statuses"

const CALL_STATUS_CHANGED = actionFactory(types.CALL_STATUS_CHANGED)

function closeMediaStream(stream){
    return stream && stream.getTracks().forEach(track=>track.stop())
}

function closeMediaStreams(callStatus){
    closeMediaStream(callStatus.selfView)
    closeMediaStream(callStatus.remoteView)
}

function hangup(action){
    action.payload.hangup()
    reset(action, "The call has ended")
}

function reset(action, message){
    console.log('reset')
    action.asyncDispatch(CALL_STATUS_CHANGED({
        roomId: null,
        status: 'ready',
        info: message,
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
    }))
}

export default function newCallHelper(action, state){
    const call = action.payload

    action.asyncDispatch(CALL_STATUS_CHANGED({
        roomId: call.roomId,
        hangup: ()=>hangup(action),
        localVideoSwitch: ()=>call.sendingVideo ? call.stopSendingVideo() : call.startSendingVideo(),
        localAudioSwitch: ()=>call.sendingAudio ? call.stopSendingAudio() : call.startSendingAudio(),
        remoteVideoSwitch: ()=>call.receivingVideo ? call.stopReceivingVideo() : call.startReceivingVideo(),
        remoteAudioSwitch: ()=>call.receivingAudio ? call.stopReceivingAudio() : call.startReceivingAudio(),
        screenShareSwitch: ()=>(call.localScreenShare||{}).active ? call.stopScreenShare() : call.startScreenShare(),
        applicationShareSwitch: ()=>(call.localScreenShare||{}).active ? call.stopScreenShare() : call.startApplicationShare()
    }))

    call.on('error', (err) => {
        console.log('error') 
        // state.callStatus.hangup && state.callStatus.hangup()
        alert(err)
        console.error(err)
        // reset(action, err.message)
    })
    
    call.on('change:localMediaStream', (call) => {
        action.asyncDispatch(CALL_STATUS_CHANGED({
            selfView: call.localMediaStream
        }))
    })

    call.on('change:remoteMediaStream', (call) => {
        console.log('remoteMediaStream:change')
        action.asyncDispatch(CALL_STATUS_CHANGED({
            remoteView: call.remoteMediaStream
        }))
    })

    call.on('change:localScreenShare', (call) => {
        console.log('change:localScreenShare')
        action.asyncDispatch(CALL_STATUS_CHANGED({
            localScreenShare: call.localScreenShare
        }))
    })

    call.on('inactive', (call) => {
        console.log('inactive')
        closeMediaStreams(state.callStatus)
        reset(action)
    })

    call.on('change:sendingAudio', (call) => {
        console.log('change:sendingAudio')
        action.asyncDispatch(CALL_STATUS_CHANGED({
            sendingAudio: call.sendingAudio
        }))
      })
    
    call.on('change:sendingVideo', (call) => {
        console.log('change:sendingVideo')
        action.asyncDispatch(CALL_STATUS_CHANGED({
            sendingVideo: call.sendingVideo
        }))
    })

    call.on('change:receivingAudio', (call) => {
        console.log('change:sendingAudio')
        action.asyncDispatch(CALL_STATUS_CHANGED({
            receivingAudio: call.receivingAudio
        }))
      })
    
    call.on('change:receivingVideo', (call) => {
        console.log('change:sendingVideo')
        action.asyncDispatch(CALL_STATUS_CHANGED({
            receivingVideo: call.receivingVideo
        }))
    })

    call.on('change:remoteAudioMuted', (call) => {
        console.log('change:remoteAudioMuted')
        action.asyncDispatch(CALL_STATUS_CHANGED({
            remoteAudioMuted: call.remoteAudioMuted
        }))
    })

    call.on('change:remoteVideoMuted', (call) => {
        console.log('change:remoteVideoMuted')
        action.asyncDispatch(CALL_STATUS_CHANGED({
            remoteVideoMuted: call.remoteVideoMuted
        }))
    })

    call.on('change:activeParticipantsCount', (call) => {
        console.log('change:activeParticipantsCount')
        action.asyncDispatch(CALL_STATUS_CHANGED({
            activeParticipantsCount: call.activeParticipantsCount
        }))
    })

    call.on('change:status', (call) => {
        console.warn('Meeting State Changed')
        action.asyncDispatch(CALL_STATUS_CHANGED({
            status: call.status
        }))
        if (call.status==="disconnected"){
            reset(action, "call ended")
        }
    })

    call.on('membership:change', (memberships)=>{
        console.warn('membership:change - Joined/Left ')
        Promise.all(memberships.collection.models
            .filter(model=>model._values)
            .filter(model=>model.state === "connected")
            .map(model=>{
                const {audioMuted, isSelf, videoMuted, personId, personUuid} = model._values
                return state.spark.people.get(personId || personUuid || model).then(person=>{
                    // object person contains also other fields!! like 1name lastname, timezone
                    return {
                        id: person.id,
                        name: person.displayName,
                        emails: person.emails,
                        isMe: isSelf,
                        micStatus: !audioMuted,
                        camStatus: !videoMuted,
                        state: model.state
                    }
                })
        })).then(members=>{
                action.asyncDispatch(CALL_STATUS_CHANGED({
                    members
                }))
            }
        )
    })

    window.myEvents = {}

    /*
    async function logger(name){
        call.on(name, (d) => {
            console.log(name, 'happened')
            window.myEvents[name] ? window.myEvents[name].push({call, data:d}) : window.myEvents[name] = [ {data:d, call} ]
        })
    }
    
    logger('change:activeParticipantsCount')
    logger('change:isActive')
    logger('change:media.localMediaStream')
    logger('change:remoteMember')
    logger('change:remoteAudioMuted')
    logger('change:remoteMediaStream')
    logger('change:remoteVideoMuted')
    logger('change:localScreenShare')


    logger('active')
    logger('terminating')
    logger('remoteMediaStream:change')
    logger('memberships:remove')
    logger('memberships:add')// kiedy ktos doda kogos do calla
    logger('membership:waiting')
    logger('membership:notified')
    logger('membership:declined')
    logger('membership:disconnected') // zostalem odlaczony wyrzucony z rozmowy lub ktos wyszedl // mozna tu czyscic elementy apki etc
    logger('membership:connected')// ktos nowy dolaczyl sie do calla
    logger('membership:change')
    logger('localMediaStream:change')
    logger('inactive')
    logger('change:state')
    logger('change:remoteVideoMuted')
    logger('change:remoteMember')
    logger('change:remoteMediaStream')
    logger('change:remoteAudioMuted')
    logger('change:media.localMediaStream')
    logger('change:locus')
    logger('change:localScreenShare')
    logger('change:localMediaStream')
    logger('change:isActive')
    logger('change:activeParticipantsCount')
    logger('change') // wszystkie chage
    */

    call.on('all', (name, data) => {
        console.log(name, 'happened')
        action.asyncDispatch(CALL_STATUS_CHANGED({
            call: call,
            fakedata: ++state.callStatus.fakedata
        }))
        window.myEvents[name] ? window.myEvents[name].push({call:call, time: Date.now(), data:data}) : window.myEvents[name] = [ {call:call, time: Date.now(), data: data} ]
    })

    return state
}