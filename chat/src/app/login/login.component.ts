import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Connection } from '../../providers/Connection'

const WEBSYNC_URL = 'http://localhost:2000/websync.ashx'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private router: Router, private connection: Connection) { }

  ngOnInit() {
  }

  onClick(name): void {
    if (!name)
      return
    this.connection.connect(WEBSYNC_URL, name)
    this.router.navigate(['/chat'])
  }

}
