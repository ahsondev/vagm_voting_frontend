import { Injectable } from '@angular/core';

@Injectable({
     providedIn: 'root'
})
export class StorageService {

     constructor() { }

     public setLoginUserDetails(data: any) {
          localStorage.setItem('isUserLoggedIn', '1');
          localStorage.setItem('userId', data.id);
          localStorage.setItem('role', data.group_name);
          localStorage.setItem('loggedInUserDetails', JSON.stringify(data));
     }

     public setAuthToken(token) {
          localStorage.setItem('token', token);
     }

     public setMeetingCode(code) {
          localStorage.setItem('code', code);
     }

     public setWebinarDetails(details) {
          localStorage.setItem('isUserLoggedIn', '1');
          localStorage.setItem('role', details.role);
          localStorage.setItem('agmId', details.id);
          localStorage.setItem('keyId', details.key_id);
          localStorage.setItem('userId', details.user_id);
          localStorage.setItem('nickName', details.nickname);
          localStorage.setItem('webinarDetails', JSON.stringify(details));
     }

     public getWebinarDetails() {
          return JSON.parse(localStorage.getItem('webinarDetails'));
     }

     public getAgmId() {
          return localStorage.getItem('agmId');
     }
     public getAgmKeyId() {
          return localStorage.getItem('keyId');
     }
     public getUserDetails() {
          return JSON.parse(localStorage.getItem('loggedInUserDetails'));
     }

     public getLoggedInUser() {
          return localStorage.getItem('isUserLoggedIn');
     }

     public getAuthToken() {
          return localStorage.getItem('token');
     }

     public getMeetingCode() {
          return localStorage.getItem('code');
     }

     public getUserId() {
          return localStorage.getItem('userId');
     }

     public getUserNickName() {
          return localStorage.getItem('nickName');
     }

     public getUserRole() {
          return localStorage.getItem('role');
     }

     public clearAll() {
          localStorage.clear();
     }
}
