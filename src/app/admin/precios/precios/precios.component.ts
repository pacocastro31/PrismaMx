import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from "@angular/fire/storage";
import { Prices } from '../precios'
import { PreciosService } from '../precios.service'

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css']
})
export class PreciosComponent implements OnInit {

  info: any;
  prices: Prices = new Prices();
  submitted = false;

  constructor(private priceServices: PreciosService) { }

  ngOnInit(): void {
    this.getInfoPrices()
  }

  onSubmit() {
    if(this.info == null){
      this.save()
    }
    this.updatePrices()
  }

  save(){
    this.priceServices.createPrices(this.prices)
  }

  getInfoPrices(){
    this.priceServices.getPrices().snapshotChanges().pipe(
      map(changes=>
        changes.map(c =>
            ({key: c.payload.key, ...c.payload.val() })
          )
        )
    ).subscribe(Cinfo => {
      this.info = Cinfo;
      this.setInfo()
    });
  }

  setInfo(){
    this.prices.title = this.info[0].title
    this.prices.description = this.info[0].description
    this.prices.titleMaterial1 = this.info[0].titleMaterial1
    this.prices.facebook1 = this.info[0].facebook1
    this.prices.facebook2 = this.info[0].facebook2

    this.prices.price1 = this.info[0].price1
    this.prices.price2 = this.info[0].price2
    this.prices.price3 = this.info[0].price3

    this.prices.benefits1 = this.info[0].benefits1
    this.prices.benefits2 = this.info[0].benefits2
    this.prices.benefits3 = this.info[0].benefits3

    this.prices.cta1 = this.info[0].cta1
    this.prices.cta2 = this.info[0].cta2
    this.prices.cta3 = this.info[0].cta3
    this.prices.linkCta1 = this.info[0].linkCta1
    this.prices.linkCta2 = this.info[0].linkCta2
    this.prices.linkCta3 = this.info[0].linkCta3
  }

  updatePrices(){
    this.submitted = true;
    if(this.info[0].title != this.prices.title){
      this.priceServices.updatePrices(this.info[0].key, {title: this.prices.title}).catch(err => console.log(err));
    }
    if(this.info[0].description != this.prices.description){
      this.priceServices.updatePrices(this.info[0].key, {description: this.prices.description}).catch(err => console.log(err));
    }
    if(this.info[0].titleMaterial1 != this.prices.titleMaterial1){
      this.priceServices.updatePrices(this.info[0].key, {titleMaterial1: this.prices.titleMaterial1}).catch(err => console.log(err));
    }
    if(this.info[0].facebook1 != this.prices.facebook1){
      this.priceServices.updatePrices(this.info[0].key, {facebook1: this.prices.facebook1}).catch(err => console.log(err));
    }
    if(this.info[0].facebook2 != this.prices.facebook2){
      this.priceServices.updatePrices(this.info[0].key, {facebook2: this.prices.facebook2}).catch(err => console.log(err));
    }
    if(this.info[0].price1 != this.prices.price1){
      this.priceServices.updatePrices(this.info[0].key, {price1: this.prices.price1}).catch(err => console.log(err));
    }
    if(this.info[0].price2 != this.prices.price2){
      this.priceServices.updatePrices(this.info[0].key, {price2: this.prices.price2}).catch(err => console.log(err));
    }
    if(this.info[0].price3 != this.prices.price3){
      this.priceServices.updatePrices(this.info[0].key, {price3: this.prices.price3}).catch(err => console.log(err));
    }
    if(this.info[0].benefits1 != this.prices.benefits1){
      this.priceServices.updatePrices(this.info[0].key, {benefits1: this.prices.benefits1}).catch(err => console.log(err));
    }
    if(this.info[0].benefits2 != this.prices.benefits2){
      this.priceServices.updatePrices(this.info[0].key, {benefits2: this.prices.benefits2}).catch(err => console.log(err));
    }
    if(this.info[0].benefits3 != this.prices.benefits3){
      this.priceServices.updatePrices(this.info[0].key, {benefits3: this.prices.benefits3}).catch(err => console.log(err));
    }
    if(this.info[0].cta1 != this.prices.cta1){
      this.priceServices.updatePrices(this.info[0].key, {cta1: this.prices.cta1}).catch(err => console.log(err));
    }
    if(this.info[0].cta2 != this.prices.cta2){
      this.priceServices.updatePrices(this.info[0].key, {cta2: this.prices.cta2}).catch(err => console.log(err));
    }
    if(this.info[0].cta3 != this.prices.cta3){
      this.priceServices.updatePrices(this.info[0].key, {cta3: this.prices.cta3}).catch(err => console.log(err));
    }
    if(this.info[0].linkCta1 != this.prices.linkCta1){
      this.priceServices.updatePrices(this.info[0].key, {linkCta1: this.prices.linkCta1}).catch(err => console.log(err));
    }
    if(this.info[0].linkCta2 != this.prices.linkCta2){
      this.priceServices.updatePrices(this.info[0].key, {linkCta2: this.prices.linkCta2}).catch(err => console.log(err));
    }
    if(this.info[0].linkCta3 != this.prices.linkCta3){
      this.priceServices.updatePrices(this.info[0].key, {linkCta3: this.prices.linkCta3}).catch(err => console.log(err));
    }
  }

  availForm(){
    this.submitted = false;
  }

}
