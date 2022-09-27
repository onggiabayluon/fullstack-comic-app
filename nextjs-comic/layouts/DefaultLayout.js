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
    <div className="flex h-screen flex-col">
      <Navbar />
      <Body>{children}</Body>
      <Footer />
    </div>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DefaultLayout
