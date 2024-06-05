import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { TenantCrossDomainParamsService } from 'cxone-client-services-platform';
import { TranslationPipe } from 'cxone-components/translation';
// import { slaComparator, textComparator, timeComparator } from 'src/app/featuresCXSUPv2/shared/libs/comparators';
import { SkillsActivityComponent } from './renderers/skills/skills.component';
import { WaitTimeComponent } from './renderers/wait-time/wait-time.component';

@Injectable({
  providedIn: 'root'
})
export class AdminSkillsGridService {
  public customHeaders = new HttpHeaders({
    'X-Skip': 'true'
  });

  constructor(private translationPipe: TranslationPipe) {}

  public loadACDBaseURL() {
    return TenantCrossDomainParamsService.instance.getTenantBaseUrl().then(res => {
      return res.incontactApiBaseUrl;
    });
  }
  public getColumnDefinitionsForSkillsGridNgrx(): ColDef[] {
    return [
      {
        field: 'mediaTypeId',
        headerName: '',
        minWidth: 50,
        maxWidth: 50,
        cellRenderer: SkillsActivityComponent,
        sortable: false,
        getQuickFilterText: () => ''
      },
      {
        field: 'skillName',
        minWidth: 250,
        headerName: this.translationPipe.transform('supervisor.insights.constants.skill'),
        tooltipField: 'skillName',
        // comparator: (valueA, valueB) => textComparator(valueA, valueB),
        getQuickFilterText: params => params.value,
        cellClass: 'grid-cell-padding-left',
        headerClass: 'grid-cell-padding-left'
      },
      {
        field: 'earliestQueueTime',
        minWidth: 280,
        maxWidth: 280,
        headerName: this.translationPipe.transform('supervisor.insights.constants.waitTime'),
        cellRendererSelector: params => {
          if (params.value) {
            return {
              component: WaitTimeComponent
            };
          }
          return null;
        },
        // comparator: (valueA, valueB) => timeComparator(valueA, valueB),
        getQuickFilterText: () => ''
      },
      {
        field: 'serviceLevel',
        headerName: this.translationPipe.transform('supervisor.insights.constants.sla'),
        filter: 'agSetColumnFilter',
        minWidth: 160,
        filterParams: { readOnly: true, values: ['In', 'Out'] },
        maxWidth: 160,
        filterValueGetter: params => {
          return params.data.outSLA > 0 && params.data.serviceLevelGoal > 0 ? 'Out' : 'In';
        },
        valueGetter: params => {
          return {
            outSLA: params.data.outSLA,
            serviceLevel: params.data.serviceLevel,
            serviceLevelGoal: params.data.serviceLevelGoal
          };
        },
        valueFormatter: params => {
          return params.value.serviceLevel + '%';
        },
        headerComponentParams: {
          fieldsForSorting: ['serviceLevel']
        },
        // comparator: (valueA, valueB) => slaComparator(valueA, valueB),
        cellClassRules: {
          'admin-skills-grid-column-service-level-red': params => params.data.outSLA > 0 && params.data.serviceLevelGoal > 0,
          'admin-skills-grid-column-service-level-green': params => !(params.data.outSLA > 0 && params.data.serviceLevelGoal > 0)
        },
        getQuickFilterText: () => ''
      },
      {
        field: 'queueCount',
        minWidth: 230,
        maxWidth: 230,
        headerName: this.translationPipe.transform('supervisor.insights.widgetTitle.contactsInQueue'),
        getQuickFilterText: params => params.value,
        type: 'rightAligned',
        headerClass: 'grid-right-aligned-header'
      },
      {
        field: 'campaignName',
        minWidth: 220,
        headerName: this.translationPipe.transform('supervisor.liveMonitoring.gridColumnsHeaders.campaign'),
        // comparator: (valueA, valueB) => textComparator(valueA, valueB),
        getQuickFilterText: params => params.value
      }
    ];
  }
}
