import Footer from '@/components/Footer'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import Body from './Body'
import Navbar from './Navbar'

function DefaultLayout({ children }) {
  useEffect(() => {
    console.log('home')
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
