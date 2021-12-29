export class ResponseModel {
     data?: any;
     message?: string;
     status: string;
     success: boolean;

     constructor(res: any) {
          
          if (res.resp) {
               this.data = res.resp;
          } else {
               this.data = res;
          }
          this.message = res.message;
          this.status = res.status;
          this.success = res.status;
     }
}