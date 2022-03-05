import { Component, OnInit } from '@angular/core';
import { VideoDetail } from '../video';
import { ListService } from './list.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  videos : VideoDetail[] =[];
  constructor(private service: ListService) { }
  
  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.service.all().subscribe((res: any) =>{
      this.videos = res;
    })
  }
  getImg(src:any){
    return environment.domainUrl+src;
  }
  delete(){
    var obj=[];
    for(let vd of this.videos){
      if(vd.is_current){
        obj.push({
          Id:vd.id
        });
      }
    }
    this.service.delete(obj).subscribe((res: any) =>{
      this.getAll();
    })
  }
  IsEnableDelete(){ 
    if(this.videos.length == 0)return false;
    let vd =this.videos.find(t=>t.is_current == true) ;
    if( vd !=null && vd!= undefined)return true;
    return false;
  }
}
