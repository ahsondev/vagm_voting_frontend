import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { environment } from './../../../environments/environment';

@Injectable({
     providedIn: 'root'
})
export class BaseService {

     public apiUrl: string;
     public authURL: string
     public webSocketUrl : string;
     public chatApiURL :  string;

     constructor() { 
          this.apiUrl = environment.apiUrl;
          this.authURL = environment.authURL;
          this.webSocketUrl = environment.webSocketUrl;
          this.chatApiURL = environment.chatApiURL;
     }

     protected handleMap(response: Response) {
          return new ResponseModel(response);
     }

     protected handleError(response: HttpErrorResponse) {
          let data = {
               status: response.error.status,
               message: response.error.message,
               statusCode: response.status
          };
          return throwError(data);
     }

     public isUserAdmin(): boolean {
          if(localStorage.getItem('userRole').toLowerCase() == 'admin') {
               return true;
          }
          return false;
     }
}
