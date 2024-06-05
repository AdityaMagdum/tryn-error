import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { TenantCrossDomainParamsService } from 'cxone-client-services-platform';
import { TranslationPipe } from 'cxone-components/translation';
// import { customSortState, timeComparator, textComparator } from 'src/app/featuresCXSUPv2/shared/libs/comparators';
import { AgentsAdminContextMenuComponent } from './cell-renderer-components/admin-context-menu/admin-context-menu.component';
import { AgentDurationComponent } from './renderers/agent-duration/agent-duration.component';
import { AgentStateIconComponent } from './renderers/agent-state-icon/agent-state-icon.component';
import { MediaTypeIconComponent } from './renderers/media-type-icon/media-type-icon.component';
// import { LiveMonitoringConstants } from 'src/app/featuresCXSUPv2/core-components/live-monitoring/shared/constants/live-monitoring.const';

@Injectable({
  providedIn: 'root'
})
export class AdminAgentsGridService {
  public customHeaders = new HttpHeaders({
    'X-Skip': 'true'
  });

  constructor(private translationPipe: TranslationPipe) {}

  public loadACDBaseURL() {
    return TenantCrossDomainParamsService.instance.getTenantBaseUrl().then(res => {
      return res.incontactApiBaseUrl;
    });
  }

  // eslint-disable-next-line max-lines-per-function
  public getColumnDefinitionsForAdminAgentsGridNgrx(): ColDef[] {
    return [
      {
        field: 'agentStateName',
        headerName: '',
        minWidth: 50,
        maxWidth: 50,
        cellRenderer: AgentStateIconComponent,
        sortable: false,
        getQuickFilterText: () => ''
      },
      {
        field: 'fullName',
        minWidth: 250,
        headerName: this.translationPipe.transform('supervisor.admin.gridColumnsHeaders.agent'),
        // comparator: (valueA, valueB) => textComparator(valueA, valueB),
        tooltipField: 'fullName',
        getQuickFilterText: params => params.value,
        cellClass: 'grid-cell-padding-left',
        headerClass: 'grid-cell-padding-left'
      },
      {
        field: 'userState',
        minWidth: 200,
        tooltipField: 'userState',
        headerName: this.translationPipe.transform('supervisor.admin.gridColumnsHeaders.state'),
        getQuickFilterText: params => params.value
        // comparator: (valueA, valueB) => customSortState(valueA, valueB),
        // valueFormatter: params => {
        //   return LiveMonitoringConstants.mainGridStateName[params.value]?.label
        //     ? this.translationPipe.transform(LiveMonitoringConstants.mainGridStateName[params.value].label)
        //     : params.value;
        // }
      },
      { field: 'translatedState', hide: true },
      {
        field: 'userStateEventTimestamp',
        minWidth: 120,
        headerName: this.translationPipe.transform('supervisor.admin.gridColumnsHeaders.duration'),
        cellRendererSelector: params => {
          if (params.value) {
            return {
              component: AgentDurationComponent
            };
          }
          return null;
        },
        // comparator: (valueA, valueB) => timeComparator(valueA, valueB),
        getQuickFilterText: () => ''
      },
      {
        field: 'mediaType',
        headerName: '',
        minWidth: 36,
        maxWidth: 36,
        valueGetter: params => {
          if (params.data.contactId) {
            return { originalChannelCode: params.data.originalChannelCode, directionId: params.data.contactDirectionId };
          }
          return '  ';
        },
        cellRendererSelector: params => {
          if (params.data.contactId) {
            return {
              component: MediaTypeIconComponent
            };
          }
          return null;
        },
        getQuickFilterText: () => '',
        cellClass: 'grid-cell-inline-padding'
      },
      {
        field: 'contactId',
        minWidth: 120,
        tooltipField: 'contactId',
        headerName: this.translationPipe.transform('supervisor.admin.gridColumnsHeaders.contactId'),
        getQuickFilterText: params => params.value,
        cellClass: 'grid-cell-padding-left',
        headerClass: 'grid-cell-padding-left'
      },
      {
        field: 'contactSkill',
        minWidth: 120,
        tooltipField: 'contactSkill',
        headerName: this.translationPipe.transform('supervisor.admin.gridColumnsHeaders.skill'),
        // comparator: (valueA, valueB) => textComparator(valueA, valueB),
        getQuickFilterText: params => params.value
      },
      {
        field: 'teamName',
        minWidth: 190,
        tooltipField: 'teamName',
        headerName: this.translationPipe.transform('supervisor.admin.gridColumnsHeaders.teamName'),
        // comparator: (valueA, valueB) => textComparator(valueA, valueB),
        getQuickFilterText: params => params.value
      },
      {
        field: 'actions',
        cellRendererSelector: params => {
          if (params.data?.agentStateName === 'LoggedOut') {
            return null;
          }
          return {
            component: AgentsAdminContextMenuComponent
          };
        },
        minWidth: 190,
        maxWidth: 190,
        sortable: false,
        pinned: 'right',
        valueGetter: params => {
          if (params.data.agentStateName !== 'LoggedOut') {
            return {
              isActions: true,
              params: params.data
            };
          }
          return '    ';
        },
        resizable: true,
        getQuickFilterText: () => ''
      }
    ];
  }
}
