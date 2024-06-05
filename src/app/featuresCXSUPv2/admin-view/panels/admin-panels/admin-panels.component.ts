import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable} from 'rxjs';
// import { getSkillsRowData, getAgentRowData } from 'src/app/featuresCXSUPv2/shared/+state/shared.selectors';
// import { AgentRowDataUpdated, SkillsRowDataUpdated } from 'src/app/featuresCXSUPv2/shared/+state/shared.state';

@Component({
  selector: 'cxsup-admin-panels',
  templateUrl: './admin-panels.component.html',
  styleUrls: ['./admin-panels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPanelsComponent implements OnInit, OnDestroy {
  public subscription = new Subscription();
  // public skillsRowData$: Observable<SkillsRowDataUpdated>;
  public agentsRowData$: Observable<any>;
  public skillPanelToShow = null;
  public agentPanelToShow = null;
  constructor(private store: Store, public cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    // this.skillsRowData$ = this.store.select(getSkillsRowData);
    // this.agentsRowData$ = this.store.select(getAgentRowData);
    // this.subscribeToSkillsRowData();
    // this.subscribeToAgentrowData();
  }

  // public subscribeToSkillsRowData() {
  //   this.subscription.add(
  //     this.skillsRowData$.pipe(filter(rowData => rowData !== null)).subscribe((rowData: SkillsRowDataUpdated) => {
  //       this.skillPanelToShow = rowData?.showSkillsRowSidePanel ? 'skills' : null;
  //       this.cd.detectChanges();
  //     })
  //   );
  // }

  // public subscribeToAgentrowData() {
  //   this.subscription.add(
  //     this.agentsRowData$.pipe(filter(rowData => rowData !== null)).subscribe((rowData: AgentRowDataUpdated) => {
  //       this.agentPanelToShow = rowData?.showAgentsRowSidePanel ? 'agents' : null;
  //       this.cd.detectChanges();
  //     })
  //   );
  // }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
