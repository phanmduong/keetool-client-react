/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from "../../constants/actionTypes";
import * as registerStudentsApi from "./registerStudentsApi";
import {
    showErrorNotification,
    showNotification,
    showTypeNotification,
    showWarningNotification
} from "../../helpers/helper";

/*eslint no-console: 0 */

export function changeInfoStudent(info, success) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CHANGE_INFO_STUDENT,
        });
        registerStudentsApi
            .changeInfoStudent(info)
            .then(res => {
                let status = res.data.status;
                if (status == 1) {
                    showNotification("Lưu thành công!");
                    dispatch({
                        type: types.CHANGE_INFO_STUDENT_SUCCESS,
                    });
                    success();
                } else {
                    showErrorNotification(res.data.message.message);
                    dispatch({
                        type: types.CHANGE_INFO_STUDENT_ERROR,
                    });
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: types.CHANGE_INFO_STUDENT_ERROR,
                });
            });
    };
}

export function loadBaseFilter() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BASE_FILTER,
        });
        registerStudentsApi
            .loadBases()
            .then(res => {
                dispatch({
                    type: types.LOAD_BASE_FILTER_SUCCESS,
                    filter: res.data.data.bases,
                });
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: types.LOAD_BASE_FILTER_ERROR,
                });
            });
    };
}

export function changeStatusPause(registerId) {
    return function (dispatch) {
        showTypeNotification("Đang bảo lưu", "info");
        dispatch({
            type: types.BEGIN_CHANGE_STATUS_PAUSE,
        });
        registerStudentsApi
            .changeStatusPause(registerId)
            .then(res => {
                if (res.data.status != 0) {
                    showTypeNotification("Bảo lưu thành công", "success");
                    dispatch({
                        type: types.CHANGE_STATUS_PAUSE_SUCCESS,
                        registerId: res.data.data.register_id,
                        status: res.data.data.status,
                    });

                } else {
                    showTypeNotification(res.data.message, "error");
                }
            })
            .catch(() => {
                showTypeNotification("Bảo lưu thất bại", "error");
                dispatch({
                    type: types.CHANGE_STATUS_PAUSE_ERROR,
                });
            });
    };
}

export function loadClassFilter(genid) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CLASS_FILTER,
        });
        registerStudentsApi
            .loadClassFilter(genid)
            .then(res => {
                dispatch({
                    type: types.LOAD_CLASS_FILTER_SUCCESS,
                    filter: res.data.data.classes,
                });
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: types.LOAD_CLASS_FILTER_ERROR,
                });
            });
    };
}

export function loadSalerFilter() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_SALER_FILTER,
        });
        registerStudentsApi
            .loadSalerFilter()
            .then(res => {
                dispatch({
                    type: types.LOAD_SALER_FILTER_SUCCESS,
                    filter: res.data.data.salers,
                });
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: types.LOAD_SALER_FILTER_ERROR,
                });
            });
    };
}

export function loadCampaignFilter() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CAMPAIGN_FILTER,
        });
        registerStudentsApi
            .loadCampaignFilter()
            .then(res => {
                dispatch({
                    type: types.LOAD_CAMPAIGN_FILTER_SUCCESS,
                    filter: res.data.data.marketing_campaigns,
                });
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: types.LOAD_CAMPAIGN_FILTER_ERROR,
                });
            });
    };
}

export function loadRegisterStudent(filters, callback) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_DATA_REGISTER_LIST_LOAD,
        });
        registerStudentsApi
            .getRegisterStudent(filters)
            .then(function (res) {
                dispatch(loadDataSuccessful(res));
                if(callback){
                    callback();
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: types.LOAD_DATA_REGISTER_LIST_ERROR,
                });
            });
    };
}

export function loadAllRegisterStudent(data) {
    let {exportExcel} = data;
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_DATA_EXCEL_REGISTER_LIST,
        });
        registerStudentsApi
            .getAllRegisterStudent(data)
            .then(function (res) {
                dispatch({
                    type: types.LOAD_DATA_EXCEL_REGISTER_LIST_SUCCESS,
                    excel: res.data.data,
                });
                exportExcel();
            });
        // .catch(error => {
        //     console.log(error);
        //     showErrorNotification("Lỗi kết nối mạng!");
        //     dispatch({
        //         type: types.LOAD_DATA_EXCEL_REGISTER_LIST_ERROR,
        //     });
        // });
    };
}

export function loadDataSuccessful(res) {
    return {
        type: types.LOAD_DATA_REGISTER_LIST_SUCCESSFUL,
        registers: res.data.registers,
        genId: res.data.gen ? res.data.gen.id : 0,
        currentPage: res.data.paginator.current_page,
        totalPages: res.data.paginator.total_pages,
        totalCount: res.data.paginator.total_count,
        limit: res.data.paginator.limit,
        isLoading: false,
        error: false,
    };
}

export function loadGensData() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_GENS_REGISTER_STUDENT});
        registerStudentsApi
            .loadGens()
            .then(res => {
                dispatch({
                    type: types.LOAD_GENS_REGISTER_STUDENT_SUCCESSFUL,
                    gens: res.data.data.gens,
                    currentGen: res.data.data.current_gen,
                    isLoading: false,
                    error: false,
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_GENS_REGISTER_STUDENT_ERROR});
            });
    };
}

export function loadHistoryCallStudent(studentId, registerId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_HISTORY_CALL_STUDENT,
        });
        registerStudentsApi
            .historyCallStudent(studentId, registerId)
            .then(res => {
                dispatch({
                    type: types.LOAD_HISTORY_CALL_STUDENT_SUCCESS,
                    historyCall: res.data.data.history_call,
                    registerId: registerId,
                    telecallId: res.data.data.telecall_id,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_HISTORY_CALL_STUDENT_ERROR,
                });
            });
    };
}

export function changeCallStatusStudent(callStatus,
                                        studentId,
                                        telecallId,
                                        genId,
                                        note,
                                        closeModal,
                                        callerId,
                                        appointmentPayment, dateTest) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CHANGE_CALL_STATUS_STUDENT,
        });
        registerStudentsApi
            .changeCallStatusStudent(
                callStatus,
                studentId,
                telecallId,
                genId,
                note,
                callerId,
                appointmentPayment,
                dateTest
            )
            .then(res => {
                closeModal();
                dispatch({
                    type: types.CHANGE_CALL_STATUS_STUDENT_SUCCESS,
                    callStatus: res.data.data.call_status,
                    saler: res.data.data.saler,
                    studentId: studentId,
                });
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra");
                dispatch({
                    type: types.CHANGE_CALL_STATUS_STUDENT_ERROR,
                });
            });
    };
}

export function changeMarkRegister(register_id, bookmark) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CHANGE_BOOKMARK_REGISTER,
        });
        registerStudentsApi.changeMarkRegister(register_id, bookmark)
            .then(() => {
                showNotification("Đã lưu!");
                dispatch({
                    type: types.CHANGE_BOOKMARK_REGISTER_SUCCESS, register_id, bookmark
                });
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra");
                dispatch({
                    type: types.CHANGE_BOOKMARK_REGISTER_ERROR,
                });
            });
    };
}

export function salerPickUpRegister(register_id) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_PICK_UP_REGISTER,
        });
        showWarningNotification('Đang lưu...');
        registerStudentsApi.salerPickUpRegister(register_id)
            .then((res) => {
                showNotification("Lưu thành công!");
                dispatch({
                    source: res.data.source,
                    type: types.PICK_UP_REGISTER_SUCCESS,
                    saler: res.data.saler,
                    register_id,
                });
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra");
                dispatch({
                    type: types.PICK_UP_REGISTER_ERROR,
                });
            });
    };
}

export function deleteRegisterStudent(registerId) {
    return function (dispatch) {
        showTypeNotification("Đang xóa đăng kí", "info");
        dispatch({
            type: types.BEGIN_DELETE_REGISTER_STUDENT,
        });
        registerStudentsApi
            .deleteRegisterStudent(registerId)
            .then(res => {
                if (res.data.status === 1) {
                    showNotification(res.data.data.message);
                    dispatch({
                        type: types.DELETE_REGISTER_STUDENT_SUCCESS,
                        registerId,
                    });
                } else {
                    showErrorNotification(res.data.data.message);
                    dispatch({
                        type: types.DELETE_REGISTER_STUDENT_ERROR,
                    });
                }
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra");
                dispatch({
                    type: types.DELETE_REGISTER_STUDENT_ERROR,
                });
            });
    };
}

export function loadClasses(registerId, query) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CLASSES_REGISTER_STUDENT,
        });
        registerStudentsApi
            .loadClasses(registerId, query)
            .then(res => {
                dispatch({
                    type: types.LOAD_CLASSES_REGISTER_STUDENT_SUCCESS,
                    classes: res.data.data.classes,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_CLASSES_REGISTER_STUDENT_ERROR,
                });
            });
    };
}

export function loadRegisterByStudent(studentId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_REGISTERS_BY_STUDENT_REGISTER_STUDENT,
        });
        registerStudentsApi
            .loadRegisterByStudent(studentId)
            .then(res => {
                dispatch({
                    type: types.LOAD_REGISTERS_BY_STUDENT_REGISTER_STUDENT_SUCCESS,
                    registersByStudent: res.data.data.registers,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_REGISTERS_BY_STUDENT_REGISTER_STUDENT_ERROR,
                });
            });
    };
}

export function confirmChangeClass(registerId, classId, closeModalChangeClass) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CONFIRM_CHANGE_CLASS_REGISTER_STUDENT,
        });
        registerStudentsApi
            .confirmChangeClass(registerId, classId)
            .then(res => {
                showNotification(res.data.data.message);
                closeModalChangeClass();
                if (res.data.data.class) {
                    dispatch({
                        type: types.CONFIRM_CHANGE_CLASS_REGISTER_STUDENT_SUCCESS,
                        registerId: res.data.data.registerId,
                        class: res.data.data.class,
                        code: res.data.data.code,
                    });
                } else {
                    // bảo lưu thành học lại
                    dispatch({
                        type: types.CHANGE_STATUS_PAUSE_SUCCESS,
                        registerId: registerId,
                        status: 5,
                    });
                }
            })
            .catch(() => {
                showErrorNotification("Thay đổi lớp thất bại");
                dispatch({
                    type: types.CONFIRM_CHANGE_CLASS_REGISTER_STUDENT_ERROR,
                });
            });
    };
}

export function uploadDistributionLead(userID, addLeadSuccess) {

    showTypeNotification("Đang thêm vào lead", 'info');
    registerStudentsApi
        .uploadDistributionLead([userID])
        .then(() => {
            showTypeNotification("Thêm vào lead thành công");
            addLeadSuccess();
        })
        .catch(() => {
            showErrorNotification("Thêm vào lead thất bại");
        });

}
