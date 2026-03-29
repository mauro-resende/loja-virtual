import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [itens, setItens] = useState([])

  function adicionar(produto) {
    setItens(prev => {
      const existe = prev.find(i => i.id === produto.id)
      if (existe) {
        return prev.map(i => i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i)
      }
      return [...prev, { ...produto, quantidade: 1 }]
    })
  }

  function remover(id) {
    setItens(prev => prev.filter(i => i.id !== id))
  }

  function total() {
    return itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0)
  }

  return (
    <CartContext.Provider value={{ itens, adicionar, remover, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
