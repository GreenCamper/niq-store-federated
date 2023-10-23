import * as React from 'react'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { useFetchContext, useSelection } from 'niq-store-shared-lib'

const ContainerWrapper = styled(Box)`
  display: flex;
  align-items: flex-start;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const LeftNavBox = styled(Box)`
  display: flex;
  flex: 1;
`

const MaintContentBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 3;
  margin-right: 15px;
  margin-left: 30px;
  padding: 15px;
  overflow-x: auto; // This ensures horizontal scroll when content overflows
  max-width: 100%; // This ensures that the box doesn't exceed its parent's width
`

const Header = styled(Box)`
  background-color: rgb(30, 33, 39);
  display: flex;
  align-items: center;
  height: 10rem;
  margin-left: 0;
  margin-right: 0;
  width: 100%;
  h1 {
    margin: auto;
    font-weight: 800;
    color: white;
    text-align: center;
  }
  @media (max-width: 768px) {
    height: auto; /* This will allow the header to adjust its height based on content */
    flex-direction: column;
    padding: 15px;
    h1 {
      margin: 15px 0; /* Adds some margin on top and bottom */
      font-size: 1.5rem; /* Adjusts the font size */
      font-weight: 200;
      color: white;
      text-align: center;
    }
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
