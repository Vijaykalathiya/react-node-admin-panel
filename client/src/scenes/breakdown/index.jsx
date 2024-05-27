import { Box } from '@mui/material';
import Header from 'components/Header';
import BreakDownChart from 'components/breakdownChart';
import React from 'react';


const Breakdown = () => {
  return (
  <Box m="1.5rem 2.5rem">
    <Header title="Breakdown" subTitle="Breakdown of sale by category" />
    <Box mt="40px" height="75vh">
        <BreakDownChart />
    </Box>
  </Box>
  )
}

export default Breakdown