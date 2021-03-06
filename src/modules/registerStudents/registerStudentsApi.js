import axios from 'axios';
import * as env from '../../constants/env';
import * as helper from '../../helpers/helper';

export function getAllRegisterStudent(data) {
    let {
        // page,
        // selectGenId = '',
        query = '',
        selectedSalerId = '',
        campaignId = '',
        selectedClassId = '',
        selectedMoneyFilter = '',
        selectedClassStatus = '',
        startTime = '',
        endTime = '',
        selectedBaseId = '',
        appointmentPayment = '',
        query_coupon = '',
        query_note = '',
        selectedTeleCallStatus = '',
        registerStatusId = '',
        registerSourceId = '',
        bookmark = '',
    } = data;

    let base_id = selectedBaseId;
    let token = localStorage.getItem('token');
    let url = env.API_URL + "/register-list?" +
        // "page=" + page +
        // "&gen_id=" + selectGenId +
        "&search=" + query +
        "&query_note=" + query_note +
        "&saler_id=" + selectedSalerId +
        '&campaign_id=' + campaignId +
        "&class_id=" + selectedClassId +
        "&status=" + selectedMoneyFilter +
        "&limit=-1" +
        "&base_id=" + base_id +
        "&appointment_payment=" + appointmentPayment +
        "&query_coupon=" + query_coupon +
        "&bookmark=" + bookmark +
        "&registerStatusId=" + registerStatusId +
        "&registerSourceId=" + registerSourceId +
        "&tele_call_status=" + selectedTeleCallStatus +
        "&type=" + selectedClassStatus;
    if (!helper.isEmptyInput(startTime) && !helper.isEmptyInput(endTime)) {
        url += `&start_time=${startTime}&end_time=${endTime}`;
    }
    url += "&token=" + token;
    return axios.get(url);
}

export function getRegisterStudent(filter) {

    let {
        page = 1,
        limit = 16,
        // selectGenId = '',
        query = '',
        selectedSalerId = '',
        campaignId = '',
        selectedClassId = '',
        selectedCourseId = '',
        selectedMoneyFilter = '',
        selectedClassStatus = '',
        startTime = '',
        endTime = '',
        selectedBaseId = '',
        appointmentPayment = '',
        query_coupon = '',
        query_note = '',
        selectedTeleCallStatus = '',
        selectedBookmarkStatus = '',
        registerStatusId = '',
        registerSourceId = '',
        date_test = '',
        call_back_time = '',
    } = filter;
    console.log('api', filter);

    let urlType;
    switch (env.TYPE_API) {
        case "alibaba":
            urlType = (env.MANAGE_API_URL + "/alibaba");
            break;
        default:
            urlType = env.API_URL;
    }
    let token = localStorage.getItem('token');
    let url =
        urlType +
        "/register-list?" +
        "page=" + page +
        "&limit=" + limit +
        // "&gen_id=" + selectGenId +
        "&search=" + query +
        "&saler_id=" + selectedSalerId +
        '&campaign_id=' + campaignId +
        "&class_id=" + selectedClassId +
        "&course_id=" + selectedCourseId +
        "&status=" + selectedMoneyFilter +
        "&base_id=" + selectedBaseId +
        "&appointment_payment=" + appointmentPayment +
        "&date_test=" + date_test +
        "&call_back_time=" + call_back_time +
        "&type=" + selectedClassStatus +
        "&search_coupon=" + query_coupon +
        "&query_note=" + query_note +
        "&bookmark=" + selectedBookmarkStatus +
        "&registerStatusId=" + registerStatusId +
        "&registerSourceId=" + registerSourceId +
        "&tele_call_status=" + selectedTeleCallStatus
    ;
    if (!helper.isEmptyInput(startTime) && !helper.isEmptyInput(endTime)) {
        url += `&start_time=${startTime}&end_time=${endTime}`;
    }
    url += "&token=" + token;
    return axios.get(url);
}

export function loadGens() {
    let token = localStorage.getItem('token');
    let url = env.MANAGE_API_URL + "/gen/all?token=" + token;
    return axios.get(url);
}

export function loadClassFilter(genid = 0) {
    //http://manageapi.keetool.xyz/class/all?token=
    //http://api.keetool.xyz/apiv2/gens/22/classes?token=
    let token = localStorage.getItem('token');
    let url = env.API_URL + "/apiv2/gens/" + (genid || 0) + "/classes?token=" + token;
    return axios.get(url);
}

export function loadSalerFilter() {
    //http://api.keetool.xyz/all-saler?
    let token = localStorage.getItem('token');
    let url = env.API_URL + "/all-saler?token=" + token;
    return axios.get(url);
}

export function loadCampaignFilter() {
    //http://manageapi.keetool.xyz/marketing-campaign/all?token=
    let token = localStorage.getItem('token');
    let url = env.MANAGE_API_URL + "/marketing-campaign/all?limit=-1&token=" + token;
    return axios.get(url);
}

export function historyCallStudent(studentId, registerId) {
    let token = localStorage.getItem('token');
    let url = `${env.MANAGE_API_URL}/history-call-student?id=${studentId}&register_id=${registerId}&token=${token}`;
    return axios.get(url);
}

export function changeMarkRegister(register_id, bookmark) {
    let token = localStorage.getItem('token');
    let url = `${env.API_URL}/mark-register?register_id=${register_id}&bookmark=${bookmark == true ? 1 : 0}&token=${token}`;
    return axios.post(url,);
}
export function salerPickUpRegister(register_id) {
    let token = localStorage.getItem('token');
    let url = `${env.API_URL}/pick-up-register?register_id=${register_id}&token=${token}`;
    return axios.post(url,);
}

export function changeCallStatusStudent(callStatus, studentId, telecallId, genId = '', note = '', callerId = '', appointmentPayment = '', dateTest, call_back_time, status_id) {

    let url = env.MANAGE_API_URL;

    switch (env.TYPE_API) {
        case 'alibaba':
            url += "/alibaba-change-call-status-student";
            break;
        default:
            url += "/change-call-status-student";
            break;
    }

    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
            student_id: studentId,
            telecall_id: telecallId,
            gen_id: genId,
            caller_id: callerId,
            note: note,
            status: callStatus,
            appointment_payment: appointmentPayment,
            date_test: dateTest,
            call_back_time,
            status_id,
        }
    );
}

export function confirmChangeClass(registerId, classId) {
    let url = env.MANAGE_API_URL + "/register-student/confirm-change-class";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
            register_id: registerId,
            class_id: classId
        }
    );
}

export function deleteRegisterStudent(registerId) {
    let url = env.MANAGE_API_URL + "/delete-register-student";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
            register_id: registerId
        }
    );
}

export function changeStatusPause(registerId) {
    let url = env.MANAGE_API_URL + "/register-student/change-register-status-pause";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
            register_id: registerId
        }
    );
}

export function loadClasses(registerId, query) {
    let token = localStorage.getItem('token');
    let url = env.MANAGE_API_URL + `/register-student/${registerId}/classes_without_waiting?token=` + token;
    if (query) {
        url += '&search=' + query;
    }
    return axios.get(url);
}

export function loadRegisterByStudent(studentId) {
    let url = env.MANAGE_API_URL + `/student/${studentId}/registers`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function changeInfoStudent(info) {
    //manageapi.domain/alibaba/register/{register_id}?token=
    let urlType = "";
    switch (env.TYPE_API) {
        case "alibaba":
            urlType = "/alibaba";
            break;
        default:
            urlType = "";
    }
    let url = env.MANAGE_API_URL + urlType + "/register/" + info.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.put(url, {money: info.money, code: info.code});
}

export function loadBases() {
    let url = env.MANAGE_API_URL + "/base/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadCoursesApi() {
    let url = env.MANAGE_API_URL + "/v2/course/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadClassesApi(course_id) {
    let url = env.MANAGE_API_URL + "/v2/course/" + course_id + "/class";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function saveRegisterApi(register) {
    let url = env.MANAGE_API_URL + "/v2/register";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        father_name: register.father_name,
        mother_name: register.mother_name,
        identity_code: register.identity_code,
        nationality: register.nationality,
        saler_id: register.saler_id,
        base_id: register.base_id,
        course_id: register.course_id,
        status_id: register.status_id,
        source_id: register.source_id,
        name: register.name,
        phone: register.phone,
        email: register.email,
        class_id: register.class_id,
        coupon: register.coupon,
        coupons: register.coupons,
        dob: register.dob,
        address: register.address,
        facebook: register.facebook,
        gender: register.gender,
        how_know: register.how_know,
        university: register.university,
        work: register.work,
        campaign_id: register.campaign_id,
        description: register.description
    });
}

export function loadCampaignsApi() {
    let url = env.MANAGE_API_URL + "/marketing-campaign/all?limit=-1";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function uploadDistributionLead(leadIds) {

    let url = env.MANAGE_API_URL + "/lead/upload-distribution-leads";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        lead_ids: leadIds
    });
}

export function getAllProvinces() {
    let url = env.MANAGE_API_URL + "/province/all";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}