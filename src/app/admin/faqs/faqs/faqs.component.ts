import { Component, OnInit } from '@angular/core';
import { FaqsService } from '../faqs.service'
import { Faqs } from '../faqs'

import { AngularFireStorage } from "@angular/fire/storage";

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {

  submitted = false;
  faq: Faqs = new Faqs();

  constructor(private servicioFaq: FaqsService) { }

  ngOnInit(): void {
  }

  save(){
    this.submitted = true;
    this.servicioFaq.createFaq(this.faq);
  }

  onSubmit() {
    this.save();
    this.clear();
  }

  clear(){
    this.faq.title = ""
    this.faq.pregunta = ""
    this.faq.respuesta = ""
  }

}
