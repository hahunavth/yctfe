import axios from 'axios'
import { API_ENDPOINT, authHeader } from './constants'
import { AxiosResponse } from 'axios'
import { APIPopulationResponse, APIPrefectureResponse } from './types'

/**
 * get population list
 *  https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html
 *
 * @returns
 */
export async function getAPIPopulation(
  prefCode: number | string,
  cityCode?: number | string,
): Promise<AxiosResponse<APIPopulationResponse>> {
  return axios.get(`${API_ENDPOINT}api/v1/population/composition/perYear`, {
    params: { prefCode: prefCode, cityCode: cityCode || '-' },
    headers: authHeader,
  })
}

/**
 * get prefecture list
 *  https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html
 */
export async function getAPIPrefectures(): Promise<AxiosResponse<APIPrefectureResponse>> {
  return axios.get(`${API_ENDPOINT}api/v1/prefectures`, {
    headers: authHeader,
  })
}
