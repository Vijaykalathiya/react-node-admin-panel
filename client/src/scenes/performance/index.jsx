import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CustomColumnMenu from 'components/DataGridCustomColumnMenu';
import Header from 'components/Header';
import React from 'react'
import { useSelector } from 'react-redux';
import state from 'state';
import { useGetUserPerformanceQuery } from 'state/api';

const Performance = () => {
    const userId = useSelector((state) => state.global.userId);
    const { data, isLoading } = useGetUserPerformanceQuery(userId);
    const theme = useTheme();

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1
        },
        {
            field: "userId",
            headerName: "User ID",
            flex: 1
        },
        {
            field: "createdAt",
            headerName: "CreatedAt",
            flex: 1
        },
        {
            field: "products",
            headerName: "# of Products",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => params.value.length
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`
        },
    ]

    return <Box m="1.5rem 2.5rem">
        <Header title="Performace" subTitle="User details with stats" />
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
                }
            }}
        >
            <DataGrid
                loading={isLoading || !data}
                getRowId={(row) => row._id}
                rows={(data && data.sales) || []}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 25, page: 0 },
                    },
                }}
                components={{ columnMenu: CustomColumnMenu }}
            />
        </Box>
    </Box>
}

export default Performance;