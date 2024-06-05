import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import moment from 'moment';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'cxsup-admin-agent-duration',
  templateUrl: './wait-time.component.html',
  styleUrls: ['./wait-time.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaitTimeComponent implements ICellRendererAngularComp, OnDestroy {
  public timeDifference;
  public state;
  public subscription = new Subscription();
  public updateDurationTimer$;

  constructor(private cdr: ChangeDetectorRef) {}

  agInit(params: ICellRendererParams): void {
    if (this.updateDurationTimer$) {
      this.updateDurationTimer$.unsubscribe();
    }
    if (params.value) {
      this.subscription.add(
        (this.updateDurationTimer$ = timer(0, 5000).subscribe(() => {
          this.timeDifference = this.getTimeDifference(params.value);
          this.cdr.detectChanges();
        }))
      );
    }
  }

  getTimeDifference = time => moment().diff(moment(time).valueOf());

  refresh(): boolean {
    return false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
