import { Component, OnInit } from '@angular/core';
import { Parain } from 'src/app/entities/Parrain';
import { CompanyServices } from 'src/app/services/UserService/CompanyServices';
import { AgoraClient, Stream, NgxAgoraService, StreamEvent, ClientEvent } from 'ngx-agora';

@Component({
  selector: 'app-clients-profile',
  templateUrl: './clients-profile.component.html',
  styleUrls: ['./clients-profile.component.scss']
})
export class ClientsProfileComponent implements OnInit {
 client:Parain=new Parain();
 edit:boolean=true;
 localCallId = 'agora_local';
remoteCalls: string[] = [];
private Client: AgoraClient;
private localStream: Stream;
private uid: number;
clicked:boolean=false;
  constructor(private companyservices:CompanyServices,private ngxAgoraService:NgxAgoraService) { 
    this.uid = Math.floor(Math.random() * 100);
  }

  ngOnInit() {
    let a =JSON.parse(localStorage.getItem('user'));
    console.log(a[0].roleRefId);
    this.companyservices.getClientById(a[0].roleRefId).subscribe(data =>  {
      this.client = JSON.parse(JSON.stringify(data.data()));                   
    });
  }
  showinfo(){
    console.log(this.client);
  }
  show(){
    this.edit=!this.edit;
    console.log(this.edit);
  }
  submitAdding(){
    this.companyservices.updateClient(this.client);
    this.edit=!this.edit;
  }
  livechat(){
    this.clicked=!this.clicked;
    this.Client = this.ngxAgoraService.createClient({ mode: 'rtc', codec: 'h264' });
      this.assignClientHandlers();
  
      this.localStream = this.ngxAgoraService.createStream({ streamID: this.uid, audio: true, video: true, screen: false });
      this.assignLocalStreamHandlers();
      this.initLocalStream(() => this.join(uid => this.publish(), error => console.error(error))); 
  }
  join(onSuccess?: (uid: number | string) => void, onFailure?: (error: Error) => void): void {
    this.Client.join(null, 'foo-bar', this.uid, onSuccess, onFailure);
  }
  publish(): void {
    this.Client.publish(this.localStream, err => console.log('Publish local stream error: ' + err));
  }
  private assignClientHandlers(): void {
    this.Client.on(ClientEvent.LocalStreamPublished, evt => {
      console.log('Publish local stream successfully');
    });

    this.Client.on(ClientEvent.Error, error => {
      console.log('Got error msg:', error.reason);
      if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.Client.renewChannelKey(
          '',
          () => console.log('Renewed the channel key successfully.'),
          renewError => console.error('Renew channel key failed: ', renewError)
        );
      }
    });

    this.Client.on(ClientEvent.RemoteStreamAdded, evt => {
      const stream = evt.stream as Stream;
      this.Client.subscribe(stream, { audio: true, video: true }, err => {
        console.log('Subscribe stream failed', err);
      });
    });

    this.Client.on(ClientEvent.RemoteStreamSubscribed, evt => {
      const stream = evt.stream as Stream;
      const id = this.getRemoteId(stream);
      if (!this.remoteCalls.length) {
        this.remoteCalls.push(id);
        setTimeout(() => stream.play(id), 1000);
      }
    });

    this.Client.on(ClientEvent.RemoteStreamRemoved, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = [];
        console.log(`Remote stream is removed ${stream.getId()}`);
      }
    });

    this.Client.on(ClientEvent.PeerLeave, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(call => call !== `${this.getRemoteId(stream)}`);
        console.log(`${evt.uid} left from this channel`);
      }
    });
  }

  private getRemoteId(stream: Stream): string {
    return `agora_remote-${stream.getId()}`;
  }
  private assignLocalStreamHandlers(): void {
    this.localStream.on(StreamEvent.MediaAccessAllowed, () => {
      console.log('accessAllowed');
    });

    // The user has denied access to the camera and mic.
    this.localStream.on(StreamEvent.MediaAccessDenied, () => {
      console.log('accessDenied');
    });
  }

private initLocalStream(onSuccess?: () => any): void {
  this.localStream.init(
    () => {
       // The user has granted access to the camera and mic.
       this.localStream.play(this.localCallId);
       if (onSuccess) {
         onSuccess();
       }
    },
    err => console.error('getUserMedia failed', err)
  );
}
hide(){
  //this.clicked=!this.clicked;
  location.reload();
}

 

}
