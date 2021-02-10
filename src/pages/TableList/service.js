import request from '@/utils/request';
import authRequest from '@/utils/authRequest';

export async function queryCarRentalRecords(params) {
  const result = authRequest.post('/admin/carRentalList', {
    data: { ...params },
  });
  return result;
}

export async function takeCar(params) {
  const result = authRequest.post('/admin/takeCar', {
    data: { id: params },
  });
  return result;
}

export async function returnCar(params) {
  const result = authRequest.post('/admin/returnCar', {
    data: { id: params },
  });
  return result;
}

export async function queryRule(params) {
  return request('/api/rule', {
    params,
  });
}
export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
