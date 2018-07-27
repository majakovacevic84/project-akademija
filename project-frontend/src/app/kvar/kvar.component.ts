import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { Kvar } from '../Kvar';
import { KvarService } from '../services/kvar.service';

@Component({
  selector: 'app-kvar',
  templateUrl: './kvar.component.html',
  styleUrls: ['./kvar.component.css']
})
export class KvarComponent implements OnInit {

  title = '';
  body = '';
  akcija='Kvar';
  selectedKvar: Kvar = null;

  constructor(private kvarService : KvarService) { }

  ngOnInit() {
  }

  insertKvar():void {

    let newKvar : Kvar = new Kvar(undefined, this.title,this.body,this.akcija);
    this.kvarService.insertKvar(newKvar)
      .subscribe(result => {
        if (result.title && result.body && result._id){
          alert('Kvar je isnertovan!');
          this.resetFields();  
        }
        else{
          alert('Greska prilikom unosa!');
        }
        
      })
  }

  resetFields():void{
    this.title = '';
    this.body = '';
  }

}
