import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'cxsupv2-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  isCollapsed = false;
  constructor() {}

  toggleSidebarCollapse() {
    if (!this.isCollapsed)
    {
      const box=document.getElementById('sidebar');
      if (box!=null) {
        box.style.width ='60px';
        box.style.transition='0.3s';
      }
      this.isCollapsed=!this.isCollapsed;
    }
    else {
      const box=document.getElementById('sidebar');
      if (box!=null) {
        box.style.width ='256px';
        box.style.transition='0.3s';
      }
      this.isCollapsed=!this.isCollapsed;
    }
  }
}
