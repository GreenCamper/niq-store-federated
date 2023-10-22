import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

const CustomizedBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`

type ContainerAppProps = {
  LeftNav: React.LazyExoticComponent<React.ComponentType<{}>>
  CategoryRenderer: React.LazyExoticComponent<React.ComponentType<{}>>
  ProductDetails: React.LazyExoticComponent<React.ComponentType<{}>>
}

const NIQContainer: React.FC<ContainerAppProps> = ({
  LeftNav,
  CategoryRenderer,
  ProductDetails,
}) => {
  return (
    <Container maxWidth="sm">
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          NIQContainer
        </Typography>
        <CustomizedBox>
          <React.Fragment>
            <React.Suspense fallback={<CircularProgress />}>
              <LeftNav />
            </React.Suspense>
            <React.Suspense fallback={<CircularProgress />}>
              <CategoryRenderer />
            </React.Suspense>
            <React.Suspense fallback={<CircularProgress />}>
              <ProductDetails />
            </React.Suspense>
          </React.Fragment>
        </CustomizedBox>
      </Box>
    </Container>
  )
}

export default NIQContainer
