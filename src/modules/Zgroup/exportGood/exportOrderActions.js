import * as exportOrderApi from "./exportOrderApi";
import * as helper from "../../../helpers/helper";
import * as types from "../../../constants/actionTypes";
import {browserHistory} from 'react-router';
//import {browserHistory} from 'react-router';

export function loadExportOrders(page=1, search='',good_id='', company_id = '', warehouse_id='') {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_EXPORT_ORDERS});
        exportOrderApi.loadExportOrders(page, search,good_id, company_id, warehouse_id)
            .then((res) => {
                dispatch({
                    type: types.LOAD_EXPORT_ORDERS_SUCCESS,
                    listExportOrder: res.data.exportorders,
                    paginator: res.data.paginator,
                });
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_EXPORT_ORDERS_ERROR});
            });
    };
}


export function loadAllGoods() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ALL_GOODS_EXPORT_ORDER});
        exportOrderApi.loadAllGoods()
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.LOAD_ALL_GOODS_EXPORT_ORDER_SUCCESS,
                        goods : res.data.data.goods,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.LOAD_ALL_GOODS_EXPORT_ORDER_ERROR});
                    browserHistory.push("/business/export-order");
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_ALL_GOODS_EXPORT_ORDER_ERROR});
                browserHistory.push("/business/export-order");
            });
    };
}
export function loadAllCompanies() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ALL_COMPANIES_EXPORT_ORDER});
        exportOrderApi.loadAllCompanies()
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.LOAD_ALL_COMPANIES_EXPORT_ORDER_SUCCESS,
                        companies : res.data.data.companies,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.LOAD_ALL_COMPANIES_EXPORT_ORDER_ERROR});
                    browserHistory.push("/business/export-order");
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_ALL_COMPANIES_EXPORT_ORDER_ERROR});
                browserHistory.push("/business/export-order");
            });
    };
}
export function loadAllWarehourses() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ALL_WAREHOUSES_EXPORT_ORDER});
        exportOrderApi.loadAllWarehourses()
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.LOAD_ALL_WAREHOUSES_EXPORT_ORDER_SUCCESS,
                        warehouses : res.data.data.warehouses,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.LOAD_ALL_WAREHOUSES_EXPORT_ORDER_ERROR});
                    browserHistory.push("/business/export-order");
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_ALL_WAREHOUSES_EXPORT_ORDER_ERROR});
                browserHistory.push("/business/export-order");
            });
    };
}


export function createExportOrder(data, success) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CREATE_EXPORT_ORDER});
        exportOrderApi.createExportOrder(data)
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.CREATE_EXPORT_ORDER_SUCCESS,
                    });
                    success();
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra. status=0");
                    dispatch({type: types.CREATE_EXPORT_ORDER_ERROR});
                }
            });
    };
}