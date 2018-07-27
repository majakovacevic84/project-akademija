import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { Depesa } from '../Depesa';
import { DepeseService } from '../services/depese.service';

@Component({
  selector: 'app-depesa',
  templateUrl: './depesa.component.html',
  styleUrls: ['./depesa.component.css']
})
export class DepesaComponent implements OnInit {

  title = '';
  body = '';
  akcija ='Depesa';
  selectedDepesa: Depesa = null;

  constructor(private depesaService : DepeseService) { }

  ngOnInit() {
  }


  insertDepesa():void {

    let newDepesa : Depesa = new Depesa(undefined, this.title,this.body,this.akcija);
    this.depesaService.insertDepesa(newDepesa)
      .subscribe(result => {
        if (result.title && result.body && result._id){
          alert('Depesa je isnertovana!');
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
