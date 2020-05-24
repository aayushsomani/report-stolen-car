import {
    FETCH_REPORTS,
    REGISTER_CASE,
    LOADING,
    RESOLVE_CASE
} from '../actions/types';

const initialState = {
    reports: { reportsData: [], status: false },
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_REPORTS:
            return {
                ...state,
                reports: action.payload,
                loading: false
            };
        case REGISTER_CASE:
            return {
                ...state,
                loading: false,
                reports: action.payload
            }
        case RESOLVE_CASE:
            return {
                ...state,
                reports: action.payload,
                loading: false
            }
        case LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}