import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { ActivatedRoute } from '@angular/router'

const websyncUrl = 'http://localhost:2000/websync.ashx'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  name: String; 
  connected: boolean;
  client: any;
  messages: Array<Object>;

  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe( params => this.name = params.name)
    this.connected = false
    this.client = new fm.websync.client(websyncUrl)
  }

  onFailure(e, mes="") {
    const err = (mes ? `${mes} : ` : '') + e.getException().message
    console.error(err);
    alert(err);
  }

  ngOnInit() {
    this.messages = [{name: '11', message:"12"}, {name: '21', message:"22"}]
    this.client.connect({
      onSuccess: (e)=>{
          console.log('Connected to WebSync.');
          this.connected = true
          this.client.subscribe({
            channel: '/messages',
            onSuccess: (e)=>this.messages = e.getExtensionValue('chat'),
            onReceive: (e)=>this.messages.push(e.getData()),
            onFailure: (e)=>this.onFailure(e, `Could not fetch messages`)
          })
      },
      onFailure: (e)=>this.onFailure(e, `Could not connect to WebSync`)
    });

  }

  send(text){
    if (!this.connected || !text)
      return
    this.client.service({
      channel: '/message',
      data: {
        name: this.name,
        message: text
      },
      onFailure: (e)=>this.onFailure(e, `Could not send a message`)
    });
  }

}
