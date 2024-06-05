import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
// import { LiveMonitoringConstants } from 'src/app/featuresCXSUPv2/core-components/live-monitoring/shared/constants/live-monitoring.const';
// import { SharedConstants } from 'src/app/featuresCXSUPv2/shared/constants/shared.constant';

@Component({
  selector: 'cxsup-admin-agent-state-icon',
  templateUrl: './agent-state-icon.component.html',
  styleUrls: ['./agent-state-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgentStateIconComponent implements ICellRendererAngularComp {
  public agentState;
  // public supervisorApplicationIconsPath = SharedConstants.supervisorApplicationIconsPath;
  public iconName: string;
  constructor(public cd: ChangeDetectorRef) {}

  agInit(params: ICellRendererParams): void {
    this.agentState = params.value;
  }

  // public getStateIcons(state) {
  //   return LiveMonitoringConstants.mainGridStateName[state]?.state ? LiveMonitoringConstants.mainGridStateName[state]?.icon : null;
  // }

  refresh(): boolean {
    return false;
  }
}
