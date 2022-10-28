import Footer from '@/components/common/Footer'
import { CommentProvider } from '@/contexts/CommentProvider'
import PropTypes from 'prop-types'
import Body from './Body'
import Navbar from './Navbar'

function DetailLayout({ children }) {
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
