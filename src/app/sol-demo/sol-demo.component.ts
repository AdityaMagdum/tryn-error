import { Component, ViewEncapsulation } from '@angular/core';
import { RangeSliderModule } from '@niceltd/sol/range-slider';
import { RangeSliderModule as CXoneRangeSliderModule} from '@niceltd/cxone-components/range-slider';
import { TooltipModule } from '@niceltd/sol/tooltip';
import { ButtonModule } from '@niceltd/sol/button';
import { HierarchyModalDemoComponent } from './hierarchy-modal/hierarchy-modal.component';
import { HierarchyModalModule } from '@niceltd/cxone-domain-components/hierarchy';
import { RouterLink } from '@angular/router';
import { BaseSelectionModalModule } from '@niceltd/sol/base-selection-modal';
import { SharedModule } from '../shared/shared.module';

@Component({
    selector: 'app-sol',
    templateUrl: './sol-demo.component.html',
    styleUrls: ['./sol-demo.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [RouterLink, HierarchyModalDemoComponent, ButtonModule, TooltipModule, RangeSliderModule, CXoneRangeSliderModule, HierarchyModalModule, BaseSelectionModalModule, SharedModule]
})
export class SolDemoComponent {
}
