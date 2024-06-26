import React, { useEffect, useState } from 'react'
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from '@mui/material';
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
    Public
} from '@mui/icons-material';
import profileImage from '../assests/profile.jpg'
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';

const navList = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />
    },
    {
        text: "Client Facing",
        icon: null
    },
    {
        text: "Products",
        icon: <ShoppingCartOutlined />
    },
    {
        text: "Customers",
        icon: <Groups2Outlined />
    },
    {
        text: "Transactions",
        icon: <ReceiptLongOutlined />
    },
    {
        text: "Geography",
        icon: <PublicOutlined />
    },
    {
        text: "Sales",
        icon: null
    },
    {
        text: "Overview",
        icon: <PointOfSaleOutlined />
    },
    {
        text: "Daily",
        icon: <TodayOutlined />
    },
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined />
    },
    {
        text: "Breakdown",
        icon: <PieChartOutlined />
    },
    {
        text: "Management",
        icon: null
    },
    {
        text: "Admin",
        icon: <AdminPanelSettingsOutlined />
    },
    {
        text: "Performance",
        icon: <TrendingUpOutlined />
    }
];

const Sidebar = ({ drawerWidth, isNonMobile, isSidebarOpen, setIsSidebarOpen, user }) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return <Box component="nav">
        {
            isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant='persistent'
                    anchor='left'
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSizing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth
                        }
                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <Typography variant="h4" fontWeight="bold">
                                        ECOMVISION
                                    </Typography>
                                </Box>
                                {
                                    !isNonMobile && (
                                        <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                            <ChevronLeft />
                                        </IconButton>
                                    )
                                }
                            </FlexBetween>
                        </Box>
                        <List>
                            {
                                navList.map(({ text, icon }) => {
                                    if (!icon) {
                                        return (
                                            <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                                                {text}
                                            </Typography>
                                        );
                                    }
                                    const textInLowerCase = text.toLowerCase();
                                    return (
                                        <ListItem key={text} disablePadding>
                                            <ListItemButton
                                                onClick={() => {
                                                    navigate(`/${textInLowerCase}`);
                                                    setActive(textInLowerCase);
                                                }}
                                                sx={{
                                                    backgroundColor: active === textInLowerCase ? theme.palette.secondary[300] : "transparent",
                                                    color: active === textInLowerCase ? theme.palette.primary[600] : theme.palette.secondary[100]
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        ml: "2rem",
                                                        color: active === textInLowerCase ?
                                                            theme.palette.primary[600] :
                                                            theme.palette.secondary[200]
                                                    }}>
                                                    {icon}
                                                </ListItemIcon>
                                                <ListItemText primary={text} />
                                                {active === textInLowerCase && (
                                                    <ChevronRightOutlined sx={{ ml: "auto" }} />
                                                )}
                                            </ListItemButton>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </Box>

                    <Box position="absolute" bottom="2rem">
                        <Divider />
                        <FlexBetween
                            textTransform="none"
                            gap="1rem"
                            m="1.5rem 2rem 0 3rem"
                        >
                            <Box
                                component="img"
                                alt="profile"
                                src={profileImage}
                                height="40px"
                                width="40px"
                                borderRadius="50%"
                                sx={{ objectFit: "cover" }}
                            />
                            <Box textAlign="left">
                                <Typography fontWeight="bold" fontSize="0.9rem" sx={{ color: theme.palette.secondary[100] }} >
                                    {user.name}
                                </Typography>
                                <Typography fontWeight="0.8rem" fontSize="0.9rem" sx={{ color: theme.palette.secondary[200] }} >
                                    {user.occupation}
                                </Typography>
                            </Box>

                            <SettingsOutlined
                                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                            >
                            </SettingsOutlined>
                        </FlexBetween>
                    </Box>
                </Drawer>
            )
        }
    </Box>
}

export default Sidebar