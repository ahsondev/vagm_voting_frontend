export class ResolutionModel {
     
     public category = [
          {
               'value' : null,
               'name' : 'Select Category'
          },
          {
               'value' : 1,
               'name' : 'Adoption of Audited Accounts'
          },
          {
               'value' : 2,
               'name' : 'Minutes of Last General Meeting'
          },
          // {
          //      'value' : 3,
          //      'name' : 'Nomination of Council Members'
          // },
          // {
          //      'value' : 4,
          //      'name' : 'Determine Number of Council Members'
          // },
          // {
          //      'value' : 5,
          //      'name' : 'Elect Council Members'
          // },
          {
               'value' : 6,
               'name' : 'Management Fund'
          },
          {
               'value' : 7,
               'name' : 'Sinking Fund'
          },
          {
               'value' : 8,
               'name' : 'Review and Appointment of MA'
          },
          {
               'value' : 9,
               'name' : 'Appointment of Auditor'
          },
          {
               'value' : 10,
               'name' : 'Report and Review of insurance coverage'
          },
          {
               'value' : 11,
               'name' : 'Annual Budget of MCST'
          },
          {
               'value' : 12,
               'name' : 'Resolution Proposed by Council'
          },
          {
               'value' : 13,
               'name' : 'Resolution Proposed by SP'
          }
     ];

     public types = [
          {
               'value' : null,
               'name' : 'Select Type'
          },
          {
               'value' : 'Ordinary Resolution',
               'name' : 'Ordinary Resolution'
          },
          {
               'value' : 'Special Resolution',
               'name' : 'Special Resolution'
          }
     ];

     public choiceTypes = [
          {
               'value' : null,
               'name' : 'Select Choice Type'
          },
          {
               'value' : 'For/Against/Abstain',
               'name' : 'For/Against/Abstain'
          },
          {
               'value' : 'Value Options',
               'name' : 'Value Options'
          }
     ];

     public decisionType = [
          {
               'value' : null,
               'name' : 'Select Decision Type'
          },
          {
               'value' : 'No Of Lots',
               'name' : 'No Of Lots'
          },
          {
               'value' : 'Number Of Share',
               'name' : 'Number Of Share'
          }
     ];

     public decisionThreshold = [
          {
               'value' : null,
               'name' : 'Select Decision Threshold'
          },
          {
               'value' : '50',
               'name' : '50%'
          },
          {
               'value' : '75',
               'name' : '75%'
          },
          {
               'value' : '90',
               'name' : '90%'
          },
          {
               'value' : '100',
               'name' : '100%'
          }

     ];
}