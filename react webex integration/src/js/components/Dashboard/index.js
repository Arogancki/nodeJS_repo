import React from "react"

import Chat from "./chat"
import Call from "./call"
import Rooms from "./rooms"

export default class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            activeRoom: null,
            activeChat: null,
            rooms: props.spark.rooms.myRooms,
        }
    }
    getRooms(){
        return this.props.spark.rooms.list()
        .then(rooms=>Promise.all(rooms.items.map(r=>
            this.props.spark.memberships.list({
                roomId: r.id
            })
            .then(members=>{return {
                ...r,
                members: members.items
            }})
        )))
    }
    leaveRoom(roomId){
        const self = this
        return self.props.spark.memberships.list()
        .then(membership=>membership.items[0].personEmail)
        .then(email=>self.props.spark.memberships.list({
            roomId: roomId,
            personEmail: email
        }))
        .then(membeships=>{
            if (membeships.items.length !== 1)
                throw new Error('Invalid')
            return self.props.spark.memberships.remove(membeships.items[0])
        }).then(d=>{
            return this.getRooms()
        }).then(rooms=>{
            return this.setState({
                ...this.state,
                rooms: rooms, 
                activeRoom: null, 
                activeChat: null,
            })
        }).catch(e=>alert(e.message))
    }
    newRoom(e){
        const title = prompt('Please enter new room title')
        let _room
        if (!title)
            return
        return this.props.spark.rooms.create({title: title})
        .then(room=>{
            _room = room
            return this.getRooms()
        })
        .then(rooms=>{
            return this.setState({
                ...this.state, 
                rooms: rooms,
                activeChat: _room,
                activeRoom: _room
            })
        })
    }
    selectRoom(room){
        return this.setState({
            ...this.state, 
            activeRoom: room, 
            activeChat: room,
        })
    }
    removeCallFromView(){
        return this.setState({...this.state, activeRoom: null, activeChat: room})
    }
    render(){
        return <div style={{width: "100%", height: "100%"}}>
            <div style={{color: 'white', height: '6%', display: 'flex', width: '96%', padding: '2%'}}>
                <div style={{fontSize: '5vh', textAlign: 'left', width: '50%'}}>
                    
                </div>
                <div style={{fontSize: '5vh', textAlign: 'right', width: '50%'}}>WEBEX TEAMS POC</div>
            </div>
            <div style={{display: 'flex', height: '87%',
             width: "100%", backgroundColor: 'rgb(0,0,0,0.5)',
             border: '2px solid whitesmoke'}}>
                <div style={{width: "15%"}}><Rooms newRoom={this.newRoom.bind(this)} selectRoom={this.selectRoom.bind(this)} rooms={this.state.rooms}/></div>
                <div style={{width: "50%"}}><Call leaveRoom={this.leaveRoom.bind(this)} newCall={this.props.call} room={this.state.activeRoom} call={this.props.callStatus} spark={this.props.spark}/></div>
                <div style={{width: "35%"}}><Chat chat={this.state.activeChat} spark={this.props.spark}/></div>
            </div>
        </div>
    }
}