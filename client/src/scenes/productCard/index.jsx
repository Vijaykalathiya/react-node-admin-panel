import { useTheme } from '@emotion/react'
import { Button, Card, CardActions, CardContent, Collapse, Rating, Typography, useMediaQuery } from '@mui/material';
import React, { useState } from 'react'

const ProductCard = ({product}) => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery('(min-width: 1000px)')
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Card
      sx={{ backgroundImage: "none", backgroundColor: theme.palette.background.alt, borderRadius: "0.55rem" }}
    >
      <CardContent sx={{ height: isNonMobile ? "18vh" : "16vh", overflow: "hidden"}}>
        <Typography sx={{ fontSize: "14" }} color={theme.palette.secondary[700]} gutterBottom>
          {product.category}
        </Typography>
        <Typography variant='h5' component="div">
          {product.name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          {Number(product.price).toFixed(2)}
        </Typography>
        <Rating value={product.rating} readOnly />
        <Typography variant='body2'>{product.description}</Typography>
      </CardContent>

      <CardActions>
        <Button variant='primary' size="small" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded? "See Less" : "See More"}
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300]
        }}
      >
        <CardContent>
          <Typography>Supply Left: {product.supply}</Typography>
          <Typography>Yearly Sales This Year: {product.stat[0].yearlySalesTotal}</Typography>
          <Typography>Yearly Units Sold This Year: {product.stat[0].yearlyTotalSoldUnits}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default ProductCard