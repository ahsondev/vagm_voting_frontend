import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../shared/services/storage.service';
import { SocketService } from '../shared/services/socket.service';

@Component({
     selector: 'app-layout',
     templateUrl: './layout.component.html',
     styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

     private userId: any;
     private agmId : any;

     constructor(
          private _router: Router,
          private _storageService: StorageService,
          private _socketService: SocketService
     ) {
          this.userId = this._storageService.getUserId();
          this.agmId = this._storageService.getAgmId();
     }

     ngOnInit() {
     }

     public logout() {
          // let data = {
          //      'userId' : this.userId,
          //      'agmId' :  this.agmId
          // };
          // this._socketService.removeUserProfile(data, (response) => {
          //      if(response.status) {
          //           console.log(response);
          //      }
          // });
          this._storageService.clearAll();
          this._router.navigateByUrl('/login');

     }
}
