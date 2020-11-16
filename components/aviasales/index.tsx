import { FC } from 'react'

import { Cards } from '@/components/aviasales/cards'
import styles from '@/components/aviasales/index.module.css'
import { Logo } from '@/components/aviasales/logo'
import { Progress } from '@/components/aviasales/progress'
import { SortControls } from '@/components/aviasales/sort-controls'
import { StopsFilters } from '@/components/aviasales/stops-filters'

const Aviasales: FC = () => {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');

        :root {
          --main-background: #f3f7fa;
          --primary-color: #4a4a4a;
          --secondary-color: #2196f3;
          --gray-color: #a0b0b9;
          --white-color: #fff;
          --primary-background: #f1fcff;
          --primary-border-radius: 5px;
          --secondary-border-radius: 2px;
          --primary-border-color: #dfe5ec;
          --secondary-border-color: #9abbce;
          --default-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          --default-outline: dotted 1px var(--primary-color);
          --default-outline-offset: 10px;
        }

        body {
          font-family: 'Open Sans', 'Helvetica', sans-serif;
          background-color: var(--main-background);
          margin: 0;

          font-family: Open Sans;
          font-style: normal;
          font-weight: normal;
        }

        *:focus {
          outline: var(--default-outline);
          outline-offset: var(--default-outline-offset);
        }

        .visuallyHidden {
          position: absolute;
          width: 1px;
          height: 1px;
          margin: -1px;
          padding: 0;
          overflow: hidden;
          border: 0;
          clip: rect(0 0 0 0);
        }
      `}</style>
      <Progress />
      <header className={styles.header}>
        <div className={styles.logo}>
          <Logo />
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.sidebar}>
          <StopsFilters />
        </div>
        <div className={styles.container}>
          <div className={styles.containerTop}>
            <SortControls />
          </div>
          <Cards />
        </div>
      </main>
    </>
  )
}

export { Aviasales }
