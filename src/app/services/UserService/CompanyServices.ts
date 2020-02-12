import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Assurance } from 'src/app/entities/Assurance';
import { Observable } from 'rxjs';
import { User } from 'src/app/entities/User';
import { CommaExpr } from '@angular/compiler';
import { IntervenantMedicale } from 'src/app/entities/IntervenantMedicale';
import { Parain } from 'src/app/entities/Parrain';
import { Company } from 'src/app/entities/Company';
import { Conducteur } from 'src/app/entities/Conducteur';

@Injectable({
    providedIn: 'root'
})
export class CompanyServices {
    CompanyCollection: AngularFirestoreCollection<Company>;
    InsuranceCollection: AngularFirestoreCollection<Assurance>;
    MedicalCollection: AngularFirestoreCollection<IntervenantMedicale>;
    ClientCollection: AngularFirestoreCollection<Parain>;
    UserCollection: AngularFirestoreCollection<User>;
    CarCollection: AngularFirestoreCollection<Conducteur>;
    constructor(private db: AngularFirestore) {
        this.CompanyCollection = this.db.collection('Company');
        this.InsuranceCollection = this.db.collection('Insurance');
        this.MedicalCollection = this.db.collection('IntMedicale');
        this.ClientCollection = this.db.collection('Client');
        this.UserCollection = this.db.collection('User');
        this.CarCollection = this.db.collection('Car');
    }

    addInsurance(Assurance: Assurance) {
        let user = new User();
        this.InsuranceCollection.add(JSON.parse(JSON.stringify(Assurance))).then(docRef => {
            docRef.update({ id: docRef.id });
            user.email = Assurance.email;
            user.password = Assurance.password;
            user.role = "assurance";
            user.roleRefId = docRef.id;
            this.UserCollection.add(JSON.parse(JSON.stringify(user)));

        })
            .catch(error => console.error("Error adding document: ", error));

    }
    getInsurances() {
        return this.InsuranceCollection.valueChanges();
    }
    deleteInsurance(x) {
        this.InsuranceCollection.doc(x.id).delete();

    }
    updateInsurance(Assurance: Assurance) {

        this.InsuranceCollection.doc(Assurance.id).update(JSON.parse(JSON.stringify(Assurance)))
    }
    addMedical(medical: IntervenantMedicale): any {
        let user = new User();
        this.MedicalCollection.add(JSON.parse(JSON.stringify(medical))).then(docRef => {
            docRef.update({ id: docRef.id });
            user.email = medical.email;
            user.password = medical.password;
            user.role = "intervenantMedical";
            user.roleRefId = docRef.id;
            this.UserCollection.add(JSON.parse(JSON.stringify(user)));

        })
            .catch(error => console.error("Error adding document: ", error));

    }
    getMedicals() {
        return this.MedicalCollection.valueChanges();
    }
    deleteMedical(x) {
        this.MedicalCollection.doc(x.id).delete();

    }
    updateMedical(medical: IntervenantMedicale) {

        this.MedicalCollection.doc(medical.id).update(JSON.parse(JSON.stringify(medical)))
    }
    addClient(company: Company, client: Parain, medic: IntervenantMedicale) {

        let userone = new User();
        this.MedicalCollection.add(JSON.parse(JSON.stringify(medic))).then(docRefmedic => {
            docRefmedic.update({ id: docRefmedic.id });
            userone.email = medic.email;
            userone.password = medic.password;
            userone.role = "intervenantMedical";
            userone.roleRefId = docRefmedic.id;
            this.UserCollection.add(JSON.parse(JSON.stringify(userone)));







            let user = new User();

            this.ClientCollection.add(JSON.parse(JSON.stringify(client))).then(docRef => {
                if (!company.parrains) {
                    company.parrains = [];
                }
                if (!medic.parrain) {
                    medic.parrain = [];
                }
                docRef.update({ id: docRef.id });
                user.email = client.email;
                user.password = client.password;
                user.role = "client";
                user.roleRefId = docRef.id;
                let a = docRef.id;
                console.log(company.parrains, docRef.id);
                console.log(company);

                company.parrains.push(docRef.id);
                medic.parrain.push(docRef.id);
                console.log(medic);
                console.log(docRefmedic);
                this.MedicalCollection.doc(docRefmedic.id).update(JSON.parse(JSON.stringify(medic)));
                this.CompanyCollection.doc(company.id).update(JSON.parse(JSON.stringify(company)));
                this.UserCollection.add(JSON.parse(JSON.stringify(user)));

            })
                .catch(error => console.error("Error adding document: ", error));

        })
            .catch(error => console.error("Error adding document: ", error));

    }
    getClients() {
        return this.ClientCollection.valueChanges();
    }

    deleteClient(x) {
        this.ClientCollection.doc(x.id).delete();

    }
    updateClient(client: Parain) {

        this.ClientCollection.doc(client.id).update(JSON.parse(JSON.stringify(client)))
    }
    getCompanyById(userId) {
        return this.CompanyCollection.doc(userId).get();
    }


    //CArss
    getCars() {
        return this.CarCollection.valueChanges();
    }
    UpdateCar(Car: Conducteur) {

        this.CarCollection.doc(Car.id).update(JSON.parse(JSON.stringify(Car)));
    }
    deleteCar(x) {
        this.CarCollection.doc(x.id).delete();

    }
    getCarById(userId) {
        return this.CarCollection.doc(userId).get();
    }
    CreateCar(Car: Conducteur, Parain ,assurance) {
        this.MedicalCollection.add(JSON.parse(JSON.stringify(Car))).then(docRef => {
            docRef.update({ id: docRef.id });
            this.MedicalCollection.doc(Parain.id).update(JSON.parse(JSON.stringify(Parain)));
        });
    }

    getParrainById(id){
        return this.CompanyCollection.doc(id).get(); 
    }

}
