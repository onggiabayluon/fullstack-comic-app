import { useState } from 'react'

const defaultFnc = () => {}

function useHistories({ items, onChange = defaultFnc }) {
  const [histories, setHistories] = useState([items])

  const lastMenuItem = histories[histories.length - 1]

  const back = () => {
    setHistories((prev) => prev.slice(0, histories.length - 1))
  }

  const backToRoot = () => {
    setHistories((prev) => prev.slice(0, 1))
  }

  const addHistories = (histories) => {
    setHistories((prev) => [...prev, histories])
  }

  const handleMenuItemClick = (item) => {
    const hasChilren = !!item.children
    // If has children then append children to histories
    if (hasChilren) addHistories(item.children)
    // không có thì xử lý item hiện tại
    if (!hasChilren) onChange(item)
  }

  return [
    lastMenuItem,
    handleMenuItemClick,
    backToRoot,
    histories,
    setHistories,
    back,
    addHistories,
  ]
}

export default useHistories
