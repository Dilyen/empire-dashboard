import { Component, OnInit } from '@angular/core';
import { AddInput} from '../endpoints';
import { EmpireService } from '../empire.service';

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.component.html',
  styleUrls: ['./endpoint.component.scss']
})
export class EndpointComponent implements OnInit {
  public endpoints: any[] = [{ endpoints: '' }];

 public requestMethods: any[] = [{ requestMethods: '' }];
 

endpoint: AddInput

  constructor( private empireServie: EmpireService ) { 

    this.endpoint={
      request_method:"",
      urls:[],
      endpoint_url: ""
      
      
  }
  }

  ngOnInit() {}

  addRequestMethod() {
    this.requestMethods.push({requestMethods: ''});
}
  addEndpoint() {
    
    this.endpoint.urls.push({endpoint_url: name});
}

logValue() {
  console.log(this.endpoint)
  let request_method=this.endpoint.request_method

  this.empireServie.addEndpoints(this.endpoint).subscribe(response =>{
    this.endpoint.urls.forEach(url => {
      url.request_method = request_method
      url.endpoint_id = response.endpoint_id
      console.log(response)
    
    });

  });
    
}

}
