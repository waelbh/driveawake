import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { SuperAdmin } from 'src/app/entities/SuperAdmin';
import { Company } from 'src/app/entities/Company';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class SuperAdminServices {

    CompanyCollection: AngularFirestoreCollection<Company>;
    constructor(private db: AngularFirestore) {
        this.CompanyCollection = this.db.collection('Company');
    }

    addCompany(company: Company) {
        this.CompanyCollection.add(JSON.parse(JSON.stringify(company))).then(docRef => {
            docRef.update({id: docRef.id});
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
