import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
// import { Store } from '@ngrx/store';
import { Observable, Subscription} from 'rxjs';
// import { getGridEventSkillsMetricesData, getLatestSkillsUpdatedData, getSkillsData } from 'src/app/featuresCXSUPv2/shared/+state/shared.selectors';
// import { SharedConstants } from 'src/app/featuresCXSUPv2/shared/constants/shared.constant';
// import { AdminMetricesWorkerService } from 'src/app/featuresCXSUPv2/shared/services/admin-metrices-worker.service';

@Component({
  selector: 'cxsup-admin-skills-sla-widget',
  templateUrl: './admin-skills-sla-widget.component.html',
  styleUrls: ['./admin-skills-sla-widget.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSkillsSLAWidgetComponent implements OnInit {
  @Input('tabType') public tabType: string;
  public skillActivities;
  public inSLAPercentage: any;
  public outSLASkillsCount = 0;
  public inSLASkillsCount: any;
  public isSpinner = false;
  public subscription = new Subscription();
  public skillsMetricesData$: Observable<any>;
  public gridData$: Observable<any>;
  // constructor(public cd: ChangeDetectorRef, public store: Store, public adminMetricesWorkerService: AdminMetricesWorkerService) {}
  // public iconStyle = SharedConstants.iconStyle;

  ngOnInit(): void {
    // this.gridData$ = combineLatest([this.store.select(getSkillsData), this.store.select(getLatestSkillsUpdatedData)]);
    // this.subscribeToGridData();
    // this.skillsMetricesData$ = this.store.select(getGridEventSkillsMetricesData);
    this.subscribeToSkillsGridMetricesData();
    this.isSpinner = true;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedTab?.currentValue && changes.selectedTab?.currentValue === 'skills') {
      this.tabType = changes.selectedTab.currentValue;
    }
  }

  // callMetricesCalculationService = data => {
  //   this.adminMetricesWorkerService.metricesService('skills', data);
  // };

  // public subscribeToGridData() {
  //   this.subscription.add(
  //     this.gridData$
  //       .pipe(
  //         filter(
  //           ([skillsData, latestSkillsUpdatedData]) =>
  //             skillsData && skillsData?.length > 0 && latestSkillsUpdatedData && latestSkillsUpdatedData.length > 0
  //         )
  //       )
  //       .subscribe(([skillsData]) => {
  //         if (skillsData && skillsData.length) {
  //           this.callMetricesCalculationService(skillsData);
  //         }
  //       })
  //   );
  // }

  public subscribeToSkillsGridMetricesData() {
    this.subscription.add(
      this.skillsMetricesData$.subscribe((data: any) => {
        this.skillActivities = data;
        this.inSLASkillsCount = data?.inSLASkillsCount ? data.inSLASkillsCount : 0;
        this.outSLASkillsCount = data?.outSLASkillsCount ? data.outSLASkillsCount : 0;
        this.inSLAPercentage = data?.inSLAPercentage ? data.inSLAPercentage : 0;
        this.isSpinner = false;
        // this.cd.detectChanges();
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
