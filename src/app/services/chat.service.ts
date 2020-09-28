import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Message } from '../interface/message.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public user: any = {};
  public MessagesCollection: AngularFirestoreCollection<Message>;
  public chats: Observable<Message[]>;


  constructor(public db: AngularFirestore,
              public auth: AngularFireAuth) {

    this.auth.authState.subscribe( user => {
      console.log(user);
      if(!user){
        return;
      }
      this.user.name = user.displayName;
      this.user.uid = user.uid;
    })
  }

  login(provider) {
    if(provider == "google"){
      this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }else{
      this.auth.signInWithPopup(new auth.FacebookAuthProvider());
    }
  }

  logout() {
    this.user = {};
    this.auth.signOut();
  }

  loadMessage() {
    this.MessagesCollection = this.db.collection<Message>('chats', ref => ref.orderBy('date', 'desc').limit(10));
    this.chats = this.MessagesCollection.valueChanges();
    return this.chats;
  }

  sendMessage(text: string) {
    let message: Message = {
      name: this.user.name,
      message: text,
      date: new Date().getTime(),
      uid: this.user.uid
    }
    return this.MessagesCollection.add(message);
  }

}
