import { Component, OnInit, OnDestroy } from '@angular/core';
import { Turntabl_Project } from '../endpoints';
import { EmpireService } from '../empire.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  listed_data: Turntabl_Project[] = [];
  refresher: any;

  constructor(private appservice: EmpireService) { }

  getData(){
    this.appservice.getProjects().subscribe(response =>{
      this.listed_data = response
    })
  }
  ngOnInit() {
    this.appservice.getProjects().subscribe(response=>{
      this.listed_data = response
    })
    this.refresher= setInterval(() => {
      this.getData()
      console.log("Sidebar called")
  }, 10000)
    
  }

  ngOnDestroy(): void {
    clearInterval(this.refresher)
}

}
