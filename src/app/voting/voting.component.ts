import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../shared/services/storage.service';
import { MessageService } from '../shared/services/message.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
     selector: 'app-voting',
     templateUrl: './voting.component.html',
     styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit {

     private role: string;
     private webinarDetails: any;
     public isUserAuthenticated : boolean = false;
     public isEarliestLoginTimeReached : boolean = false;

     constructor(
          private _router: Router,
          private _activateRoute: ActivatedRoute,
          private _storageService: StorageService,
          private _messageService: MessageService,
          private _spinner: NgxSpinnerService,
     ) {
          this._spinner.show();
     }

     ngOnInit() {
          let response = this._activateRoute.data;
          response.subscribe(
               (res) => {
                    this.webinarDetails = res.resolver;
                    if(this.webinarDetails.details != null) {
                         let details = this.webinarDetails.details;
                         if (details.data.status) {

                              this.isUserAuthenticated = details.data.status;
                              this.isEarliestLoginTimeReached = true;

                              let result = details.data.result;
                              this.role = result.data.role;

                              if(result.data.proxy_shares.length > 0) {
                                   result.data.proxy_shares.forEach((item) => {
                                        item.share_value = parseInt(item.share_value);
                                        item.resolutions = [];
                                   });
                              }
                              if(result.data.user_shares.length > 0) {
                                   result.data.user_shares.forEach((item) => {
                                        item.share_value = parseInt(item.share_value);
                                        item.resolutions = [];
                                   });
                              }
                              result.data.token = this._storageService.getAuthToken();
                              this._storageService.setWebinarDetails(result.data);
                              this._spinner.hide();
                              if (this.role == 'moderator') {
                                   this._router.navigateByUrl('/voting/moderator');
                              } else if (this.role == 'sp') {
                                   this._router.navigateByUrl('/voting/sp/' + result.data.user_id);
                              } else if (this.role == 'chairman') {
                                   this._router.navigateByUrl('/voting/chairman');
                              }
                         }

                    } else {
                         this._router.navigateByUrl('/login');
                         this._messageService.showFailureMessage(this.webinarDetails.error.message.toString());
                    }
               },
               (error) => {
                    this._router.navigateByUrl('/login');
                    this._messageService.showFailureMessage('Something went wrong! Please try again.');
               }
          );
     }

}
