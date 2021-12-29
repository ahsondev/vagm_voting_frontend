import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../shared/services/socket.service';
import { StorageService } from 'src/app/shared/services/storage.service';


@Component({
     selector: 'app-moderator',
     templateUrl: './moderator.component.html',
     styleUrls: ['./moderator.component.scss']
})
export class ModeratorComponent implements OnInit {

     public role: string;
     public agmId: string;
     public userId: any;

     public isQuorumAchieved: boolean = false;
     public isUserVotingManager: boolean = false;
     public isMeetingStarted: boolean = false;


     constructor(
          private _socketService: SocketService,
          private _storageService: StorageService
     ) {
          this.role = this._storageService.getUserRole();
          this.agmId = this._storageService.getAgmId();
          this.userId = this._storageService.getUserId();
          this._socketService.initConnection();
     }

     ngOnInit() {
          let data = {
               'userId' : this.userId,
               'agmId' : this.agmId
          };
          this._socketService.isUserVotingManager(data, (res) => {
               if (res.status) {
                    this.isUserVotingManager = true;
               } else {
                    this._socketService.isVotingManagerLoggedIn((response) => {
                         if (response.status) {
                              this.isUserVotingManager = true;
                         }
                    });
               }
          });
          this._socketService.isMeetingStarted(this.agmId, (response) => {
               if (response.status) {
                    this.isMeetingStarted = true;
               } else {
                    this._socketService.startMeetingResponse((response) => {
                         if (response.status) {
                              setTimeout(() => {
                                   this.isMeetingStarted = true; 
                              }, 100);
                         }
                    });
               }
          });
     }
}
