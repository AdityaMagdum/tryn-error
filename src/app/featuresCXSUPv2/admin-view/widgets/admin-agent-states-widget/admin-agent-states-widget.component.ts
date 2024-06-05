import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
// import { SharedConstants } from 'src/app/featuresCXSUPv2/shared/constants/shared.constant';
import { Observable, Subscription} from 'rxjs';
import { Store } from '@ngrx/store';
// import { getGridEventAgentsMetricesData, getGridEventArray, selectGridData } from 'src/app/featuresCXSUPv2/shared/+state/shared.selectors';
import { TranslationPipe } from 'cxone-components/translation';
// import { AdminMetricesWorkerService } from 'src/app/featuresCXSUPv2/shared/services/admin-metrices-worker.service';

@Component({
  selector: 'cxsup-admin-agent-states-widget',
  templateUrl: './admin-agent-states-widget.component.html',
  styleUrls: ['./admin-agent-states-widget.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminAgentStatesWidgetComponent implements OnInit {
  public subscription = new Subscription();
  @Input('tabType') public tabType: string;

  public agentStateCategories: any;
  public totalGridData: number;
  public category: number;
  public isSpinner = false;
  public illustrationsIconsPath;
  // public supervisorApplicationIconsPath = SharedConstants.supervisorApplicationIconsPath;
  public agentsMetricesData$: Observable<any>;
  public gridData$: Observable<any>;
  constructor(
    public cd: ChangeDetectorRef,
    public store: Store,
    private translationPipe: TranslationPipe
    // public adminMetriceWorkerService: AdminMetricesWorkerService
  ) {}

  ngOnInit(): void {
    // this.gridData$ = combineLatest([this.store.select(selectGridData), this.store.select(getGridEventArray)]);
    // this.subscribeToGridData();
    // this.agentsMetricesData$ = this.store.select(getGridEventAgentsMetricesData);
    this.subscribeToAgentsGridMetricesData();
    this.isSpinner = true;
  }

  // callMetricesCalculationService = data => {
  //   this.adminMetriceWorkerService.metricesService('agents', data);
  // };

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedTab?.currentValue && changes.selectedTab?.currentValue === 'agents') {
      this.tabType = changes.selectedTab.currentValue;
    }
  }

  // public subscribeToGridData() {
  //   this.subscription.add(
  //     this.gridData$
  //       .pipe(filter(([gridData, gridEventArray]) => gridData && gridData?.length > 0 && gridEventArray && gridEventArray.length > 0))
  //       .subscribe(([gridData]) => {
  //         if (gridData && gridData.length) {
  //           this.callMetricesCalculationService(gridData);
  //         }
  //       })
  //   );
  // }

  public subscribeToAgentsGridMetricesData() {
    this.subscription.add(
      this.agentsMetricesData$.subscribe((data: any) => {
        this.agentStateCategories = data?.agentStateCategories;
        this.totalGridData = data?.total;
        this.isSpinner = false;
        this.cd.detectChanges();
      })
    );
  }

  public trackByFn(index) {
    return index;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
