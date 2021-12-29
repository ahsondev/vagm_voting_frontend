import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SocketService } from '../../shared/services/socket.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
     selector: 'app-quorum-status',
     templateUrl: './quorum-status.component.html',
     styleUrls: ['./quorum-status.component.scss']
})
export class QuorumStatusComponent implements OnInit {

     public userId: any;
     public agmId: any;
     public role: string;
    
     public isQuorumAchieved: boolean = false;
     public isUserVotingManager: boolean = false;
     public isMeetingStarted: boolean = false;

     public quorumDetails: any = {
          'loggedInShares': 'XX',
          'remaningShares': 'YY',
          'remaningTime': 'XX'
     }

     constructor(
          private _socketService: SocketService,
          private _storageService: StorageService
     ) {
          this.userId = this._storageService.getUserId();
          this.role = this._storageService.getUserRole();
          this.agmId = this._storageService.getAgmId();
     }

     ngOnInit() {
          this._socketService.isMeetingStarted(this.agmId , (response) => {
               // console.log(response);
               if (response.status) {
                    this.isMeetingStarted = true;
                    this.isQuorumAchieved = true;
               } else {
                    this._socketService.isQuorumAchived(this.agmId  , (response) => {
                         if (response.code == 200) {
                              this.isQuorumAchieved = true;
                              let data = {
                                   'userId' : this.userId,
                                   'agmId' : this.agmId
                              };
                              this._socketService.isUserVotingManager(data, (res) => {
                                   if (res.status) {
                                        this.isUserVotingManager = true;
                                   }
                              });
                         }
                    });
               }
          });

          this._socketService.getQuorumDetails(this.agmId , (response) => {
               if(response.status) {
                    this.quorumDetails.loggedInShares = response.data.loggedInShares;
                    this.quorumDetails.remaningShares = response.data.remaningShares;    
               }
          });
     }

     public startMeeting() {
          let data = {
               'agmId' : this.agmId
          };
          this._socketService.startMeeting(data, (response) => {
               if (response.data) {
                    this.isMeetingStarted = true;
               }
          });
     }
}
