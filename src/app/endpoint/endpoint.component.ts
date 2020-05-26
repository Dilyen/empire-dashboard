import { Component, OnInit } from '@angular/core';
import { RequestInput } from '../endpoints';
import { EmpireService } from '../empire.service';

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.component.html',
  styleUrls: ['./endpoint.component.scss']
})
export class EndpointComponent implements OnInit {
  public endpoints: any[] = [{ endpoints: '' }];

public requestMethods: any[] = [{ requestMethods: '' }];

request: RequestInput

  constructor( private empireServie: EmpireService ) { 

    this.request={
      project_name: "",
      request_method:"",
      urls:[]
  }
  }

  ngOnInit() {}

  addRequestMethod() {
    this.requestMethods.push({requestMethods: ''});
}
addEndpoint() {
    this.request.urls.push({endpoint_url: name});
}

logValue() {

  console.log(this.request)
  let request_method=this.request.request_method

  this.empireServie.addProject(this.request).subscribe(response  => {
      this.request.urls.forEach(url => {
          url.project_id = response.key
          url.request_method = request_method
          this.empireServie.addEndpoints(url).subscribe(response => 
              console.log(response))

      });
  });
  
}


}
