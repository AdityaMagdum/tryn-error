import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApplicationRef, APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { I18NextModule, I18NEXT_SERVICE } from 'angular-i18next';
import { AnalyticsService } from 'cxone-client-services-platform';
import { OverflowTooltipModule } from 'cxone-components/overflow-tooltip';
import { SpinnerComponent, SpinnerModule } from 'cxone-components/spinner';
import { SvgSpriteIconModule } from 'cxone-components/svg-sprite-icon';
import { TabsModule } from 'cxone-components/tabs';
import { TranslationModule } from 'cxone-components/translation';
import {
  AppInitializerFactory,
  ConfigurationService,
  CoreServicesModule,
  CXOneHttpRequestInterceptor,
  CXOneHttpResponseInterceptor,
  DynamicLocaleId,
  LocalizationInitializer,
  WebAppInitializerService,
  WebAppInitializerServiceOptions
} from 'cxone-core-services';
import { ActionBarModule } from 'cxone-domain-components/action-bar';
import { NavigationModule } from 'cxone-domain-components/navigation';
import { HighchartsChartModule } from 'highcharts-angular';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { ButtonModule } from 'nice-solaris-ngx/button';
import { TabsModule as SolTabsModule } from 'nice-solaris-ngx/tabs';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { PipesModule } from './featuresCXSUPv2/shared/pipes/pipes.module';
import { SharedModule } from './featuresCXSUPv2/shared/shared.module';
import { SidebarModule } from './featuresCXSUPv2/sidebar/sidebar.module';
import { RequestInterceptor } from './interceptor';
import { ToastrManagerModule as SolToastrManagerModule } from 'nice-solaris-ngx/toastr';
// import { FeatureToggleGuard } from './featuresCXSUPv2/shared/guard/feature-toggle-guard';
// import { FeatureToggleGuardService } from './featuresCXSUPv2/shared/services/feature-toggle-guard.service';
import { FormsModule } from '@angular/forms';

export async function customInitFn() {
  console.debug('%cCustom Function Fired!', 'font-size:1rem;color: #FF7F50');
  await AnalyticsService.instance.inject();
  await Promise.resolve();
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    ActionBarModule,
    BrowserModule,
    HttpClientModule,
    I18NextModule.forRoot(),
    NavigationModule,
    PopoverModule.forRoot(),
    SpinnerModule,
    SvgSpriteIconModule,
    TabsModule,
    ButtonModule,
    SolTabsModule,
    ToastrModule.forRoot(),
    SolToastrManagerModule,
    TranslationModule,
    UpgradeModule,
    CoreServicesModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false
        }
      }
    ),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    // PipesModule,
    HighchartsChartModule,
    OverflowTooltipModule,
    TooltipModule.forRoot(),
    SharedModule,
    SidebarModule,
    FormsModule
  ],
  entryComponents: [SpinnerComponent],
  providers: [
    // ClientPlatformWrapperService,
    // FeatureToggleGuard,
    // FeatureToggleGuardService,
    {
      provide: LOCALE_ID,
      useClass: DynamicLocaleId,
      deps: [I18NEXT_SERVICE]
    },
    {
      provide: LocalizationInitializer,
      useClass: LocalizationInitializer,
      deps: [I18NEXT_SERVICE, HttpClient, ConfigurationService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: AppInitializerFactory,
      deps: [LocalizationInitializer, ConfigurationService, WebAppInitializerService, WebAppInitializerServiceOptions],
      multi: true
    },
    {
      provide: WebAppInitializerServiceOptions,
      useValue: {
        disableNotifications: false,
        customInitFn: customInitFn,
        userPreferenceAppContext: 'supervisor',
        preloadSpritesToDOM: true
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CXOneHttpRequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CXOneHttpResponseInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ]
})
export class AppModule {
  ngDoBootstrap(app: ApplicationRef) {
    // for a standalone app
    app.bootstrap(AppComponent);
  }
}
