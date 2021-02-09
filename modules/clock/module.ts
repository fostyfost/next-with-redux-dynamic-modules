import type { SagaModule } from '@/store/saga-extension/contracts'

import type { ClockActionsUnion } from './action-creators'
import type { ClockAwareState } from './contracts/state'
import { CLOCK_MODULE_NAME } from './index'
import { clockReducer } from './reducer'
import { startClockWatcher } from './saga'

export const getClockModule = (): SagaModule<ClockAwareState, ClockActionsUnion> => {
  return {
    id: CLOCK_MODULE_NAME,
    reducerMap: {
      [CLOCK_MODULE_NAME]: clockReducer,
    },
    sagas: [startClockWatcher],
    retained: true,
  }
}
