import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-email-settings',
  templateUrl: './email-settings.component.html',
  styleUrls: ['./email-settings.component.scss'],
  standalone: true
})
export class EmailSettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
