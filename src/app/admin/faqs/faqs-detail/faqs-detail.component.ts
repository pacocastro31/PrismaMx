import { Component, OnInit, Input } from '@angular/core';
import { FaqsService } from '../faqs.service'
import { Faqs } from '../faqs'

@Component({
  selector: 'app-faqs-detail',
  templateUrl: './faqs-detail.component.html',
  styleUrls: ['./faqs-detail.component.css']
})
export class FaqsDetailComponent implements OnInit {
  @Input() faq: Faqs;

  constructor(private faqService: FaqsService) { }

  ngOnInit(): void {
  }

  deleteServicio1(){
    this.faqService.deleteFaq(this.faq.key).catch(err => console.log(err));
  }

}
