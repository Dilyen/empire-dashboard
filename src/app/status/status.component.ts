import { Component, OnInit } from '@angular/core';
import { EmpireService } from '../empire.service';
import { Status} from '../endpoints';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})

export class StatusComponent implements OnInit {
  retrieved_data: Status[] = []; 
   

project_id:string;
endpoint_id: any

  constructor(private appservice: EmpireService, private route: ActivatedRoute) { }

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

}