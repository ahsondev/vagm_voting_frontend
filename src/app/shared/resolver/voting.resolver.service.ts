import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from '../../../../node_modules/rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { VotingService } from '../services/voting.service';
import { StorageService } from '../services/storage.service';

export class ResolvedVotingDetails {
     constructor(
          public details: any,
          public error: any = null
     ) {

     }
}


@Injectable()
export class VotingResolverService implements Resolve<ResolvedVotingDetails> {

     constructor(
          private _votingService: VotingService,
          private _storageService: StorageService
     ) {

     }

     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedVotingDetails> {
          let httpResponse: any;
          httpResponse = this._votingService.validateCode()
          return httpResponse.pipe(
               map((details) => new ResolvedVotingDetails(details)),
               catchError((err: any) => of(new ResolvedVotingDetails(null, err)))
          );
     }
} 