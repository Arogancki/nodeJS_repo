import { Injectable } from '@angular/core'

export enum Status {
  Connected,
  Pending,
  Ready
}

@Injectable()
export class Connection {
    _status: Status;
    _client: any;
    _name: String;
    _websyncUrl: String;
    onReceive: Function;
    onConnect: Function;

    constructor(){
      this._status = Status.Ready
    }
  
    getStatus() {
      return this._status
    }

    getName() {
      return this._name
    }

    connect(websyncUrl, name){
      this._name = name
      this._websyncUrl = websyncUrl
      this._status = Status.Pending
      this._client = new fm.websync.client(websyncUrl)
      this.onReceive = ()=>console.warn('onReceive not hooked')
      this.onConnect = ()=>console.warn('onConnect not hooked')
      this._client.connect({
        onSuccess: (e)=>{
            console.log('Connected to WebSync.')
            this._status = Status.Connected
            this._client.subscribe({
              channel: '/messages',
              onSuccess: (e)=>this.onConnect(e.getExtensionValue('chat')),
              onReceive: (e)=>this.onReceive(e.getData()),
              onFailure: (e)=>this._onFailure(e, `Could not fetch messages`)
            })
        },
        onFailure: (e)=>{
          this._status = Status.Ready 
          this._onFailure(e, `Could not connect to WebSync`)
        }
      });
    }

    send(text: String, onSuccess=()=>{}){
      if (!text || this._status !== Status.Connected)
        return false
      this._client.service({
        channel: '/message',
        data: {
          name: this._name,
          message: text
        },
        onSuccess: onSuccess,
        onFailure: (e)=>this._onFailure(e, `Could not send a message`)
      });
    }

    _onFailure(e, mes="") {
      const err = (mes ? `${mes} : ` : '') + e.getException().message
      console.error(err);
      alert(err);
    }

  }