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
 
 endpoint: AddInput

  constructor( private appservice: EmpireService, private route: ActivatedRoute) { 

    this.endpoint={
      project_name: "",
      request_method:"",
      urls:[],
      endpoint_url: ""
    
      
  }
  }

  ngOnInit() {


    this.route.paramMap.subscribe(params => {
      this.project_id = params.get("project_id")
    
    })

      this.load_project_status(this.project_id)
  
  }

  load_project_status(project_id){
    this.appservice.getStatusByProjectId(project_id)
    .subscribe(response=>{
      this.retrieved_data = response
      
       console.log("Response oooooooo ",response);
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

  this.appservice.addProject(this.endpoint).subscribe(response  => {
    this.endpoint.urls.forEach(url => {
        url.project_id = response.key
        url.request_method = request_method
        this.appservice.addEndpoints(url).subscribe(response => 
            console.log(response))

    });
})

  // this.appservice.addEndpoints(this.endpoint).subscribe(response =>{
  //   this.endpoint.urls.forEach(url => {
  //     url.project_id = response.key
  //     url.request_method = request_method
  //     console.log(response)
    
  //   });

  // });
    
}

}