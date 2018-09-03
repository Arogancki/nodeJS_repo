import React from "react"
import { MoonLoader } from 'react-spinners'

export default class Chat extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            messages: null,
            value: ''
        }
        this.poolTimer = null
        this.lastCheckedChatId = null
        this.messagePooling = this.messagePooling.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        this.onButton = this.onButton.bind(this)
    }
    onButton(e){
        if (e.key === 'Enter')
            return document.getElementById('buttonSend').click()
        return true;
    }
    sendMessage(e){
        if (!this.state.value)
            return
        this.props.spark.messages.create({
            text: this.state.value,
            roomId : this.props.chat.id
        })
        this.setState({...this.state, value: ''})
        document.getElementById('messageInput').value='';
    }
    messagePooling(){
        self = this
        if (!self.props.chat)
            return
        return self.props.spark.messages.list({
            roomId: self.props.chat.id
        })
        .then(messages=>messages.items.reverse())
        .then(messages=>{
            if (!self.poolTimer)
                return
            if (self.lastCheckedChatId === self.props.chat.id
            && messages.length === self.state.messages.length)
                return
            self.lastCheckedChatId = self.props.chat.id
            return self.props.spark.memberships.list()
            .then(memberships=>Promise.all(messages.map(m=>
                self.props.spark.people.get(m.personId)
                .then(person=>({
                    ...m,
                    person: {
                        ...person,
                        isMe: person.id === memberships.items[0].personId
                    }
                }))
            )))
            .then(messages=>self.setState({...self.state, messages}))
        })
        .then(_=>{
            self.poolTimer = setTimeout(self.messagePooling, 1000)
        })
    }
    componentWillUnmount(){
        if (this.poolTimer){
            clearTimeout(this.poolTimer)
            this.poolTimer = null
        }
    }
    componentDidUpdate(prevProps) {
        if (this.messagesEnd) 
            this.messagesEnd.scrollIntoView({ behavior: "smooth" })
        if ((prevProps.chat || {}).id !== (this.props.chat || {}).id) {
            if (this.poolTimer){
                clearTimeout(this.poolTimer)
                this.poolTimer = null
            }
            this.poolTimer = setTimeout(this.messagePooling, 0)
            this.setState({...this.state, messages: null})
        }
    }
    render(){
        let chat = !this.props.chat
            ? <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <p>Select a room to active chat</p>
            </div>
            : (!this.state.messages 
            ? <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <MoonLoader color={'rgb(0, 195, 255)'} />
            </div> 
            : (!this.state.messages.length 
            ? <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <p>Chat is empty</p>
            </div>
            : <div style={{height: '100%'}}>
                <ul style={{margin: '0', overflowY: 'auto', height: '100%'}}>
                    {this.state.messages.map((v,k)=><li key={k}>
                        <div style={{width: '100%', display: 'flex', 
                        justifyContent: v.person.isMe ? 'flex-end' : 'flex-start'}}>
                            <div style={{width: '75%', padding: '2%'}}>
                                <div style={{textAlign: v.person.isMe ? 'right' : 'left',
                                 fontSize: '1.3vh'}}>{v.person.isMe ? 'You' : v.person.displayName}</div>
                                <div style={{border: '1px solid grey', borderRadius: '10px',
                                margin: '1%', padding: '2%'}}>{v.text}</div>
                                <div style={{textAlign: 'left', fontSize: '1vh'}}>{v.created}</div>
                            </div>
                        </div>
                    </li>)}
                    <li style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el }}>
                    </li>
                </ul>
            </div>
            ) 
            )
        let messageBox = !this.state.messages
        ? <div style={{width: '100%', height: '9%'}}/>
        : <div style={{width: '100%', height: '9%'}}>
            <div style={{width: '100%', height: '40%'}}></div>
            <div style={{height: '60%', width: "100%", display: 'flex'}}>
                <div style={{height: '100%', width: "1%"}}/>
                <input id='messageInput' style={{fontSize: '1.5vh', height: '100%', width: "79%", color: 'darkgray'}}
                type='text' placeholder='type your message...' 
                onKeyPress={evt => this.onButton(evt)}
                onChange={evt => this.setState({...this.state, value: evt.target.value})}/>
                <div style={{height: '100%', width: "1%"}}/>
                <button class='b2' style={{fontSize: '1.5vh', height: '100%', width: "18%"}} 
                type='button' id='buttonSend' onClick={ e => this.sendMessage(e)}>Send</button>
            </div>
        </div>
        return <div style={{width: "100%", height: '100%', borderLeft: '2px solid white'}}>
            <div style={{height: '90%', width: "100%", borderBottom: '1px solid whitesmoke'}}>
                {chat}
            </div>
            {messageBox}
        </div>
    }
}