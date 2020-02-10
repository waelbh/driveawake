import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { SuperAdmin } from 'src/app/entities/SuperAdmin';
import { Company } from 'src/app/entities/Company';
import { Assurance } from 'src/app/entities/Assurance';
import { IntervenantMedicale } from 'src/app/entities/IntervenantMedicale';
import { Parain } from 'src/app/entities/Parrain';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
    SuperAdminsCollection: AngularFirestoreCollection<SuperAdmin>;  
    CompanyCollection: AngularFirestoreCollection<Company>;
    insuranceCollection:AngularFirestoreCollection<Assurance>;
    InterMedicalesCollection:AngularFirestoreCollection<IntervenantMedicale>;
    ClientCollection:AngularFirestoreCollection<Parain>;
    
  constructor(private db:AngularFirestore) {
    this.SuperAdminsCollection=this.db.collection('SuperAdmins');
    
   }

   addSuperAdmin()
   {
    
    this.SuperAdminsCollection.add({'name':'Super Admin','email':'embeddedmajesty@gmail.com','password':'123'});
   }
   getUsers(){
     let UsersList = new  Observable<any[]>();
     

   }
}
