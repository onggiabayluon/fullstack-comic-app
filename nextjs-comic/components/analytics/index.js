import siteMetadata from 'data/siteMetadata'
import GA from './GoogleAnalytics'
import Plausible from './Plausible'
import Posthog from './Posthog'
import SimpleAnalytics from './SimpleAnalytics'
import Umami from './Umami'

const isProduction = process.env.NODE_ENV === 'production'

const Analytics = () => {
  return (
    <>
      {isProduction && siteMetadata.analytics.plausibleDataDomain && <Plausible />}
      {isProduction && siteMetadata.analytics.simpleAnalytics && <SimpleAnalytics />}
      {isProduction && siteMetadata.analytics.umamiWebsiteId && <Umami />}
      {isProduction && siteMetadata.analytics.googleAnalyticsId && <GA />}
      {isProduction && siteMetadata.analytics.posthogAnalyticsId && <Posthog />}
    </>
  )
}

export default Analytics
