import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/services/storage.service';
import { Router } from '@angular/router';

@Component({
     selector: 'app-logout',
     templateUrl: './logout.component.html',
     styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

     constructor(
          private _storageService: StorageService,
          private _router: Router
     ) { }

     ngOnInit() {
          this._storageService.clearAll();
          this._router.navigateByUrl('/login');
     }

}
