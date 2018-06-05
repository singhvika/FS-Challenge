import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-upload-photos',
  templateUrl: './upload-photos.component.html',
  styleUrls: ['./upload-photos.component.css']
})
export class UploadPhotosComponent{
  modalRef: BsModalRef;
  images: any;

  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
  }

  getImgRecords(){
      let imgRecords;
      if ( localStorage.getItem("imgRecords")!==null){
        //imgRecords = JSON.parse(localStorage.getItem("imgRecords"));
        this.images = JSON.parse(localStorage.getItem("imgRecords"));
    
      }else {
        //imgRecords = [];
        this.images = [];
      }
    
      //return imgRecords;
      return this.images;
    }
  

  add(url:string, desc:string){
      let upUrl = url;
      let description = desc;
  
      if(upUrl.length!==0 && description.length!==0){
  
        let imgRecords = this.getImgRecords();

        let record = {
          url: upUrl,
          desc: description
        }
  
        let filteredRecords = imgRecords.filter((record) => upUrl === record.url);
  
        if (filteredRecords.length === 0){
          //imgRecords.push(record);
          this.images.push(record);
          localStorage.setItem("imgRecords", JSON.stringify(this.images));
         
          document.getElementById("addSuccess").style.display = "block";
          document.getElementById("addFailure").style.display = "none";

          url = '';
          desc = '';

        }else {
          document.getElementById("addSuccess").style.display = "none";
          document.getElementById("addFailure").style.display = "block";
        }
  
      }else {
          alert("Please enter Image URL and Description");
      }
  }

  refreshImages(imgRecords){
      var imgContainer = document.getElementById("imgs");
      while(imgContainer.firstChild){
        imgContainer.removeChild(imgContainer.firstChild);
      }
      console.log("removed existing");
  }

  deleteImage(imgUrl:string) {
      var imgRecords = this.getImgRecords();

      this.images = this.images.filter((record) => record.url !==imgUrl);
      localStorage.setItem('imgRecords',JSON.stringify(this.images));
  }

  searchBar(searchString:string){
    if (searchString.length === 0){
      this.images = JSON.parse(localStorage.getItem("imgRecords"));
    }else {
      let imgRecords = this.getImgRecords();
      let filteredRecords = imgRecords.filter((record) => {
        if ((record.desc).indexOf(searchString) > -1){
          return true;
        }else {
          return false;
        }
      });

      this.images = filteredRecords;

    }
  }
    
  ngOnInit(){
    this.images = JSON.parse(localStorage.getItem("imgRecords"));
  }
}
