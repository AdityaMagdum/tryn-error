import { Component, OnInit } from '@angular/core';
import fetchIntercept from 'fetch-intercept';
import { SpinnerService, SpinnerModule } from '@niceltd/cxone-components/spinner';
import { setTheme } from 'ngx-bootstrap/utils';
import { RouterOutlet } from '@angular/router';
import { NavigationV2Module } from '@niceltd/cxone-domain-components/navigation-v2';
import { ActionBarModule } from '@niceltd/cxone-domain-components/action-bar';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [SpinnerModule, ActionBarModule, NavigationV2Module, RouterOutlet]
})

export class AppComponent implements OnInit {
  unregister: any;
  sidebarCollapsed: boolean;
  sidebarToggleButton: boolean;

  constructor(
    private spinnerService: SpinnerService
  ) {
    setTheme('bs3');
    this.unregister = this.setupFetchInterceptors();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.unregister();
  }

  fetchInterceptors = {
    request: (url, config) => {
      this.spinnerService.isLoading.next(true);
      return [url, config];
    },
    requestError: (error) => {
      this.spinnerService.isLoading.next(false);
      return Promise.reject(error);
    },
    response: (response) => {
      this.spinnerService.isLoading.next(false);
      return response;
    },
    responseError: (error) => {
      this.spinnerService.isLoading.next(false);
      return Promise.reject(error);
    }
  };

  private setupFetchInterceptors() {
    return fetchIntercept.register(this.fetchInterceptors);
  }
}
