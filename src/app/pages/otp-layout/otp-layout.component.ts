import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { MessageService } from '../../shared/services/message.service';
import { UserService } from 'src/app/shared/services/user.service';
import { StorageService } from 'src/app/shared/services/storage.service';


@Component({
     selector: 'app-otp-layout',
     templateUrl: './otp-layout.component.html',
     styleUrls: ['./otp-layout.component.scss']
})
export class OtpLayoutComponent implements OnInit {

     public otp: any;
     public otpLength : number;
     public otpConfig = {
          length : 6,
          allowNumbersOnly: true
     };

     constructor(
          private _messageService: MessageService,
          private _userService: UserService,
          private _storageService: StorageService,
          private _router : Router
     ) { }

     ngOnInit() {

     }

     public onOtpChange(otp) {
          this.otp = otp;
          this.otpLength = this.otp.length;
     }

     public onSubmitOtp() {
          let data = {
               'user_id' : this._storageService.getUserId(),
               'otp' : this.otp
          }
          this._userService.verifyOtp(data).subscribe(
               (res) => {
                    if(res.status) {
                         this._storageService.setAuthToken(res.data['result'].auth_token);
                         this._router.navigateByUrl('/voting');
                    } else {
                         this._messageService.showFailureMessage(res.message);
                    }
               },
               (error) => {
                    this._messageService.showFailureMessage('Something went wrong! Please try again.');
               }
          )
     }
}
