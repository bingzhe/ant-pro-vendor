import { stringify } from 'qs';
import request from '@/utils/request';

export async function getVendorList(params) {
    return request(`/api/vendor?${stringify(params)}`);
}