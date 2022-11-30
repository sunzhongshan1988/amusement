import axios from '../request/axios'

/** 添加互动记录 POST /tenant/customer-manager/interactRecord/addInteractRecord */
export async function addInteractRecord(data: any) {
  return axios
    .post(`/customer/customer-manager/interactRecord/addInteractRecord`, data)
    .then(response=> {
      if (response.data) {
        return response.data;
      }
    });
}
