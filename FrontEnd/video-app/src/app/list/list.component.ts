import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { ListService } from './list.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  videos : Video[] =[];
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
}
