import * as React from 'react'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { useFetchContext, useSelection } from 'niq-store-shared-lib'

const ContainerWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: '100%';
`

const LeftNavBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`

const MaintContentBox = styled(Box)`
  background-color: blue;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 3;
  margin-right: 15px;
  padding: 15px;
`

const Header = styled(Box)`
  background-color: rgb(30, 33, 39);
  display: flex;
  align-items: center;
  height: 10rem;
  h1 {
    margin: auto;
    font-weight: 800;
    color: white;
    text-align: center;
  }
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
}): React.ReactElement => {
  const { loading } = useFetchContext()
  const { selectedProduct, selectedCategory } = useSelection()
  return (
    <React.Fragment>
      <Header>
        <Typography variant="h2" component="h1" gutterBottom>
          My Fabulous Store
        </Typography>
      </Header>
      <ContainerWrapper>
        <LeftNavBox>
          <React.Suspense fallback={<CircularProgress />}>
            {!loading && <LeftNav />}
          </React.Suspense>
        </LeftNavBox>
        <MaintContentBox>
          {selectedCategory ? (
            <React.Suspense fallback={<CircularProgress />}>
              {!selectedProduct && <CategoryRenderer />}
            </React.Suspense>
          ) : (
            <Box> Please Select a category </Box>
          )}
          <React.Suspense fallback={<CircularProgress />}>
            {selectedProduct && <ProductDetails />}
          </React.Suspense>
        </MaintContentBox>
      </ContainerWrapper>
    </React.Fragment>
  )
}

export default NIQContainer
