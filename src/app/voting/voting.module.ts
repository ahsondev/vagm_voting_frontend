import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { VotingComponent } from './voting.component';
import { VotingRoutingModule } from './voting-routing.module';
import { VotingService } from '../shared/services/voting.service';
import { SocketService } from '../shared/services/socket.service';
import { VotingResolverService } from '../shared/resolver/voting.resolver.service';
import { StorageService } from '../shared/services/storage.service';
import { DummyComponent } from '../pages/dummy/dummy.component';
import { HeaderComponent } from '../partials/header/header.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { AudioVideoComponent } from '../pages/audio-video/audio-video.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
     imports: [
          CommonModule,
          VotingRoutingModule,
          HttpClientModule,
          NgxSpinnerModule,
          MatExpansionModule
     ],
     declarations: [
          VotingComponent,
          HeaderComponent,
          DummyComponent,
          AudioVideoComponent
     ],
     providers: [
          VotingService,
          SocketService,
          VotingResolverService,
          StorageService
     ]
})
export class VotingModule { }
