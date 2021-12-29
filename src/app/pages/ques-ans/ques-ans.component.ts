import { Component, OnInit } from '@angular/core';
import { VotingService } from 'src/app/shared/services/voting.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
	selector: 'app-ques-ans',
	templateUrl: './ques-ans.component.html',
	styleUrls: ['./ques-ans.component.scss']
})
export class QuesAnsComponent implements OnInit {

	public metting : any;
	public role : any;
	public isUserModerator : boolean = false;

	constructor(
		private _votingService : VotingService,
		private _storageService : StorageService
	) { 

	}

	ngOnInit() {
		if(this._storageService.getUserRole() == 'moderator') {
			this.isUserModerator = true;
		}
		this.metting = this._storageService.getWebinarDetails();
	}

	public toggleMettingChat() {
		let data = {
			'meeting_name' : this.metting.id,
			'username' : this.metting.nickname,
			'message' : 'TOGGLE',
			'token' : "propyoda application token",
		}
		this._votingService.toggleChat(data).subscribe(
			(res) => {
				console.log(res);
			},
			(error) => {
				console.log(error);
			}
		);
	}
}
