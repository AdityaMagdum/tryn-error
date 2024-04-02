import {
    ConfigurationDetails,
    FeatureToggleService,
    IconSvgService,
    LicenseService,
    NotificationService,
    PermissionService,
    SubscribeService,
    URLUtils,
    SidebarService,
    User,
    CommonLocalizationUtils,
    CXOneConstants, LocalStorageUtils
} from '@niceltd/cxone-client-platform-services';
import { ConfigurationService, HttpUtils } from '@niceltd/cxone-core-services';
import { HttpClient } from '@angular/common/http';
import {
    Component, OnDestroy, OnInit, ViewEncapsulation
} from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageModalComponent } from '@niceltd/cxone-components/modal';
import { TranslationPipe, TranslationModule } from '@niceltd/cxone-components/translation';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from '@niceltd/cxone-components/checkbox';
import { SvgSpriteIconModule } from '@niceltd/cxone-components/svg-sprite-icon';
import { NgFor, JsonPipe, KeyValuePipe } from '@angular/common';
import { TabsModule } from '@niceltd/cxone-components/tabs';
import { SharedModule } from '../shared/shared.module';
import * as moment from 'moment-timezone';
import {
    SharedWebWorkerData,
    WEB_WORKER_INFRA_EVENTS,
    WebWorkerContact,
    WebWorkerService
} from '@niceltd/cxone-client-platform-services/index-webworker';
import {ButtonModule} from '@niceltd/sol/button';
import {ModalService, ModalModule} from '@niceltd/sol/modal';
import {AlertWebWorkerInfoModalExample} from './playgroundWebWorkerModal.component';

@Component({
    selector: 'app-helloworld',
    templateUrl: './helloworld.component.html',
    styleUrls: ['./helloworld.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ModalModule, TabsModule, NgFor, SvgSpriteIconModule, CheckboxModule, FormsModule, JsonPipe, KeyValuePipe, TranslationModule, SharedModule, ButtonModule]
})
export class HelloworldComponent implements OnInit, OnDestroy {
  configurationData: ConfigurationDetails;
  configurationKeys: string[];
  spritePath;
  deleteSkillPermission: boolean;
  notifications = [];
  licenses;
  userInfo;
  featureToggles;
  permissions;
  messageText;
  moduleUnloaderHandler: any;
  isDirty = false;
  appPath: string;
  worker: WebWorkerContact = null;
  isWebWorkerConnected = false;
  isWebWorkerAlive = false;
  refreshTokenSubscription: any;
  webWorkerName = 'myWebWorker';
  dialogRef: any;

  constructor(
    private config: ConfigurationService,
    private dialogService: DialogService,
    public translationPipe: TranslationPipe,
    private solModalService: ModalService,
    private httpUtils: HttpUtils,
    private http: HttpClient) {
      this.configurationData = this.config.all();
      this.configurationKeys = Object.keys(this.configurationData);

      NotificationService.instance.subscribeToSubject('IN_APP').subscribe(
        result => {
          const parsedMessage = JSON.parse(result);
          console.log('NOTIFICATION RECEIVED', parsedMessage);
          this.notifications.push(`${parsedMessage.displayData.title} - ${parsedMessage.displayData.content}`);
        }
      );
  }

   async ngOnInit() {
    this.appPath = document.location.href.split('#')[0] + '#';
    this.spritePath = IconSvgService.instance.getIconsSpriteDataUrl('application');
    this.userInfo = User.instance.user;
    console.log(this.userInfo);
    this.licenses = await LicenseService.instance.getLicensesForTenant();
    this.featureToggles = await FeatureToggleService.instance.loadFeatures();
    this.permissions = await PermissionService.instance.getUserPermissionList();

    // Subscribe to the user token refresh event to update the user token in the web worker
    this.refreshTokenSubscription = SubscribeService.instance.subscribeToEvent(CXOneConstants.EVENTS.USER_TOKEN_REFRESHED, (userToken) => {
       console.debug('Published CONTAINER_USER_TOKEN_REFRESHED event: ', userToken);
       if (this.worker) {
           this.worker.postMessage({ // Sending a message to the web worker to update user token
               type: WEB_WORKER_INFRA_EVENTS.UPDATE_TOKEN,
               data: {
                   token: userToken,
                   tokenExpirationTime: LocalStorageUtils.getItem(LocalStorageUtils.KEYS.expirationTime) as string
               } as SharedWebWorkerData
           });
       }
    });

    this.worker = WebWorkerService.instance.getWorker(this.webWorkerName);
    if (this.worker) {
         this.isWebWorkerAlive = true;
    }
    this.subscribeToUnloadEvent();
  }

  createWebWorker() {
      // check if web worker is already created.
      this.worker = WebWorkerService.instance.getWorker(this.webWorkerName);
      if (!this.worker) {
          console.log('Initializing the Web worker...');
          this.worker = new Worker(new URL('./playground.worker', import.meta.url)); // Initialize the web worker
          WebWorkerService.instance.setWorker('myWebWorker', this.worker);
          const webWorkerInitData = {
              token: User.instance.token,
              locale: CommonLocalizationUtils.getCurrentLocaleFromBrowser(),
              timezone: moment.tz.guess(),
              tokenExpirationTime: LocalStorageUtils.getItem(LocalStorageUtils.KEYS.expirationTime) as string, //CoreUtils.isTokenExpired(),
              appContext: this.configurationData.appContext as string,
              websocketServerBaseUrl: this.configurationData.websocketServerBaseUrl as string,
              customIdentifier: User.instance.id
          };
          console.log('Call Web worker with init data: ', webWorkerInitData);
          // Sending a message to the web worker to initialize the Notification Service data
          this.worker.postMessage({
              type: WEB_WORKER_INFRA_EVENTS.INIT_DATA,
              data: webWorkerInitData
          });

          const onMessageWebWorkerHandler = function (event) {
              const receivedMessage = event.data;
              console.log('Message received:', receivedMessage);
              if (this.dialogRef) {
                    this.dialogRef.close();
              }
              this.solModalService.open(AlertWebWorkerInfoModalExample, {
                  width: '350px',
                  height: '210px',
                  data: {
                      message: 'Web Worker: ' + receivedMessage,
                      focusOnShow: true
                  }
              });
              this.dialogRef = this.solModalService.dialogRef;
          };
          // Receiving a message form the web worker
          this.worker.onmessage = onMessageWebWorkerHandler.bind(this);
      } else {
          console.log('Web worker is already initialized...');
      }
      this.isWebWorkerAlive = true;
  }

  connectWebWorkerToWS() {
      if (!this.isWebWorkerConnected && this.worker) {
          console.log('Send CONNECT_TO_WS_SERVICE message to web worker...');
          // Sending a message to the web worker to connect to the Notification Service WS
          this.worker.postMessage({
              type: WEB_WORKER_INFRA_EVENTS.CONNECT_TO_WS,
              data: undefined
          });
          this.isWebWorkerConnected = true;
      } else {
          console.log('Web worker is connected or is not initialized...');
      }
  }

  sendCustomMsgToWebWorker() {
      if (this.isWebWorkerAlive && this.worker) {
          console.log('Send custom message to web worker...');
          // Sending a custom message to the web worker
          this.worker.postMessage({
              type: 'CUSTOM_EVENT',
              data: undefined,
              msg: 'Hello from the main thread!'
          });
      } else {
          console.log('Web worker is not initialized...');
      }
  }

  sendInAppNotification() {
      console.log('Send IN_APP_NOTIFICATION message to web worker...');
      const options = {
          headers: {'Authorization': 'Bearer ' + User.instance.token}
      };
      const wsNotificationUrl = window.location.href.split('/cxone-boilerplate')[0] + '/notifications/clientNotifications/v2/notifyAllClients';
      // Sending IN_APP notification
      this.httpUtils.post(wsNotificationUrl,
          [{
              notificationTemplate: 'IN_APP',
              notificationCustomIdentifier: null,
              recipientsUUIDs: [
                  User.instance.id
              ],
              publisher: User.instance.id,
              parameters: {
                  TEMPLATE_NAME: 'IN-APP_NOTIFICATION',
                  jMeterTimeSent: '1542038868802',
                  testUniqueId: 'debug',
                  notificationPublisherThreadGroup: 'IN-APP-agents-smallTenant 1-5\\IN-APP_NOTIFICATION'
              },
              payload: null,
              isRealTime: false,
              shouldSkipTranslation:false,
              notificationURI: 'COACHING',
              notificationTargetType: 'IN_APP',
              notificationType: 'IN_APP',
              notificationTemplateData:null,
              inAppActions: [
                  {
                      uri: 'SHARE_SEARCH',
                      payload: '{ Some payload }',
                      uriHttpVerb : 'GET',
                      guideline: {
                          uriLaunchMethod: 'API_CALL',
                          actionTextTranslation: 'IN_APP_NOTIFICATION_ACTION_OPEN_PLAYER',
                          onSuccessTextTranslation: 'SHIFT_TRADING_DECLINED_TITLE'
                      }
                  }
              ]
          }],
          options, true).subscribe((result) => {
                console.log('IN_APP_NOTIFICATION response:', result);
      });
  }

  sendHttpMsgToWebWorker() {
    if (this.isWebWorkerAlive && this.worker) {
        console.log('Send HTTP_CALL message to web worker...');
        // Sending a custom message to the web worker
        this.worker.postMessage({
            data: undefined,
            type: 'HTTP_CALL'
        });
    } else {
        console.log('Web worker is not initialized...');
    }
  }

  terminateWebWorker() {
      if (this.isWebWorkerAlive && this.worker) {
          console.log('Send TERMINATE_WORKER message to web worker...');
          // Sending a custom message to the web worker
          this.worker.postMessage({
              data: undefined,
              type: 'TERMINATE_WORKER'
          });
          WebWorkerService.instance.terminateWorker('myWebWorker');
          this.isWebWorkerAlive = false;
          this.isWebWorkerConnected = false;
          this.worker = null;
      } else {
          console.log('Web worker is not initialized...');
      }
  }

  subscribeToUnloadEvent() {
    this.moduleUnloaderHandler = SubscribeService.instance.subscribeToEvent('BEFORE_MODULE_UNLOAD_NG2', (event) => {
      this.handleModuleUnload(event);
    });
  }

  handleModuleUnload(event) {
    if (this.isDirty) {
      this.openWarningMessage(() => { URLUtils.redirectToUrl(event.redirectionUrl); });
    } else {
      URLUtils.redirectToUrl(event.redirectionUrl);
    }
  }

  public openWarningMessage = (yesHandler) => {
    const ref = this.dialogService.open(MessageModalComponent, {
      width: '420px',
      height: '190px',
      data: {
        title: this.translationPipe.transform('unsavedChanges.title'),
        message: this.translationPipe.transform('unsavedChanges.message'),
        primaryButtonText: this.translationPipe.transform('cxone-domain-components.commonButtons.yes'),
        closeButtonText: this.translationPipe.transform('cxone-domain-components.commonButtons.no'),
        type: 'user-warning',
        focusOnShow: true
      }
    });
    ref.onClose.subscribe((response) => {
      if (response) {
        yesHandler();
      }
    });
  };

  public ngOnDestroy() {
    if (this.moduleUnloaderHandler) {
        this.moduleUnloaderHandler();
    }
    if (this.refreshTokenSubscription) {
        this.refreshTokenSubscription();
    }
  }

  requestData() {
    console.log('loading');
    this.http.get('assets/data/test.json').subscribe((_data) => {
    });
  }

  async fetchData() {
    await fetch('assets/data/test.json');
  }

  convertData() {
    this.http.get('assets/data/test.json').subscribe((results) => {
      console.log(results);
    });
  }

  goToGrid() {
    SidebarService.instance.redirectToUrl(this.appPath + '/grid', true);
  }

  goToSolDemo() {
    SidebarService.instance.redirectToUrl(this.appPath + '/sol-demo', true);
  }
}
