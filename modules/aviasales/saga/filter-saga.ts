import { Handler } from 'mitt'
import { buffers, eventChannel, Subscribe } from 'redux-saga'
import { cancel, cancelled, put, select, take, takeLatest } from 'redux-saga/effects'

import { AviasalesReducerAction } from '@/modules/aviasales/action-creators'
import { AVAILABLE_STOPS } from '@/modules/aviasales/constants'
import { AviasalesEvent, AviasalesEventEmitter, ChangeStopsMassive } from '@/modules/aviasales/events'
import { stopsSelector } from '@/modules/aviasales/selectors'
import { StoreActionType } from '@/store/action-types'

type ChannelPayload = number | ChangeStopsMassive

const subscribe: Subscribe<ChannelPayload> = emitter => {
  const handler: Handler<ChannelPayload> = payload => {
    if (typeof payload !== 'undefined') {
      emitter(payload)
    }
  }

  AviasalesEventEmitter.on(AviasalesEvent.CHANGE_STOPS, handler)

  // Unsubscribe
  return (): void => {
    AviasalesEventEmitter.off(AviasalesEvent.CHANGE_STOPS, handler)
  }
}

export function* filterSaga() {
  const channel = eventChannel<ChannelPayload>(subscribe, buffers.sliding(1))

  const task = yield takeLatest(channel, function* worker(payload: ChannelPayload) {
    try {
      if (payload === ChangeStopsMassive.CHECK_ALL) {
        yield put(AviasalesReducerAction.setStops(AVAILABLE_STOPS))
        return
      }

      if (payload === ChangeStopsMassive.UNCHECK_ALL) {
        yield put(AviasalesReducerAction.setStops([]))
        return
      }

      const stops: ReturnType<typeof stopsSelector> = yield select(stopsSelector)

      if (stops.includes(payload)) {
        yield put(AviasalesReducerAction.setStops(stops.filter(stop => stop !== payload)))
      } else {
        yield put(AviasalesReducerAction.setStops([...stops, payload]))
      }
    } finally {
      if (yield cancelled()) {
        channel.close()
      }
    }
  })

  yield take(StoreActionType.STOP_ALL_TASKS)

  yield cancel(task)
}
