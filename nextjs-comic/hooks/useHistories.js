import { useCallback, useState } from 'react'

const defaultFnc = () => {}

function useHistories({ items, onChange = defaultFnc }) {
  const [histories, setHistories] = useState([items])

  const lastMenuItem = histories[histories.length - 1]

  const back = useCallback(() => {
    setHistories((prev) => prev.slice(0, histories.length - 1))
  }, [histories.length])

  const backToRoot = useCallback(() => {
    setHistories((prev) => prev.slice(0, 1))
  }, [])

  const addHistories = useCallback((histories) => {
    setHistories((prev) => [...prev, histories])
  }, [])

  const handleMenuItemClick = useCallback(
    (item) => {
      const hasChilren = !!item.children
      // If has children then append children to histories
      if (hasChilren) addHistories(item.children)
      // không có thì xử lý item hiện tại
      if (!hasChilren) onChange(item)
    },
    [addHistories, onChange]
  )

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
