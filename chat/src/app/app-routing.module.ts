import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component'
import { ChatComponent } from './chat/chat.component'

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'chat',
        component: ChatComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }