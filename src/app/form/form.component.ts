import {  Component, OnInit } from '@angular/core';
import { EmpireService } from '../empire.service';
import {RequestInput} from '../endpoints'
@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: [
        './form.component.scss'
    ],
    
})

export class FormComponent implements OnInit {

    public projects: any[] = [{ project: '' }];

    public endpoints: any[] = [{ 
        endpoints: '' 
    }];

    public requestMethods: any[] = [{ requestMethods: '' }];

    request: RequestInput
    constructor(private empireServie: EmpireService ) {

        this.request={
            project_name: "",
            request_method:"",
            urls:[]
        }
    }

    ngOnInit() {}

    addProject() {
        this.projects.push({project: ''});
    }

    addRequestMethod() {
        this.requestMethods.push({requestMethods: ''});
    }
    addEndpoint() {
        this.request.urls.push({endpoint_url: name});
    }

    removeEndpoint(i : number) {
        this.endpoints.splice(i);
    }

    logValue() {

        console.log(this.request)
        let request_method=this.request.request_method

        this.empireServie.addProject(this.request).subscribe(response  => {
            this.request.urls.forEach(url => {
                url.project_id = response.key
                url.request_method = request_method
                this.empireServie.addEndpoints(url).subscribe(response => 
                    console.log(response))
            });
        });
        
    }

}
