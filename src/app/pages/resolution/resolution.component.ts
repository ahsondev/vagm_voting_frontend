import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { SocketService } from 'src/app/shared/services/socket.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { hash } from '../../config/constant';
import * as $ from 'jquery';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ResolutionModel } from './../../shared/models/resolution.model';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
     selector: 'app-resolution',
     templateUrl: './resolution.component.html',
     styleUrls: ['./resolution.component.scss']
})
export class ResolutionComponent implements OnInit {

     private hash = hash.symbol;
     public role: string;
     public agmId: any;
     public userId: any;

     public isCurrentUserIsVotingManager: boolean = false;
     public isVotingStarted: boolean = false;
     public isShowTimer: boolean = false;
     public isTimerStarted: boolean = false;
     public isTimerFinished: boolean = false;
     public isVotingResultCalculated: boolean = false;
     public isCouncilMemberTypeResolution: boolean = false;
     public isEligibleToDeclare: boolean = false;
     public isResultPublished: boolean = false;

     public isActiveBlockExpanded: boolean = false;
     public isPendingBlockExpanded: boolean = false;
     public isGoForVote: boolean = false;
     public isGoForPole : boolean = false;


     public resolution: any = {};
     public resolutions: any = {
          'pending': [],
          'active': [],
          'decided': []
     };
     public clients: any = [];
     public timer: any;

     public message: string;
     public activeClientsDetails: any = {
          'totalLoggedInUnits': 0,
          'totalLoggedInUnitsShare': 0,
          'totalLoggedInProxyShare': 0,
          'totalActiveUserVoted': 0,
          'totalActiveUserVotedShare': 0
     };

     public usersHavingObjection = [];
     public preNominatedMembers = [];
     public newNominatedMembers = [];
     public totalNominationRecieved: number = 0;
     public noOfCouncilMemberApproved: number = 0;
     public responseOnNumberOfCouncilMember = [];
     public noOfVoteOnCouncilMember = [];

     public resolutionForm: FormGroup
     public resolutionModel: ResolutionModel;
     public resolutionTypes: any;
     public resolutionCategory: any;
     public choiceType: any;
     public decisionType : any;
     public decisionThreshold: any;
     public selectedChoiceType: any;


     constructor(
          private _socketService: SocketService,
          private _storageService: StorageService,
          private _elemRef: ElementRef,
          private _router: Router,
          private _spinner: NgxSpinnerService

     ) {
          this.role = this._storageService.getUserRole();
          this.agmId = this._storageService.getAgmId();
          this.userId = this._storageService.getUserId();

     }

     ngOnInit() {
          this.resolutionModel = new ResolutionModel();
          this.resolutionTypes = this.resolutionModel.types;
          this.resolutionCategory = this.resolutionModel.category;
          this.choiceType = this.resolutionModel.choiceTypes;
          this.decisionType = this.resolutionModel.decisionType;
          this.decisionThreshold = this.resolutionModel.decisionThreshold;
          this.createResolutionForm();

          this._socketService.getActiveClients((response) => {
               this.clients = response.data;
               if (this.clients.length > 0) {
                    for (let i = 0; i < this.clients.length; i++) {
                         let client = this.clients[i];

                         if (this.userId == client.userId) {
                              if (client.role == 'moderator' && client.moderator['isVotingManager']) {
                                   this.isCurrentUserIsVotingManager = true;
                              }
                              break;
                         }
                    }
               }
          });

          this._socketService.getActiveClientsDetails((response) => {
               if (response.status) {
                    this.activeClientsDetails.totalLoggedInUnits = response.data.totalLoggedInUnits;
                    this.activeClientsDetails.totalLoggedInUnitsShare = response.data.totalLoggedInShares;
               }
          });

          this._socketService.getResolutions(this.agmId, (response) => {
               // console.log(response);
               if (response.status) {
                    (async () => {
                         await this.setResolutionProperty(response);
                    })();
               }
          });
          this._socketService.getUserVotingResponse((response) => {
               if (response.status) {
                    if (response.status) {
                         (async () => {
                              await this.setResolutionProperty(response);
                         })();
                    }
               }
          });
          this._socketService.isVotingTimerFinished((response) => {
               if (response.status) {
                    this.isTimerStarted = false;
                    this.isTimerFinished = true;
                    (async () => {
                         this._spinner.show();
                         await this.setResolutionResult(response, () => {
                              setTimeout(() => {
                                   this._spinner.hide();
                                   this.isVotingResultCalculated = true;
                              }, 5000);
                         });
                    })();
               }
          });
     }

     public async setResolutionProperty(response) {

          this.resolutions.pending = response.data.pending;
          this.resolutions.active = response.data.active;
          this.resolutions.decided = response.data.decided;

          if (this.resolutions.active.length > 0) {

               this.isPendingBlockExpanded = false;
               this.isActiveBlockExpanded = true;

               this.resolution = this.resolutions.active[0];
               this.isVotingStarted = this.resolution.isVotingStarted;
               this.isTimerFinished = this.resolution.isTimerFinished;
               this.isResultPublished = this.resolution.isResultPublished;
               this.isGoForVote = this.resolution.goForVote;
               this.isGoForPole = this.resolution.goForPole;

               if (this.resolution.resolution_type_id == 3 || this.resolution.resolution_type_id == 4 || this.resolution.resolution_type_id == 5) {
                    this.isCouncilMemberTypeResolution = true;
                    this.newNominatedMembers = [];
                    this.preNominatedMembers = [];

                    if (this.resolution.resolution_type_id === 3) {
                         this.preNominatedMembers = this.resolution.nominated.pre;
                    }
                    if (this.resolution.resolution_type_id === 5) {
                         for (let i = 0; i < this.resolutions.decided.length; i++) {
                              let item = this.resolutions.decided[i];
                              if (item.resolution_type_id == 3) {
                                   this.totalNominationRecieved = item.nominated.pre.length + item.nominated.new.length;
                              }
                              if (item.resolution_type_id == 4) {
                                   this.noOfCouncilMemberApproved = item.approvedCouncilMember;
                              }
                         }
                    }

               } else {

                    this.isCouncilMemberTypeResolution = false;
               }

               if (this.resolution.votedUsers.length > 0) {
                    this.activeClientsDetails.totalActiveUserVoted = this.resolution.votedUsers.length;
                    let count = 0;
                    for (let a = 0; a < this.resolution.votedUsers.length; a++) {
                         let item = this.resolution.votedUsers[a];
                         if (item.user.userShares.length > 0) {
                              for (let b = 0; b < item.user.userShares.length; b++) {
                                   count += item.user.userShares[b].share_value;
                              }
                         }
                         if (item.user.proxyShares.length > 0) {
                              for (let c = 0; c < item.user.proxyShares.length; c++) {
                                   count += item.user.proxyShares[c].share_value;
                              }
                         }

                    }
                    this.activeClientsDetails.totalActiveUserVotedShare = count;
               } else {
                    this.activeClientsDetails.totalActiveUserVoted = 0;
                    this.activeClientsDetails.totalActiveUserVotedShare = 0;
               }

               if (this.isTimerFinished) {
                    await this.setResolutionResult(response, () => {
                         this.isVotingResultCalculated = true;
                    });
               }
          }
     }



     public startResolution(id) {
          if (!this.isEmpty(this.resolution) && this.resolution.isActive) {
               this.message = 'Another Resolution is already active';
               $(this._elemRef.nativeElement).find(this.hash + 'pending-message-' + id).toggle();
          } else {
               $(this._elemRef.nativeElement).find(this.hash + 'pending-resolution-' + id).toggle();
               $(this._elemRef.nativeElement).find(this.hash + 'confirmation-block-' + id).toggle();
          }

     }

     public confirmStartResolution(id) {
          let resolution = this.resolutions.pending;
          for (let i = 0; i <= resolution.length; i++) {
               let item = resolution[i];
               if (item.resolution_id == id) {
                    this._socketService.startResolution(item, (response) => {
                         // console.log(response);
                         if (response.status) {
                              (async () => {
                                   await this.setResolutionProperty(response);
                                   this.isShowTimer = false;
                                   this.isVotingResultCalculated = false;
                                   this.isTimerFinished = false;
                              })();
                         }
                    });
                    break;
               }
          }
     }

     public backToPending(item) {
          this._socketService.backToPending(item, (response) => {
               if (response.status) {
                    (async () => {
                         await this.setResolutionProperty(response);
                         this.resolution = {};
                    })();
               }
          });
     }

     public cancelStartResolution(id) {
          $(this._elemRef.nativeElement).find(this.hash + 'pending-resolution-' + id).toggle();
          $(this._elemRef.nativeElement).find(this.hash + 'confirmation-block-' + id).toggle();
     }

     public startVoting(resolution) {
          this.resolution = resolution;
          this._socketService.startVoting(resolution, (response) => {
               if (response.status) {
                    this.isVotingStarted = true;
               }
          });
     }

     public showTimer() {
          this.isShowTimer = true;
     }

     public startTimer(event) {
          if (event.target.value != null) {
               let timer = {
                    'time': event.target.value,
                    'agmId': this.agmId,
                    'resolution_id': this.resolution.resolution_id
               };
               this._socketService.startTimer(timer, (response) => {
                    if (response.status && response.message == 'Timer Start') {
                         this.isShowTimer = false;
                         this.timer = response.data;
                         this.isTimerStarted = true;
                         this.isTimerFinished = false;
                    }
               });
          }
     }

     public goForVote() {
          this._socketService.goForVote(this.resolution, (response) => {
               if (response.status) {
                    (async () => {
                         await this.setResolutionProperty(response);
                         this.isShowTimer = false;
                         this.isVotingResultCalculated = false;
                         this.isTimerFinished = false;
                    })();
               }
          });
     }

     public goForPole() {
          this._socketService.goForPole(this.resolution, (response) => {
               if (response.status) {
                    (async () => {
                         await this.setResolutionProperty(response);
                         this.isShowTimer = false;
                         this.isVotingResultCalculated = false;
                         this.isTimerFinished = false;
                    })();
               }
          });
     }


     public async setResolutionResult(response, callback) {
          let resolution = response.data.active[0];
          this.clients = response.clients;
          this.resolution = response.data.active[0];
          console.log(this.resolution);
          if (resolution.resolution_type == 'Ordinary Resolution') {
               if (this.isCouncilMemberTypeResolution) {
                    if (resolution.resolution_type_id == 3) {
                         this.preNominatedMembers = resolution.nominated.pre;
                         this.newNominatedMembers = resolution.nominated.new;
                         callback(true);
                    } else if (resolution.resolution_type_id == 4) {
                         this.responseOnNumberOfCouncilMember = resolution.responseOnNumberOfCouncilMember;
                         this.noOfCouncilMemberApproved = resolution.approvedCouncilMember;

                         if (this.responseOnNumberOfCouncilMember.length > 0) {
                              this.responseOnNumberOfCouncilMember.forEach((item) => {
                                   item.percentage = ((item.count / this.clients.length) * 100).toFixed(2);
                              });
                         }
                         callback(true);
                    } else if (resolution.resolution_type_id == 5) {
                         this.noOfVoteOnCouncilMember = resolution.electedCouncilMember;
                         callback(true);
                    }

               } else {
                    this.usersHavingObjection = [];
                    if (resolution.usersHavingObjection.length > 0) {
                         let usersHavingObjection = [];
                         for (let i = 0; i < resolution.usersHavingObjection.length; i++) {
                              let item = resolution.usersHavingObjection[i];
                              if (item.answer == '-1' && !item.addressed) {
                                   usersHavingObjection.push(item);
                              }
                         }
                         this.usersHavingObjection = usersHavingObjection;
                         // console.log(resolution);
                    }
                    callback(true);
               }
          } else {
               
               callback(true);
          }

     }

     public adressed(user) {
          this._socketService.addressUser(user, (response) => {
               console.log(response);
               if (response.status) {
                    let resolutions = response.data.active;
                    let usersHavingObjection = [];
                    for (let a = 0; a < resolutions.length; a++) {
                         let item = resolutions[a];
                         for (let b = 0; b < item.usersHavingObjection.length; b++) {
                              if (item.usersHavingObjection[b].answer == '-1' && !item.usersHavingObjection[b].addressed) {
                                   usersHavingObjection.push(item.usersHavingObjection[b]);
                              }
                         }
                    }
                    this.usersHavingObjection = usersHavingObjection;
               }
          });
     }

     public publish() {
          this._socketService.publishResult(this.resolution, (response) => {
               if (response.status) {
                    (async () => {
                         await this.setResolutionProperty(response);
                    })();
               }
          });
     }

     public closeAndMove() {
          this._socketService.moveToDecided(this.resolution, (response) => {
               if (response.status) {
                    this.resolutions.pending = response.data.pending;
                    this.resolutions.active = response.data.active;
                    this.resolutions.decided = response.data.decided;
                    this.isActiveBlockExpanded = false;
                    this.resolution = {};
                    // this._router.navigateByUrl('/voting/dummy', { skipLocationChange: false }).then(() => {
                    //      this._router.navigate(['/voting/moderator']);
                    // });
               }
          });
     }

     public isEmpty(obj) {
          for (var key in obj) {
               if (obj.hasOwnProperty(key))
                    return false;
          }
          return true;
     }

     public createResolutionForm() {
          this.resolutionForm = new FormGroup({
               'agmId': new FormControl(this.agmId),
               'number': new FormControl(null, [Validators.required]),
               'types': new FormControl(),
               'category': new FormControl(),
               'heading': new FormControl(),
               'choiceType': new FormControl(),
               'choiceFirst' : new FormControl(),
               'choiceSecond' : new FormControl(),
               'decisionType' :  new FormControl(),
               'decisionThreshold' : new FormControl(),
               'proxyAllowed': new FormControl(),
               'description': new FormControl()
          });
     }

     public createChoiceOptions() : FormGroup {
          return new FormGroup({
               'a' : new FormControl(),
               'b' : new FormControl()
          });
     }

     public createResolution() {
          // console.log(this.resolutionForm.value);

          this._socketService.createResolution(this.resolutionForm.value, (response) => {
               if (response.status) {
                    (async () => {
                         await this.setResolutionProperty(response);
                    })();
                    this.isPendingBlockExpanded = true;
               }
          });
     }

     public onChangeChoiceType(event) {
          this.selectedChoiceType = event.target.value;
     }
}
