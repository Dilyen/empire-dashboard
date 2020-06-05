import { Component, OnInit } from '@angular/core';
import { AddInput, Status} from '../endpoints';
import { EmpireService } from '../empire.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.component.html',
  styleUrls: ['./endpoint.component.scss']
})
export class EndpointComponent implements OnInit {
  public endpoints: any[] = [{ endpoints: '' }];

 public requestMethods: any[] = [{ requestMethods: '' }];

 retrieved_data: Status[] = []; 
 
 project_id: number;
 
 endpoint: AddInput

  constructor( private appservice: EmpireService, private route: ActivatedRoute) { 

    this.endpoint={
      request_method:"",
      urls:[],
      endpoint_url: "",   
  }

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.project_id = Number(params.get("project_id"))
    
    })

      this.load_project_status(this.project_id)
  }

  load_project_status(project_id){
    this.appservice.getStatusByProjectId(project_id)
    .subscribe(response=>{
      this.retrieved_data = response
      })
    
   }

  addRequestMethod() {
    this.requestMethods.push({requestMethods: ''});
}
  addEndpoint() {
    
    this.endpoint.urls.push({endpoint_url: name});
}

logValue() {
  console.log(this.endpoint)
  let request_method=this.endpoint.request_method

  this.endpoint.urls.forEach(url => {
    url.project_id = this.project_id
    url.request_method = this.endpoint.request_method
    this.appservice.addEndpoints(url).subscribe(response => 
      console.log(response))
});
    
}

}