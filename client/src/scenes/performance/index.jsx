import React from "react";
import { useSelector } from "react-redux";
import Header from "components/Header";
import { Box, useTheme } from "@mui/material";
import { useGetUserPerformanceQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";

const Performance = () => {
  const theme = useTheme();

  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetUserPerformanceQuery(userId);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
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
      <Header
        title="PERFORMANCE"
        subtitle="Track your Affiliate Sales Performance Here"
      />

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
          mt: "1.5rem",
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          autoHeight
          rows={data?.salesTransactions || []}
          columns={columns}
          getRowId={(row) => row._id}
          // *For pagination
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 20, 30]}
        />
      </Box>
    </Box>
  );
};

export default Performance;
