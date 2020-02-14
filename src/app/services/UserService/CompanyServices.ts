import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Assurance } from 'src/app/entities/Assurance';
import { Observable } from 'rxjs';
import { User } from 'src/app/entities/User';
import { CommaExpr, ParseTreeResult } from '@angular/compiler';
import { IntervenantMedicale } from 'src/app/entities/IntervenantMedicale';
import { Parain } from 'src/app/entities/Parrain';
import { Company } from 'src/app/entities/Company';
import { Conducteur } from 'src/app/entities/Conducteur';
import { map } from 'rxjs/operators';

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
        
        this.InsuranceCollection.doc(Assurance.id).update(JSON.parse(JSON.stringify(Assurance)));
        for(let parrainid of Assurance.parrains){
            this.getParrainById(parrainid).subscribe(data => {
                let client = JSON.parse(JSON.stringify(data.data()));
                for(let carid of client.conducteurs){
                    
                    this.getCarById(carid).subscribe(data => {
                        let car = JSON.parse(JSON.stringify(data.data()));
                        if(car.assurance === Assurance.id){
                            car.assuranceName = Assurance.name;
                            car.assuranceEmail = Assurance.email;
                            this.UpdateCar(car);
                        }
                      
                    });
                }
            })
        }
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
carss:any[];
companies:any[];
Inssurancess:any[];
Intermedicale:any[];
    deleteClient(x) {
        //car
        this.carss = [];
        this.companies = [];
        this.Inssurancess = [];
        this.Intermedicale = [];
 this.getCarsByParrain(x.id).subscribe(cars => {
    
   this.carss = cars;
     if(this.carss.length !== 0){
        for(let car of this.carss){
         this.CarCollection.doc(car.id).delete();
        }
     }
 })  
    
        
        //company
       this.getCompanybyparrain(x.id).subscribe(Companies => {
           
           this.companies = Companies;
   
             if(this.companies.length !== 0 ){
                for(let company of this.companies){
                  let a = company.parrains;
                  for(let parrain of a){
                      if(parrain === x.id){
                        let index =a.indexOf(parrain);
                        a.splice(index,1);
                        company.parrains = a;
                      }
                  }
                 
                this.CompanyCollection.doc(company.id).update(JSON.parse(JSON.stringify(company)));
                  }
             }
       });
        //insurance
        this.getInssurancebyparrain(x.id).subscribe(Inssurances => {
           
            this.Inssurancess = Inssurances;
          
              if(this.Inssurancess.length !== 0 ){
                 for(let insure of this.Inssurancess){
                   let a = insure.parrains;
                   for(let parrain of a){
                       if(parrain === x.id){
                         let index =a.indexOf(parrain);
                         a.splice(index,1);
                         insure.parrains = a;
                       }
                   }
                  
                  this.CompanyCollection.doc(insure.id).update(JSON.parse(JSON.stringify(insure)));
                   }
              }
        });
        //int medicale
        this.getIntMedicalebyparrain(x.id).subscribe(medicales => {
           
            this.Intermedicale = medicales;
            console.log(medicales);
              if(this.Intermedicale.length !== 0 ){
                 for(let medic of this.Intermedicale){
                   let a = medic.parrain;
                   for(let parrn of a){
                       if(parrn === x.id){
                         let index =a.indexOf(parrn);
                         a.splice(index,1);
                         medic.parrain = a;
                       }
                   }
                   console.log(medic);
                   this.MedicalCollection.doc(medic.id).update(JSON.parse(JSON.stringify(medic)));
                   }
              }
        });  

        //finally delete Client
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
    getInssurancebyparrain(parrainid){
        
        let Cars = this.db.collection('Insurance', ref => ref.where('parrains', 'array-contains', parrainid)).snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              data['id'] = id;
              return data;
            }
            ))
          );
          return Cars;

    }
    getCompanybyparrain(parrainid){
        
        let Cars = this.db.collection('Company', ref => ref.where('parrains', 'array-contains', parrainid)).snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              data['id'] = id;
              return data;
            }
            ))
          );
          return Cars;

    }
    getIntMedicalebyparrain(parrainid){
        
        let Cars = this.db.collection('IntMedicale', ref => ref.where('parrain', 'array-contains', parrainid)).snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              data['id'] = id;
              return data;
            }
            ))
          );
          return Cars;

    }
    getCarsByParrain(parrainid){


        let Cars = this.db.collection('Car', ref => ref.where('refParrain', '==', parrainid)).snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              data['id'] = id;
              return data;
            }
            ))
          );
          return Cars;



    }
    UpdateCar(Car: Conducteur) {

        this.CarCollection.doc(Car.id).update(JSON.parse(JSON.stringify(Car)));
    }
    deleteCar(x,haveassign,needinssuresupdate) {
   if(!haveassign){

    this.getParrainById(x.refParrain).subscribe(data => {
        console.log(data.data().conducteurs);
        let a = JSON.parse(JSON.stringify(data.data()));
        let index =a.conducteurs.indexOf(x.id);
        a.conducteurs.splice(index,1);
      
       
       this.updateClient(a);
       console.log(a);
       this.CarCollection.doc(x.id).delete();
    })

   }else {
if (needinssuresupdate){
    this.getParrainById(x.refParrain).subscribe(data => {
        console.log(data.data().conducteurs);
        let a = JSON.parse(JSON.stringify(data.data()));
        let index =a.conducteurs.indexOf(x.id);
        a.conducteurs.splice(index,1);
      
       
       this.updateClient(a);
       console.log(a);
       this.getInsurranceById(x.assurance).subscribe(data => {
           let a = JSON.parse(JSON.stringify(data.data()));
           let index =a.parrains.indexOf(x.refParrain);
           a.parrains.splice(index,1);
           this.updateInsurance(a);
       })
       this.CarCollection.doc(x.id).delete();
    })

}else {
    this.getParrainById(x.refParrain).subscribe(data => {
        console.log(data.data().conducteurs);
        let a = JSON.parse(JSON.stringify(data.data()));
        let index =a.conducteurs.indexOf(x.id);
        a.conducteurs.splice(index,1);
      
       
       this.updateClient(a);
       console.log(a);
       this.CarCollection.doc(x.id).delete();
    })


}

   }
        
   

    }
    getCarById(userId) {
        return this.CarCollection.doc(userId).get();
    }
    CreateCarwithassignassurance(Car: Conducteur, Parain ,assurance) {
        this.CarCollection.add(JSON.parse(JSON.stringify(Car))).then(docRef => {
            docRef.update({ id: docRef.id,refParrain:Parain.id,assurance:assurance.id,assuranceName:assurance.name,assuranceEmail:assurance.email });
            if(!Parain.conducteurs){
                Parain.conducteurs = [];
            }
            if(!assurance.parrains){
                assurance.parrains = [];
            }
            Parain.conducteurs.push(docRef.id);
                   this.updateClient(Parain);
             //to update
             let tester:boolean = false;
             for(let idparrain of assurance.parrains){
                 if(idparrain === Parain.id ){
 tester = true;
                 }
             }
             if(!tester){
                assurance.parrains.push(Parain.id);
                this.updateInsurance(assurance);
             }
           
        
           
        });
    }
    
    CreateCarwithinsuranceDetails(Car: Conducteur, Parain,Newinsurance) {
        this.CarCollection.add(JSON.parse(JSON.stringify(Car))).then(docRef => {
            docRef.update({ id: docRef.id,refParrain:Parain.id,assuranceName:Newinsurance.name,assuranceEmail:Newinsurance.email});
            if(!Parain.conducteurs){
                Parain.conducteurs = [];
            }
            Parain.conducteurs.push(docRef.id);
            this.updateClient(Parain);
        });
    }

    getParrainById(id){
        return this.ClientCollection.doc(id).get(); 
    }
   
    getInsurranceById(id){
        return this.InsuranceCollection.doc(id).get(); 
    }
    getIntMedicaleById(id){
        return this.MedicalCollection.doc(id).get(); 
    }
   

}
