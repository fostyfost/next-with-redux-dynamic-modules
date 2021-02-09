import Head from 'next/head'

import { Aviasales } from '@/components/aviasales'
import { withDynamicModuleLoader } from '@/components/common/with-dynamic-module-loader'
import { AviasalesPublicAction } from '@/modules/aviasales/events'
import { getAviasalesModule } from '@/modules/aviasales/module'
import type { NextPageWithStore } from '@/store/contracts'

interface Props {
  title: string
}

const AviasalesPage: NextPageWithStore<Props, Props> = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Aviasales />
    </>
  )
}

AviasalesPage.getInitialProps = () => {
  AviasalesPublicAction.getTickets()

  return { title: 'Aviasales page' }
}

export default withDynamicModuleLoader(AviasalesPage, [getAviasalesModule()])
