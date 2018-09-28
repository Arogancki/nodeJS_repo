import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Connection, Status } from '../../providers/Connection'

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

  constructor(private router: Router, private connection: Connection) { 
    if(this.connection.getStatus() === Status.Ready)
      this.router.navigate([''])
    this.messages = []
    this.connection.onConnect = this.update.bind(this)
    this.connection.onReceive = this.update.bind(this)
    this.connected = false
    this.name = this.connection.getName()
  }

  ngOnInit() {
  }

  update(messages) {
    if (typeof messages === typeof [])
      this.messages = [...this.messages, ...messages]
    else
      this.messages.push(messages)
    
    setTimeout(() => {
      document.getElementById("lastElement").scrollIntoView()
    }, 10);
  }

  send(message) {
    this.connection.send(message.value)
    message.value = ''
  }

}
