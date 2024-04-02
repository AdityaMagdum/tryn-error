import { GridOptions } from 'ag-grid-community';

const columnDefs = [
  { field: 'country', width: 150, chartDataType: 'category' },
  { field: 'gold', chartDataType: 'series' },
  { field: 'silver', chartDataType: 'series' },
  { field: 'bronze', chartDataType: 'series' },
  {
    headerName: 'A',
    valueGetter: 'Math.floor(Math.random()*1000)',
    chartDataType: 'series'
  },
  {
    headerName: 'B',
    valueGetter: 'Math.floor(Math.random()*1000)',
    chartDataType: 'series'
  },
  {
    headerName: 'C',
    valueGetter: 'Math.floor(Math.random()*1000)',
    chartDataType: 'series'
  },
  {
    headerName: 'D',
    valueGetter: 'Math.floor(Math.random()*1000)',
    chartDataType: 'series'
  }
];

const getChartToolbarItems = () => {
  return ['chartDownload', 'chartData', 'chartSettings'];
};

const createRowData =()=> {
  const countries = [
    'Ireland',
    'Spain',
    'United Kingdom',
    'France',
    'Germany',
    'Luxembourg',
    'Sweden',
    'Norway',
    'Italy',
    'Greece',
    'Iceland',
    'Portugal',
    'Malta',
    'Brazil',
    'Argentina',
    'Colombia',
    'Peru',
    'Venezuela',
    'Uruguay',
    'Belgium'
  ];

  return countries.map( (country, index) => {
    return {
      country: country,
      gold: Math.floor(((index + 1 / 7) * 333) % 100),
      silver: Math.floor(((index + 1 / 3) * 555) % 100),
      bronze: Math.floor(((index + 1 / 7.3) * 777) % 100)
    };
  });
};

const gridOptions1:GridOptions = {
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true
  },
  columnDefs: columnDefs as any,
  rowData: createRowData(),
  popupParent: document.body,
  enableRangeSelection: true,
  enableCharts: true,
  getChartToolbarItems: getChartToolbarItems as any,
  chartThemeOverrides: {
    pie: {
      title: {
        enabled: true,
        text: 'Precious Metals Production',
        fontWeight: 'bold',
        fontSize: 20,
        color: 'rgb(100, 100, 100)'
      },
      subtitle: {
        enabled: true,
        text: 'by country',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'rgb(100, 100, 100)'
      },
      padding: {
        top: 25,
        right: 20,
        bottom: 55,
        left: 20
      },
      legend: {
        enabled: false
      },
      series: {
        calloutLabel: {
          enabled: true
        },
        calloutLine: {
          length: 20
        }
      }
    }
  }
};

export {gridOptions1};
