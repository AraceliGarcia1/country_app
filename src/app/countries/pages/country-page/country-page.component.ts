import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  public country?:Country;

  constructor(
    private countriesService:CountriesService,
    private activatedRoute:ActivatedRoute,
    private router:Router
    ){

  }
  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id})=>this.countriesService.searchCountryByAlphaCode(id))
    )
    .subscribe( country =>{
      console.log({country});
      if(!country){
        return this.router.navigateByUrl('')
      }
      console.log('Existe');
      return this.country=country;

    })
  }


  searchCountry(code:string){
    this.countriesService.searchCountryByAlphaCode(code).subscribe(
      country=>{
        console.log({country})
      }
    )

    
  }


}
