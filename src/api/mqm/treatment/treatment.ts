import request from '@/utils/request.ts'

export const addTreatmentType = (data: any) => {
  return request({
    url: '/hisapi/zllb/add',
    method: 'post',
    data,
  })
}

export const editTreatmentType = (data: any) => {
  return request({
    url: '/hisapi/zllb/edit',
    method: 'post',
    data,
  })
}

export const delTreatmentType = (data: any) => {
  return request({
    url: '/hisapi/zllb/delete',
    method: 'post',
    data,
  })
}

export const getTreatmentType = (data: any) => {
  return request({
    url: '/hisapi/zllb/queryPage',
    method: 'post',
    data,
  })
}

export const addZlxm = (data: any) => {
  return request({
    url: '/hisapi/zlxm/add',
    method: 'post',
    data,
  })
}

export const editZlxm = (data: any) => {
  return request({
    url: '/hisapi/zlxm/edit',
    method: 'post',
    data,
  })
}

export const deleteZlxm = (data: any) => {
  return request({
    url: '/hisapi/zlxm/delete',
    method: 'post',
    data,
  })
}

export const updateZtZlxm = (data: any) => {
  return request({
    url: '/hisapi/zlxm/updateZt',
    method: 'post',
    data,
  })
}

export const getProject = (data: any) => {
  return request({
    url: '/hisapi/zlxm/queryPage',
    method: 'post',
    data,
  })
}

export const findPlanList = (data: any) => {
  return request({
    url: '/hisapi/zlxmzljh/findList',
    method: 'post',
    data,
  })
}

export const addPlanItem = (data: any) => {
  return request({
    url: '/hisapi/zlxmzljh/add',
    method: 'post',
    data,
  })
}

export const delPlanItem = (data: any) => {
  return request({
    url: '/hisapi/zlxmzljh/delete',
    method: 'post',
    data,
  })
}

export const editPlanItem = (data: any) => {
  return request({
    url: '/hisapi/zlxmzljh/edit',
    method: 'post',
    data,
  })
}

export const findSFXMList = (data: any) => {
  return request({
    url: '/hisapi/zlxmldsfxm/findList',
    method: 'post',
    data,
  })
}
export const addSFXMItem = (data: any) => {
  return request({
    url: '/hisapi/zlxmldsfxm/add',
    method: 'post',
    data,
  })
}
export const delSFXMItem = (data: any) => {
  return request({
    url: '/hisapi/zlxmldsfxm/delete',
    method: 'post',
    data,
  })
}
export const editSFXMItem = (data: any) => {
  return request({
    url: '/hisapi/zlxmldsfxm/edit',
    method: 'post',
    data,
  })
}

export const addZLSQ = (data: any) => {
  return request({
    url: '/hisapi/zlsqdzb/add',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const zfZLSQ = (data: any) => {
  return request({
    url: '/hisapi/zlsqdzb/cancel',
    method: 'post',
    data,
  })
}

export const queryZLSQ = (data: any) => {
  return request({
    url: '/hisapi/zlsqdzb/getDetail',
    method: 'post',
    data,
  })
}

export const editZLSQ = (data: any) => {
  return request({
    url: '/hisapi/zlsqdzb/edit',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const findZLNR = (data: any) => {
  return request({
    url: '/hisapi/zlsqdxmzlnr/findList',
    method: 'post',
    data,
  })
}

export const findZLYY = (data: any) => {
  return request({
    url: '/hisapi/zlsqdyyzx/findList',
    method: 'post',
    data,
  })
}

export const saveOrUpdateZlyyAndZlnr = (data: any) => {
  return request({
    url: '/hisapi/zlsqdyyzx/saveOrUpdateZlyy',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const queryZlyyzxXmxq = (data: any) => {
  return request({
    url: '/hisapi/zlsqdyyzx/queryZlyyzxXmxq',
    method: 'post',
    data,
  })
}

export const addZLZJ = (data: any) => {
  return request({
    url: '/hisapi/zljlxjzj/add',
    method: 'post',
    data,
  })
}

export const findJlList = (data: any) => {
  return request({
    url: '/hisapi/zljlxjzj/findJlList',
    method: 'post',
    data,
  })
}

export const editZLJL = (data: any) => {
  return request({
    url: '/hisapi/zljlxjzj/edit',
    method: 'post',
    data,
  })
}

export const delZLJL = (data: any) => {
  return request({
    url: '/hisapi/zljlxjzj/delete',
    method: 'post',
    data,
  })
}

export const queryZLZJ = (data: any) => {
  return request({
    url: '/hisapi/zljlxjzj/queryFinish',
    method: 'post',
    data,
  })
}

export const cancelFinish = (data: any) => {
  return request({
    url: '/hisapi/zljlxjzj/cancelFinish',
    method: 'post',
    data,
  })
}

export const finishSave = (data: any) => {
  return request({
    url: '/hisapi/zljlxjzj/finishSave',
    method: 'post',
    data,
  })
}

export const cancelZX = (data: any) => {
  return request({
    url: '/hisapi/zlsqdyyzx/cancelZx',
    method: 'post',
    data,
  })
}
