import { DownloadOutlined, Email, PointOfSale, PersonAdd, Traffic } from '@mui/icons-material';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import FlexBetween from 'components/FlexBetween';
import Header from 'components/Header';
import OverviewChart from 'components/OverviewChart';
import Statbox from 'components/Statbox';
import BreakDownChart from 'components/breakdownChart';
import React from 'react'
import { useGetDashboardQuery } from 'state/api';

const Dashboard = (props) => {
  const { data, isLoading } = useGetDashboardQuery();
  const theme = useTheme();
  const isNonMediumScreen = useMediaQuery("(min-width: 1200px)");
  console.log(data)
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
  ];

  return (data &&
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Dashboard" subTitle="Overview" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: "bold"
            }}>
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": {
            gridColumn: isNonMediumScreen ? undefined : "span 12"
          }
        }}
      >
        {/* Row 1 */}
        {/* box 1 */}
        <Statbox
          title="Total Customer"
          value={data && data.totalCustomers}
          increase="+28%"
          description="Since last month"
          icon={
            <Email sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
          }
        />

        {/* box 2 */}
        <Statbox
          title="Sales Today"
          value={data && data.todayStats.totalSales}
          increase="+48%"
          description="Since last month"
          icon={
            <PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
          }
        />

        {/* line chart */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart isDashboard={true} view="Sales" data={[data]} />
        </Box>

        {/* box 3 */}
        <Statbox
          title="Monthly Sales"
          value={data && data.thisMonthStats.totalSales}
          increase="+18%"
          description="Since last month"
          icon={
            <PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
          }
        />

        {/* box 4 */}
        <Statbox
          title="Yearly Sales"
          value={data && data.yearlySalesTotal}
          increase="+10%"
          description="Since last month"
          icon={
            <Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
          }
        />

        {/* row 1 end */}

        {/* row 2 */}
        {/* line chart */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
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
              border: "none",
              borderRadius: "5rem"
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt
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
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
          />
        </Box>
        {/* pie chart */}
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant='h6' sx={{color: theme.palette.secondary[100]}}>
            Sales by category
          </Typography>
          <BreakDownChart isDashboard={true} />
          <Typography p="0 0.6rem" fontSize="0.8rem" sx={{color: theme.palette.secondary[200]}}>
            Breakdown of real states and information of current year
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard