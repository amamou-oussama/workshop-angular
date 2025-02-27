import { Injectable } from '@angular/core';
import { Residence } from './core/models/residence';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResidenceService {
  

    listResidences: Residence[]=[
      {id:1,"locationShown": false,"name": "El fel","address":"Borj Cedria", "image":"../../assets/R1.jpeg", status: "Disponible"},
       {id:2,"locationShown": false,"name": "El yasmine", "address":"Ezzahra","image":"../../assets/R2.jpeg", status: "Disponible" },
       {id:3,"locationShown": false,"name": "El Arij", "address":"Rades","image":"../../assets/R3.jpeg", status: "Vendu"},
       {id:4,"locationShown": false,"name": "El Anber","address":"inconnu", "image":"../../assets/R4.jpeg", status: "En Construction"}
     ];
     private residencesSubject: BehaviorSubject<Residence[]> = new BehaviorSubject<Residence[]>(this.listResidences);

     

     getResidences(): Observable<Residence[]> {
      return of(this.listResidences);
    }

    deleteResidence(id: number): Observable<void> {
      this.listResidences = this.listResidences.filter(res => res.id !== id);
      return of();
    }

    addResidence(residence: Residence): void {
      this.listResidences.push(residence);
      this.residencesSubject.next(this.listResidences); // Update the BehaviorSubject to notify subscribers
    }

    updateResidence(residence: Residence): void {
      const index = this.listResidences.findIndex(r => r.id === residence.id);
      if (index !== -1) {
        this.listResidences[index] = residence;
      }
    }

  constructor() {
      console.log("ResidenceService instantiated");
    
    
   }
}
