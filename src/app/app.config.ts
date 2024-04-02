/* Core Angular Imports */
import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, Injector, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

/* CXOne Infra Imports */
import { I18NEXT_SERVICE } from 'angular-i18next';
import {
    AppInitializerFactory, ConfigurationService, CXOneHttpRequestInterceptor,
    CXOneHttpResponseInterceptor, DynamicLocaleId, LocalizationInitializer,
    WebAppInitializerService, WebAppInitializerServiceOptions
} from '@niceltd/cxone-core-services';
import { TabsModule } from '@niceltd/cxone-components/tabs';
import { GridModule } from '@niceltd/cxone-components/grid';

/* App Infra Imports */
import { SharedModule } from './shared/shared.module';
import { APP_ROUTES } from './app.routes';

import {AnalyticsService} from '@niceltd/cxone-client-platform-services';
import { provideRouter, withHashLocation } from '@angular/router';

export const customInitFn = async () => {
    console.debug('%cCustom Function Fired!', 'font-size:1rem;color: #FF7F50');
    await AnalyticsService.instance.inject();
    await Promise.resolve();
};

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom([
            BrowserModule,
            BrowserAnimationsModule,
            HttpClientModule,
            SharedModule,
            TabsModule,
            GridModule
        ]),
        provideRouter(APP_ROUTES, withHashLocation()),
        { provide: LOCALE_ID, useClass: DynamicLocaleId, deps: [I18NEXT_SERVICE] },
        { provide: LocalizationInitializer, useClass: LocalizationInitializer, deps: [I18NEXT_SERVICE, HttpClient, ConfigurationService] },
        { provide: APP_INITIALIZER, useFactory: AppInitializerFactory, deps: [
            LocalizationInitializer,
            ConfigurationService,
            WebAppInitializerService,
            WebAppInitializerServiceOptions
          ], multi: true },
          { provide: WebAppInitializerServiceOptions, useValue: {
            customInitFn: customInitFn,
            userPreferenceAppContext:'cxone-boilerplate-app',
            useAngularRouter: true,
            disableNotifications: false
          }},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CXOneHttpRequestInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CXOneHttpResponseInterceptor,
            multi: true
        }
    ]
};
