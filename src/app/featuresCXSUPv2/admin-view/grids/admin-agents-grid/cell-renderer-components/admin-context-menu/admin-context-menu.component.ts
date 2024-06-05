import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { IconSvgService} from 'cxone-client-services-platform';
// import { LiveMonitoringConstants } from 'src/app/featuresCXSUPv2/core-components/live-monitoring/shared/constants/live-monitoring.const';
import { Store } from '@ngrx/store';
import { Subscription, Observable, filter} from 'rxjs';
// import {
//   getLoggedInUserData,
//   getMonitoringInstances,
//   getMonitoringPreferenceState,
//   hasScreenRecordingLicense,
//   selectGridData
// } from 'src/app/featuresCXSUPv2/shared/+state/shared.selectors';
// import { SharedConstants } from 'src/app/featuresCXSUPv2/shared/constants/shared.constant';
// import * as SharedActions from 'src/app/featuresCXSUPv2/shared/+state/shared.actions';
import { TranslationPipe } from 'cxone-components/translation';
// import { MonitoringRequestService } from 'src/app/featuresCXSUPv2/shared/services/monitoring-request.service';
// import { MonitoringPreference } from 'src/app/featuresCXSUPv2/shared/models/preference.model';
// import { deepDiffBetweenObjects } from 'src/app/featuresCXSUPv2/shared/libs/difference';
// import {
//   checkIfMonitoringStarted
// } from '../../../../../shared/services/action-popover-utility';

@Component({
  selector: 'cxsupv2-agents-admin-context-menu',
  templateUrl: './admin-context-menu.component.html',
  styleUrls: ['./admin-context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AgentsAdminContextMenuComponent implements ICellRendererAngularComp {
  public subscription = new Subscription();
  public applicationIconsPath = IconSvgService.instance.getIconsSpriteDataUrl('application');
  public params;
  public forceLogoutEnabled: boolean;
  public isUserLoggedIn: boolean;
  // public supervisorApplicationIconsPath = SharedConstants.supervisorApplicationIconsPath;
  public currentUserState: string;
  public container = '.admin-agents-grid-container .ag-pinned-right-cols-container';
  public agentState: any;
  public loggedInUserData$: any;
  public loggedInUserData: any;
  public currentUserWithoutContact: boolean;
  public monitoringEnabled: boolean;
  public monitoringInstances$: Observable<any>;
  public monitoringInstances: any;
  public monitoringPreference;
  // public monitoringPreference$: Observable<MonitoringPreference>;
  public popovers = {};
  public currentType: string;
  // public iconStyle = SharedConstants.iconStyle;
  public cxsupAllowScreenMonitoring;
  public screenMonitorLicenseData$: Observable<any>;
  public hasScreenMonitorRecLicense: boolean;
  public isLoggedInUserInACall: boolean;
  public gridData$: Observable<any>;
  public gridData: any;
  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
    private translationPipe: TranslationPipe
    // private monitoringRequestService: MonitoringRequestService
  ) {}

  ngOnInit() {
    // this.screenMonitorLicenseData$ = this.store.select(hasScreenRecordingLicense);
    this.subscribeToFetchScreenMonitorRecLicense();
    // this.monitoringInstances$ = this.store.select(getMonitoringInstances);
    this.subscription.add(
      this.monitoringInstances$.pipe(filter(x => x !== null)).subscribe(data => {
        this.monitoringInstances = data;
        this.cd.detectChanges();
      })
    );
    // this.monitoringPreference$ = this.store.select(getMonitoringPreferenceState).pipe(
    //   distinctUntilChanged(deepDiffBetweenObjects),
    //   filter(monitoringPreference => monitoringPreference !== null)
    // );
    // this.subscribeToMonitoringPreferences();
    // this.gridData$ = this.store.select(selectGridData);
    this.subscribeToGridData();
  }

  agInit(params: ICellRendererParams): void {
    this.params = params.value.params;
    this.agentState = params.value.params.outStateDescription ? 'Unavailable' : params.value.params.agentStateName;
    // this.forceLogoutEnabled = PermissionService.instance.allowAccess(LiveMonitoringConstants.acdPermissions.activeAgentForceLogout);
    // this.monitoringEnabled = PermissionService.instance.allowAccess(LiveMonitoringConstants.acdPermissions.monitoring);
    // this.cxsupAllowScreenMonitoring = PermissionService.instance.allowAccess(LiveMonitoringConstants.permissions.cxsupAllowScreenMonitoring);
    this.checkAgentState(this.agentState);
    // this.loggedInUserData$ = this.store.select(getLoggedInUserData);
    this.getLoggedInUserData();
    this.cd.detectChanges();
  }

  refresh(): boolean {
    return false;
  }

  public subscribeToFetchScreenMonitorRecLicense() {
    this.subscription.add(
      this.screenMonitorLicenseData$.subscribe(screenMonitorLicense => {
        this.hasScreenMonitorRecLicense = screenMonitorLicense;
      })
    );
  }

  // public forceLogout() {
  //   this.monitoringRequestService
  //     .callForcedLogOutApi(this.params.agentId, this.params.userId)
  //     .then(() => {
  //       this.store.dispatch(
  //         SharedActions.showToaster({
  //           toastType: 'success',
  //           message: this.translationPipe.transform('supervisor.common.successMessages.agentLogoutSuccess')
  //         })
  //       );
  //     })
  //     .catch(() => {
  //       this.store.dispatch(
  //         SharedActions.showToaster({
  //           toastType: 'error',
  //           message: this.translationPipe.transform('supervisor.common.errorMessages.agentLogoutFailure')
  //         })
  //       );
  //     });
  //   this.cd.detectChanges();
  // }

  public checkAgentState(state) {
    this.isUserLoggedIn = state === this.translationPipe.transform('supervisor.liveMonitoring.constants.stateName.loggedOut') ? false : true;
    this.cd.detectChanges();
  }

  subscribeToGridData() {
    this.subscription.add(
      this.gridData$.subscribe(gridData => {
        this.gridData = gridData;
        if (this.loggedInUserData && gridData) {
          this.isLoggedInUserInACall =
            gridData.filter(data => data.userId === this.loggedInUserData.userId && data.contactId && data.originalChannelCode === 'acdVoice')
              .length > 0;
        }
        this.cd.detectChanges();
      })
    );
  }

  public getLoggedInUserData() {
    this.subscription.add(
      this.loggedInUserData$.pipe(filter(x => x !== null)).subscribe(loggedInUserData => {
        this.loggedInUserData = loggedInUserData;
        if (this.params?.userId === loggedInUserData?.userId) {
          this.currentUserWithoutContact = true;
        }
      })
    );
  }

  // public checkIfMonitoringStarted(contact, monitoringType) {
  //   return checkIfMonitoringStarted(this.monitoringInstances,contact, monitoringType);
  // }

  // public subscribeToMonitoringPreferences() {
  //   this.subscription.add(
  //     this.monitoringPreference$.subscribe(monitoringPreference => {
  //       this.monitoringPreference = monitoringPreference === null || monitoringPreference['monitoring'] === null ? null : monitoringPreference;
  //     })
  //   );
  // }

  public startOrStopMonitoring(contact, type) {
    if (contact.contactId === '') {
      contact['contactId'] = undefined;
    }
    // if (this.monitoringPreference?.value === 'WebRTC') {
    //   const audioElement = document.getElementsByClassName('audioControl')[0];
    //   // this.store.dispatch(SharedActions.getAgentSettings({ agentId: this.params.agentId, audio: audioElement }));
    // }
    this.popovers = {
      ...this.popovers,
      [contact.contactId + '-' + type]: {
        showPopover: false
      }
    };
    this.currentType = type;
    if (!this.monitoringInstances?.length) {
      this.startMonitoring(contact);
    } else if (
      this.monitoringInstances.filter(
        i =>
          i.agentId === contact.agentId &&
          (i.contactId === 'agentmonitor' || i.contactId === 'agentscreenmonitor' || i.contactId === contact.contactId) &&
          i.monitoringTypes?.includes(type)
      ).length
    ) {
      // this.stopExistingMonitoringInstance(contact, type);
    } else if (
      (type.includes('voice') &&
        this.monitoringInstances.filter(i => i.contactId !== contact.contactId && i.monitoringTypes?.filter(x => x.includes('voice')).length)
          .length) ||
      (type.includes('screen') &&
        this.monitoringInstances.filter(
          i =>
            ((!contact.contactId && i.agentId !== contact.agentId) || i.contactId !== contact.contactId) &&
            i.monitoringTypes?.filter(x => x.includes('screen') || x.includes('agentscreenmonitor')).length
        ).length)
    ) {
      this.popovers = {
        ...this.popovers,
        [contact.contactId + '-' + type]: {
          showPopover: true
        }
      };
    } else {
      this.startMonitoring(contact);
    }
  }

  public startMonitoring(contact) {
    contact = {
      ...contact,
      ...{ monitoringTypeToStart: this.currentType }
    };
    if (this.currentType === 'voicemonitor' || this.currentType === 'voicecoach') {
      this.startVoiceMonitoring(contact);
    } else if (this.currentType === 'screenmonitor') {
      this.startScreenMonitoring(contact);
    } else if (this.currentType === 'voicetakeover') {
      this.popovers = {
        ...this.popovers,
        [contact + '-' + 'voicetakeover']: {
          showPopover: true
        }
      };
    }
  }

  // public stopExistingMonitoringInstance(contact, type) {
  //   let monitoringInstanceToStop;
  //   let endCompleteMonitoringInstance = false;
    // if (type !== 'screenmonitor') {
    //   monitoringInstanceToStop = this.monitoringInstances[0];
    //   monitoringInstanceToStop = {
    //     ...monitoringInstanceToStop,
    //     monitoringTypes: [...monitoringInstanceToStop?.monitoringTypes]
    //   };
    //   endCompleteMonitoringInstance =
    //     this.monitoringInstances.filter(i => i.contactId === contact.contactId && i.monitoringTypes?.includes(type)).length > 0;
    // } else {
    //   monitoringInstanceToStop = this.monitoringInstances?.filter(i => i?.monitoringTypes.includes(this.currentType))[0];
    //   // monitoringInstanceToStop = {
    //   //   ...monitoringInstanceToStop,
    //   //   monitoringTypes: [...monitoringInstanceToStop?.monitoringTypes.filter(monitoringType => monitoringType !== this.currentType)]
    //   // };
    // }
    // this.store.dispatch(
    //   SharedActions.stopMonitoringInstance({
    //     monitoringInstance: monitoringInstanceToStop,
    //     endCompleteMonitoringInstance: monitoringInstanceToStop.monitoringTypes.includes('agentscreenmonitor') ? true : endCompleteMonitoringInstance,
    //     monitoringTypeToStop: this.currentType
    //   })
    // );
  // }

  public startVoiceMonitoring(_contact) {
    // this.store.dispatch(
    //   SharedActions.updateVoiceMonitoringContactDetails({
    //     contact
    //   })
    // );
  }

  public startScreenMonitoring(contact) {
    if (contact.contactId === '') {
      delete contact['contactId'];
    }

    // this.store.dispatch(
    //   SharedActions.startScreenMonitoring({
    //     agentId: contact?.agentId,
    //     userId: contact?.userId,
    //     contactId: contact?.contactId,
    //     agentContactId: contact?.agentContactId
    //   })
    // );
  }
}
