import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { environment } from 'src/environments/environment';
import { Endpoints } from '../endpoints';
import { VideoService } from './video.service';
import { VideoDetail } from '../video';
import { ActivatedRoute ,Router} from '@angular/router';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  video: VideoDetail = new VideoDetail();
  videos : VideoDetail[] = [];
  Id: string ='';
  constructor(private service:VideoService, private activatedRoute:ActivatedRoute,private router:Router) {
    this.Id= this.activatedRoute.snapshot.paramMap.get('id')!;
   }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    const obj={ Id: this.Id};
    this.service.all(obj).subscribe((res: any) =>{
      this.videos = [];debugger
      for(let vd of res){
        if(vd.is_current){
         this.video = vd;
        }else{
          this.videos.push(vd);
        }
      }
    })
   
  }
  getImg(src:any){
    return environment.domainUrl+src;
  }
  showVideo(vd:any){
    this.router.navigate(['/video',vd.id]);
   }
}
