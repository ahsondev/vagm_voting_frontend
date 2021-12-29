import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../shared/services/socket.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
     selector: 'app-sp',
     templateUrl: './sp.component.html',
     styleUrls: ['./sp.component.scss']
})
export class SpComponent implements OnInit {

     public role: string;
     public agmId: string;
     public userId: any;

     public isMeetingStarted: boolean = false;
     public isVotingStarted: boolean = false;
     public isTimerStarted: boolean = false;
     public isTimerFinished: boolean = false;
     public isUserVoted: boolean = false;
     public isUserVotedForObjection: boolean = false;
     public isGoForVote: boolean = false;
     public isGoForPole : boolean = false;
     public isResultPublished: boolean = false;
     public isCouncilMemberTypeResolution: boolean = false;
     public isNominatedBySomeOne: boolean = false;
     public isNominatedForSelf: boolean = false;
     public isResponseOnNomination: boolean = false;
     public isEligibleToNominate: boolean = false;
     public isEligibleToSelectMember: boolean = true;



     public timer: any;
     public resolution: any = {};
     public votingResult: any;
     public loggedInUserDetails: any;
     public preNominatedMembers = [];
     public newNominatedMembers = [];
     public nominatedMembers = [];
     public noOfCouncilMemberApproved: number;
     public responseOnNumberOfCouncilMember = [];
     public resolutions: any = {
          'pending': [],
          'active': [],
          'decided': []
     };
     public clients: any = [];
     public loggedInSpClients = [];
     public showSpList: boolean = false;
     public noOfNominationAllowed: number = 0;
     public noOfNominationGiven: number = 0;
     public noOfSelectedMember: number = 0;
     public clientIdForNomination: any;
     public nominationFor: string;
     public rangeForCouncilMember: any = [];
     public electedCouncilMember :  any = [];
     


     constructor(
          private _socketService: SocketService,
          private _storageService: StorageService,
          private _spinner: NgxSpinnerService
     ) {
          this.role = this._storageService.getUserRole();
          this.agmId = this._storageService.getAgmId();
          this.userId = this._storageService.getUserId();
          this._socketService.initConnection();
     }

     ngOnInit() {

          this._socketService.getActiveClients((response) => {
               if (response.status) {
                    this.clients = response.data;
                    for (let i = 0; i < this.clients.length; i++) {
                         let item = this.clients[i];
                         if (item.userId == this.userId) {
                              this.noOfNominationGiven = item.nomination.given;
                              if (item.nomination.nominatedBy == this.userId) {
                                   this.isNominatedForSelf = true;
                              }
                              if (this.noOfNominationGiven == this.noOfNominationAllowed) {
                                   this.isEligibleToNominate = false;
                              }
                         }
                    }
               }
          });

          this._socketService.getUserDetails(this.agmId, this.userId, (response) => {
               if (response.status) {
                    this.loggedInUserDetails = response.data;
                    this.noOfNominationAllowed = this.loggedInUserDetails.nomination.allowed;
                    this.noOfNominationGiven = this.loggedInUserDetails.nomination.given;
               }
          });
          this._socketService.isMeetingStarted(this.agmId, (response) => {
               if (response.status) {
                    this.isMeetingStarted = true;
               } else {
                    this._socketService.startMeetingResponse((response) => {
                         if (response.status) {
                              this.isMeetingStarted = true;
                         }
                    });
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

          this._socketService.isResolutionStarted((response) => {
               if (response.status) {
                    (async () => {
                         await this.setResolutionProperty(response);
                    })();
                    // if (this.resolution.votedUsers.length > 0) {
                    //      for (let i = 0; i < this.resolution.votedUsers.length; i++) {
                    //           let item = this.resolution.votedUsers[i];
                    //           if (item.userId = this.userId) {
                    //                this.isUserVoted = true;
                    //           }
                    //      }
                    // } else {
                    //      this.isUserVoted = false;
                    //      this.isTimerFinished = false;
                    //      this.isTimerStarted = false;
                    // }
               }
          });

          this._socketService.isResolutionBackToPending((response) => {
               if (response.status) {
                    (async () => {
                         await this.setResolutionProperty(response);
                    })();
               }
          });

          this._socketService.isVotingStarted((response) => {
               if (response.status) {
                    this.isVotingStarted = true;
                    this.resolution = response.data;
               }
          });

          this._socketService.isVotingTimerStart((response) => {
               if (response.status) {
                    this.timer = response.data;
                    this.isTimerStarted = true;
               }
          });

          this._socketService.isVotingTimerFinished((response) => {
               if (response.status) {
                    this.isTimerFinished = true;
                    this._spinner.show();
               }
          });

          this._socketService.isCurrentResolutionFinised((response) => {
               if (response.status) {
                    (async () => {
                         await this.setResolutionProperty(response);
                    })();
               }
          });

          this._socketService.isResultPublished((response) => {
               if (response.status) {
                    (async () => {
                         await this.setResolutionResult(response).then(() => {
                              this._spinner.hide();
                              this.isResultPublished = true;
                              this.votingResult = response.data;
                         });
                    })();
               }
          });

          this._socketService.isGoForVote((response) => {
               if (response.status) {
                    (async () => {
                         this._spinner.hide();
                         await this.setResolutionProperty(response);
                    })();
               }
          });

          this._socketService.isGoForPole((response) => {
               if (response.status) {
                    (async () => {
                         this._spinner.hide();
                         await this.setResolutionProperty(response);
                    })();
               }
          });

          this._socketService.isNominated((response) => {
               // console.log(response);
               if (response.status) {
                    this.clients = response.data;
                    for (let i = 0; i < this.clients.length; i++) {
                         let item = this.clients[i];
                         if (item.userId == this.userId) {
                              // console.log(item.nomination.isNominated);
                              // console.log(item.nomination.accepted);
                              // console.log(item.nomination.declined);
                              if (item.nomination.isNominated && !item.nomination.accepted && !item.nomination.declined) {
                                   this.isNominatedBySomeOne = true;
                              } else {
                                   this.isResponseOnNomination = true;
                              }
                              break;
                         }
                    }
               }
          });
     }

     public async setResolutionProperty(response) {
          this.resolution = {};
          this.resolutions.pending = response.data.pending;
          this.resolutions.active = response.data.active;
          this.resolutions.decided = response.data.decided;

          if (this.resolutions.active.length > 0) {

               this.resolution = this.resolutions.active[0];
               // console.log(this.resolution);
               this.isVotingStarted = this.resolution.isVotingStarted;
               this.isTimerFinished = this.resolution.isTimerFinished;
               this.isTimerStarted = this.resolution.isTimerStarted;
               this.isResultPublished = this.resolution.isResultPublished;
               this.isGoForVote = this.resolution.goForVote;
               this.isGoForPole = this.resolution.goForPole;

               if (this.resolution.votedUsers.length > 0) {
                    for (let i = 0; i < this.resolution.votedUsers.length; i++) {
                         let item = this.resolution.votedUsers[i];
                         if (item.user.userId == this.userId) {
                              this.isUserVoted = true;
                         }
                    }
               } else {
                    this.isUserVoted = false;
               }

               if (this.resolution.usersHavingObjection.length > 0) {
                    for (let i = 0; i < this.resolution.usersHavingObjection.length; i++) {
                         let item = this.resolution.usersHavingObjection[i];
                         if (item.user.userId == this.userId) {
                              this.isUserVotedForObjection = true;
                         }
                    }
               } else {
                    this.isUserVotedForObjection = false;
               }
               
               if (this.resolution.resolution_type_id == 3 || this.resolution.resolution_type_id == 4 || this.resolution.resolution_type_id == 5) {
                    this.isCouncilMemberTypeResolution = true;
                    if (this.resolution.resolution_type_id == 3) {
                         if (this.noOfNominationGiven < this.noOfNominationAllowed) {
                              this.isEligibleToNominate = true;
                         }
                         this.preNominatedMembers = this.resolution.nominated.pre;
                         this.newNominatedMembers = this.resolution.nominated.new;
                    }
                    if (this.resolution.resolution_type_id == 4) {
                         this.rangeForCouncilMember = [];
                         let min = this.resolution.minCouncilMember;
                         let max = this.resolution.maxCouncilMember;
                         for (let i = min; i <= max; i++) {
                              this.rangeForCouncilMember.push(i);
                         }
                    }
                    if (this.resolution.resolution_type_id == 5) {
                         this.nominatedMembers = [];
                         // console.log(this.resolutions.decided);
                         for (let i = 0; i < this.resolutions.decided.length; i++) {
                              let item = this.resolutions.decided[i];
                              if (item.resolution_type_id == 3) {
                                   item.nominated.pre.map(member => { 
                                        let temp = {
                                             'nickname' : member.nominated_user_name,
                                             // 'item' : member,
                                             'selected' : false
                                        };
                                        this.nominatedMembers.push(temp); 
                                   });
                                   item.nominated.new.map(member => { 
                                        let temp = {
                                             'nickname' : member.nickname,
                                             // 'item' : member,
                                             'selected' : false
                                        };
                                        this.nominatedMembers.push(temp); 
                                   });
                              }

                              if (item.resolution_type_id == 4) {
                                   // console.log(item);
                                   this.noOfCouncilMemberApproved = item.approvedCouncilMember;
                              }
                         }
                         // console.log(this.nominatedMembers);
                         if (this.resolution.votedUsers.length > 0) {
                              // console.log(this.resolution.votedUsers);
                              for (let i = 0; i < this.resolution.votedUsers.length; i++) {

                                   let item = this.resolution.votedUsers[i];

                                   // console.log(item.user.userId);
                                   // console.log(this.userId);
                                   // console.log(typeof item.user.userId);
                                   // console.log(typeof this.userId); 
                                   // console.log(item);
                                   if (item.user.userId == this.userId) {
                                        // console.log(item);
                                        // this.noOfSelectedMember = item.answer.length;
                                        // console.log(item.answer.length);
                                        // console.log(this.noOfCouncilMemberApproved);
                                        if (item.answer.length >= this.noOfCouncilMemberApproved) {
                                             this.isEligibleToSelectMember = false;
                                        } else {
                                             this.isEligibleToSelectMember = true;
                                        }
                                        // console.log(this.isEligibleToSelectMember);
                                        // console.log(this.userId);

                                        if (item.answer.length > 0) {
                                             for (let a = 0; a < this.nominatedMembers.length; a++) {
                                                  let found = false;
                                                  for (let b = 0; b < item.answer.length; b++) {
                                                       if (this.nominatedMembers[a].nickname == item.answer[b].nickname) {
                                                            found = true;
                                                       }
                                                  }
                                                  if (found) {
                                                       this.nominatedMembers[a].selected = true;
                                                  } else {
                                                       this.nominatedMembers[a].selected = false;
                                                  }
                                             }
                                        }
                                        break;
                                   }
                              }
                         }
                    }
               } else {
                    this.isCouncilMemberTypeResolution = false;
               }

               if (this.isResultPublished) {
                    await this.setResolutionResult(response).then(() => {

                    });
               }

          }
     }

     public async setResolutionResult(response) {
          let resolution = response.data.active[0];
          this.resolution = response.data.active[0];
          this.clients = response.clients;
          if (resolution.resolution_type == 'Ordinary Resolution') {
               if (this.isCouncilMemberTypeResolution) {
                    if (resolution.resolution_type_id == 3) {
                         this.preNominatedMembers = resolution.nominated.pre;
                         this.newNominatedMembers = resolution.nominated.new;
                         
                    } else if (resolution.resolution_type_id == 4) {
                         this.responseOnNumberOfCouncilMember = resolution.responseOnNumberOfCouncilMember;
                         this.noOfCouncilMemberApproved = resolution.approvedCouncilMember;
                         if (this.responseOnNumberOfCouncilMember.length > 0) {
                              this.responseOnNumberOfCouncilMember.forEach((item) => {
                                   item.percentage = ((item.count / this.clients.length) * 100).toFixed(2);
                              });
                         }
                    } else if(resolution.resolution_type_id == 5) {
                         this.electedCouncilMember = resolution.electedCouncilMember
                    }
               }
          } else {
               this.resolution = resolution;
          }
     }


     public async votingAnswer(answer) {
          // console.log(answer);
          let data = {};
          if (answer == 'Objection') {
               data = {
                    'resolution_id': this.resolution.resolution_id,
                    'answer': '-1',
                    'agmId': this.agmId,
                    'user': this.loggedInUserDetails,
                    'addressed': false,
                    'Objection': true
               };
          } else {
               data = {
                    'resolution_id': this.resolution.resolution_id,
                    'answer': answer,
                    'agmId': this.agmId,
                    'user': this.loggedInUserDetails
               };
          }
          this._socketService.updateResolutionAnswer(data, (response) => {
               console.log(response);
               if (response.status) {
                    (async () => {
                         await this.setResolutionProperty(response);
                    })();
               }
          });
     }

     public onChangeNominationType(event) {
          this.nominationFor = event.target.value;
          if (event.target.value != 'self') {
               this.showSpList = true;
               this._socketService.getActiveClients((response) => {

                    if (response.status) {
                         this.clients = response.data;
                         // console.log(this.clients);
                         for (let i = 0; i < this.clients.length; i++) {
                              let item = this.clients[i];
                              // console.log(item);
                              // console.log(this.userId);
                              if (item.role == 'sp' && item.userId != this.userId) {
                                   this.loggedInSpClients.push(item);
                              }
                         }
                         // console.log(this.loggedInSpClients);
                    }
               });
          }
     }

     public onChanngeClientForNomination(event) {
          this.clientIdForNomination = event.target.value;
     }

     public nominate() {
          let data = {};
          if (this.nominationFor == 'self') {
               data = {
                    'agmId': this.agmId,
                    'nominatedUserId': this.userId,
                    'nominatedByUserId': this.userId
               }
          } else if (typeof this.clientIdForNomination != 'undefined') {
               data = {
                    'agmId': this.agmId,
                    'nominatedUserId': this.clientIdForNomination,
                    'nominatedByUserId': this.userId
               }
          } else if (typeof this.nominationFor == 'undefined') {
               data = {
                    'agmId': this.agmId,
                    'nominatedUserId': this.userId,
                    'nominatedByUserId': this.userId
               }
          }
          if (!this.isEmpty(data)) {
               this._socketService.nominateClient(data, (response) => {
                    if (response.status) {
                         this.clients = response.data;
                         for (let i = 0; i < this.clients.length; i++) {
                              let item = this.clients[i];
                              if (item.userId == this.userId) {
                                   // console.log(item);
                                   this.noOfNominationGiven = item.nomination.given;
                                   if (item.nomination.nominatedByUserId == this.userId) {
                                        this.isNominatedForSelf = true;
                                   }
                                   if (this.noOfNominationGiven == this.noOfNominationAllowed) {
                                        this.isEligibleToNominate = false;
                                   }
                              }
                         }
                    }
               });
          }
     }

     public selectMember(member) {
          if(this.nominatedMembers.length > 0) {
               this.noOfSelectedMember = 0;
               for(let i = 0; i < this.nominatedMembers.length; i++) {
                    let item = this.nominatedMembers[i];
                    if(item.nickname == member.nickname) {
                         if(item.selected) {
                              item.selected = false;
                         } else {
                              item.selected = true;
                         }
                    }
                    if(item.selected) {
                         this.noOfSelectedMember++;
                    }
               }
          }

          // let found = false;
          //                                         for (let b = 0; b < item.answer.length; b++) {
          //                                              if (this.nominatedMembers[a].name == item.answer[b].name) {
          //                                                   found = true;
          //                                              }
          //                                         }
          //                                         if (found) {
          //                                              this.nominatedMembers[a].given = true;
          //                                         } else {
          //                                              this.nominatedMembers[a].given = false;
          //                                         }
          // if (this.resolution.votedUsers.length > 0) {
          //      for (let i = 0; i < this.resolution.votedUsers.length; i++) {
          //           let item = this.resolution.votedUsers[i];
          //           if (item.user.userId == this.userId) {
          //                this.noOfSelectedMember = item.answer.length;
          //                if (item.answer.length >= this.noOfCouncilMemberApproved) {
          //                     this.isEligibleToSelectMember = false;
          //                } else {
          //                     this.isEligibleToSelectMember = true;
          //                }
          //           }
          //      }
          // }
          // if (this.isEligibleToSelectMember) {
          //      let data = {
          //           'resolution_id': this.resolution.resolution_id,
          //           'answer': member,
          //           'agmId': this.agmId,
          //           'user': this.loggedInUserDetails
          //      };
          //      this._socketService.updateResolutionAnswer(data, (response) => {
          //           if (response.status) {
          //                (async () => {
          //                     await this.setResolutionProperty(response);
          //                })();
          //           }
          //      });
          // }
     }

     public submitMemberResponse() {
          // console.log(this.nominatedMembers);
          let data = {
               'resolution_id': this.resolution.resolution_id,
               'answer': this.nominatedMembers,
               'agmId': this.agmId,
               'user': this.loggedInUserDetails
          };
          // console.log(data);
          this._socketService.updateResolutionAnswer(data, (response) => {
               console.log('Here');
               console.log(response);
               if (response.status) {
                    (async () => {
                         await this.setResolutionProperty(response);
                    })();
               }
          });
     }

     public acceptNomination() {
          let data = {
               'agmId': this.agmId,
               'userId': this.userId
          }
          this._socketService.acceptNomination(data, (response) => {
               console.log(response)
               if (response.status) {
                    this.isResponseOnNomination = true;
                    this.isNominatedForSelf = true;
                    // console.log(response);
               }
          });
     }

     public declineNomination() {
          let data = {
               'agmId': this.agmId,
               'userId': this.userId
          }
          this._socketService.declineNomination(data, (response) => {
               if (response.status) {
                    this.isResponseOnNomination = true;
                    // console.log(response);
               }
          });
     }

     public isEmpty(obj) {
          for (var key in obj) {
               if (obj.hasOwnProperty(key)) {
                    return false;
               }
          }
          return true;
     }
}    
