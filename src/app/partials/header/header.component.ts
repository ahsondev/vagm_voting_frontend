import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	public name : string;

	constructor(
		private _storageService: StorageService
	) { 
		this.name = this._storageService.getUserNickName();
	}

	ngOnInit() {
	}

}
