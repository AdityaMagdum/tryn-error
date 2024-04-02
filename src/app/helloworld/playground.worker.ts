
import { HttpUtils, User,
  ConfigurationService,
  WebWorkerNotificationService,
  WebWorkerMessage,
  WEB_WORKER_INFRA_EVENTS
} from '@niceltd/cxone-client-platform-services/index-webworker';

const worker = self;
const notificationService = new WebWorkerNotificationService();

addEventListener('message', (event: MessageEvent) => {
  (async () => {
    const wwMsg = event.data as WebWorkerMessage;
    console.log('Web Worker: received message', wwMsg);

    if (WebWorkerNotificationService.isWebWorkerInfraEvent(wwMsg.type)) {
      // Handle the case where wwMsg.type is a WEB_WORKER_INFRA_EVENTS
      if (wwMsg.type === WEB_WORKER_INFRA_EVENTS.INIT_DATA) {
        User.instance.token = wwMsg.data.token as string;
        ConfigurationService.instance.set('appContext', wwMsg.data.appContext);
        ConfigurationService.instance.set('websocketServerBaseUrl', wwMsg.data.websocketServerBaseUrl as string);
        // Set initial data
        // This step must be done before connecting to the WS service
        WebWorkerNotificationService.setServiceData(wwMsg.data);
      }

      if (wwMsg.type === WEB_WORKER_INFRA_EVENTS.CONNECT_TO_WS) {
        if (!notificationService.isWebWorkerNotificationWSConnected()) {
          console.log('Web Worker: connecting to WS service...');
          notificationService.connectToWSService();
          worker.postMessage('I am connected to the WS notification service');
          notificationService.subscribeToSubject('IN_APP').subscribe((data) => {
            console.log('Web Worker received IN_APP notification');
            worker.postMessage('I received an IN_APP message from notification service!!!');
          });
        }
      }

      if (wwMsg.type === WEB_WORKER_INFRA_EVENTS.UPDATE_TOKEN) {
        // Update the user token after receiving 'refresh token' message from the main thread
        console.log('Web Worker: received token update', wwMsg.data.token);
        User.instance.token = wwMsg.data.token;
        notificationService.updateTokenExpirationTime(wwMsg.data.tokenExpirationTime);
      }
    } else if (wwMsg.type.toString() === 'CUSTOM_EVENT') {
      // Handle the case where wwMsg.type is a string
      // Here you can add event listeners for your app custom events
      console.log('Web Worker: received CUSTOM_EVENT: ', wwMsg.msg);
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      worker.postMessage('I received: ' + wwMsg.msg + ', sending \'Hello\' back... ;-)');
    } else if (wwMsg.type.toString() === 'HTTP_CALL') {
      // Example for creating an HTTP call to get toggled features
      // This call can be done only after the user token is set & the app context is set
      const httpResponse = await HttpUtils.get('/config/toggledFeatures', {}, true);
      console.log('Web Worker: httpResponse: ', httpResponse);
      const res = httpResponse.toggledFeatures.find((feature) => feature.includes('dashboard'));
      worker.postMessage('Feature Toggle ON: ' + res);
    } else if (wwMsg.type.toString() === 'TERMINATE_WORKER') {
        // Terminate the web worker, do a cleanup if needed
        console.log('Web Worker: received TERMINATE_WORKER...');
    }
  })();
});
