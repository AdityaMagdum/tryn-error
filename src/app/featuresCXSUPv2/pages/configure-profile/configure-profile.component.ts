/* eslint-disable quotes */
import { Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneSettingsComponent } from '../phone-settings/phone-settings.component';
import { EmailSettingsComponent } from '../email-settings/email-settings.component';
import { GetConstraintsService } from '../../shared/services/agent-profile/get-constraints.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-configure-profile',
  templateUrl: './configure-profile.component.html',
  styleUrls: ['./configure-profile.component.scss'],
  imports: [
    CommonModule,
    PhoneSettingsComponent,
    EmailSettingsComponent
  ],
  standalone: true
})
export class ConfigureProfileComponent {

  isSelected=false;
  catalogs=[
    {
      name: "Application Control",
      component_name: null,
      sub_menu_1: [
        {
          name: 'Display Settings',
          component_name: null
        },
        {
          name: 'Notification Preferences',
          component_name: null
        },
        {
          name: 'Keyboard Shortcut Preferences',
          component_name: null
        }
      ]
    },
    {
      name: "Channel Control",
      component_name: null,
      sub_menu_1: [
        {
          name: 'Phone',
          component_name: 'app-phone-settings'
        },
        {
          name: 'VoiceMail',
          component_name: null
        },
        {
          name: 'Email',
          component_name: 'app-email-settings'
        },
        {
          name: 'Live Chat',
          component_name: null
        }
      ]
    },
    {
      name: "App Space",
      component_name: null,
      sub_menu_1: [
        {
          name: 'App Sub-features',
          component_name: null
        }
      ]
    },
    {
        name: 'Other',
        component_name: null,
        sub_menu_1: []
    }
  ];

  constructor(private getConstraintService: GetConstraintsService, private changeDetector: ChangeDetectorRef) { }

  activeSubmenus: { [key: number]: boolean } = {};
  showSubmenu(submenuId:number): void {
    if (this.activeSubmenus[submenuId]) {
      this.activeSubmenus[submenuId] = false;
    } else {
      this.activeSubmenus[submenuId] = true;
    }
}

currentView = 'default';
constraints : any=[];
async callComponent(view: string) {
  if (view === "app-phone-settings") {
    const constraint = await this.getConstraintService.getPhoneConstraints();
    this.constraints = constraint;
  }
  this.currentView = view;
  this.changeDetector.detectChanges();
}
}
