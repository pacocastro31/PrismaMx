import { Component, OnInit } from '@angular/core';
import { FaqsService } from '../faqs.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-faqs-list',
  templateUrl: './faqs-list.component.html',
  styleUrls: ['./faqs-list.component.css']
})
export class FaqsListComponent implements OnInit {

  faqs: any;

  constructor(private faqService: FaqsService) { }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo(){
    this.faqService.getFaqsInfo().snapshotChanges().pipe(
      map(changes=>
        changes.map(c =>
            ({key: c.payload.key, ...c.payload.val() })
          )
        )
    ).subscribe(Cinfo => {
      this.faqs = Cinfo;
    });
  }

}
