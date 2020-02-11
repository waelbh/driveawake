import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Assurance } from 'src/app/entities/Assurance';
import { Observable } from 'rxjs';
import { User } from 'src/app/entities/User';
import { CommaExpr } from '@angular/compiler';
import { IntervenantMedicale } from 'src/app/entities/IntervenantMedicale';

@Injectable({
    providedIn: 'root'
})
export class CompanyServices {

    InsuranceCollection: AngularFirestoreCollection<Assurance>;
    MedicalCollection: AngularFirestoreCollection<IntervenantMedicale>;
    UserCollection: AngularFirestoreCollection<User>;
    constructor(private db: AngularFirestore) {
        this.InsuranceCollection = this.db.collection('Insurance');
        this.InsuranceCollection = this.db.collection('IntMedicale');
        this.UserCollection = this.db.collection('User');
    }

    addInsurance(Assurance: Assurance) {
        let user = new User();
        this.InsuranceCollection.add(JSON.parse(JSON.stringify(Assurance))).then(docRef => {
            docRef.update({id: docRef.id});
            user.email = Assurance.email;
            user.password = Assurance.password;
            user.role = "assurance";
            user.roleRefId = docRef.id;
            this.UserCollection.add(JSON.parse(JSON.stringify(user)));
       
       })
       .catch(error => console.error("Error adding document: ", error));
   
    }
    getInsurances(){
        return this.InsuranceCollection.valueChanges() ;
    }
    deleteInsurance(x){  
        this.InsuranceCollection.doc(x.id).delete();
     
    }
    updateInsurance(Assurance:Assurance){
        
        this.InsuranceCollection.doc(Assurance.id).update(JSON.parse(JSON.stringify(Assurance)))
    }
    addMedical(medical: IntervenantMedicale) {
        let user = new User();
        this.MedicalCollection.add(JSON.parse(JSON.stringify(medical))).then(docRef => {
            docRef.update({id: docRef.id});
            user.email = medical.email;
            user.password = medical.password;
            user.role = "intervenantMedical";
            user.roleRefId = docRef.id;
            this.UserCollection.add(JSON.parse(JSON.stringify(user)));
       
       })
       .catch(error => console.error("Error adding document: ", error));
   
    }
    getMedicals(){
        return this.MedicalCollection.valueChanges() ;
    }
    deleteMedical(x){  
        this.MedicalCollection.doc(x.id).delete();
     
    }
    updateMedical(medical: IntervenantMedicale){
        
        this.MedicalCollection.doc(medical.id).update(JSON.parse(JSON.stringify(medical)))
    }
}
