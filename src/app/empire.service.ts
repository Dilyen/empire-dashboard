import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { Observable } from 'rxjs'
import { Turntabl_Project, Endpoints, Status,RequestInput} from './endpoints';

@Injectable({providedIn: 'root'})
 export class EmpireService {

  statusUrl:string 
  turntablproject_url:string 
  addNewProject: string 
  addNewEndpoints: string
  statusByCurrentDate: string
  statusByPreviousDate: string

  
  constructor(private httpClient: HttpClient, private cookieservice: CookieService) {
    this.statusUrl = this.cookieservice.get("statusUrl");
    this.turntablproject_url = this.cookieservice.get("turntablproject_url");
    this.addNewProject = this.cookieservice.get("addNewProject_url");
    this.addNewEndpoints = this.cookieservice.get("addNewEndpoint_url");
    this.statusByCurrentDate = this.cookieservice.get("statusByCurrentDate_url");
    this.statusByPreviousDate = this.cookieservice.get("statusByPreviousDate_url");
    
    this.httpClient.get<any>(window.location.origin + '/').subscribe(res => {
      sessionStorage.setItem('turntablproject_url', res.turntablproject_url)
      sessionStorage.setItem('endpoints_url', res.endpoints_url)
      sessionStorage.setItem('addNewProject_url', res.addNewProject_url)
      sessionStorage.setItem('addNewEndpoint_url', res.addNewEndpoints_url)
      sessionStorage.setItem('statusByCurrentDate_url', res.statusByCurrent_url)
      sessionStorage.setItem('statusByPreviousDate_url', res.statusByPreviousDate_url)
    })
  }
  getProjects(): Observable<Turntabl_Project[]> {
    // return this.http.get<Turntabl_Project[]>(sessionStorage.getItem('turntablproject_url'));
    return this.httpClient.get<Turntabl_Project[]>(this.turntablproject_url);
  }
  
  getProjectById(id: number): Observable<Turntabl_Project>{
    return this.httpClient.get<Turntabl_Project>(this.turntablproject_url + id);
  }

  getEndpoints(): Observable<Endpoints[]> {
    return this.httpClient.get<Endpoints[]>(sessionStorage.getItem('endpoints_url'));
  }
  
  getEndpointById(id: number): Observable<Endpoints>{
    return this.httpClient.get<Endpoints>(sessionStorage.getItem('endpoints_url') + id);
  }

  getStatus(): Observable<Status[]> {
  // return this.http.get<Status[]>(sessionStorage.getItem('status_url'));
  return this.httpClient.get<Status[]>(this.statusUrl);
  }

  getStatusByProjectId(project_id: number): Observable<Status[]> {
    return this.httpClient.get<Status[]>(this.statusUrl + project_id);
  }

  addProject(project:RequestInput): Observable<any>{
    return this.httpClient.post<RequestInput>(this.addNewProject, project);  
  }
  
  addEndpoints(endpoint:Endpoints): Observable<Endpoints>{
    return this.httpClient.post<Endpoints>(this.addNewEndpoints, endpoint);  
  }
  getStatusByCurrentDate(): Observable<Status[]>{
    return this.httpClient.get<Status[]>(this.statusByCurrentDate);  
  }
  getStatusByPreviousDate(): Observable<Status[]>{
    return this.httpClient.get<Status[]>(this.statusByPreviousDate);  
  }
  sendGetRequest() {
    return this.httpClient.get(this.statusUrl);
  }
  
}