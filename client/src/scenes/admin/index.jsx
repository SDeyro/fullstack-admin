import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAdminQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import CustomNoRowsOverlay from "components/NoRowsOverlay";

const Admin = () => {
  const theme = useTheme();
  const searchBarLabel = "Search by name, email or country";

  // For sorting
  const [sort, setSort] = useState({});
  console.log("🚀 ~ file: index.jsx:15 ~ Admin ~ sort:", sort);

  // For Search Query
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // For Pagination
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { currentData, isLoading } = useGetAdminQuery({
    ...paginationModel,
    sort: JSON.stringify(sort),
    search,
  });

  console.log(
    useGetAdminQuery({
      ...paginationModel,
      sort: JSON.stringify(sort),
      search,
    })
  );

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
      headerName: "ID",
      flex: 0.8,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMIN" subtitle="List of Admin" />
      <Box
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
          loading={isLoading || !currentData}
          getRowId={(row) => row._id}
          rowCount={rowCountState}
          columns={columns}
          // *For pagination
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 20, 30]}
          // *For Sorting
          sortingMode="server"
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          slots={{
            toolbar: DataGridCustomToolbar,
            noResultsOverlay: CustomNoRowsOverlay,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          slotProps={{
            toolbar: { searchInput, setSearchInput, setSearch, searchBarLabel },
          }}
          sx={{ "--DataGrid-overlayHeight": "300px" }}
        />
      </Box>
    </Box>
  );
};

export default Admin;
