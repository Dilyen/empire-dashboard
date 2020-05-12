import {Component, OnInit} from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import {Status} from "../endpoints";
import {EmpireService} from '../empire.service';
import { Observable, timer } from 'rxjs';




@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [
        '../app.component.scss', './dashboard.component.scss'
    ],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
    retrieved_data : Status[] = [];
    timer: Observable<number>;

    constructor(private appservice : EmpireService) {

    }


    ngOnInit() {
        if(!this.timer){
            this.timer = timer(1000, 3000);
            this.timer.subscribe(_ => {
                this.appservice.getStatus().subscribe(response => {
                    this.retrieved_data = response
        
                })
            })
        }
       
    }
}