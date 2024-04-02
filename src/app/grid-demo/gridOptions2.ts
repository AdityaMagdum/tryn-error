import { GridOptions } from 'ag-grid-community';

const currencyFormatter = (params) => {
    console.log(params);
    return '$' + formatNumber(params.value);
  };

  const formatNumber = (number) => {
    // this puts commas into the number eg 1000 goes to 1,000,
    // i pulled this from stack overflow, i have no idea how it works
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

const gridOptions2:GridOptions = {
    defaultColDef: {
      flex: 1,
      minWidth: 150,
      filter: true,
      sortable: true,
      resizable: true
    },
    rowHeight: 36,
    rowSelection: 'multiple',
    debug: true,
    treeData:true,
    columnDefs: [
      // we're using the auto group column by default!
      { field: 'jobTitle' ,
        filter:true,
        chartDataType: 'category'
      },
      { field: 'employmentType' ,
        filter:true,
        chartDataType: 'category'
      },
      {
        field: 'dateOfJoining' ,
        filter:'date',
        chartDataType: 'time'
      },
      { field: 'dateOfBirth' ,
       filter:'date',
       chartDataType: 'time'
      },
      { field: 'salary' ,
        filter:'number',
        chartDataType: 'series',
        valueFormatter:currencyFormatter
      }
    ],
    autoGroupColumnDef: {
      headerName: 'Organisation Hierarchy',
      minWidth: 300,
      filter:'agMultiColumnFilter',
      cellRendererParams: {
        suppressCount: true
      }
    },
    animateRows: true,
      enableRangeSelection: true,
      enableRangeHandle: true,
      groupDefaultExpanded: -1, // expand all groups by default
      getDataPath: (data) => {
        return data.orgHierarchy;
      }
};

export {gridOptions2};

