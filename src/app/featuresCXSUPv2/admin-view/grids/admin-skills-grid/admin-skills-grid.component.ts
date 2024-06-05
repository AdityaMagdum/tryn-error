import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { TranslationPipe } from 'cxone-components/translation';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
// import { getLatestSkillsUpdatedData, getSkillsRowData } from 'src/app/featuresCXSUPv2/shared/+state/shared.selectors';
// import { SharedConstants } from 'src/app/featuresCXSUPv2/shared/constants/shared.constant';
// import { SortingPreferenceColState } from 'src/app/featuresCXSUPv2/shared/models/preference.model';
import { AdminSkillsGridService } from './admin-skills-grid.service';
// import { AdminSkillsPollingWorkerService } from 'src/app/featuresCXSUPv2/shared/services/admin-skills-polling-worker.service';
// import * as SharedActions from 'src/app/featuresCXSUPv2/shared/+state/shared.actions';
import { IconSvgService} from 'cxone-client-services-platform';
// import { LiveMonitoringConstants } from 'src/app/featuresCXSUPv2/core-components/live-monitoring/shared/constants/live-monitoring.const';

@Component({
  selector: 'cxsup-admin-skills-grid',
  templateUrl: './admin-skills-grid.component.html',
  styleUrls: ['./admin-skills-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSkillsGridComponent implements OnInit, OnChanges {
  @Input('selectedTab')
  public selectedTab;

  @Input('searchQuery')
  public searchQuery;

  @Input('shouldRefetchApi')
  public shouldRefetchApi;

  public fetchACDInterval;
  public tab = null;
  public gridOptions: GridOptions;
  public gridApi: GridApi;
  public columnDefs: ColDef[];
  public gridColumnApi: any;
  public rowData: any[] = [];
  public multiSortKey: 'ctrl' = 'ctrl' as const;
  public rowSelection: 'single' | 'multiple' = 'single';
  public sortingOrder: ('asc' | 'desc' | null)[] = ['asc', 'desc', null];
  // public lastPollTime = SharedConstants.defaultLastPollTime;
  // public sortState: Array<SortingPreferenceColState>;
  public event: any;
  public emptyUserState = false;
  public adminSubscription = new Subscription();
  public adminSkillsGridData$: Observable<any[]>;
  // public skillsGridData$: Observable<any>;
  public ENTER = 'Enter';
  public adminSkillsRowData$: Observable<any>;
  public isACDPermissionAvailable = false;
  public illustrationsIconsPath: string;
  public isGridReady = false;

  constructor(
    public translationPipe: TranslationPipe,
    public cd: ChangeDetectorRef,
    private adminSkillsGridService: AdminSkillsGridService,
    // public adminSkillsPollingWorkerService: AdminSkillsPollingWorkerService,
    public store: Store
  ) {
    this.illustrationsIconsPath = IconSvgService.instance.getIconsSpriteDataUrl('illustrations');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchQuery?.currentValue || changes.searchQuery?.currentValue.length === 0) {
      this.setQuickFilter(changes.searchQuery.currentValue);
    }
    if (changes.shouldRefetchApi?.currentValue === true && this.isGridReady) {
      this.gridApi?.showLoadingOverlay();
      if (this.fetchACDInterval) {
        clearTimeout(this.fetchACDInterval);
      }
      // this.lastPollTime = SharedConstants.defaultLastPollTime;
      this.fetchAcdSkillsData();
    }
  }

  ngOnInit(): void {
    this.gridOptions = this.buildGridOptions();
    this.columnDefs = this.adminSkillsGridService.getColumnDefinitionsForSkillsGridNgrx();
    // this.adminSkillsGridData$ = this.store.select(getLatestSkillsUpdatedData);
    this.subscribeToSkillsGridData();
    // this.adminSkillsRowData$ = this.store.select(getSkillsRowData);
    this.subscribeToSkillsRowData();
    // this.checkForAcdPermissions();
  }

  fetchAcdSkillsData() {
    if (this.fetchACDInterval) {
      clearTimeout(this.fetchACDInterval);
    }
    // this.callPollingService();
  }

  // callPollingService = () => {
  //   this.adminSkillsPollingWorkerService.pollingService(this.lastPollTime);
  // };

  // public checkForAcdPermissions() {
  //   if (PermissionService.instance.allowAccess(LiveMonitoringConstants.permissions.viewACDSkills) === true) {
  //     this.isACDPermissionAvailable = true;
  //   } else {
  //     this.isACDPermissionAvailable = false;
  //   }
  //   this.cd.detectChanges();
  // }

  public subscribeToSkillsGridData() {
    this.adminSubscription.add(
      this.adminSkillsGridData$.subscribe((data: any) => {
        if (data === null) {
          this.emptyUserState = false;
          this.gridApi?.hideOverlay();
        }
        if (data && data.length) {
          if (this.gridApi?.getDisplayedRowCount() === 0) {
            this.gridApi?.applyTransactionAsync({ add: data });
          } else {
            this.gridApi?.applyTransactionAsync({ update: data });
          }
          this.gridApi?.flushAsyncTransactions();
        }
        this.gridApi?.hideOverlay();
        this.emptyUserState = this.gridApi?.getDisplayedRowCount() === 0 ? false : true;
        // this.lastPollTime = null;
        // if (this.isGridReady) {
        //   this.fetchACDInterval = setTimeout(this.callPollingService, 5000);
        // }
      })
    );
  }

  setQuickFilter(searchValue) {
    this.gridApi?.setQuickFilter(searchValue);
    this.emptyUserState = this.gridApi?.getDisplayedRowCount() === 0 ? false : true;
  }

  public buildGridOptions() {
    return {
      defaultColDef: {
        resizable: false,
        valueFormatter: params => params.value ?? '-',
        sortable: true,
        sortingOrder: this.sortingOrder,
        suppressMenu: true,
        enableBrowserTooltips: true,
        suppressMovable: true,
        onCellClicked: event => {
          if (event.column.colId !== 'actions') {
            event.node.setSelected(true);
            this.onRowClicked(event?.data);
          }
        },
        onCellKeyPress: event => {
          if (event?.event?.key === this.ENTER && event.column.colId !== 'actions') {
            event.node.setSelected(true);
            this.onRowClicked(event?.data);
          }
        }
      },
      icons: {
        sortAscending: `
              <img src="./assets/svg/icons/add_above.svg" style="height: 10px;width: 10px; margin-top: 2px;"/>`,
        sortDescending: `
              <img src="./assets/svg/icons/add_below.svg" style="height: 10px;width: 10px; margin-top: 2px;"/>`
      },
      asyncTransactionWaitMillis: 1000,
      headerHeight: 52,
      pagination: false,
      rowHeight: 44,
      suppressCellFocus: false,
      suppressNoRowsOverlay: true,
      multiSortKey: this.multiSortKey,
      ensureDomOrder: true,
      enableCellTextSelection: true,
      rowSelection: this.rowSelection,
      suppressCellSelection: false,
      suppressContextMenu: true,
      suppressDragLeaveHidesColumns: false,
      suppressRowClickSelection: true,
      overlayLoadingTemplate: '<div class="spinner spinner-bounce-middle"></div>',
      getRowId: data => data.data.skillId,
      onGridReady: this.onGridReady
    };
  }

  public onGridReady = (params): void => {
    this.isGridReady = true;
    // this.lastPollTime = SharedConstants.defaultLastPollTime;
    this.fetchAcdSkillsData();
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    if (this.gridApi?.getDisplayedRowCount() === 0) {
      this.gridApi?.showLoadingOverlay();
    }
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: 'serviceLevel', sort: 'desc', sortIndex: 0 },
        { colId: 'skillName', sort: 'asc', sortIndex: 1 }
      ],
      defaultState: { sort: null }
    });
  };

  public onRowClicked(rowData) {
    this.gridApi.forEachNode(node => {
      if (node.data.skillId?.toString() === rowData.skillId?.toString()) {
        node.setSelected(true);
        // this.store.dispatch(
        //   SharedActions.setSkillsRowData({
        //     showSkillsRowSidePanel: true,
        //     skillsRowData: node.data,
        //     rowSelected: true
        //   })
        // );
      }
    });
  }

  public subscribeToSkillsRowData() {
    this.adminSubscription.add(
      this.adminSkillsRowData$.pipe(filter(rowData => rowData !== null)).subscribe((res: any) => {
        if (res?.rowSelected === false && this.gridApi?.getSelectedNodes() && this.gridApi?.getSelectedNodes().length) {
          this.gridApi.getSelectedNodes()[0].setSelected(false, true);
        }
        this.cd.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    if (this.fetchACDInterval) {
      clearTimeout(this.fetchACDInterval);
    }
    // this.adminSkillsPollingWorkerService.destroyWorker();
    this.adminSubscription.unsubscribe();
  }
}
