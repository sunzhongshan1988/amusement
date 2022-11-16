import axios from '../request/axios'

/** 查询一个抽奖接口 POST /admin/assessment2/assessment2/interaction-games/get */
export async function luckyWheelGet(data: any) {
  return axios
    .post(`/assessment/interaction-games/get`, data)
    .then(response=> {
      if (response.data) {
        return response.data;
      }
    });
}

/** 查询一个抽奖接口 POST /admin/assessment2/assessment2/interaction-games/play */
export async function luckyWheelPlay(data: any) {
  return axios
    .post(`/assessment/interaction-games/play`, data)
    .then(response=> {
      if (response.data) {
        return response.data;
      }
    });
}
