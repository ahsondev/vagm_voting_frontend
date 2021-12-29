import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuorumStatusComponent } from 'src/app/pages/quorum-status/quorum-status.component';
import { QuesAnsComponent } from 'src/app/pages/ques-ans/ques-ans.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AudioVideoComponent } from '../../pages/audio-video/audio-video.component'
import { VotingService } from 'src/app/shared/services/voting.service';
import { EndMeetingComponent } from 'src/app/pages/end-meeting/end-meeting.component';


@NgModule({
     imports: [
          CommonModule,
          MatExpansionModule,
     ],
     declarations: [
          QuorumStatusComponent,
          QuesAnsComponent,
          // AudioVideoComponent,
          EndMeetingComponent
     ],
     exports: [
          QuorumStatusComponent,
          QuesAnsComponent,
          // AudioVideoComponent,
          EndMeetingComponent
     ],
     providers : [
          VotingService
     ]
})
export class SharedModule { }
