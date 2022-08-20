import axios from 'axios'
import { API_ENDPOINT, authHeader } from './constants'

export async function getAPIPopulation(prefCode: number | string, cityCode?: number | string) {
  return axios.get(`${API_ENDPOINT}api/v1/population/composition/perYear`, {
    params: { prefCode: prefCode, cityCode: cityCode || '-' },
    headers: authHeader,
  })
}

export async function getAPIPrefectures() {
  return axios.get(`${API_ENDPOINT}api/v1/prefectures`, {
    headers: authHeader,
  })
}
