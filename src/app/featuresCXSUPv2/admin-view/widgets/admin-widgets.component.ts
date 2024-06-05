import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { IconSvgService } from 'cxone-client-services-platform';

@Component({
  selector: 'cxsup-admin-widgets',
  templateUrl: './admin-widgets.component.html',
  styleUrls: ['./admin-widgets.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminWidgetsComponent {
  @Input('tabType') public tabType: string;
  @Input('agentGridData') public agentGridData;
  @Input('skillActivities') public skillActivities;
  public applicationIconsPath;

  constructor(public cd: ChangeDetectorRef) {
    this.applicationIconsPath = IconSvgService.instance.getIconsSpriteDataUrl('application');
  }
}
