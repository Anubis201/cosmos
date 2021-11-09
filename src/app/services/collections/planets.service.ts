import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  getPlanets() {
    return this.firestore.collection('planets').get()
  }
}
