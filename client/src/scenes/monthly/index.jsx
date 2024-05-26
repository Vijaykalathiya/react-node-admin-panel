import { Box, useTheme } from '@mui/material';
import Header from 'components/Header';
import React, { useMemo, useState } from 'react'
import { useGetOverallStatQuery } from 'state/api';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ResponsiveLine } from '@nivo/line';

function Monthly() {
    const { data, isLoading } = useGetOverallStatQuery();
    console.log("data ==> ", isLoading, data);
    const theme = useTheme();

    const [formatedData] = useMemo(() => {
        if (!data) return [];

        const { monthlyData } = data[0];
        const totalSalesLine = {
            id: "totalSales",
            color: theme.palette.secondary.main,
            data: [],
        };
        const totalUnitsLine = {
            id: "totalUnits",
            color: theme.palette.secondary[600],
            data: [],
        };

        Object.values(monthlyData).forEach(({month, totalSales, totalUnits}) => {
            totalSalesLine.data = [
                ...totalSalesLine.data,
                { x: month, y: totalSales },
            ];
            totalUnitsLine.data = [
                ...totalUnitsLine.data,
                { x: month, y: totalUnits },
            ];
        });

        const formatedData = [totalSalesLine, totalUnitsLine];
        return [formatedData];
    }, [isLoading]);


    return <Box m="1.5rem 2.5rem">
        <Header title="Daily Sales" subtitle="Sales and units per day" />
        <Box height="75vh">
            {data && !isLoading ? (
                <ResponsiveLine
                    data={formatedData}
                    theme={{
                        axis: {
                            domain: {
                                line: {
                                    stroke: theme.palette.secondary[200],
                                },
                            },
                            legend: {
                                text: {
                                    fill: theme.palette.secondary[200],
                                },
                            },
                            ticks: {
                                line: {
                                    stroke: theme.palette.secondary[200],
                                    strokeWidth: 1,
                                },
                                text: {
                                    fill: theme.palette.secondary[200],
                                },
                            },
                        },
                        legends: {
                            text: {
                                fill: theme.palette.secondary[200],
                            },
                        },
                        tooltip: {
                            container: {
                                color: theme.palette.primary.main,
                            },
                        },
                    }}
                    colors={{datum: "color"}}
                    margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
                    xScale={{ type: "point" }}
                    yScale={{
                        type: "linear",
                        min: "auto",
                        max: "auto",
                        stacked: false,
                        reverse: false,
                    }}
                    yFormat=" >-.2f"
                    curve="catmullRom"
                    enableArea={true}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: "bottom",
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 90,
                        legend:  "Month",
                        legendOffset: 60,
                        legendPosition: "middle",
                    }}
                    axisLeft={{
                        orient: "left",
                        tickValues: 5,
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Total",
                        legendOffset: -50,
                        legendPosition: "middle",
                    }}
                    enableGridX={false}
                    enableGridY={false}
                    pointSize={10}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={
                        [
                                {
                                    anchor: "top-right",
                                    direction: "column",
                                    justify: false,
                                    translateX: 50,
                                    translateY: 0,
                                    itemsSpacing: 0,
                                    itemDirection: "left-to-right",
                                    itemWidth: 80,
                                    itemHeight: 20,
                                    itemOpacity: 0.75,
                                    symbolSize: 12,
                                    symbolShape: "circle",
                                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                                    effects: [
                                        {
                                            on: "hover",
                                            style: {
                                                itemBackground: "rgba(0, 0, 0, .03)",
                                                itemOpacity: 1,
                                            },
                                        },
                                    ],
                                },
                            ]
                    }
                />
            ) : <>Loading....</>}
        </Box>
    </Box>
}

export default Monthly