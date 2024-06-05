import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { TranslationPipe } from 'cxone-components/translation';
import { Observable, Subscription, filter } from 'rxjs';
// import { getAgentRowData, getGridEventArray } from 'src/app/featuresCXSUPv2/shared/+state/shared.selectors';
// import { SharedConstants } from 'src/app/featuresCXSUPv2/shared/constants/shared.constant';
// import { SortingPreferenceColState } from 'src/app/featuresCXSUPv2/shared/models/preference.model';
import { AdminAgentsGridService } from './admin-agents-grid.service';
// import { AdminAgentsPollingWorkerService } from 'src/app/featuresCXSUPv2/shared/services/admin-agents-polling-worker.service';
// import * as SharedActions from 'src/app/featuresCXSUPv2/shared/+state/shared.actions';
// import { LiveMonitoringConstants } from 'src/app/featuresCXSUPv2/core-components/live-monitoring/shared/constants/live-monitoring.const';

@Component({
  selector: 'cxsup-admin-agents-grid',
  templateUrl: './admin-agents-grid.component.html',
  styleUrls: ['./admin-agents-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminAgentsGridComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  public page: string;

  public ENTER = 'Enter';
  @Input('selectedTab')
  public selectedTab;

  @Input('searchQuery')
  public searchQuery;

  @Input('shouldRefetchApi')
  public shouldRefetchApi;
  public gridOptions: GridOptions;
  public gridApi: GridApi;
  public columnDefs: ColDef[];
  public rowData: any[] = [];
  public multiSortKey: 'ctrl' = 'ctrl' as const;
  public rowSelection: 'single' | 'multiple' = 'single';
  public gridColumnApi: any;
  // public sortState: Array<SortingPreferenceColState>;
  public showSidePanel = false;
  public event: any;
  public sortingOrder: ('asc' | 'desc' | null)[] = ['asc', 'desc', null];
  public fetchACDInterval;
  // public lastPollTime = SharedConstants.defaultLastPollTime;
  public emptyUserState = false;
  public subscription = new Subscription();
  public gridData$: Observable<any[]>;
  public count = 0;
  public agentRowData$: Observable<any>;
  public isGridReady = false;

  constructor(
    public translationPipe: TranslationPipe,
    private adminAgentsGridService: AdminAgentsGridService,
    // public adminAgentsPollingWorkerService: AdminAgentsPollingWorkerService,
    private cd: ChangeDetectorRef,
    private store: Store
  ) {}

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
      this.fetchAcdAgentsStateData();
    }
  }

  setQuickFilter(searchValue) {
    this.gridApi?.setQuickFilter(searchValue);
    this.emptyUserState = this.gridApi?.getDisplayedRowCount() === 0 ? false : true;
  }

  fetchAcdAgentsStateData() {
    if (this.fetchACDInterval) {
      clearTimeout(this.fetchACDInterval);
    }
    // this.callPollingService();
  }

  // callPollingService = () => {
  //   this.adminAgentsPollingWorkerService.pollingService(this.lastPollTime);
  // };

  public ngOnInit() {
    this.gridOptions = this.buildGridOptions();
    this.columnDefs = this.adminAgentsGridService.getColumnDefinitionsForAdminAgentsGridNgrx();
    // this.gridData$ = this.store.select(getGridEventArray);
    this.subscribeToGridData();
    // this.agentRowData$ = this.store.select(getAgentRowData);
    this.subscribeToAgentRowData();
  }

  public subscribeToGridData() {
    this.subscription.add(
      this.gridData$.subscribe((data: any) => {
        if (data === null) {
          this.emptyUserState = false;
          this.gridApi?.hideOverlay();
        }
        if (data && data.length) {
          // const updatedGridDataObj = data.map(item => ({
          //   ...item,
          //   translatedState: this.getTranslatedStateName(item)
          // }));
          // if (this.gridApi?.getDisplayedRowCount() === 0) {
          //   this.gridApi?.applyTransactionAsync({ add: updatedGridDataObj });
          // } else {
          //   this.gridApi?.applyTransactionAsync({ update: updatedGridDataObj });
          // }
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
  // public getTranslatedStateName(gridData): any {
  //   return LiveMonitoringConstants.mainGridStateName[gridData.userState]?.label
  //     ? LiveMonitoringConstants.outStateReasonValue[gridData.userState] === LiveMonitoringConstants.outStateReasonValue.Unavailable &&
  //       gridData.outStateName
  //       ? gridData.outStateName
  //       : this.translationPipe.transform(LiveMonitoringConstants.mainGridStateName[gridData.userState].label)
  //     : gridData.userState;
  // }

  public buildGridOptions() {
    return {
      defaultColDef: {
        resizable: false,
        valueFormatter: params => {
          return params.value && params.value !== '' ? params.value : '-';
        },
        sortable: true,
        sortingOrder: this.sortingOrder,
        suppressMenu: true,
        enableBrowserTooltips: true,
        suppressMovable: true,
        onCellClicked: event => {
          if (event.column.colId !== 'actions') {
            event.node.setSelected(true);
            // this.onRowClicked(event?.data);
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
      getRowId: data => data.data.agentId,
      onGridReady: this.onGridReady
      // onCellKeyPress: event => {
      //   // if (event?.event?.key === this.ENTER && event.column.colId !== 'actions' && this.page === SharedConstants.page.liveMonitoring) {
      //   //   event.node.setSelected(true);
      //   //   this.onRowClicked(event?.data);
      //   // }
      // }
    };
  }

  public onGridReady = (params): void => {
    this.isGridReady = true;
    // this.lastPollTime = SharedConstants.defaultLastPollTime;
    this.fetchAcdAgentsStateData();
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    if (this.gridApi?.getDisplayedRowCount() === 0) {
      this.gridApi?.showLoadingOverlay();
    }
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: 'userState', sort: 'asc', sortIndex: 0 },
        { colId: 'fullName', sort: 'asc', sortIndex: 1 }
      ],
      defaultState: { sort: null }
    });
  };

  // public onRowClicked(rowData) {
  //   this.store.dispatch(
  //     SharedActions.setSwitchPanelData({
  //       switchPanelData: {
  //         panelToShow: 'agents',
  //         agentIdToHighlight: rowData.agentId,
  //         tabToShow: 'skills',
  //         isAgentPanelOpened: false
  //       }
  //     })
  //   );
  //   this.openPanelContact(rowData.agentId);
  // }

  // public openPanelContact(agentId) {
  //   this.gridApi.forEachNode(node => {
  //     if (node.data.agentId?.toString() === agentId?.toString()) {
  //       node.setSelected(true);
  //       this.store.dispatch(
  //         SharedActions.setAgentRowData({
  //           showAgentsRowSidePanel: true,
  //           agentRowData: node.data,
  //           rowSelected: true,
  //           isSpinner: true
  //         })
  //       );
  //     }
  //   });
  // }

  public subscribeToAgentRowData() {
    this.subscription.add(
      this.agentRowData$.pipe(filter(rowData => rowData !== null)).subscribe((res: any) => {
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
    // this.adminAgentsPollingWorkerService.destroyWorker();

    this.subscription.unsubscribe();
  }
}
