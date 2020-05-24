import { LOADING, FETCH_REPORTS, REGISTER_CASE, RESOLVE_CASE } from './types';
import axios from 'axios';

export const fetchReports = input => dispatch => {
    axios
        .post("/reports/getAll")
        .then(response => {
            let payload = response.data
            dispatch({
                type: FETCH_REPORTS,
                payload
            })
        })
        .catch(err => console.log(err));
};

export const registerCase = input => dispatch => {
    let params = input;
    axios.post("/reports/register", params)
        .then(response => {
            let payload = response.data
            dispatch({
                type: REGISTER_CASE,
                payload
            })
        })
        .catch(err => console.log(err));
}

export const resolveCase = input => dispatch => {
    let params = input
    axios.post("/reports/resolve", params)
        .then(response => {
            let payload = response.data
            dispatch({
                type: RESOLVE_CASE,
                payload
            })
        })
        .catch(err => console.log(err));
}

export const setLoading = () => {
    return {
        type: LOADING
    };
};