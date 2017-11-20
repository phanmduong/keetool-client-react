/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function importGoodsReducer(state = initialState.importGoods, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_IMPORT_ORDERS:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_IMPORT_ORDERS_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    importOrders: action.importOrders,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages
                }
            };
        case types.LOAD_IMPORT_ORDERS_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true
                }
            };
        case types.BEGIN_LOAD_IMPORT_GOOD_ORDERS:
            return {
                ...state,
                importGood: {
                    ...state.importGood,
                    ...{
                        isLoading: true,
                        error: false,
                    }
                }
            };
        case types.LOAD_IMPORT_GOOD_ORDERS_SUCCESS:
            return {
                ...state,
                importGood: {
                    ...state.importGood,
                    ...{
                        isLoading: false,
                        error: false,
                        importOrder: action.importOrder
                    }
                }
            };
        case types.LOAD_IMPORT_GOOD_ORDERS_ERROR:
            return {
                ...state,
                importGood: {
                    ...state.importGood,
                    ...{
                        isLoading: false,
                        error: true
                    }
                }
            };
        case types.INIT_DATA_IMPORT_GOOD_ORDERS:
            return {
                ...state,
                importGood: initialState.importGoods.importGood
            };
        case types.UPDATE_FORM_IMPORT_GOOD:
            return {
                ...state,
                formImportGood: action.formImportGood
            };
        case types.BEGIN_STORE_IMPORT_GOOD: {
            return {
                ...state,
                formImportGood: {
                    ...state.formImportGood,
                    ...{
                        isStoring: true,
                        error: false,
                    }
                }
            };
        }
        case types.STORE_IMPORT_GOOD_SUCCESS: {
            return {
                ...state,
                formImportGood: {
                    ...state.formImportGood,
                    ...{
                        isStoring: false,
                        error: false,
                    }
                }
            };
        }
        case types.STORE_IMPORT_GOOD_ERROR: {
            return {
                ...state,
                formImportGood: {
                    ...state.formImportGood,
                    ...{
                        isStoring: false,
                        error: true,
                    }
                }
            };
        }
        case types.BEGIN_GET_ALL_WAREHOUSES_IMPORT_GOODS:
            return {
                ...state,
                ...{
                    isLoadingWarehouses: true,
                    errorWarehouses: false,
                }
            };
        case types.GET_ALL_WAREHOUSES_IMPORT_GOODS_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingWarehouses: false,
                    errorWarehouses: false,
                    warehouses: action.warehouses
                }
            };
        case types.GET_ALL_WAREHOUSES_IMPORT_GOODS_ERROR:
            return {
                ...state,
                ...{
                    isLoadingWarehouses: false,
                    errorWarehouses: true
                }
            };
        case types.BEGIN_STORE_SUPPLIER_IMPORT_GOOD:
            return {
                ...state,
                ...{
                    isStoringSupplier: true,
                    errorStoreSupplier: false,
                }
            };
        case types.STORE_SUPPLIER_IMPORT_GOOD_SUCCESS:
            return {
                ...state,
                ...{
                    isStoringSupplier: false,
                    errorStoreSupplier: false,
                    formImportGood: {
                        ...state.formImportGood,
                        supplier: action.supplier
                    }
                }
            };
        case types.STORE_SUPPLIER_IMPORT_GOOD_ERROR:
            return {
                ...state,
                ...{
                    isStoringSupplier: false,
                    errorStoreSupplier: true,
                }
            };
        case types.BEGIN_CHECK_GOODS_IMPORT_GOODS:
            return {
                ...state,
                addGoodFile: {
                    isCheckingGoods: true,
                    errorCheckGoods: false,
                    existsGoods: [],
                    notExistsGoods: [],
                }
            };
        case types.CHECK_GOODS_IMPORT_GOODS_SUCCESS:
            return {
                ...state,
                addGoodFile:{
                    ...state.addGoodFile,
                    isCheckingGoods: false,
                    errorCheckGoods: false,
                    existsGoods: action.existsGoods,
                    notExistsGoods: action.notExistsGoods,
                }
            };
        case types.CHECK_GOODS_IMPORT_GOODS_ERROR:
            return {
                ...state,
                addGoodFile:{
                    ...state.addGoodFile,
                    isCheckingGoods: false,
                    errorCheckGoods: true,
                }
            };
        default:
            return state;
    }
}