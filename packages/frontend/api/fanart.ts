import { AxiosResponse } from 'axios'
import { APIResponse } from '../interfaces/api'
import { FanartInterface, FanartResponseInterface } from '../interfaces/fanart'
import AxiosInstance from './axios'

export async function getFanart(
  limit?: number,
  lastId?: string
): Promise<FanartResponseInterface[]> {
  try {
    const res: AxiosResponse<APIResponse<FanartResponseInterface[]>> =
      await AxiosInstance.get('/fanart', {
        params: {
          limit,
          lastId,
        },
      })
    return res.data.content
  } catch (err) {
    throw TypeError(err.message)
  }
}

export async function createFanart(data: FanartInterface) {
  try {
    await AxiosInstance.post('/create/fanart', data)
  } catch (error) {
    if (error.response.status === 429) {
      throw new TypeError('Submission limit reached. Try again in an hour.')
    }
    throw new TypeError(error.message)
  }
}
