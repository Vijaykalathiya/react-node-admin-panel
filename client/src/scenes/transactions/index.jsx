import React, { useState } from 'react'
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import { useGetTransactionsQuery } from 'state/api';
import { Box, useTheme } from '@mui/material';
import Header from 'components/Header';

const Transactions = () => {

  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setpageSize] = useState(25);
  const [sort, setSort] = useState(null);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetTransactionsQuery({
    page, pageSize, sort: JSON.stringify(sort), search
  });

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.5
    },
    {
      field: "userId",
      headerName: "USER ID",
      flex: 1
    },
    {
      field: "createdAt",
      headerName: "CREATED AT",
      flex: 0.5
    },
    {
      field: "products",
      headerName: "# OF PRODUCTS",
      flex: 1,
      sortable: false,
      rencerCell: (params) => params.value.length
    },
    {
      field: "cost",
      headerName: "COST",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`
    }
  ]

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Transactions" subTitle="Complete list of transactions" />
      <Box
        mt="40px" height="75vh"
        sx={{
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none"
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none"
          },
          "& .MuiDataGrid-root": {
            border: "none"
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.primary.alt,
            color: theme.palette.secondary[100],
            borderTop: "none"
          },
          "& .MuiDataGrid-toolbarContainer .MuiDataGrid-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
          "& .MuiLinearProgress-colorPrimary": {
            backgroundColor: theme.palette.primary[500],
          }
        }}
      >
        <DataGrid
          slots={{
            loadingOverlay: LinearProgress,
            toolbar: GridToolbar,
          }}
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25, page: 0 },
            },
          }}
          rowCount={(data && data.total) || 0}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newpageSize) => setpageSize(newpageSize)}
          onSortModelChange={(sortField) => setSort(sortField)}
        />
      </Box>
    </Box>
  )
}

export default Transactions;