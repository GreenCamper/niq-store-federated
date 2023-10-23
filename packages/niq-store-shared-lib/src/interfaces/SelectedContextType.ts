export default interface SelectionContextType {
  selectedProduct: string | null
  selectedCategory: string | null
  setSelectedProduct: React.Dispatch<React.SetStateAction<string | null>>
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>
  clearCategorySelection: () => void
  clearProductsSelection: () => void
}
