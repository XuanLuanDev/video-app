import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from '../endpoints';
import { VideoDetail } from '../video';
@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }
  all():any{
    return this.http.post<VideoDetail[]>(Endpoints.getList,null);
  }
  delete(param:any):any{
    return this.http.post(Endpoints.delete,param);
  }
}
