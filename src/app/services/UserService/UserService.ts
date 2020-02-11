import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { SuperAdmin } from 'src/app/entities/SuperAdmin';
import { Company } from 'src/app/entities/Company';
import { Assurance } from 'src/app/entities/Assurance';
import { IntervenantMedicale } from 'src/app/entities/IntervenantMedicale';
import { Parain } from 'src/app/entities/Parrain';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { User } from 'src/app/entities/User';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  SuperAdminsCollection: AngularFirestoreCollection<SuperAdmin>;
  CompanyCollection: AngularFirestoreCollection<Company>;
  insuranceCollection: AngularFirestoreCollection<Assurance>;
  InterMedicalesCollection: AngularFirestoreCollection<IntervenantMedicale>;
  ClientCollection: AngularFirestoreCollection<Parain>;

  constructor(private db: AngularFirestore) {
    this.SuperAdminsCollection = this.db.collection('SuperAdmins');
    this.CompanyCollection = this.db.collection('Company');

  }

  addSuperAdmin() {

    this.SuperAdminsCollection.add({ 'name': 'Super Admin', 'email': 'embeddedmajesty@gmail.com', 'password': '123' });
  }
  getUsers() {
    let UsersList = new Observable<any[]>();
  }
  checkLogin(email, password) {
    let Companies = this.db.collection('User', ref => ref.where('email', '==', email).where('password', '==', password)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        data['id'] = id;
        return data;
      }
      ))
    );
    return Companies; 
  }

}
