import Footer from '@/components/common/Footer'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import Body from './Body'
import Navbar from './Navbar'

function DefaultLayout({ children }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') console.log('home')
  })

  return (
    <>
      <Navbar />
      <Body>{children}</Body>
      <Footer />
    </>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DefaultLayout
