import { AuthProvider } from '@/contexts/AuthProvider'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import { Fragment } from 'react'

import Analytics from '@/components/analytics'
import { ClientReload } from '@/components/ClientReload'
import { siteMetadata } from '@/data/siteMetadata'
import DefaultLayout from '@/layouts/DefaultLayout'
import DetailLayout from '@/layouts/DetailLayout'
import { Toaster } from 'react-hot-toast'

export const layouts = {
  home: {},
  comicDetail: {
    layout: DetailLayout,
  },
  chapterDetail: {
    layout: DetailLayout,
  },
  login: {
    // layout: HeaderOnly,
  },
  register: {
    // layout: HeaderOnly,
  },
  tags: {},
}

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

function getLayout(selectedLayout, page) {
  // check if layout is specify in publicRoutes || fallback Defaultlayout
  let Layout = selectedLayout || DefaultLayout

  if (selectedLayout) {
    Layout = selectedLayout
  } else if (selectedLayout === null) {
    Layout = Fragment
  }

  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <Analytics />

      <AuthProvider>
        <Toaster toastOptions={{ duration: 5000 }} />
        <Layout>{page}</Layout>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default getLayout
