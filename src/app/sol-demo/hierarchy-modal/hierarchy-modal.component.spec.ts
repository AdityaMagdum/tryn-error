import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HierarchyModalDemoComponent } from './hierarchy-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslationPipe } from '@niceltd/cxone-components/translation';
import { ConfigurationService } from '@niceltd/cxone-core-services';
import { TranslationModule } from '@niceltd/cxone-components/translation';
import { ModalService } from '@niceltd/sol/modal';
import { HierarchyModalComponent } from '@niceltd/cxone-domain-components/hierarchy';

class ModalServiceStub {
    open(component: any, config: any) {
      return {
        subscribe: (callback: () => void) => {
          callback();
        }
      };
    }
  }

describe('HierarchyModalDemoComponent', () => {
  let component: HierarchyModalDemoComponent;
  let fixture: ComponentFixture<HierarchyModalDemoComponent>;
  let modalService: ModalServiceStub;
  let hierarchyModalComponentSpy: jasmine.SpyObj<any>;

  beforeEach(async () => {
    hierarchyModalComponentSpy = jasmine.createSpyObj('HierarchyModalComponent', ['onSelectedChangedSubscription']);
    await TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, TranslationModule, HierarchyModalDemoComponent],
    providers: [DialogService, HierarchyModalDemoComponent, TranslationPipe, ConfigurationService, { provide: ModalService, useClass: ModalServiceStub }, { provide: HierarchyModalDemoComponent, useValue: hierarchyModalComponentSpy }]
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyModalDemoComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open hierarchy modal', () => {
    spyOn(modalService, 'open').and.callThrough();
    component.openHierarchyModal();
    expect(modalService.open).toHaveBeenCalled();
  });

  it('should trigger onSelectedChangedSubscription', () => {
    spyOn(modalService, 'open').and.callFake((componentType, config) => {
      const selectedData = [{ id: 1, name: 'Item 1' }];
      config.data.onSelectedChangedSubscription(selectedData);
      return {
        subscribe: () => {}
      };
    });
    component.openHierarchyModal();
    expect(modalService.open).toHaveBeenCalled();
    expect(modalService.open).toHaveBeenCalledWith(
      HierarchyModalComponent,
      {
        data: {
          warningMessage: 'OUs Selected',
          maxSelection: 3,
          autocompletePlaceholder: 'OUs',
          baseSelectionModalParams: jasmine.any(Object),
          onSelectedChangedSubscription: jasmine.any(Function)
        }
      }
    );
  });
});