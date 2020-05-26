import { Component, OnInit } from '@angular/core';
import { RequestInput } from '../endpoints';

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.component.html',
  styleUrls: ['./endpoint.component.scss']
})
export class EndpointComponent implements OnInit {
  public endpoints: any[] = [{ endpoints: '' }];

public requestMethods: any[] = [{ requestMethods: '' }];

request: RequestInput

  constructor() { }

  ngOnInit() {}

  addRequestMethod() {
    this.requestMethods.push({requestMethods: ''});
}
addEndpoint() {
    this.request.urls.push({endpoint_url: name});
}


}
