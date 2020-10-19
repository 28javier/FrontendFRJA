import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';


declare function customInitFuctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {


  year = new Date().getFullYear();
  constructor(settingsServices: SettingsService) { }

  ngOnInit(): void {
    customInitFuctions();
  }

}
