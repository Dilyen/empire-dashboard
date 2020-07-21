import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  logValue(form : NgForm) {

    console.log(form);
    console.log(form.value);
    form.reset(form);
    // console.log(value.projectName)
    // console.log(this.projects);
    // console.log(this.endpoints);
}

}
