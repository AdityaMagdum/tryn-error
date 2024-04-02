import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelloworldComponent } from './helloworld.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfigurationService } from '@niceltd/cxone-core-services';
import { TranslationModule, TranslationPipe } from '@niceltd/cxone-components/translation';
import {
  FeatureToggleService,
  IconSvgService,
  LicenseService,
  NotificationService,
  PermissionService,
  SidebarService,
  SubscribeService,
  URLUtils
} from '@niceltd/cxone-client-platform-services';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageModalComponent } from '@niceltd/cxone-components/modal';
import { Subject, of } from 'rxjs';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpUtils, ConfigurationService as ConfigurationServiceWorker, User, WebWorkerMessage } from '@niceltd/cxone-client-platform-services/index-webworker';

describe('HelloworldComponent', () => {
  let component: HelloworldComponent;
  let fixture: ComponentFixture<HelloworldComponent>;
  let httpTestingController: HttpTestingController;
  let httpClientInjected: HttpClient;
  let dialogClosedSubject: Subject<boolean>;
  let dialogService: DialogService;
  let subscribeService: SubscribeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslationModule, HelloworldComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        DialogService,
        TranslationPipe,
        ConfigurationService,
        DialogService,
        IconSvgService,
        LicenseService,
        {
          provide: FeatureToggleService,
          useValue: {
            loadFeatures: () => {}
          }
        },
        {
        provide: PermissionService,
        useValue: {
          getUserPermissionList: () => {}
        }
        },
        {
          provide: SubscribeService,
          useValue: {
            subscribeToEvent: () => {},
            unsubscribeFromEvent: () => {}
          }
        },
        User,
        URLUtils,
        {
          provide: NotificationService,
          useValue: {
            subscribeToSubject: () =>
              of({
                displayData: {
                  title: 'Test Title',
                  content: 'Test Content'
                }
              })
          }
        },
        {
          provide: ConfigurationServiceWorker,
          useValue: {
            set: 'test'
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloworldComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClientInjected = TestBed.inject(HttpClient);
    subscribeService = TestBed.inject(SubscribeService);
    component = fixture.componentInstance;
    dialogService = TestBed.inject(DialogService);
    dialogClosedSubject = new Subject<boolean>();

    (component as any).http = httpClientInjected;
    (component as any).dialogService = dialogService;

    spyOn(dialogService, 'open').and.returnValue({
      onClose: of(true)
    } as DynamicDialogRef);

    spyOn(console, 'log');
    spyOn(URLUtils, 'redirectToUrl');
    spyOn(IconSvgService.instance, 'getIconsSpriteDataUrl').and.returnValue(
      'test-sprite-data'
    );
    spyOn(LicenseService.instance, 'getLicensesForTenant').and.returnValue(
      Promise.resolve([])
    );
    spyOn(FeatureToggleService.instance, 'loadFeatures').and.returnValue(
      Promise.resolve([])
    );
    spyOn(PermissionService.instance, 'getUserPermissionList').and.returnValue(
      Promise.resolve([])
    );
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the appPath', () => {
    expect(component.appPath).toBeTruthy();
  });

  it('should redirect to the URL /grid', () => {
    spyOn(SidebarService.instance, 'redirectToUrl');
    component.goToGrid();
    expect(SidebarService.instance.redirectToUrl).toHaveBeenCalledWith(
      component.appPath + '/grid',
      true
    );
  });

  it('should redirect to the URL /sol-demo', () => {
    spyOn(SidebarService.instance, 'redirectToUrl');
    component.goToSolDemo();
    expect(SidebarService.instance.redirectToUrl).toHaveBeenCalledWith(
      component.appPath + '/sol-demo',
      true
    );
  });

  it('should call moduleUnloaderHandler on ngOnDestroy', () => {
    const mockModuleUnloaderHandler = jasmine.createSpy(
      'moduleUnloaderHandler'
    );
    component.moduleUnloaderHandler = mockModuleUnloaderHandler;
    component.ngOnDestroy();
    expect(mockModuleUnloaderHandler).toHaveBeenCalled();
  });

  it('should send an HTTP GET request in requestData', () => {
    component.requestData();
    const req = httpTestingController.expectOne('assets/data/test.json');
    expect(req.request.method).toEqual('GET');
    req.flush({ someKey: 'someValue' });
  });

  it('should send an HTTP GET request in convertData', () => {
    component.convertData();
    const req = httpTestingController.expectOne('assets/data/test.json');
    expect(req.request.method).toEqual('GET');
    req.flush({ someKey: 'someValue' });
  });

  it('should call openWarningMessage with the correct parameters', () => {
    const navigateAwaySpy = jasmine.createSpy('navigateAway');
    component.openWarningMessage(navigateAwaySpy);
    expect(dialogService.open).toHaveBeenCalledWith(MessageModalComponent, {
      width: '420px',
      height: '190px',
      data: jasmine.objectContaining({
        title: component.translationPipe.transform(
          'rolesListPage.ModalMessages.transition.title'
        ),
        primaryButtonText: component.translationPipe.transform(
          'cxone-domain-components.commonButtons.yes'
        ),
        closeButtonText: component.translationPipe.transform(
          'cxone-domain-components.commonButtons.no'
        ),
        type: 'user-warning',
        focusOnShow: true
      })
    });
    dialogClosedSubject.next(true);
    expect(navigateAwaySpy).toHaveBeenCalled();
  });

  it('should initialize component properties and subscribe to events', async () => {
    await component.ngOnInit();
    expect(FeatureToggleService.instance.loadFeatures).toHaveBeenCalled();
    expect(PermissionService.instance.getUserPermissionList).toHaveBeenCalled();
  });

  it('should initialize component properties and subscribe to events', async () => {
    await component.ngOnInit();
    expect(FeatureToggleService.instance.loadFeatures).toHaveBeenCalled();
    expect(PermissionService.instance.getUserPermissionList).toHaveBeenCalled();
  });

  it('should call moduleUnloaderHandler on ngOnDestroy', () => {
    const mockModuleUnloaderHandler = jasmine.createSpy('moduleUnloaderHandler');
    component.moduleUnloaderHandler = mockModuleUnloaderHandler;
    component.ngOnDestroy();
    expect(mockModuleUnloaderHandler).toHaveBeenCalled();
  });

  it('should call openWarningMessage when isDirty is true', () => {
        component.isDirty = true;
        spyOn(component, 'openWarningMessage');
        const event = { redirectionUrl: 'https://example.com' };
        component.handleModuleUnload(event);
        expect(component.openWarningMessage).toHaveBeenCalled();
  });

  it('should call navigateAway when isDirty is false', () => {
        spyOn(SidebarService.instance, 'redirectToUrl');
        component.isDirty = false;
        spyOn(component, 'openWarningMessage');
        const event = { redirectionUrl: 'https://example.com' };
        component.handleModuleUnload(event);
        expect(component.openWarningMessage).not.toHaveBeenCalled();
        expect(URLUtils.redirectToUrl).toHaveBeenCalledWith(
            event.redirectionUrl
        );
  });
});