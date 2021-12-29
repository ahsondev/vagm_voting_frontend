import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../shared/services/storage.service';

@Component({
     selector: 'app-auth',
     templateUrl: './auth.component.html',
     styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

     dd:any; 
     hh:any;
     mm:any;
     ss:any;

     private token : string;
     private code : string;

     constructor(
          private _spinner: NgxSpinnerService,
          private _router: Router,
          private _activateRoute : ActivatedRoute,
          private _storageService : StorageService
     ) { 
          this._activateRoute.queryParams.subscribe(params => {
               this.token = params['token'];
               this.code = params['code'];
          });
          this._spinner.show();
     }

     ngOnInit() {
          if(this.token == '' || this.code == '') {
               this._router.navigateByUrl('/login');
          } else {
               this._storageService.setAuthToken(this.token);
               this._storageService.setMeetingCode(this.code);
               setTimeout(() => {
                    this._spinner.hide();
                    this._router.navigateByUrl('/voting');
               }, 2000);
          }
     }

}
