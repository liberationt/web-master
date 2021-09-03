import axios from '@/utils/request.ts'

export const getAllNumber = (data: any) => {
  return axios({
    url: '/hisapi/imtbkk/queryPatientImTbkkSum',
    method: 'post',
    data,
  })
}
