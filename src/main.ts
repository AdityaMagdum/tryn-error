import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { PasswordExpiringService } from 'cxone-core-services';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(platformRef => {
    const service = platformRef.injector.get(PasswordExpiringService);
    service.showPasswordToastIfExpiring();
  })
  .catch(err => console.error(err));
