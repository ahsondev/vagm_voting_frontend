import { Injectable } from "@angular/core";
import { NgFlashMessageService } from 'ng-flash-messages';


@Injectable()
export class MessageService {

     constructor(
          private flashMessage: NgFlashMessageService
     ) { 

     }

     public showSuccessMessage(msg: string) {
          this.flashMessage.showFlashMessage({ 
               messages: [msg], 
               timeout: 6000, 
               dismissible: true,
               type: 'success'
          });
     }

     public showFailureMessage(msg: string) {
          this.flashMessage.showFlashMessage({ 
               messages: [msg], 
               timeout: 2000, 
               dismissible: true,
               type: 'danger'
          });
     }

     public onSubmitOtp() {
          
     }

}