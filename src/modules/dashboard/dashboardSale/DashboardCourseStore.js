import {action, get, observable} from "mobx";
import {loadClassByCoursesApi, loadCoursesApi} from "./dashboardSaleApi";
import {showErrorNotification} from "../../../helpers/helper";


export default class DashboardCourseStore {
    @observable isLoading = false;
    @observable courses = [];
    @observable coursesOfClasses = [];
    @observable dates = [];
    @observable classesCountByCourses = [];

    @action
    loadCourses = (filter) => {
        this.isLoading = true;
        loadCoursesApi(filter).then((res) => {
            this.courses = res.data.courses;
        }).catch(() => {
            showErrorNotification("Có lỗi xảy ra");
        }).finally(() => {
            this.isLoading = false;
        });
        loadClassByCoursesApi(filter).then((res) => {
            this.coursesOfClasses = res.data.coursesOfClasses;
            this.classesCountByCourses = res.data.classesCountByCourses;
            this.dates = res.data.dates;
        }).catch(() => {
            showErrorNotification("Có lỗi xảy ra");
        }).finally(() => {
        });
    };

    @get
    get totalCourse() {
        if (this.courses && this.courses.length == 1) {
            const data = this.courses[0];
            return {
                "name": "Tất cả môn học",
                "revenue": data.revenue,
                "kpi": data.kpi,
                "target": {
                    "total_target": data.target.total_target,
                    "total_paid_register": data.target.total_paid_register,
                },
                "register_target": {
                    "total_register_target": data.register_target.total_register_target,
                    "total_register": data.register_target.total_register,
                },
                "total_class": {
                    "total_class_full": data.total_class.total_class_full,
                    "total": data.total_class.total,
                }
            };
        }
        return this.courses && this.courses.length > 0 ? this.courses.reduce((a, b) => {
            return {
                "name": "Tất cả môn học",
                "revenue": a.revenue + b.revenue,
                "kpi": parseInt(a.kpi) + parseInt(b.kpi),
                "target": {
                    "total_target": a.target.total_target + b.target.total_target,
                    "total_paid_register": a.target.total_paid_register + b.target.total_paid_register,
                },
                "register_target": {
                    "total_register_target": a.register_target.total_register_target + b.register_target.total_register_target,
                    "total_register": a.register_target.total_register + b.register_target.total_register,
                },
                "total_class": {
                    "total_class_full": a.total_class.total_class_full + b.total_class.total_class_full,
                    "total": a.total_class.total + b.total_class.total,
                }
            };
        }) : {
            "name": "Tất cả",
            "revenue": 0,
            "kpi": 0,
            "target": {},
            "register_target": {},
            "total_class": {}
        };
    }

}
