/**
 * Data model type
 */

export type Prefecture = {
  prefCode: number
  prefName: string
}

export type Population = {
  year: number
  value: number
}

/**
 * Api response type
 */

export type APIResponse<T> = {
  result?: T
  message: string | null
}

export type APIPopulationResponse = APIResponse<{
  boundaryYear: number
  data: {
    label: string
    data: Population[]
  }[]
}>

export type APIPrefectureResponse = APIResponse<Prefecture[]>
