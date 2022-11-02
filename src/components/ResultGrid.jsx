import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "@ag-grid-community/react";
// import { ColDef, SideBarDef } from '@ag-grid-community/core';
import { AllCommunityModules } from "@ag-grid-community/all-modules";

const defaultColDef = {
  sortable: false,
};

const statusBar = {
  statusPanels: [
    {
      statusPanel: "agTotalRowCountComponent",
      align: "left",
    },
    { statusPanel: "agAggregationComponent", align: "center" },
    { statusPanel: "agFilteredRowCountComponent" },
    { statusPanel: "agSelectedRowCountComponent" },
  ],
};

export const ResultGrid = (props) => {
  const { output, type, gridRef } = props;
  const [gridApi, setgridApi] = useState(null);
  const [colApi, setcolApi] = useState(null);
  const [outArray, setoutArray] = useState([]);
  const [columnDefs, setcolumnDefs] = useState([]);

  useEffect(() => {
    if (type === "single") {
      setoutArray([output]);
    } else if (type == "collection") {
      setoutArray(output);
    }
    return () => {};
  }, [output]);

  useEffect(() => {
    if (outArray.length > 0) {
      console.log({ outArray });
      const colDef = [
        ...Object.keys(outArray[0]).map((key) => {
          return {
            headerName: key,
            field: key,
            // cellRendererFramework: (params) => <span>{params.data[key]}</span>,
          };
        }),
      ];

      setcolumnDefs(colDef || []);
    }

    return () => {};
  }, [outArray]);

  useEffect(() => {
    window["grid"] = gridApi;
    if (gridApi) {
      outArray.length > 0 && gridApi.setRowData(outArray);
    }
    return () => {};
  }, [gridApi, outArray, colApi]);

  const onGridReady = (params) => {
    setgridApi(params.api);
    setcolApi(params.columnApi);
  };

  const onCellValueChanged = (param) => {
    console.log(param);
  };
  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: "30vh" }}>
      <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        suppressMenuHide={true}
        ref={gridRef}
        // immutableData={true}
        getRowNodeId={(data) => data.id}
        modules={AllCommunityModules}
        pagination={type == "collection" ? true : false}
        paginationPageSize={20}
        onCellValueChanged={onCellValueChanged}
        // paginationNumberFormatter={function (params) {
        //   return '[' + params.value.toLocaleString() + ']';
        // }}
      ></AgGridReact>
    </div>
  );
};

export default ResultGrid;
