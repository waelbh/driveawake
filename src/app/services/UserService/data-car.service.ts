import { Injectable } from '@angular/core';
import { DataCar } from 'src/app/entities/DataCar';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataCarService {
  dataCarCollection: AngularFirestoreCollection<DataCar>;
  constructor(private db: AngularFirestore) { 
    this.dataCarCollection = this.db.collection('DataCar');
  }


  getCarData(refere){
    
    console.log(refere)
    
   
        let Cars = this.db.collection('DataCar', ref => ref.where('reference', '==',refere).orderBy('date','desc')).snapshotChanges().pipe(
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





}
