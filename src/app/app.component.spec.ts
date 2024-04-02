import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SpinnerService } from '@niceltd/cxone-components/spinner';
import { customInitFn } from './app.config';
import { AnalyticsService } from '@niceltd/cxone-client-platform-services';
import { Injector } from '@angular/core';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AppComponent, SharedModule]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    injector = TestBed.inject(Injector);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call console.debug', async () => {
    const consoleDebugSpy = spyOn(console, 'debug');
    const injectSpy = spyOn(AnalyticsService.instance, 'inject').and.returnValue(Promise.resolve());
    await customInitFn();
    expect(consoleDebugSpy).toHaveBeenCalledWith('%cCustom Function Fired!', 'font-size:1rem;color: #FF7F50');
    expect(injectSpy).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});

describe('Fetch Interceptors', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let spinnerService: SpinnerService;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AppComponent, SharedModule],
      providers: [SpinnerService]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    spinnerService = TestBed.inject(SpinnerService);
    (component as any).spinnerService = spinnerService;
    injector = TestBed.inject(Injector);
  });

  it('should start the spinner when a request is started', (done) => {
    const url = 'https://example.com/api';
    const config = { method: 'GET' };
    component.fetchInterceptors.request(url, config);
    spinnerService.isLoading.subscribe((isLoading) => {
      expect(isLoading).toBeTrue();
      done();
    });
  });

  it('should stop the spinner when the request errors', (done) => {
    component.fetchInterceptors.requestError('Some error');
    spinnerService.isLoading.subscribe((isLoading) => {
      expect(isLoading).toBeFalse();
      done();
    });
  });

  it('should stop the spinner when a response is received', (done) => {
    component.fetchInterceptors.response({ products: [] });
    spinnerService.isLoading.subscribe((isLoading) => {
      expect(isLoading).toBeFalse();
      done();
    });
  });

  it('should stop the spinner when an error response is received', (done) => {
    component.fetchInterceptors.responseError('Some error');
    spinnerService.isLoading.subscribe((isLoading) => {
      expect(isLoading).toBeFalse();
      done();
    });
  });

  afterEach(() => {
    fixture.destroy();
  });
});