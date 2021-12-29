import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as io from 'socket.io-client';
import { StorageService } from './storage.service';



@Injectable({
     providedIn: 'root'
})
export class SocketService extends BaseService {

     private socket;
     
     constructor(
          protected _http: HttpClient,
          private _storageService: StorageService
     ) {
          super();
     }

     initConnection() {
          if(typeof this.socket != 'undefined') {
               if(!this.socket.connected) {
                    this.socket = io(this.webSocketUrl, {   
                         query: {
                              webinar: JSON.stringify(this._storageService.getWebinarDetails())
                         } 
                    });
               }
          } else {
               this.socket = io(this.webSocketUrl, {   
                    query: {
                         webinar: JSON.stringify(this._storageService.getWebinarDetails())
                    } 
               });
          }
     }

     getActiveClients(callback) {
          this.socket.emit('activeClients', {});
          this.socket.on('activeClientResponse', (data) => {
               callback(data);
          })
     }

     getActiveClientsDetails(callback) {
          this.socket.emit('activeClientsDetails', {});
          this.socket.on('activeClientsDetailsResponse', (data) => {
               callback(data);
          })
     }

     getUserDetails(agmId , userId, callback) {
          this.socket.emit('userDetails', { 'agmId' : agmId, 'userId' : userId });
          this.socket.on('userDetailsResponse', (data) => {
               callback(data);
          })
     }

     votingManagerLoggedIn(data) {
          this.socket.emit('votingManagerLoggedIn', data);
     }

     isVotingManagerLoggedIn(callback) {
          this.socket.on('votingManagerLoggedInResponse', (data) => {
               callback(data);
          });
     }

     updateUserProfile(userData, callback) {
          this.socket.emit('updateUserProfile', userData);
          this.socket.on('updateUserProfileResponse', (data) => {
               callback(data);
          })
     }

     isQuorumAchived(id, callback) {
          this.socket.emit('quorumAchieved', { agmId: id });
          this.socket.on('quorumAchievedResponse', (data) => {
               callback(data);
          });
     }

     getQuorumDetails(id, callback) {
          this.socket.emit('quorumDetails', { agmId: id });
          this.socket.on('quorumDetailsResponse', (data) => {
               callback(data);
          });
     }

     isUserVotingManager(data, callback) {
          this.socket.emit('checkVotingManager', data);
          this.socket.on('checkVotingManagerResponse', (data) => {
               callback(data);
          });
     }

     startMeeting(data, callback) {
          let meetingProfile = {
               'agmId': data.agmId,
               'isAgmStarted': true,
          }
          this.socket.emit('startMeeting', meetingProfile);
          this.socket.on('startMeetingResponse', (data) => {
               callback(data);
          });
     }

     isMeetingStarted(id, callback) {
          this.socket.emit('isMeetingStarted', { agmId: id });
          this.socket.on('isMeetingStartedResponse', (data) => {
               callback(data);
          });
     }

     startMeetingResponse(callback) {
          this.socket.on('startMeetingResponse', (data) => {
               callback(data);
          });
     }

     getResolutions(id, callback) {
          this.socket.emit('getResolutions', { agmId: id });
          this.socket.on('resolutionResponse', (data) => {
               callback(data);
          })
     }

     startResolution(data, callback) {
          this.socket.emit('startResolution', data);
          this.socket.on('startResolutionResponse', (data) => {
               callback(data);
          });
     }

     backToPending(data, callback) {
          this.socket.emit('backToPending', data);
          this.socket.on('backToPendingResponse', (data) => {
               callback(data);
          });
     }

     isResolutionBackToPending(callback) {
          this.socket.on('backToPendingResponse', (data) => {
               callback(data);
          });
     }

     isResolutionStarted(callback) {
          this.socket.on('startResolutionResponse', (data) => {
               callback(data);
          });
     }

     startVoting(data, callback) {
          this.socket.emit('startVoting', data);
          this.socket.on('startVotingResponse', (data) => {
               callback(data);
          })
     }

     isVotingStarted(callback) {
          this.socket.on('startVotingResponse', (data) => {
               callback(data);
          });
     }

     getUserVotingResponse(callback) {
          this.socket.on('updateResolutionAnswerResponse', (data) => {
               callback(data);
          });
     }

     updateResolutionAnswer(data, callback) {
          this.socket.emit('updateResolutionAnswer', data);
          this.socket.on('updateResolutionAnswerResponse', (data) => {
               callback(data);
          });
     }

     startTimer(data, callback) {
          this.socket.emit('startVotingTimer', data);
          this.socket.on('startVotingTimerResponse', (data) => {
               callback(data);
          });
     }

     isVotingTimerStart(callback) {
          this.socket.on('startVotingTimerResponse', (data) => {
               callback(data);
          });
     }

     isVotingTimerFinished(callback) {
          this.socket.on('endtVotingTimerResponse', (data) => {
               callback(data);
          });
     }

     getResolutionDetails(data, callback) {
          this.socket.emit('getResolutionDetails', data);
          this.socket.on('getResolutionDetailsResponse', (data) => {
               callback(data);
          });
     }

     goForVote(data, callback) {
          this.socket.emit('goForVote', data);
          this.socket.on('goForVoteResponse', (data) => {
               callback(data);
          });
     }

     goForPole(data, callback) {
          this.socket.emit('goForPole', data);
          this.socket.on('goForPoleResponse', (data) => {
               callback(data);
          });
     }

     isGoForVote(callback) {
          this.socket.on('goForVoteResponse', (data) => {
               callback(data);
          });
     }

     isGoForPole(callback) {
          this.socket.on('goForPoleResponse', (data) => {
               callback(data);
          });
     }

     publishResult(data,callback) {
          this.socket.emit('publishResult', data);
          this.socket.on('publishResultResponse', (data) => {
               callback(data);
          });
     }

     isResultPublished(callback) {
          this.socket.on('publishResultResponse', (data) => {
               callback(data);
          })
     }

     moveToDecided(data, callback) {
          this.socket.emit('finishResolution', data);
          this.socket.on('finishResolutionResponse', (data) => {
               callback(data);
          });
     }

     isCurrentResolutionFinised(callback) {
          this.socket.on('finishResolutionResponse', (data) => {
               callback(data);
          })
     }

     

     updateResolutionTimer(data , callback) {
          this.socket.emit('updateResolutionTimer', data);
          this.socket.on('updateResolutionTimerResponse' , (data) => {
               callback(data);
          });
     }

     createResolution(data , callback) {
          this.socket.emit('createResolutions', data);
          this.socket.on('createResolutionsResponse' , (data) => {
               callback(data);
          });
     }

     getNominatedMembers(data , callback) {
          this.socket.emit('getNominatedMembers', data);
          this.socket.on('nominatedMenbersResponse' , (data) => {
               callback(data);
          });
     }

     // nominatedMemberResponse(callback) {
     //      this.socket.on('nominatedMenbersResponse' , (data) => {
     //           callback(data);
     //      });
     // }

     nominateClient(data , callback) {
          this.socket.emit('nominateClient', data);
          this.socket.on('nominateClientResponse' , (data) => {
               callback(data);
          });
     }

     isNominated(callback) {
          this.socket.on('nominateClientResponse' , (data) => {
               callback(data);
          });
     }

     acceptNomination(data, callback) {
          this.socket.emit('acceptNomination', data);
          this.socket.on('acceptNominationResponse' , (data) => {
               callback(data);
          });
     }

     declineNomination(data, callback) {
          this.socket.emit('declineNomination', data);
          this.socket.on('declineNominationResponse' , (data) => {
               callback(data);
          });
     }

     addressUser(data, callback) {
          this.socket.emit('addressUser', data);
          this.socket.on('addressUserResponse' , (data) => {
               callback(data);
          });
     }

     // removeListener(event) {
     //      this.socket.off(event);
     // }

     removeUserProfile(data, callback) {
          // if(typeof this.socket == 'undefined' {
          //      let role
          // }
          // console.log(this.socket);
          // this.socket.emit('removeUserProfile', data);
          // this.socket.on('removeUserProfileResponse' , (data) => {
          //      callback(data);
          // });
     }
}
