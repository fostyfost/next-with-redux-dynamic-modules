import type { AppType } from 'next/dist/next-server/lib/utils'

import { Layout } from '@/components/layout'
import { getCommonModule } from '@/modules/common/module'
import { withRedux } from '@/store'

const App: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default withRedux(App, [getCommonModule()])
