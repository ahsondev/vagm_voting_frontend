import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { SocketService } from '../../shared/services/socket.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ModeratorModel } from '../../shared/models/moderator.model';

@Component({
     selector: 'app-moderator-setting',
     templateUrl: './moderator-setting.component.html',
     styleUrls: ['./moderator-setting.component.scss']
})
export class ModeratorSettingComponent implements OnInit {

     public moderatorModel : ModeratorModel;

     public agmId: string;

     public clients: any = [];     
     public currentUserId : any;

     public isVotingManagerFound: boolean = false;
     public isVotingManager: boolean = false;
     
     public moderatorSettings : any;
     public displayBtnBlock: boolean = true;
     public moderatorCurrentStep : number = 0;
     

     constructor(
          private _socketService: SocketService,
          private _storageService: StorageService
     ) { 
          this.agmId = this._storageService.getAgmId();
          this.currentUserId = this._storageService.getUserId();
          this.moderatorModel = new ModeratorModel();
     }

     ngOnInit() {
          this._socketService.getActiveClients((response) =>{
               if(response.code == 200) {
                    this.clients = response.data;
                    for(let i = 0; i < this.clients.length; i++) {
                         if(this.clients[i].role == 'moderator' && this.clients[i].moderator['isVotingManager']) {
                              this.isVotingManagerFound = true;
                              break;
                         }
                    }
               } else {
                    
               }
          });
          if(!this.isVotingManagerFound) {
               this.moderatorSettings = this.moderatorModel.moderatorSettingsQuestion[this.moderatorCurrentStep];
          }
     }

     public async moderatorAnswer(event) {
          if (event == 'Yes') {
               let userData = {};
               if(this.moderatorCurrentStep == 0) {
                    this.isVotingManager = true;
                    userData = {
                         'userId' : this.currentUserId,
                         'agmId' : this.agmId,
                         'profile' : {
                              'isVotingManager' : true
                         } 
                    }
               } else if(this.moderatorCurrentStep == 1) {
                    userData = {
                         'userId' : this.currentUserId,
                         'agmId' : this.agmId,
                         'profile' : {
                              'callForVote' : true
                         } 
                    }
               } else if(this.moderatorCurrentStep == 2) {
                    userData = {
                         'userId' : this.currentUserId,
                         'agmId' : this.agmId,
                         'profile' : {
                              'callForProposerSeconder' : true
                         } 
                    }
               }
               this.moderatorCurrentStep++;
               await this.updateUserProfile(userData, (status) => {
                    if(status) {
                         if (this.moderatorModel.moderatorSettingsQuestion.length > this.moderatorCurrentStep) {
                              this.setNextQuestion();
                         }
                    }
               });
          } else if(event == 'No') {
               if (this.moderatorCurrentStep > 0) {
                    let userData = {};
                    if(this.moderatorCurrentStep == 1) {
                         userData = {
                              'userId' : this.currentUserId,
                              'agmId' : this.agmId,
                              'profile' : {
                                   'callForVote' : false
                              } 
                         }
                    } else if(this.moderatorCurrentStep == 2) {
                         userData = {
                              'userId' : this.currentUserId,
                              'agmId' : this.agmId,
                              'profile' : {
                                   'callForProposerSeconder' : false
                              } 
                         }
                    }
                    this.moderatorCurrentStep++;
                    await this.updateUserProfile(userData, (status) => {
                         if(status) {
                              if (this.moderatorModel.moderatorSettingsQuestion.length > this.moderatorCurrentStep) {
                                   this.setNextQuestion();
                              }
                         }
                    });
               } else {
                    this.displayBtnBlock = false;
                    this.moderatorSettings = {
                         'label': '',
                         'question': 'Waiting for voting manager.'
                    }
               }
          } else if(event == 'Confirm') {
               this.displayBtnBlock = false;
               this.moderatorSettings = {
                    'label': '',
                    'question': 'You are the voting manager for entire meeting.',
               }
               let data = {
                    'agmId' : this.agmId
               };
               this._socketService.votingManagerLoggedIn(data);
               setTimeout(() => {
                    this.isVotingManagerFound = true;
               },100);
          } else if(event == 'Cancel') {
               let userData = {
                    'userId' : this.currentUserId,
                    'agmId' : this.agmId,
                    'profile' : {
                         'isVotingManager' : false,
                         'callForVote' : false,
                         'callForProposerSeconder' : false
                    } 
               }
               await this.updateUserProfile(userData, (status) => {
                    if(status) {
                         this.displayBtnBlock = false;
                         this.moderatorSettings = {
                              'label': '',
                              'question': 'Waiting for voting manager.'
                         }
                    }
               });
          }
     }

     public async updateUserProfile(userData, callback) {
          this._socketService.updateUserProfile(userData, (response) => {
               if (response.code == 200) {
                    callback(true);
               } else {
                    callback(false);
               }
          });
     }

     public setNextQuestion() {
          this.moderatorSettings = this.moderatorModel.moderatorSettingsQuestion[this.moderatorCurrentStep];
     }
}
