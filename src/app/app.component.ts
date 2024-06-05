import { Component, NgZone, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import fetchIntercept from 'fetch-intercept';

import { Store } from '@ngrx/store';
import { IconSvgService, LicenseService, SubscribeService, URLUtils } from 'cxone-client-services-platform';
import { SpinnerService } from 'cxone-components/spinner';
import { Subscription } from 'rxjs';
import { SolToastrService } from 'nice-solaris-ngx/toastr';
import { filter } from 'rxjs/operators';
// import { MonitoringRequestService } from './featuresCXSUPv2/shared/services/monitoring-request.service';
// import { registeredToMonitoringRequest, showToaster } from './featuresCXSUPv2/shared/+state/shared.selectors';
// import * as SharedActions from './featuresCXSUPv2/shared/+state/shared.actions';
// import { LiveMonitoringConstants } from './featuresCXSUPv2/core-components/live-monitoring/shared/constants/live-monitoring.const';
import { TranslationPipe } from 'cxone-components/translation';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  public subscription = new Subscription();
  public isPowerPageEnabled = false;
  public dfoLatePacketHandlingFT = false;
  unregister: any;
  sidebarCollapsed: boolean;
  sidebarToggleButton: boolean;
  public showToaster$;
  public supervisorLicenseEnabled = false;
  applicationIconsPath;
  public hideCallerPhoneNumberPermission = false;
  constructor(
    private spinnerService: SpinnerService,
    private store: Store,
    // private monitoringRequestService: MonitoringRequestService,
    private solToastrService: SolToastrService,
    private ngZone: NgZone,
    private translationPipe: TranslationPipe,
    private router: Router
  ) {
    // this.dfoLatePacketHandlingFT = FeatureToggleService.instance.getFeatureToggleSync(
    //   LiveMonitoringConstants.featureToggle.utilityFTDfoLateArrivalPacketHandling
    // );

    // this.isPowerPageEnabled = FeatureToggleService.instance.getFeatureToggleSync(LiveMonitoringConstants.featureToggle.isPowerPageEnabled);
    this.isPowerPageEnabled = true;
    if (this.isPowerPageEnabled && window.location.pathname !== '/supervisor/') {
      window.location.assign('/supervisor/');
    } else if (!this.isPowerPageEnabled && window.location.pathname !== '/supervisor-v2/') {
      window.location.assign('/supervisor-v2/');
    }
    this.applicationIconsPath = IconSvgService.instance.getIconsSpriteDataUrl('application');

    this.subscription = router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });
  }

  ngOnInit() {
    LicenseService.instance.loadLicenses(true).then(licenses => {
      this.supervisorLicenseEnabled = licenses.licenses.findIndex(f => f.applicationId === 'CXSUP') > -1;
    });

    // this.store.dispatch(SharedActions.fetchDFOLatePacketHandlingFT({ dfoLatePacketHandlingFT: this.dfoLatePacketHandlingFT }));

    // this.showToaster$ = this.store.select(showToaster);
    this.subscribeShowToaster();
    // this.store.select(registeredToMonitoringRequest).subscribe(registeredToMonitoringRequestData => {
    //   if (registeredToMonitoringRequestData) {
    //     this.callHeartBeatAPIRecurring();
    //   } else {
    //     this.clearHeartBeatAPITimeout();
    //   }
    // });
    this.unregister = fetchIntercept.register({
      request: (url, config) => {
        this.spinnerService.isLoading.next(true);
        return [url, config];
      },
      requestError: error => {
        // Called when an error occured during another 'request' interceptor call
        this.spinnerService.isLoading.next(false);
        return Promise.reject(error);
      },
      response: response => {
        // Modify the reponse object
        this.spinnerService.isLoading.next(false);
        return response;
      },
      responseError: error => {
        // Handle an fetch error
        this.spinnerService.isLoading.next(false);
        return Promise.reject(error);
      }
    });
    this.subscribeToUnloadHandler();

    // this.hideCallerPhoneNumberPermission = PermissionService.instance.allowAccess(
    //   LiveMonitoringConstants.acdPermissions.hideCallerPhoneNumberPermission
    // );
    // this.store.dispatch(SharedActions.setHideCallerPhoneNumberPermission({ hideCallerPhoneNumberPermission: this.hideCallerPhoneNumberPermission }));
  }

  subscribeToUnloadHandler() {
    this.subscription.add(
      SubscribeService.instance.subscribeToEvent('BEFORE_MODULE_UNLOAD_NG2', (event: { redirectionUrl: string }) => {
        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => {
            // this.store.dispatch(SharedActions.fetchFlagForTabSwitchForWsEvent({ checkForTabSwitchForWSEvent: false }));
            this.ngZone.runOutsideAngular(() => {});
          }, 0);
        });
        URLUtils.redirectToUrl(event.redirectionUrl); // do dirty check
      })
    );
  }

  // clearHeartBeatAPITimeout() {
  //   if (this.monitoringRequestService.heartBeatTimer) {
  //     clearTimeout(this.monitoringRequestService.heartBeatTimer);
  //     this.monitoringRequestService.heartBeatTimer = null;
  //   }
  // }

  // callHeartBeatAPIRecurring() {
  //   this.clearHeartBeatAPITimeout();
  //   if (this.monitoringRequestService.heartBeatTimer === null) {
  //     this.monitoringRequestService.heartBeatTimer = setTimeout(() => {
  //       this.store.dispatch(SharedActions.heartBeatMonitoringRequestService());
  //       this.callHeartBeatAPIRecurring();
  //     }, this.monitoringRequestService.HEART_BEAT_INTERVAL);
  //   }
  // }

  sidebarStateUpdated(val) {
    console.log('UPDATED', val);
  }

  subscribeShowToaster() {
    this.subscription.add(
      this.showToaster$.pipe(filter(x => x !== null)).subscribe(toastData => {
        // eslint-disable-next-line unused-imports/no-unused-vars
        const toasterType = toastData.toastType;
        // this.solToastrService.showToaster(
        //   toasterType,
        //   toastData.message,
        //   this.translationPipe.transform(LiveMonitoringConstants.solToasterTypes[toasterType])
        // );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

/* eslint-disable-next-line */
export let browserRefresh = false;
