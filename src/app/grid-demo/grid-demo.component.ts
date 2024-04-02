import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ColumnApi, GridApi, GridOptions,CreateRangeChartParams} from 'ag-grid-community';
import { gridOptions } from './gridOptions';
import { gridOptions2 } from './gridOptions2';
import gridData from '../../assets/conf/grid-data.json';
import { gridOptions1 } from './gridOptions1';
import { GridModule } from '@niceltd/cxone-components/grid';
import { TabsModule } from '@niceltd/cxone-components/tabs';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

const GRIDS_NAMES = {
  0:'SIDEBAR_AND_STATS',
  1:'CHART_STATUS_BAR',
  2:'TREE_HIREARCHY'
};
interface Grid {
  name:string,
  options:GridOptions,
  api?:GridApi,
  columnApi?:ColumnApi,
  fetchData?:boolean
}

@Component({
    selector: 'app-grid-demo',
    templateUrl: './grid-demo.component.html',
    styleUrls: ['./grid-demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterLink, TabsModule, GridModule, SharedModule, FormsModule]
})
export class GridDemoComponent {
  public grids:Grid[] = [];
  onGridReadyCallbacks = [0,1,2].map(gridIndex => {
    return (params)=> {
      this.grids[gridIndex].api = params.api;
      this.grids[gridIndex].columnApi = params.columnApi;
      if (this.grids[gridIndex].fetchData) {
        this.fetchData(this.grids[gridIndex],data => params.api.setRowData(data));
      }
    };
  });
 createRangeChartParams:CreateRangeChartParams = {
    cellRange: {
      rowStartIndex: 0,
      rowEndIndex: 4,
      columns: ['country', 'gold']
    },
    chartType: 'pie' as any
  };

  constructor() {
    this.grids[0] = {
      name:GRIDS_NAMES[0],
      options:gridOptions,
      fetchData:true
    };
    this.grids[1] = {
      name:GRIDS_NAMES[1],
      options:gridOptions1,
      fetchData:false
    };
    this.grids[2] = {
      name:GRIDS_NAMES[2],
      options:gridOptions2,
      fetchData:true
    };
    this.grids[0].options.onGridReady = this.onGridReadyCallbacks[0];
    this.grids[1].options.onGridReady = this.onGridReadyCallbacks[1];
    this.grids[2].options.onGridReady = this.onGridReadyCallbacks[2];
  }
   fetchData = (grid,fn) => {
    const dataSetName = `${grid.name}_DATASET`;
    fn(gridData[dataSetName]);
  };
  openCharts = () => {
    this.grids[1].api.createRangeChart(this.createRangeChartParams);
  };
}
