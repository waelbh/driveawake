import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { SuperAdmin } from 'src/app/entities/SuperAdmin';
import { Company } from 'src/app/entities/Company';
import { Observable } from 'rxjs';
import { User } from 'src/app/entities/User';
import { CommaExpr } from '@angular/compiler';
import { map } from 'rxjs/operators';
function makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }
 

@Injectable({
    providedIn: 'root'
})
export class SuperAdminServices {

    CompanyCollection: AngularFirestoreCollection<Company>;
    UserCollection: AngularFirestoreCollection<User>;
    constructor(private db: AngularFirestore) {
        this.CompanyCollection = this.db.collection('Company');
        this.UserCollection = this.db.collection('User');
    }

    addCompany(company: Company) {
        let user = new User();
       
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        const lengthOfCode = 8;
      var a =  makeRandom(lengthOfCode, possible);
       company.password =a ;
        this.CompanyCollection.add(JSON.parse(JSON.stringify(company))).then(docRef => {
            docRef.update({id: docRef.id});
            user.email = company.email;
            user.password = company.password;
            user.role = "company";
            user.roleRefId = docRef.id;
            this.UserCollection.add(JSON.parse(JSON.stringify(user)));
       
       })
       .catch(error => console.error("Error adding document: ", error));
   
    }
    getCompanies(){
        return this.CompanyCollection.valueChanges() ;
    }
    deleteCompany(x){  
        this.CompanyCollection.doc(x.id).delete();
     
    }
    updateCompany(company:Company){
        
        this.CompanyCollection.doc(company.id).update(JSON.parse(JSON.stringify(company)));
        let Companies = this.db.collection('User', ref => ref.where('roleRefId', '==', company.id)).snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              data['id'] = id;
              return data;
            }
            ))
          );
         Companies.subscribe(data => {
             let a = JSON.parse(JSON.stringify(data[0]));
             a.email = company.email;
             a.password = company.password;
             console.log(a);
             this.UserCollection.doc(a.id).update(a);
         })
    }
   
}
