import React, { useState, useEffect } from "react";

import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { useGetTransactionsQuery } from "state/api";

import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import CustomNoRowsOverlay from "components/NoRowsOverlay";

const Transactions = () => {
  const theme = useTheme();

  // For sorting
  const [sort, setSort] = useState({});

  // For Search Query
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // For Pagination
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { currentData, isLoading } = useGetTransactionsQuery({
    ...paginationModel,
    sort: JSON.stringify(sort),
    search,
  });

  const [rowCountState, setRowCountState] = useState(
    currentData?.meta.totalItems || 0
  );

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      currentData?.meta.totalItems !== undefined
        ? currentData?.meta.totalItems
        : prevRowCountState
    );
  }, [currentData?.meta.totalItems, setRowCountState]);

  const columns = [
    {
      field: "_id",
      headerName: "Transaction ID",
      sortable: false,
      flex: 1,
    },
    {
      field: "userId",
      headerName: "Name",
      renderCell: (params) => params.value.name,
      flex: 1,
      sortable: false,
    },
    {
      field: "createdAt",
      headerName: "Date Created",
      flex: 0.5,
      renderCell: (params) => {
        return new Date(params.value).toLocaleString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        });
      },
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      renderCell: (params) => params.value.length,
      sortable: false,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 0.5,
      renderCell: (params) => `$${params.value}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTION" subtitle="List of all transaction" />

      <Box
        // height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: `none !important`,
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontSize: "0.875rem",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-cellContent": {
            fontSize: "0.875rem",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer, .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
          "& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
            {
              fontSize: "0.875rem",
            },
        }}
      >
        <DataGrid
          autoHeight
          rows={currentData?.result || []}
          getRowId={(row) => row._id}
          rowCount={rowCountState}
          columns={columns}
          loading={isLoading || !currentData}
          // *For pagination
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 20, 30]}
          // *For Sorting
          sortingMode="server"
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          // *For Search Query
          slots={{
            toolbar: DataGridCustomToolbar,
            noResultsOverlay: CustomNoRowsOverlay,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          slotProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
          sx={{ "--DataGrid-overlayHeight": "300px" }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
