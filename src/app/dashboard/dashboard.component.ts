import {Component, OnInit, OnDestroy} from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import {Status} from "../endpoints";
import {EmpireService} from '../empire.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [
        '../app.component.scss', './dashboard.component.scss'
    ],
    encapsulation: ViewEncapsulation.None

})

export class DashboardComponent implements OnInit, OnDestroy {
    retrieved_data : Status[] = [];
    retrieved_currentDate : Status[] = [];
    retrieved_previousDate: Status[] = [];
    refresher:any
    show: boolean = true;
    constructor(private appservice : EmpireService) {
    }
   
getData(){
    this.appservice.getStatus().subscribe(response => {
        this.retrieved_data = response
    });
}

    ngOnInit() {
                this.appservice.getStatus().subscribe(response => {
                    this.retrieved_data = response
                });
                this.appservice.getStatusByCurrentDate().subscribe(response => {
                    this.retrieved_currentDate = response
                });

                this.refresher= setInterval(() => {
                    this.getData()
                    console.log("Function called")
                }, 100000)
                 this.appservice.getStatusByPreviousDate().subscribe(response => {
                    this.retrieved_previousDate = response
                });
                this.appservice.sendGetRequest().subscribe((resposeBody) => {
                    console.log(resposeBody);
                });
               
            }
    
    ngOnDestroy(): void {
                clearInterval(this.refresher)
    }
                    
        }