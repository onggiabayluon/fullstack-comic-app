import Footer from '@/components/Footer'
import { CommentProvider } from '@/contexts/CommentProvider'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import Body from './Body'
import Navbar from './Navbar'

function DetailLayout({ children }) {
  useEffect(() => {
    console.log('home')
  })

  return (
    <>
      <Navbar />
      <CommentProvider>
        <Body>{children}</Body>
      </CommentProvider>
      <Footer />
    </>
  )
}

DetailLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DetailLayout
