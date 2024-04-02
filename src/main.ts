import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { PasswordExpiringService } from '@niceltd/cxone-core-services';

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, appConfig)
  .then(platformRef => {
    const service: PasswordExpiringService = platformRef.injector.get(PasswordExpiringService);
    service.showPasswordToastIfExpiring();
})
.catch((err) => console.error(err));
