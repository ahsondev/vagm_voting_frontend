import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../shared/services/socket.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
     selector: 'app-chairman',
     templateUrl: './chairman.component.html',
     styleUrls: ['./chairman.component.scss']
})
export class ChairmanComponent implements OnInit {

     private role: string;
     private agmId: string;
     

     constructor(
          private _socketService: SocketService,
          private _storageService: StorageService
     ) {
          this.role = this._storageService.getUserRole();
          this.agmId = this._storageService.getAgmId();
          this._socketService.initConnection();
     }

     ngOnInit() {
          
     }

}
