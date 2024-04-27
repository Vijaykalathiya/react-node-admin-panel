import React from 'react'
import { useGetGrographyQuery } from 'state/api'
import { ResponsiveChoropleth } from '@nivo/geo';
import { geoData } from 'state/geoData';
import { Box, useTheme } from '@mui/material';
import Header from 'components/Header';

const Geography = () => {
  const { data, isLoading } = useGetGrographyQuery();
  const theme = useTheme();
  return <Box m="1.5rem 2.5rem">
    <Header title="Geography" subTitle="User Locations." />
    <Box
      mt="40px"
      height="75vh"
      border={`1px solid ${theme.palette.secondary[200]}`}
      borderRadius="4px"

    >
      {data || !isLoading ? (
        <ResponsiveChoropleth
          data={data}
          theme={{
            tooltip: {
              container: {
                background: '#fff',
                color: theme.palette.primary[500],
              },
            }
          }}
          features={geoData.features}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          colors="nivo"
          domain={[0, 60]}
          unknownColor="#666666"
          label="properties.name"
          valueFormat=".2s"
          projectionTranslation={[0.5, 0.5]}
          projectionRotation={[0, 0, 0]}
          borderWidth={0.5}
          borderColor="#152538"
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: '#38bcb2',
              size: 4,
              padding: 1,
              stagger: true
            },
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: '#eed312',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
            },
            {
              id: 'gradient',
              type: 'linearGradient',
              colors: [
                {
                  offset: 0,
                  color: '#000'
                },
                {
                  offset: 100,
                  color: 'inherit'
                }
              ]
            }
          ]}
          fill={[ 
            //{can give spacific styles for specific area},
            {
              match: {
                id: 'CAN'
              },
              id: 'dots'
            },
            {
              match: {
                id: 'CHN'
              },
              id: 'lines'
            },
            {
              match: {
                id: 'ATA'
              },
              id: 'gradient'
            }
          ]}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: true,
              translateX: -15,
              translateY: -100,
              itemsSpacing: 0,
              itemWidth: 94,
              itemHeight: 18,
              itemDirection: 'left-to-right',
              itemTextColor: theme.palette.secondary[200],
              itemOpacity: 0.85,
              symbolSize: 18,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: theme.palette.background[500],
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
        />) : <>Loading...</>}
    </Box>
  </Box>
}

export default Geography