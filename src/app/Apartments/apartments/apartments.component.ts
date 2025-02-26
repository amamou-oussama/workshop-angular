import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Apartment } from 'src/app/core/models/apartment';
import { ApartmentsService } from 'src/app/services/apartments.service';
import { CommonService } from '../../core/services/common.service';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css']
})
export class ApartmentsComponent implements OnInit {

  constructor (private apartmentsService : ApartmentsService, private router : Router, private commonService: CommonService) {}

    @ViewChild('f') myForm: NgForm | undefined; 
    apart! : Apartment ; 
    apartments : Apartment[] = [];
    listApartments: any[] = [
      {surface: 100},
      {surface: 100},
      {surface: 100},
      {surface: 200},
      {surface: 200},
      {surface: 300},
      {surface: 300},
      {surface: 300}
    ];
    similarSurfaceApartments: any[] = [];

    ngOnInit(): void {
      this.apartments = this.apartmentsService.getApartments();
      this.similarSurfaceApartments = this.listApartments.filter(apartment => 
        this.commonService.getSameValueOf(this.listApartments, 'surface', apartment.surface) > 1
      );
    }

    addApartment(){
      this.router.navigate(['/add-apartment']);
    }
  
    onFormSubmit(){
      this.apart = new Apartment(); 
      

      console.log(this.myForm);
        this.apart.surface = this.myForm?.value['surface'];
        this.apart.terrace = this.myForm?.value['terrace'];
        this.apart.surfaceterrace = this.myForm?.value['surfaceterrace'];
        this.apart.category = this.myForm?.value['category'];
        this.apart.ResidenceId = this.myForm?.value['ResidenceId'] -1;
        this.apart.apartNum = this.myForm?.value['apartNum'];
        this.apart.floorNum = this.myForm?.value['floorNum'];
        console.log(this.apart);
        this.apartmentsService.addApartment(this.apart);



       /* this.res.name = this.myForm?.value['name'];
        this.res.address = this.myForm?.value['address'];
        this.res.status = this.selectedOption;
        this.res.image = "../../assets/R1.jpeg";
        this.res.status = "Disponible";
        if (!this.updating)
        this.residenceService.getResidences().subscribe(residences => {
          this.res.id = residences.length + 1;
        });
        if (!this.updating)
        this.residenceService.addResidence(this.res);
      else
        this.residenceService.updateResidence(this.res);
       // this.router.navigate(['/residences']);
       console.log(this.residenceService.getResidences());*/
    }
}
