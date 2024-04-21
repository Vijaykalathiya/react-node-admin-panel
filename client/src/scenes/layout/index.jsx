import React, { useState } from 'react'
import {Box, useMediaQuery} from "@mui/material";
import Navbar from 'components/Navbar';
import Outlet from 'components/Outlet';
import Sidebar from 'components/Sidebar';
import { useGetUserQuery } from 'state/api';
import { useSelector } from 'react-redux';

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId);
  const {data, error} = useGetUserQuery(userId);

  return <Box display={isNonMobile ? 'flex' : "block"} width="100%" height="100%">
    <Sidebar
      isNonMobile={isNonMobile}
      drawerWidth="250px"
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      user={data || {}}
    />
    <Box flexGrow={1}>
      <Navbar 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        user={data || {}}
      />
      <Outlet />
    </Box>
  </Box>
}

export default Layout