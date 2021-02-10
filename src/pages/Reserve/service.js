import request from '@/utils/request';

export async function queryCarList(params) {
  return request.post('/api/car/list', {
    data: params 
  });
}

export async function reserveCar(params) {
  return request.post('/api/car/reserve', {
    data: params 
  });
}
  
