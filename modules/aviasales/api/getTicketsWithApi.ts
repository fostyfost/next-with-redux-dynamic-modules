import type { TicketsResponse } from '@/modules/aviasales/contracts/api-response'
import { fetchAsJson } from '@/utils/fetchAsJson'

export const getTicketsWithApi = (searchId: string): Promise<TicketsResponse> => {
  return fetchAsJson(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
}
