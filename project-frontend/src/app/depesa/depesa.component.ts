import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { Depesa } from '../Depesa';
import { DepeseService } from '../services/depese.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-depesa',
  templateUrl: './depesa.component.html',
  styleUrls: ['./depesa.component.css']
})
export class DepesaComponent implements OnInit {

  title = '';
  body = '';
  akcija = 'Depesa';
  selectedDepesa: Depesa = null;
  documentPath = '';

  uploader: FileUploader = new FileUploader({ url: 'http://localhost:3000/uploads', itemAlias: 'doc' });

  constructor(private depesaService: DepeseService, private toastr: ToastrService) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; }
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      response = JSON.parse(response);
      if (response.success) {
        this.insertDepesa(response.filename)
      }
    }

  }

  showSuccess() {
    this.toastr.success('Uspješan unos depeše!', 'Uspješno!');
  };

  showError() {
    this.toastr.error('Greška prilikom unosa!', 'Greška!');
  }


  insertDepesa(documentPath:string): void {
   
    let newDepesa: Depesa = new Depesa(undefined, this.title, this.body, this.akcija,documentPath);
    this.depesaService.insertDepesa(newDepesa)
      .subscribe(result => {
        if (result.title && result.body && result._id) {
          this.showSuccess();
          this.resetFields();
        }
        else {
          this.showError();
        }

      })
  }
  
  insertDepesa2(): void {
   
    let newDepesa: Depesa = new Depesa(undefined, this.title, this.body, this.akcija,undefined);
    this.depesaService.insertDepesa(newDepesa)
      .subscribe(result => {
        if (result.title && result.body && result._id) {
          this.showSuccess();
          this.resetFields();
        }
        else {
          this.showError();
        }

      })
  }

  resetFields(): void {
    this.title = '';
    this.body = '';
    this.documentPath = '';
    }
  }
