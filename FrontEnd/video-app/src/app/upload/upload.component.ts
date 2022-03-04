import { HttpEventType } from '@angular/common/http';
import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadService } from './upload.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  form: FormGroup;
  videoInfo: string ='chose video';
  fileInfo: string ='chose file';
  selectedFile: any;
  selectedVideo: any;
  constructor(private service : UploadService,private fb: FormBuilder, private router: Router) { 
    this.form = this.fb.group({
      title: new FormControl('', [Validators.required]),
      cover: new FormControl('', [Validators.required]),
      video: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }
  onFileChanged(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileInfo = file.name;
      this.form.patchValue({
        cover: file,
      });
    }
  }
  onVideoChanged(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.videoInfo = file.name;
      this.form.patchValue({
        video: file,
      });
    }
  }
  onSubmit(){
    const formData = new FormData();
    for (const key of Object.keys(this.form.value)) {
      const value = this.form.value[key];
      formData.append(key, value);
    }
    this.service.upload(formData).subscribe(res => {
     this.router.navigateByUrl('/list');
    },(error)=>{
      alert('Has Error');
     console.log(error);
     location.reload();
    }
    );
  }

 
}
