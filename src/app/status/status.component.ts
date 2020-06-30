import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmpireService } from '../empire.service';
import { Status } from '../endpoints';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})

export class StatusComponent implements OnInit, OnDestroy {
  retrieved_data: Status[] = []; 
  retrieved_currentDate : Status[] = [];
  retrieved_previousDate: Status[] = [];

project_id:number;
refresher: any;
show: boolean = true;
  constructor(private appservice: EmpireService, private route: ActivatedRoute) { }

  getData(){
    this.load_project_status(this.project_id)
      this.appservice.getStatusByProjectId(this.project_id)
      this.appservice.getStatusByCurrentDate()
      this.appservice.getStatusByPreviousDate()
      .subscribe(response=>{
        this.retrieved_data = response
        
        // console.log("Response oooooooo ",response);
        })
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.project_id = Number(params.get("project_id"))
    })

      this.load_project_status(this.project_id)

      this.refresher= setInterval(() => {
        this.getData()
        console.log("Get oooooo")
    }, 10000)

  }

  load_project_status(project_id){
    this.appservice.getStatusByProjectId(project_id)
    this.appservice.getStatusByCurrentDate()
    this.appservice.getStatusByPreviousDate()
    .subscribe(response=>{
      this.retrieved_data = response
      
      // console.log("Response oooooooo ",response);
      })
      this.appservice.getStatusByPreviousDate().subscribe(response => {
        this.retrieved_previousDate = response
    });
    this.appservice.getStatusByCurrentDate().subscribe(response => {
      this.retrieved_currentDate = response
  });
  //   this.appservice.sendGetRequest().subscribe((resposeBody) => {
  //     console.log(resposeBody);
  // });

  }

  ngOnDestroy(): void {
    clearInterval(this.refresher)
}

}