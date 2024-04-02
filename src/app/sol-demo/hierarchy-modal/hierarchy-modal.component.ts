import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '@niceltd/sol/modal';
import { HierarchyModalComponent } from '@niceltd/cxone-domain-components/hierarchy';
import { BaseSelectionModalParams } from '@niceltd/sol/base-selection-modal';
import { JsonPipe } from '@angular/common';
import { ButtonModule } from '@niceltd/sol/button';

@Component({
    selector: 'app-hierarchymodal',
    templateUrl: './hierarchy-modal.component.html',
    standalone: true,
    imports: [ButtonModule, JsonPipe]
})
export class HierarchyModalDemoComponent implements OnInit, OnDestroy {
  public modalSubscription;
  private baseSelectionModalParams: BaseSelectionModalParams = {
    title: 'Select OUs',
    subTitle: 'Please select up to 3 items',
    rightSideHeading: 'Selected ',
    searchColumnName: 'name',
    primaryKeyLabelName: 'id',
    assignedEntities: []
  };

  public dataRowDemo: any[] = [];
  public constructor(private modalService: ModalService) { }

  ngOnInit() { }

  public openHierarchyModal() {
    this.modalSubscription = this.modalService.open(HierarchyModalComponent, {
      data: {
        warningMessage: 'OUs Selected',
        maxSelection: 3,
        autocompletePlaceholder: 'OUs',
        baseSelectionModalParams: this.baseSelectionModalParams,
        onSelectedChangedSubscription: event => {
          console.log('Hierarchy Selection Changed: ', event);
          this.dataRowDemo = event.selected;
          this.baseSelectionModalParams.assignedEntities = event.selected;
        }
      }
    }).subscribe(()=>{});
  }

  ngOnDestroy(): void {
    this.modalSubscription?.unsubscribe();
  }
}
