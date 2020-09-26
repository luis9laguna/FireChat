import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../interface/message.interface';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewChecked {

  @ViewChild('asd') asd: ElementRef;

  public message: string = "";
  public chats: Message[];
  public element: any;

  constructor(private _cs: ChatService) {

    this._cs.loadMessage()
      .subscribe(data => {
        this.chats = data.reverse();
      })

  }
  ngAfterViewChecked(): void {
    this.asd.nativeElement.scrollTop = this.asd.nativeElement.scrollHeight;
  }


  send() {
    console.log(this.message);
    if (this.message.length === 0) {
      return;
    }

    this._cs.sendMessage(this.message)
      .then(() => this.message = "")
      .catch((err) => console.error('Error', err));

  }


}
