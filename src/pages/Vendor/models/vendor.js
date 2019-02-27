import { getVendorList } from "@/services/vendor";

export default {
    namespace: 'vendor',

    state: {
        vendorList: [],
        pagination: {},
    },

    effects: {
        *getVendorList({ payload }, { call, put }) {
            console.log(payload);
            const response = yield call(getVendorList, payload);
            yield put({
                type: 'save',
                payload: response,
            });
        }
    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                vendorList: action.payload.list,
                pagination: action.payload.pagination
            }
        }
    },
}