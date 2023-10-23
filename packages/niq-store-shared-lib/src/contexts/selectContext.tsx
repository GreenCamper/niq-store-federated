import React, { createContext, useContext, useState, ReactNode } from 'react'
import SelectionContextType from '../interfaces/SelectedContextType'

const SelectionContext = createContext<SelectionContextType | undefined>(
  undefined,
)

export const SelectionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const clearCategorySelection = () => {
    setSelectedCategory(null)
    setSelectedProduct(null)
  }

  const clearProductsSelection = () => {
    setSelectedProduct(null)
  }

  return (
    <SelectionContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        selectedCategory,
        setSelectedCategory,
        clearCategorySelection,
        clearProductsSelection,
      }}
    >
      {children}
    </SelectionContext.Provider>
  )
}

export const useSelection = (): SelectionContextType => {
  const context = useContext(SelectionContext)
  if (context === undefined) {
    throw new Error('useSelection must be used within a SelectionProvider')
  }
  return context
}
