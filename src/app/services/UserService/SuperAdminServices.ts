import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { SuperAdmin } from 'src/app/entities/SuperAdmin';
import { Company } from 'src/app/entities/Company';
import { Observable } from 'rxjs';
import { User } from 'src/app/entities/User';
import { CommaExpr } from '@angular/compiler';


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
        
        this.CompanyCollection.doc(company.id).update(JSON.parse(JSON.stringify(company)))
    }
}
