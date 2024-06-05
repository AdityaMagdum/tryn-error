import { ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
// import { SharedConstants } from 'src/app/featuresCXSUPv2/shared/constants/shared.constant';
import acdChannels from '../../../../../../acd_channels_configuration.json';

@Component({
  selector: 'cxsupv2-skills-activity',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsActivityComponent implements ICellRendererAngularComp {
  public adminSkillsGridSkillData: any;
  public adminSkillsGridContainerClass;
  // public adminSkillsGridSupervisorApplicationIconsPath = SharedConstants.supervisorApplicationIconsPath;
  // public adminSkillsGridSkillChannelIcon = SharedConstants.iconStyle.skillChannelIcon;
  agInit(params: ICellRendererParams): void {
    this.adminSkillsGridContainerClass = 'cxone-tooltip-container all-row';
    this.adminSkillsGridSkillData = params.data;
    if (params.data.mediaTypeId) {
      this.adminSkillsGridSkillData.channelIcon = acdChannels.acdChannels.find(acdChannel => {
        if (this.adminSkillsGridSkillData.isOutbound) {
          return +acdChannel.directionId === 2 && acdChannel.channelNo === this.adminSkillsGridSkillData.mediaTypeId;
        } else {
          return +acdChannel.directionId === 1 && acdChannel.channelNo === this.adminSkillsGridSkillData.mediaTypeId;
        }
      })?.iconId;
    }
  }

  refresh(): boolean {
    return false;
  }
}
