import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {
  getProductsByCategory,
  useFetchContext,
  useSelection,
} from 'niq-store-shared-lib'
import { useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { styled } from '@mui/material/styles'

interface ProductData {
  name: string
  y: number
}
enum Option {
  PRICE = 'Price',
  RATING = 'Rating',
}

const StyledSelect = styled(Select)`
  margin-bottom: 16px;
  width: 150px;
`

const ProductBarChart: React.FC = (): React.ReactElement => {
  const { products } = useFetchContext()
  const { selectedCategory } = useSelection()
  const [selectedOption, setSelectedOption] = useState<Option>(Option.PRICE)

  const handleChange = (event: any) => {
    console.log(event.target.value)
    setSelectedOption(event.target.value as Option)
    console.log(selectedOption)
  }

  const productData: ProductData[] = getProductsByCategory(
    products,
    selectedCategory ?? '',
  ).map((product) => ({
    name: product.title,
    y: selectedOption === 'Price' ? product.price : product.rating.rate,
  }))

  const options: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: selectedOption,
    },
    xAxis: {
      categories: productData.map((data) =>
        data.name.length > 10 ? `${data.name.substring(0, 10)}...` : data.name,
      ),
    },
    yAxis: {
      title: {
        text: selectedOption,
      },
    },
    series: [
      {
        name: selectedOption,
        data: productData,
        type: 'column',
      },
    ],
  }

  return (
    <div>
      <FormControl>
        <StyledSelect
          labelId="select-label"
          value={selectedOption}
          onChange={handleChange}
        >
          <MenuItem value="Price">Price</MenuItem>
          <MenuItem value="Rating">Rating</MenuItem>
        </StyledSelect>
      </FormControl>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default ProductBarChart
