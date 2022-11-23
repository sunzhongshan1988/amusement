import axios from '../request/axios'

/** 查询抽奖信息接口 POST /admin/assessment2/assessment2/interaction-games/getByC */
export async function luckyWheelGet(data: any) {
  return axios
    .post(`/assessment/interaction-games/getByC`, data)
    .then(response=> {
      if (response.data) {
        return response.data;
      }
    });
}

/** 开始抽奖接口 POST /admin/assessment2/assessment2/interaction-games/play */
export async function luckyWheelPlay(data: any) {
  return axios
    .post(`/assessment/interaction-games/play`, data)
    .then(response=> {
      if (response.data) {
        return response.data;
      }
    });
}

/** 中奖列表接口 POST /admin/assessment2/assessment2/interaction-games/getUserPrizeList */
export async function luckyWheelUserPrizeList(data: any) {
  return axios
    .post(`/assessment/interaction-games/getUserPrizeList`, data)
    .then(response=> {
      if (response.data) {
        return response.data;
      }
    });
}
