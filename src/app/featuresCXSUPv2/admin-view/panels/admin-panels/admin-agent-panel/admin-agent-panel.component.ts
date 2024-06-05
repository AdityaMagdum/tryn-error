import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
// import { filter } from 'rxjs/operators';
// import * as SharedActions from 'src/app/featuresCXSUPv2/shared/+state/shared.actions';
// import { getAgentRowData, getSwitchPanelData, hasWFMLicense } from 'src/app/featuresCXSUPv2/shared/+state/shared.selectors';
// import { AgentsRowDataState, SwitchPanelData } from 'src/app/featuresCXSUPv2/shared/+state/shared.state';
// import { LiveMonitoringConstants } from 'src/app/featuresCXSUPv2/core-components/live-monitoring/shared/constants/live-monitoring.const';
import { IconSvgService} from 'cxone-client-services-platform';
// import { SharedConstants } from 'src/app/featuresCXSUPv2/shared/constants/shared.constant';
@Component({
  selector: 'cxsup-admin-agent-panel',
  templateUrl: './admin-agent-panel.component.html',
  styleUrls: ['./admin-agent-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminAgentPanelComponent implements OnInit, OnDestroy {
  public subscription = new Subscription();
  public applicationIconsPath;
  public autoRefresh: boolean;
  public isSupervisorPermissionAvailable: boolean;
  // public agentRowData: AgentsRowDataState;
  public showAgentsRowSidePanel: boolean;
  public voiceMonitoringEnabled: boolean;
  public screenMonitoringEnabled: boolean;
  public coachMonitoringEnabled: boolean;
  public joinMonitoringEnabled: boolean;
  public forceLogoutEnabled: boolean;
  public wfmScheduleViewPermissionEnabled = false;
  public wfmScheduleFTOn = false;
  public illustrationsIconsPath;
  public agentRowData$: Observable<any>;
  public switchPanelData$: Observable<any>;
  public hasWFMLicense$: Observable<any>;
  public solAgentSkillsIsActive = false;
  public solAgentActivitiesIsActive = false;
  public solContactHandlingIsActive = false;
  public hasWFMLicense;
  public supervisorApplicationIconsPath;
  // public adminAgentPanelStyle = SharedConstants.adminAgentPanelStyle;
  @ViewChild('agentSkills') agentSkills;
  @ViewChild('agentActivities') agentActivities;
  @ViewChild('contactHandling') contactHandling;

  constructor(private store: Store, public cd: ChangeDetectorRef) {
    this.applicationIconsPath = IconSvgService.instance.getIconsSpriteDataUrl('application');
    this.illustrationsIconsPath = IconSvgService.instance.getIconsSpriteDataUrl('illustrations');
    // this.supervisorApplicationIconsPath = SharedConstants.supervisorApplicationIconsPath;
  }

  ngOnInit(): void {
    // this.agentRowData$ = this.store.select(getAgentRowData);
    // this.switchPanelData$ = this.store.select(getSwitchPanelData);
    // this.hasWFMLicense$ = this.store.select(hasWFMLicense);
    this.subscribeToFetchWFMLicense();
    // this.initializeOnAgentsACDPermission();
    // // this.subscribeToSwitchPanelData();
    // this.subscribeToAgentRowData();
    this.cd.detectChanges();
    // this.wfmScheduleViewPermissionEnabled = PermissionService.instance.allowAccess(LiveMonitoringConstants.wfmPermissions.scheduleManagerView);
    // this.wfmScheduleFTOn = FeatureToggleService.instance.getFeatureToggleSync(LiveMonitoringConstants.featureToggle.wfmTodaysScheduleTab);
  }

  // public subscribeToSwitchPanelData() {
  //   this.switchPanelData$.pipe(filter(v => v !== null)).subscribe((res: SwitchPanelData) => {
  //     this.openAgentsTab(res.tabToShow);
  //   });
  // }

  openAgentsTab(tab: string) {
    if (tab && tab === 'skills') {
      this.solAgentSkillsIsActive = true;
      this.solAgentActivitiesIsActive = false;
      this.solContactHandlingIsActive = false;
    }
  }

  isWFMTabEnabled() {
    if (this.hasWFMLicense && this.wfmScheduleViewPermissionEnabled && this.wfmScheduleFTOn) {
      return true;
    } else {
      return false;
    }
  }

  // public subscribeToAgentRowData() {
  //   this.agentRowData$
  //     .pipe(
  //       filter(rowData => {
  //         return rowData !== null;
  //       })
  //     )
  //     .subscribe(rowData => {
  //       this.agentRowData = rowData;
  //       if (this.agentRowData.agentRowData?.userId !== undefined) {
  //         this.showAgentsRowSidePanel = this.agentRowData?.showAgentsRowSidePanel;
  //       }
  //       this.cd.detectChanges();
  //     });
  // }

  // public initializeOnAgentsACDPermission() {
  //   this.isSupervisorPermissionAvailable = PermissionService.instance.allowAccess(LiveMonitoringConstants.acdPermissions.viewSupervisorSkillTab);
  //   this.forceLogoutEnabled = PermissionService.instance.allowAccess(LiveMonitoringConstants.acdPermissions.activeAgentForceLogout);
  //   this.voiceMonitoringEnabled = PermissionService.instance.allowAccess(LiveMonitoringConstants.acdPermissions.monitoring);
  //   this.screenMonitoringEnabled = PermissionService.instance.allowAccess(LiveMonitoringConstants.acdPermissions.monitoring);
  //   this.coachMonitoringEnabled = PermissionService.instance.allowAccess(LiveMonitoringConstants.acdPermissions.monitoringCoach);
  //   this.joinMonitoringEnabled = PermissionService.instance.allowAccess(LiveMonitoringConstants.acdPermissions.monitoringJoin);
  // }

  public onCloseButtonClick() {
    this.autoRefresh = true;
    this.showAgentsRowSidePanel = false;
    // this.store.dispatch(
    //   SharedActions.setAgentRowData({
    //     showAgentsRowSidePanel: false,
    //     agentRowData: null,
    //     rowSelected: false
    //   })
    // );
    // this.store.dispatch(
    //   SharedActions.setSkillsRowData({
    //     showSkillsRowSidePanel: false,
    //     skillsRowData: null,
    //     rowSelected: false
    //   })
    // );
    // this.store.dispatch(
    //   SharedActions.setSwitchPanelData({
    //     switchPanelData: {
    //       panelToShow: '',
    //       tabToShow: '',
    //       isAgentPanelOpened: false
    //     }
    //   })
    // );
  }

  public subscribeToFetchWFMLicense(): void {
    this.subscription.add(
      this.hasWFMLicense$.subscribe(response => {
        this.hasWFMLicense = response ? true : false;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
