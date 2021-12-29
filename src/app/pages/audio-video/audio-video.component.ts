import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
declare var voteDeskConfig: any;
declare var voteMobConfig: any;

@Component({
	selector: 'app-audio-video',
	templateUrl: './audio-video.component.html',
	styleUrls: ['./audio-video.component.scss']
})
export class AudioVideoComponent implements OnInit {

	private meetingCode : string;
	private meetingAccessToken : string;
	private nickname : string;
	private meeting : any;

	constructor(
		private _storageService : StorageService
	) { 
		this.meeting = this._storageService.getWebinarDetails();
		this.meetingCode = this.meeting.meeting_code;
		this.meetingAccessToken = this.meeting.access_token;
		this.nickname = this.meeting.nickname;
	}

	ngOnInit() {
		voteDeskConfig.init(this.meetingCode, this.meetingAccessToken, this.nickname);
		voteMobConfig.init(this.meetingCode, this.meetingAccessToken, this.nickname);
	}

}
