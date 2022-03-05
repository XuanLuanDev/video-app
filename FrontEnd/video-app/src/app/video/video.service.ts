import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from '../endpoints';
import { Video } from '../video';
import { VideoDetail } from '../video';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }
  all(param:any):Observable<VideoDetail>{
    return this.http.post(Endpoints.getListDetail,param).pipe(
      map((response: any) => response),
    )
  }
}
