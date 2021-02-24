import { Injectable } from '@angular/core';
import { Iproject } from '../../model/project.interface'
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs'
import  config  from '../../../assets/config.json'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  postId;
  constructor(private http: HttpClient) { 
    this.server = config.url;
  }
  server: string;

  projects: Iproject[] = [];
  url: string
  
  createProject(project : Iproject){
    return this.http.post<Iproject>(this.server+'/project', project)
  }

  getPorject(): Observable<Iproject[]>{
    return this.http.get<Iproject[]>(this.server+'/project');
  }

  getPorjectbyid(id:number): Observable<Iproject>{

    this.url = this.server+'/project/'
    this.url += id.toString()

    return this.http.get<Iproject>(this.url);
  }

  upgradeProject(project : Iproject){
    this.url = this.server+'/project/';
    console.log(project.id)
    this.url += project.id.toString();
    return this.http.put<Iproject>(this.url, project)
    
  }

  deleteProject(id: number): Observable<any>{

    this.url = this.server+'/project/'
    this.url += id.toString()

    return this.http.delete(this.url);
  }

}
