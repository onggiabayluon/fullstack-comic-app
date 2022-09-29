// import '@/css/prism.css'
import '@/css/tailwind.css'
import 'react-loading-skeleton/dist/skeleton.css'

// import 'katex/dist/katex.css'

import '@fontsource/inter/variable-full.css'

import getLayout from '@/lib/utils/getLayout'

export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  // If component like HomePage dont't have getLayout then render it normally
  const defaultLayout = getLayout || ((page) => page)
  const layout = Component.layout

  return defaultLayout(layout, <Component {...pageProps} />)
}
