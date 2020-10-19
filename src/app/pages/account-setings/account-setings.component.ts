import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-setings',
  templateUrl: './account-setings.component.html',
  styles: [
  ]
})
export class AccountSetingsComponent implements OnInit {

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {

    this.settingsService.checkCurrentTheme();

  }
  ChangeTheme(theme: string){
    this.settingsService.ChangeTheme(theme);
  }

}
