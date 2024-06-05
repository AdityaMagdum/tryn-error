import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import moment from 'moment';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'cxsup-admin-agent-duration',
  templateUrl: './agent-duration.component.html',
  styleUrls: ['./agent-duration.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgentDurationComponent implements ICellRendererAngularComp, OnDestroy {
  public agentDurationComponentTimeDifference;
  public state;
  public agentDurationComponentSubscription = new Subscription();
  public agentDurationComponentUpdateDurationTimer$;

  constructor(private cdr: ChangeDetectorRef) {}

  agInit(params: ICellRendererParams): void {
    if (this.agentDurationComponentUpdateDurationTimer$) {
      this.agentDurationComponentUpdateDurationTimer$.unsubscribe();
    }
    if (params.value) {
      this.agentDurationComponentSubscription.add(
        (this.agentDurationComponentUpdateDurationTimer$ = timer(0, 5000).subscribe(() => {
          this.agentDurationComponentTimeDifference = this.getAgentDurationComponentTimeDifference(params.value);
          this.cdr.detectChanges();
        }))
      );
    }
  }

  getAgentDurationComponentTimeDifference = time => moment().diff(moment(time).valueOf());

  refresh(): boolean {
    return false;
  }

  ngOnDestroy(): void {
    this.agentDurationComponentSubscription.unsubscribe();
  }
}
