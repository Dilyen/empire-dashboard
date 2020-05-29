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
 
 project_id:string;
 endpoint_id: any
 endpoint: AddInput

  constructor( private appservice: EmpireService, private route: ActivatedRoute) { 

    this.endpoint={
      request_method:"",
      urls:[],
      endpoint_url: ""
      
  }
  }

  ngOnInit() {


    this.route.paramMap.subscribe(params => {
      this.project_id = params.get("project_id")
      this.endpoint_id= params.get("endpoint_id")
    })

      this.load_project_status(this.project_id)
      this.load_project_status(this.endpoint_id)
  }

  load_project_status(project_id){
    this.appservice.getStatusByProjectId(project_id)
    .subscribe(response=>{
      this.retrieved_data = response
      this.appservice.addEndpoints(this.endpoint_id).subscribe(response =>{
        this.endpoint_id= response
      });
      
      // console.log("Response oooooooo ",response);
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

  this.appservice.addEndpoints(this.endpoint).subscribe(response =>{
    this.endpoint.urls.forEach(url => {
      url.request_method = request_method
      url.endpoint_id = response.endpoint_id
      console.log(response)
    
    });

  });
    
}

}
