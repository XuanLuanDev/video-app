import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { HomeService } from './home.service';
import { environment } from 'src/environments/environment';
import { Endpoints } from '../endpoints';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  videos : Video[] =[];
  isNoVideo =true;
  videoTitle: string = '';
  videoUrl:string = '';
  isShowVideo = false;
  constructor(private service:HomeService) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.service.all().subscribe((res: any) =>{
      this.videos = res;
      if(res.length >0 ) this.isNoVideo = false;
    })
   
  }
  getImg(src:any){
    return environment.domainUrl+src;
  }
  showVideo(vd:any){
    this.isShowVideo =false;
    this.videoTitle='';
    this.videoUrl ='';
    this.videoTitle=vd.title;
    this.videoUrl =vd.url;
    this.isShowVideo =true;
  }
}
