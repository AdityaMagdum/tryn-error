import { GridOptions } from 'ag-grid-community';

class CustomStatsToolPanel {
  eGui;
  init = (params)=> {
    this.eGui = document.createElement('div');
    this.eGui.style.textAlign = 'center';

    // calculate stats when new rows loaded, i.e. onModelUpdated
    const renderStats = () => {
      this.eGui.innerHTML = this.calculateStats(params);
    };
    params.api.addEventListener('modelUpdated', renderStats);
  };

  getGui() {
    return this.eGui;
  }

  calculateStats(params) {
    let numGold = 0,
      numSilver = 0,
      numBronze = 0;
    params.api.forEachNode( (rowNode) => {
      const data = rowNode.data;
      if (data.gold) numGold += data.gold;
      if (data.silver) numSilver += data.silver;
      if (data.bronze) numBronze += data.bronze;
    });

    return `
        <span>
            <h2><i class="fa fa-calculator"></i> Custom Stats</h2>
            <dl style="font-size: large; padding: 30px 40px 10px 30px">
                <dt style="padding-bottom: 15px">Total Medals: <b>${
                  numGold + numSilver + numBronze
                }</b></dt>
                <dt style="padding-bottom: 15px">Total Gold: <b>${numGold}</b></dt><dt style="padding-bottom: 15px">Total Silver: <b>${numSilver}</b></dt>
                <dt style="padding-bottom: 15px">Total Bronze: <b>${numBronze}</b></dt>
            </dl>
        </span>`;
  }
}

const columnDefs = [
  { field: 'athlete', width: 150, filter: 'agTextColumnFilter' },
  { field: 'age', width: 90 },
  { field: 'country', width: 120 },
  { field: 'year', width: 90 },
  { field: 'date', width: 110 },
  { field: 'gold', width: 100, filter: false },
  { field: 'silver', width: 100, filter: false },
  { field: 'bronze', width: 100, filter: false },
  { field: 'total', width: 100, filter: false }
];

const gridOptions:GridOptions = {
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true
  },
  icons: {
    'custom-stats': '<span class="ag-icon ag-icon-custom-stats"></span>'
  },
  columnDefs: columnDefs,
  sideBar: {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel'
      },
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel'
      },
      {
        id: 'customStats',
        labelDefault: 'Custom Stats',
        labelKey: 'customStats',
        iconKey: 'custom-stats',
        toolPanel: 'customStatsToolPanel'
      }
    ],
    defaultToolPanel: 'customStats'
  },
  components: {
    customStatsToolPanel: CustomStatsToolPanel
  }
};

export {gridOptions};