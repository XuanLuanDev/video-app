import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'video-app';
  isOpen = true;
  constructor(private router: Router) {}
  toggle(){
    this.isOpen =!this.isOpen;
  }
  goHome(){
    this.router.navigateByUrl('');
  }
  goUpload(){
    this.router.navigateByUrl('add-video');
  }
  goList(){
    this.router.navigateByUrl('videos');
  }
}
