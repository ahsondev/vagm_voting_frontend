export class ModeratorModel {
     public moderatorSettingsQuestion = [
          {
               'title' : '',
               'question' : 'Are you the Voting Manager',
               'order' : 1,
               'show' : true,
               'agreeBtnTxt' : 'Yes',
               'notAgreeBtnTxt' : 'No'
          },
          {
               'title' : 'Ordinary Resolutions',
               'question' : 'Call for Vote if No Objection',
               'order' : 2,
               'show' : true,
               'agreeBtnTxt' : 'Yes',
               'notAgreeBtnTxt' : 'No'
               
          },
          {
               'title' : 'Passed Resolutions',
               'question' : 'Call for Proposer/Seconder',
               'order' : 3,
               'show' : true,
               'agreeBtnTxt' : 'Yes',
               'notAgreeBtnTxt' : 'No'
          },
          {
               'title' : '',
               'question' : 'You are the Voting Manager for entire meeting.',
               'order' : 4,
               'show' : true,
               'agreeBtnTxt' : 'Confirm',
               'notAgreeBtnTxt' : 'Cancel'
          }
     ];
}