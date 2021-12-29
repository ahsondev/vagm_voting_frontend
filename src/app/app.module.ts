import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageService } from './shared/services/storage.service';
import { UserService } from './shared/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { NgOtpInputModule } from  'ng-otp-input';
import { OtpLayoutComponent } from './pages/otp-layout/otp-layout.component';
import { MessageService } from './shared/services/message.service';
import { LogoutComponent } from './logout/logout.component';
import { AuthComponent } from './auth/auth.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { FooterComponent } from './partials/footer/footer.component';

@NgModule({
     imports: [
          BrowserModule,
          AppRoutingModule,
          BrowserAnimationsModule,
          FormsModule,
          ReactiveFormsModule,
          HttpClientModule,
          NgFlashMessagesModule.forRoot(),
          NgOtpInputModule,
          NgxSpinnerModule
     ],
     declarations: [
          AppComponent,
          LoginComponent,
          OtpLayoutComponent,
          LogoutComponent,
          AuthComponent,
          TutorialComponent,
          FooterComponent
     ],
     providers: [
          StorageService,
          UserService,
          MessageService
     ],
     bootstrap: [AppComponent]
})
export class AppModule { }
