import { Component, OnInit } from '@angular/core';
import { IntervenantMedicale } from 'src/app/entities/IntervenantMedicale';
import { CompanyServices } from 'src/app/services/UserService/CompanyServices';
import { Observable } from 'rxjs';
import { Parain } from 'src/app/entities/Parrain';
import { NgxAgoraService, AgoraClient, Stream, ClientEvent, StreamEvent } from 'ngx-agora';

@Component({
  selector: 'app-medic-patients',
  templateUrl: './medic-patients.component.html',
  styleUrls: ['./medic-patients.component.scss']
})
export class MedicPatientsComponent implements OnInit {
  medic:IntervenantMedicale=new IntervenantMedicale();
  constructor(private companyservices:CompanyServices,private ngxAgoraService:NgxAgoraService) {
    this.uid = Math.floor(Math.random() * 100);
   }
   localCallId = 'agora_local';
remoteCalls: string[] = [];
private client: AgoraClient;
private localStream: Stream;
private uid: number;
clicked:boolean=false;
  patients:any[]=[];
  d:any;
  pat:Parain=new Parain();

  ngOnInit() {
    let a =JSON.parse(localStorage.getItem('user'));
    console.log(a[0].roleRefId);
    this.companyservices.getIntMedicaleById(a[0].roleRefId).subscribe(data =>  {
      this.medic = JSON.parse(JSON.stringify(data.data()));     
      for(let c of this.medic.parrain){
        console.log(c);
        this.companyservices.getParrainById(c).subscribe(data=>{
          this.pat=JSON.parse(JSON.stringify(data.data()));
          this.patients.push(this.pat);
        });
        
      }       
    });
    
    

  }
  show(){
    console.log(this.patients);
  }
  livechat(){
    this.clicked=!this.clicked;
    this.client = this.ngxAgoraService.createClient({ mode: 'rtc', codec: 'h264' });
      this.assignClientHandlers();
  
      this.localStream = this.ngxAgoraService.createStream({ streamID: this.uid, audio: true, video: true, screen: false });
      this.assignLocalStreamHandlers();
      this.initLocalStream(() => this.join(uid => this.publish(), error => console.error(error))); 
  }
  join(onSuccess?: (uid: number | string) => void, onFailure?: (error: Error) => void): void {
    this.client.join(null, 'foo-bar', this.uid, onSuccess, onFailure);
  }
  publish(): void {
    this.client.publish(this.localStream, err => console.log('Publish local stream error: ' + err));
  }
  private assignClientHandlers(): void {
    this.client.on(ClientEvent.LocalStreamPublished, evt => {
      console.log('Publish local stream successfully');
    });

    this.client.on(ClientEvent.Error, error => {
      console.log('Got error msg:', error.reason);
      if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.client.renewChannelKey(
          '',
          () => console.log('Renewed the channel key successfully.'),
          renewError => console.error('Renew channel key failed: ', renewError)
        );
      }
    });

    this.client.on(ClientEvent.RemoteStreamAdded, evt => {
      const stream = evt.stream as Stream;
      this.client.subscribe(stream, { audio: true, video: true }, err => {
        console.log('Subscribe stream failed', err);
      });
    });

    this.client.on(ClientEvent.RemoteStreamSubscribed, evt => {
      const stream = evt.stream as Stream;
      const id = this.getRemoteId(stream);
      if (!this.remoteCalls.length) {
        this.remoteCalls.push(id);
        setTimeout(() => stream.play(id), 1000);
      }
    });

    this.client.on(ClientEvent.RemoteStreamRemoved, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = [];
        console.log(`Remote stream is removed ${stream.getId()}`);
      }
    });

    this.client.on(ClientEvent.PeerLeave, evt => {
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
