import axios from 'axios';
import * as env from '../../constants/env';

export function loadBankTransfers(page = 1, search = "") {
    let url = env.MANAGE_API_URL + `/v2/transfer-money?page=${page}&search=${search}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function updateBankTransfer(bankTransfer) {
    let url = env.MANAGE_API_URL + `/finance/bank-transfer/${bankTransfer.id}`;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, bankTransfer);
}

export function updateTransferStatus(id, status, note) {
    let url = env.MANAGE_API_URL + "/v2/transfer-money/" + id + "/status";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    if (note)
        return axios.put(url, {
            status: status,
            note: note
        });
    return axios.put(url, {
        status: status
    });
}
