import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../interface/message.interface';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewChecked {

  @ViewChild('chat') scroll: ElementRef;
  public nativeElement: any;

  public message: string = "";
  public chats: Message[];
  public element: any;
  public user: any;

  constructor(private _cs: ChatService, public auth: AngularFireAuth) {
    this._cs.loadMessage().subscribe(data => this.chats = data.reverse());
    this.auth.authState.subscribe( user => this.user = user.uid);
  }

  ngAfterViewChecked() {
    this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
  }

  send() {
    if (this.message.length === 0) {
      return;
    }
    this._cs.sendMessage(this.message)
      .then(() => this.message = "")
      .catch((err) => console.error('Error', err));
  }

  login(provider){
    this._cs.login(provider);
  }

  logout(){
    this._cs.logout();
    this.user = null;
  }

}
