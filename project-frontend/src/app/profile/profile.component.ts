import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../User';

import { ToastrService } from 'ngx-toastr';
import { FileUploader, FileItem } from 'ng2-file-upload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})



export class ProfileComponent implements OnInit {

  meUser: User = null;

  uploader: FileUploader = new FileUploader({ url: 'http://localhost:3000/uploads', itemAlias: 'doc' });

  docUrl: string = 'http://localhost:3000/uploads/';//ovo je potrebno zbog ts je se poziva na ovaj URL

  valid: boolean = false;

  changePass: boolean = false;

  constructor(private userService: UserService, private authService: AuthenticationService,
    private toastr: ToastrService) { }


  ngOnInit() {

    //this.getUserByID();

    let user = this.authService.getUserDetails();
    this.userService.getUserByID(user._id)
      .subscribe(data => {
      this.meUser = data;
      //console.log( this.meUser);
        this.valid = true;
      });



    /***************************Upload profile pict   ************************/
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; }
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      response = JSON.parse(response);
      //console.log(response);
      if (response.success) {
        this.uploadPicture(response.filename)
      }
    }

  }

  /************** UploadPicture ***********/

  uploadPicture(picturePath: string) {
    //let newUser : Ticket = new Ticket(undefined, this.title, this.body,this.akcija,documentPath);
    let user = this.authService.getUserDetails();
    user.picturePath = picturePath;

    this.userService.updateUser(user)
      .subscribe(result => {
        if (result) {
          this.showSuccess();
          location.reload();
        }
        else {
          this.showError();
        }

      })
  }

  /************** UserID ***********/

  getUserByID() {
    let user2 = this.authService.getUserDetails();
    this.meUser = user2;
  }



  /************** Toastr  *****************/
  showSuccess() {
    this.toastr.success('Uspješan unos izmjena!', 'Uspješno!');
  };


  showError() {
    this.toastr.error('Greška prilikom unosa!', 'Greška!');
  }

  /********** click forpasschange ********/
  passFunction(){
this.changePass=true;
  }

  /*******     ********** */
  /*
  updateUserPass(){
    //console.log(this.meUser);
    let user = this.authService.getUserDetails();
    this.authService.updateUserPass(user);
      }
*/


}
