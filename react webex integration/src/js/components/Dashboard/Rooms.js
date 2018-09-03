import React from "react"

export default class Rooms extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            rooms: props.rooms
        }
    }
    selectRoom(key){
        return this.props.selectRoom(this.props.rooms[key])
    }
    render(){
        const rooms = this.props.rooms.length === 0
            ? <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                You have no rooms
            </div> 
            : <ul>
                {this.props.rooms.map((v,k)=><li key={k} style={{height: '55px', padding: '10px 0'}}>
                    <button onClick={e=>this.selectRoom(k)} class='b2' style={{height: '100%', width: '100%', fontSize: '2vh'}}>{v.title}</button>
                </li>)}
            </ul>
        return <div style={{width: "100%", height: '100%', borderRight: '2px solid white'}}>
            <div style={{height: '10%', width: '100%', padding: '5% 0', fontSize: '3vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                Rooms
            </div>
            <div style={{height: '5%', width: '100%'}}>
                <button onClick={e=>this.props.newRoom(e)} class='b2' style={{height: '100%', width: '100%', fontSize: '2vh'}}>+ new</button>
            </div>
            <div style={{height: '80%', overflowY: 'auto'}}>
                {rooms}
            </div>
        </div>
    }
}