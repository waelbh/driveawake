import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { SuperAdmin } from 'src/app/entities/SuperAdmin';
import { Company } from 'src/app/entities/Company';


@Injectable({
    providedIn: 'root'
})
export class SuperAdminServices {

    CompanyCollection: AngularFirestoreCollection<Company>;
    constructor(private db: AngularFirestore) {
        this.CompanyCollection = this.db.collection('Company');
    }

    addCompany(company: Company) {
        this.CompanyCollection.add(company);
    }
}
