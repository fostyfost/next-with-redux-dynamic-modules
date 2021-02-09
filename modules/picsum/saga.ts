import { call, delay, put, takeLatest } from 'redux-saga/effects'

import { fetchAsJson } from '@/utils/fetchAsJson'

import { PicsumReducerAction } from './action-creators'
import { PicsumActionType } from './action-types'
import type { Picture } from './contracts/picture'
import { PicsumLoadingState } from './contracts/state'

function* loadPicsumWorker() {
  yield put(PicsumReducerAction.setLoadingState(PicsumLoadingState.LOADING))

  yield put(PicsumReducerAction.setError(undefined))

  yield delay(1000)

  try {
    const pics: Picture[] = yield call(fetchAsJson, 'https://picsum.photos/v2/list')

    yield put(PicsumReducerAction.setPics(pics))
  } catch (err) {
    yield put(PicsumReducerAction.setError(err.message))
  } finally {
    yield put(PicsumReducerAction.setLoadingState(PicsumLoadingState.LOADED))
  }
}

export function* loadPicsumWatcher() {
  yield takeLatest(PicsumActionType.LOAD_PICS, loadPicsumWorker)
}
