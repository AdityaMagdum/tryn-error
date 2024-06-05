import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
// import { IconSvgService } from 'cxone-client-services-platform';
// import { SharedConstants } from 'src/app/featuresCXSUPv2/shared/constants/shared.constant';
import acdChannels from '../../../../../../acd_channels_configuration.json';

@Component({
  selector: 'cxsup-admin-media-type-icon',
  templateUrl: './media-type-icon.component.html',
  styleUrls: ['./media-type-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MediaTypeIconComponent implements ICellRendererAngularComp {
  public channelIcon = '';
  // public supervisorApplicationIconsPath = SharedConstants.supervisorApplicationIconsPath;
  agInit(params: ICellRendererParams): void {
    // this.supervisorApplicationIconsPath = IconSvgService.instance.getIconsSpriteDataUrl('channels');

    if (params.value.originalChannelCode && params.value.originalChannelCode !== '') {
      this.channelIcon = acdChannels.acdChannels.find(acdChannel => {
        return acdChannel.contactChannelCode === params.value.originalChannelCode && +acdChannel.directionId === +params.value.directionId;
      })?.iconId;
    }
  }

  refresh(): boolean {
    return false;
  }
}
