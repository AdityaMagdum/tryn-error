import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IconSvgService} from 'cxone-client-services-platform';
import { Observable, Subscription, distinctUntilChanged, filter } from 'rxjs';
// import { LiveMonitoringConstants } from '../core-components/live-monitoring/shared/constants/live-monitoring.const';
// import * as SharedActions from '../shared/+state/shared.actions';
// import { getActiveMonitoringContactId, getMonitoringInstances, getSkillsRowData, getAgentRowData } from '../shared/+state/shared.selectors';
// import { SharedConstants } from '../shared/constants/shared.constant';
// import { SupervisorUsersService } from '../shared/services/supervisor-users.service';
// import { AgentRowDataUpdated, AgentsRowDataState, SkillsRowDataUpdated } from '../shared/+state/shared.state';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminViewComponent implements OnInit {
  public subscription = new Subscription();
  public selectedTab = 'skills';
  public solSkillsTabIsActive = true;
  public solAgentsTabIsActive = false;
  public applicationIconsPath;
  public searchQuery = '';
  // public adminSearchBarIcon = SharedConstants.iconStyle.adminSearchBarIcon;
  public shouldRefetchApi = false;
  public activeMonitoringContactId$: Observable<string>;
  public activeMonitoringContactId = null;
  public monitoringInstances$: Observable<any>;
  public monitoringInstances: any;
  // public skillsRowData$: Observable<SkillsRowDataUpdated>;
  public panelToShow = false;
  public isEnabled = false;
  public isContinuousAgentMonitoringEnabled = false;
  public agentRowData$: Observable<any>;
  // public agentRowData: AgentsRowDataState;
  public isACDPermissionAvailable = false;
  public showSkillsTab = false;

  @ViewChild('skillsTitleTab', { read: ElementRef }) public skillsTitleTab!: ElementRef;
  @ViewChild('agentTitleTab', { read: ElementRef }) public agentTitleTab!: ElementRef;

  constructor(private store: Store, public cd: ChangeDetectorRef, public router: Router) {
    this.applicationIconsPath = IconSvgService.instance.getIconsSpriteDataUrl('application');
  }

  ngOnInit(): void {
    this.shouldRefetchApi = true;
    this.reInitializeState();
    // this.activeMonitoringContactId$ = this.store.select(getActiveMonitoringContactId);
    this.subscribeToActiveMonitoringContactId();
    // this.monitoringInstances$ = this.store.select(getMonitoringInstances);
    this.subscribeMonitoringInstances();
    // this.skillsRowData$ = this.store.select(getSkillsRowData);
    // this.agentRowData$ = this.store.select(getAgentRowData);
    // this.subscribeToSkillsRowData();
    // this.subscribeToAgentRowData();
    // this.checkForAcdPermissions();

    // this.isContinuousAgentMonitoringEnabled = PermissionService.instance.allowAccess(
    //   LiveMonitoringConstants.acdPermissions.continuousAgentMonitoring
    // );
    // this.showSkillsTab = PermissionService.instance.allowAccess(LiveMonitoringConstants.acdPermissions.viewSupervisorSkillTab);
    // this.store.dispatch(
    //   SharedActions.fetchACDSkillsApiVersion({
    //     acdApiVersion: 'v28.0'
    //   })
    // );

    // this.store.dispatch(
    //   SharedActions.isAgentMonitoringEnabled({
    //     isAgentMonitoringEnabled: this.isContinuousAgentMonitoringEnabled
    //   })
    // );

    this.router.navigate([], {
      queryParams: {
        contactId: null
      },
      queryParamsHandling: 'merge'
    });
  }

  // public checkForAcdPermissions() {
  //   if (PermissionService.instance.allowAccess(LiveMonitoringConstants.permissions.viewACDSkills) === true) {
  //     this.isACDPermissionAvailable = true;
  //   } else {
  //     this.isACDPermissionAvailable = false;
  //   }
  // }

  // public subscribeToAgentRowData() {
  //   this.subscription.add(
  //     this.agentRowData$.pipe(filter(rowData => rowData !== null)).subscribe((rowData: AgentRowDataUpdated) => {
  //       this.panelToShow = rowData?.showAgentsRowSidePanel;
  //       this.cd.detectChanges();
  //     })
  //   );
  // }

  public onTabChange(selectedTab) {
    this.selectedTab = selectedTab;
    // this.store.dispatch(
    //   SharedActions.setSkillsRowData({
    //     showSkillsRowSidePanel: false,
    //     skillsRowData: null,
    //     rowSelected: false
    //   })
    // );
    // this.store.dispatch(
    //   SharedActions.setAgentRowData({
    //     showAgentsRowSidePanel: false,
    //     agentRowData: null,
    //     rowSelected: false
    //   })
    // );
  }

  public subscribeToActiveMonitoringContactId() {
    this.subscription.add(
      this.activeMonitoringContactId$.pipe(distinctUntilChanged()).subscribe(activeMonitoringContactId => {
        this.activeMonitoringContactId = activeMonitoringContactId;
        this.cd.detectChanges();
      })
    );
  }

  // public subscribeToSkillsRowData() {
  //   this.subscription.add(
  //     this.skillsRowData$.pipe(filter(rowData => rowData !== null)).subscribe((rowData: SkillsRowDataUpdated) => {
  //       this.panelToShow = rowData?.showSkillsRowSidePanel;
  //       this.cd.detectChanges();
  //     })
  //   );
  // }

  public subscribeMonitoringInstances() {
    this.subscription.add(
      this.monitoringInstances$.pipe(filter(x => x !== null)).subscribe(data => {
        this.monitoringInstances = data;
        const instanceBeenMonitored = this.monitoringInstances.filter(ins => ins.isMonitoring);
        if (instanceBeenMonitored.length) {
          this.router.navigate(['/admin'], {
            queryParams: { contactId: instanceBeenMonitored[0].contactId }
          });
          this.isEnabled = true;
        } else {
          this.router.navigate([], {
            queryParams: {
              contactId: null
            },
            queryParamsHandling: 'merge'
          });
          this.activeMonitoringContactId = null;
          this.isEnabled = false;
        }
        this.cd.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    // this.store.dispatch(SharedActions.fetchFlagForTabSwitchForWsEvent({ checkForTabSwitchForWSEvent: false }));
    this.subscription.unsubscribe();
  }

  @HostListener('document:visibilitychange', ['$event'])
  visibilitychange() {
    this.checkHiddenDocument();
  }

  checkHiddenDocument() {
    if (document.hidden) {
      this.shouldRefetchApi = false;
    } else {
      this.shouldRefetchApi = true;
    }
  }

  reInitializeState() {
    // this.store.dispatch(SharedActions.reInitializeState());
  }
}
