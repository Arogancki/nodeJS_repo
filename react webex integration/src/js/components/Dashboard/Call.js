import React from "react"
import Video from "../Video"

export default class Call extends React.Component {
    constructor(props){
        super(props)
        this.inviteToRoom = this.inviteToRoom.bind(this)
        this.leaveRoom = this.leaveRoom.bind(this)
        this.remove = this.remove.bind(this)
    }
    inviteToRoom(id){
        const email = prompt(`who you'd like to invite?`)
        if (!email)
            return 
        return this.props.spark.memberships.create({
            personEmail: email,
            roomId: id
        })
        .then(data=>alert(`${email} invited.`))
        .catch(e=>alert(`${e.message}.`))
    }

    leaveRoom(roomId){
        this.props.leaveRoom(roomId)
    }

    remove(){
        Promise.all(this.props.call.call.memberships.models.filter(m=>!m.isSelf).map(m=>{
            return this.props.spark.people.get(m.personId || m.personUuid || m).then(p=>{return {
                membership: m,
                ...p
            }})
        })).then(members=>{
            if (members.length === 0)
                return Promise.reject('No enought user to remove')
            const choise = prompt(`Which one You'd like to remove? (${members.map(m=>`"${m.displayName}"`).join(', ')} ) `)
            if (!choise)
                return Promise.reject('No one to remove')
            const toRemove = members.find(m=>m.displayName.toLowerCase() === choise.toLowerCase())
            if (!toRemove)
                return Promise.reject('User is invalid')
            
            return this.props.spark.memberships.list({
                roomId: this.props.call.roomId,
                personEmail : toRemove.emails[0]
            })
        }).then(membership=>{
            if (membership.items.length !== 1)
                return alert('User is invalid')

            return this.props.spark.memberships.remove(membership.items[0]).then(d=>{
                return alert('removed')
            })
        }).catch(e=>{
            alert(e.message)
        })
    }

    render(){
        const screenShareButtonLabel = (this.props.call.localScreenShare||{}).active ? 'stop sharing' : null;
        const callButtons = <div style={{display: 'flex', alignContent: 'center', 
        justifyContent: 'space-evenly', width: "100%", height: '8%'}}>
            {this.props.call.hangup && <button type="button" class='b1' style={{fontSize: '1.2vh'}} onClick={this.props.call.hangup.bind(this)}>hang up</button>}
            {this.props.call.localVideoSwitch && <button class='b1'  style={{fontSize: '1.2vh'}} type="button" onClick={this.props.call.localVideoSwitch.bind(this)}>localVideoSwitch</button>}
            {this.props.call.localAudioSwitch && <button class='b1'  style={{fontSize: '1.2vh'}} type="button" onClick={this.props.call.localAudioSwitch.bind(this)}>localAudioSwitch</button>}
            {this.props.call.remoteVideoSwitch && <button class='b1'  style={{fontSize: '1.2vh'}} type="button" onClick={this.props.call.remoteVideoSwitch.bind(this)}>remoteVideoSwitch</button>}
            {this.props.call.remoteAudioSwitch && <button class='b1'  style={{fontSize: '1.2vh'}} type="button" onClick={this.props.call.remoteAudioSwitch.bind(this)}>remoteAudioSwitch</button>}
            {this.props.call.screenShareSwitch && <button class='b1'  style={{fontSize: '1.2vh'}} type="button" onClick={this.props.call.screenShareSwitch.bind(this)}>{screenShareButtonLabel||'share screen'}</button>}
            {this.props.call.applicationShareSwitch && <button class='b1' style={{fontSize: '1.2vh'}} type="button" onClick={this.props.call.applicationShareSwitch.bind(this)}>{screenShareButtonLabel||'share application'}</button>}
            {this.props.call.call && this.props.call.call.isActive && <button class='b1'  style={{fontSize: '1.2vh'}} type="button" onClick={this.remove.bind(this)}>remove</button>}
        </div>

        const participants = this.props.call.members
        .map((m, k)=><li key={k}>{`${k+1}:`}<ul>{Object.keys(m)
            .map(k=><li key={k}>{`${k}: ${m[k]}`}</li>)}</ul></li>)

        const middleScreen = <div style={{width: "100%", height: '78%'}}>
             <div style={{height: '50%', width: '100%', display: 'flex'}}>
                <div style={{height: '100%', width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {
                        this.props.call.receivingVideo ? 
                        <Video srcObject={this.props.call.remoteView}/>
                        : 'Remote cam view'
                    }
                </div>
                <div style={{overflow: 'auto', height: '100%', width: '50%'}}>
                    <div>status: {this.props.call.status}</div>
                    <div>{participants}</div>
                </div>
             </div>
             <div style={{height: '50%', width: '100%', display: 'flex'}}>
                <div style={{height: '100%', width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {
                        this.props.call.sendingVideo ? 
                        <Video key={1} srcObject={this.props.call.selfView}/>
                        : 'Local cam view'
                    }
                </div>
                <div style={{height: '100%', width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {
                        (this.props.call.localScreenShare||{}).active ? 
                        <Video key={2} srcObject={this.props.call.localScreenShare}/>
                        : 'shared resources view'
                    }
                </div>
             </div>
        </div>

        const callView = !this.props.call 
        ?  <div style={{width: "100%", height: '100%'}}/>
        : <div style={{width: "100%", height: '100%'}}>
            <div style={{width: "100%", height: '1%'}}/>
            <div style={{display: 'flex', alignContent: 'center', 
            justifyContent: 'space-evenly', width: "100%", height: '8%'}}>
                <button class='b1' style={{width: '15%', height: '100%'}} onClick={(e) => this.props.newCall(this.props.room.id)}>call</button>
                <button class='b1' style={{width: '15%', height: '100%'}} onClick={(e) => this.inviteToRoom(this.props.room.id)}>invite</button>
                <button class='b1' style={{width: '15%', height: '100%'}} onClick={(e) => this.leaveRoom(this.props.room.id)}>leave</button>
            </div>
            <div style={{width: "100%", height: '2%'}}/>
            {middleScreen}
            <div style={{width: "100%", height: '2%'}}/>
            {callButtons}
            <div style={{width: "100%", height: '1%'}}/>
        </div>

        return callView
    }
}