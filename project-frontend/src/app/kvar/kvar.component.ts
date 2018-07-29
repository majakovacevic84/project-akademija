import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { Kvar } from '../Kvar';
import { KvarService } from '../services/kvar.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-kvar',
  templateUrl: './kvar.component.html',
  styleUrls: ['./kvar.component.css']
})
export class KvarComponent implements OnInit {

  title = '';
  body = '';
  akcija = 'Kvar';
  selectedKvar: Kvar = null;
  documentPath = '';
  uploader: FileUploader = new FileUploader({ url: 'http://localhost:3000/uploads', itemAlias: 'doc' });

  constructor(private kvarService: KvarService, private toastr: ToastrService) { }

    ngOnInit() {
      this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; }
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        response = JSON.parse(response);
        if (response.success) {
          this.insertKvar(response.filename)
        }
      }

  }

  showSuccess() {
    this.toastr.success('Uspješno!', 'Uspješan unos kvara!');
  };

  showError() {
    this.toastr.error('Greška!', 'Greška prilikom unosa!');
  }

  insertKvar(documentPath:string): void {
    let newKvar: Kvar = new Kvar(undefined, this.title, this.body, this.akcija,documentPath);
    this.kvarService.insertKvar(newKvar)
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


  insertKvar2(): void {
    let newKvar: Kvar = new Kvar(undefined, this.title, this.body, this.akcija,undefined);
    this.kvarService.insertKvar(newKvar)
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
