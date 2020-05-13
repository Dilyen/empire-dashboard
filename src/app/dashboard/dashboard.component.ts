import {Component, OnInit, Output, Input, EventEmitter, ChangeDetectorRef} from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import {Status} from "../endpoints";
import {EmpireService} from '../empire.service';
import { Subscription, Observable, timer } from 'rxjs';
import * as moment from 'moment';





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

    private subscription: Subscription;
    @Output() TimerExpired: EventEmitter<any> = new EventEmitter<any>();

    @Input() SearchDate: moment.Moment = moment();
    @Input() ElapsTime: number = 3;

    searchEndDate: moment.Moment;
    remainingTime: number;
    minutes: number;
    seconds: number;

    everySecond: Observable<number> = timer(0,1000);

    

    constructor(private appservice : EmpireService, private ref: ChangeDetectorRef) {
        this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");

    }


    ngOnInit() {
                this.appservice.getStatus().subscribe(response => {
                    this.retrieved_data = response
                })

                this.subscription = this.everySecond.subscribe((seconds) => {
                    var currentTime: moment.Moment = moment();
                    this.remainingTime = this.searchEndDate.diff(currentTime)
                    this.remainingTime = this.remainingTime / 1000;
        
                    if (this.remainingTime <= 0) {
                        this.SearchDate = moment();
                        this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");
        
                        this.TimerExpired.emit();
                    }
                    else {
                        this.minutes = Math.floor(this.remainingTime / 60);
                        this.seconds = Math.floor(this.remainingTime - this.minutes * 60);
                    }
                    this.ref.markForCheck()
                })
            }
        
            ngOnDestroy(): void {
                this.subscription.unsubscribe();
            }
        }
       