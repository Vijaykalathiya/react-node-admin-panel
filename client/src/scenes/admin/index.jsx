import { Box, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import CustomColumnMenu from 'components/DataGridCustomColumnMenu';
import Header from 'components/Header'
import React from 'react'
import { useGetAdminQuery } from 'state/api';

const Admin = () => {
    const { data, isLoading } = useGetAdminQuery();
    const theme = useTheme();

    const columns = [
        {
            field: "name",
            headerName: "Name",
            flex: 0.5
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            flex: 0.5,
            renderCell: (params) => {
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1-$2-$3");
            }
        },
        {
            field: "occupation",
            headerName: "Occupation",
            flex: 1
        },
        {
            field: "city",
            headerName: "City",
            flex: 1
        },
        {
            field: "country",
            headerName: "Country",
            flex: 1
        }
    ]

    return <Box m="1.5rem 2.5rem">
        <Header title="Admin" subTitle="Admin users details" />
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
                rows={data || []}
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

export default Admin