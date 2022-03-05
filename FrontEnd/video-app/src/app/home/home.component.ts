import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { HomeService } from './home.service';
import { environment } from 'src/environments/environment';
import { Endpoints } from '../endpoints';
import { Router } from '@angular/router';

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
  constructor(private service:HomeService,private router:Router) { }

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
   this.router.navigate(['/video',vd.id]);
  }
}
