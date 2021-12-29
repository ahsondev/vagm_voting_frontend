import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { StorageService } from '../shared/services/storage.service';
import { MessageService } from '../shared/services/message.service';

@Component({
     selector: 'app-login',
     templateUrl: './login.component.html',
     styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

     public loginForm : FormGroup

     constructor(
          private _userService: UserService,
          private _router: Router,
          private _storageService: StorageService,
          private _messageService: MessageService
     ) { 

     }

     ngOnInit() {
          this.createLoginForm();
     }

     public createLoginForm() {
          this.loginForm = new FormGroup({
               'email' : new FormControl(null, [Validators.required]),
               'password': new FormControl(null, [Validators.required])
          });
     }

     public submit() {
          if(this.loginForm.valid) {
               const formData: FormData = new FormData();
               formData.append('email', this.loginForm.value.email);
               formData.append('password', this.loginForm.value.password);
               this._userService.getUserDetails(formData).subscribe(
                    (res) => {
                         if(res.status) {
                              this._messageService.showSuccessMessage(res.message);
                              this._storageService.setLoginUserDetails(res.data['result'].user_details);
                              this._router.navigateByUrl('/validate/otp');
                         } else {
                              this._router.navigateByUrl('/login');
                         }
                    },
                    (error) => {
                         this._router.navigateByUrl('/login');
                    }
               );
          }
     }
}
