import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Message } from '../interface/message.interface';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public MessagesCollection: AngularFirestoreCollection<Message>;
  public chats: Observable<Message[]>;

  constructor(private db: AngularFirestore) {

    
  }

  loadMessage(){
    this.MessagesCollection = this.db.collection<Message>('chats', ref => ref.orderBy('date', 'desc').limit(10));
    this.chats = this.MessagesCollection.valueChanges();
    return this.chats;
  }

  sendMessage( text: string){

    let message : Message = {
      name: 'Demo',
      message: text,
      date: new Date().getTime()
    }

    return this.MessagesCollection.add( message );
  }

}
