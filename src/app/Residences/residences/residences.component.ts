import { CommonModule, NgClass, NgIf, NgSwitch } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Residence } from 'src/app/core/models/residence';
import { ResidenceService } from 'src/app/residence.service';
import { CommonService } from '../../core/services/common.service';

@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.css'],
  imports: [
    CommonModule
  ],
  providers:[],
  standalone: true,
})

export class ResidencesComponent implements OnInit {

  listResidencesFavorite: Residence[]=[];
  listResidencesFiltered: Residence[]=[];
  listResidences: Residence[] = [];
  similarAddressesCount: number = 0;

  constructor(private router: Router, private residenceService : ResidenceService, private commonService: CommonService) { 
  } 

  ngOnInit(): void {
    this.residenceService.getResidences().subscribe(residences => this.listResidences = residences);
    this.listResidencesFiltered = this.listResidences;
    console.log(this.listResidences);
    this.similarAddressesCount = this.commonService.getSameValueOf(this.listResidences, 'address', 'someAddress');
  }

  addRes(){
    this.router.navigate(['/add-residence']);
  }

   ShowLocation(id: number){
      this.listResidences[id-1].locationShown = !this.listResidences[id-1].locationShown;
      console.log(this.listResidences[id-1].locationShown);
      if (this.listResidences[id-1].address=="inconnu"){
        alert("Adresse inconnue");
      } 
   }

   LikeRes(id: number){
    console.log(this.listResidencesFavorite);
    this.listResidencesFavorite.push(this.listResidences[id-1]);
   }

   filterResults(text: string) {
    if (!text) {
      this.listResidencesFiltered = this.listResidences;
      return;
    }
  
    this.listResidencesFiltered = this.listResidences.filter(
      Residence => Residence?.address.toLowerCase().includes(text.toLowerCase())
    );
  }

  OnSelect(res : Residence){
    this.router.navigate(['/residences', res.id]);
  }

  ListApartments(res : Residence){
    this.router.navigate(['/apartments', res.id]);
  }

}
