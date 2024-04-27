import { Box, FormControl, InputLabel, MenuItem, Select, useTheme } from '@mui/material';
import Header from 'components/Header';
import OverviewChart from 'components/OverviewChart';
import React, { useState } from 'react'
import { useGetOverallStatQuery } from 'state/api'

const Overview = () => {
  const { data, isLoading } = useGetOverallStatQuery();
  const [view, setView] = useState("units")
  const theme = useTheme;
  console.log(data);
  return <Box m="1.5rem 2.5rem">
    <Header title="Overview" subTitle="Overview stat of the business in terms of revenue and profit." />
    <Box
      height="75vh"
    >
      <FormControl sx={{ mt: "1rem" }}>
        <InputLabel>View</InputLabel>
        <Select
          value={view}
          label="View"
          onChange={(e) =>  {console.log(e);setView(e.target.value)}}
        >
          <MenuItem value="sales" >Sales</MenuItem>
          <MenuItem value="units" >Units</MenuItem>
        </Select>
      </FormControl>

      {data && (<OverviewChart view={view} data={data} />)}
    </Box>
  </Box>
}

export default Overview