import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { SuperAdmin } from 'src/app/entities/SuperAdmin';


@Injectable({
  providedIn: 'root'
})
export class UserService {
    SuperAdminsCollection: AngularFirestoreCollection<SuperAdmin>;  
    
  constructor(private db:AngularFirestore) {
    this.SuperAdminsCollection=this.db.collection('SuperAdmins');
   }

   addSuperAdmin()
   {
    
    this.SuperAdminsCollection.add({'name':'Super Admin','email':'embeddedmajesty@gmail.com','password':'123'});
   }
}
