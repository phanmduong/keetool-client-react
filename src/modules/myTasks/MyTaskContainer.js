import React from 'react';
import PropTypes from 'prop-types';
import Week from "./Week";
import Store from './store';
import moment from "moment";
import {observer} from "mobx-react";
import Loading from "../../components/common/Loading";
import * as globalModalActions from "../../modules/globalModal/globalModalActions";
import {CHANNEL} from "../../constants/env";
import socket from "../../services/socketio";
import {DATETIME_FORMAT_SQL} from "../../constants/constants";
import {getShortName} from "../../helpers/helper";
import SelectEmployee from "./SelectEmployee";

@observer
class MyTaskContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tab: 1
        };
        this.store = new Store();
    }

    componentDidMount() {
        moment.locale('vi');
        this.store.selectedEmployee = this.props.user;
        this.store.selectedDate = new Date();
        // this.store.selectedDate = this.store.selectedDate.setDate(this.store.selectedDate.getDate() - 1);
        this.store.getTasks(this.updateTotalTask);
        this.store.getAnalyticsTasks();

        this.store.getEmployees();
        const channel = CHANNEL + ":task";
        socket.on(channel, (data) => {
            if (data) {
                if (moment(data.deadline, DATETIME_FORMAT_SQL).format("DD/MM/YYYY") == moment(this.store.selectedDate).format("DD/MM/YYYY")) {
                    if (data.user && data.user.id == this.props.user.id) {
                        this.store.tasks = [data, ...this.store.tasks];
                    } else {
                        this.store.tasks = this.store.tasks.map((task) => {
                            if (task.id == data.id) {
                                return {
                                    ...task,
                                    ...data,
                                };
                            }
                            return task;
                        });
                    }
                    this.updateTotalTask();
                }
            }
        });
    }

    updateTotalTask = () => {
        const {tasksNotComplete} = this.store;
        if (moment(this.store.selectedDate).format("DD/MM/YYYY") == moment(new Date()).format("DD/MM/YYYY")
            && this.store.selectedEmployee.id == this.props.user.id)
            this.props.updateTotalTask(tasksNotComplete.length);
    };

    onClickTask = (task) => {
        let regexModalInfoStudent = /\/*sales\/info-student\/[0-9]+\/*\S*/;
        if (regexModalInfoStudent.test(task.open_url))
            globalModalActions.openModalRegisterDetail(task.open_url);
    }

    render() {
        const {selectedDate, isLoading, tasksCompleted, tasksNotComplete} = this.store;
        const {tab} = this.state;
        const tasks = tab == 1 ? tasksNotComplete : tasksCompleted;
        const nameSelectedDate = moment(selectedDate).locale("vi").format('dddd') + " " +
            moment(selectedDate).locale("vi").format('L');
        return (

            <div className="my-task">
                <div className="task-header">
                    <div className="action-right">
                        <SelectEmployee store={this.store} user={this.props.user}/>
                    </div>
                    <div className="title"> Việc cần làm</div>
                    <div className="subtitle">{nameSelectedDate}</div>
                </div>
                <Week store={this.store} updateTotalTask={this.updateTotalTask}/>

                {
                    isLoading ? <Loading/> :
                        <div className="tab-task">
                            <ul className="nav nav-pills nav-pills-dark" data-tabs="tabs">
                                <li className={tab == 1 ? "active" : ""} onClick={() => this.setState({tab: 1})}>
                                    <a>Cần làm ({tasksNotComplete.length})</a>
                                </li>
                                <li className={tab == 2 ? "active" : ""} onClick={() => this.setState({tab: 2})}>
                                    <a>Đã hoàn thành({tasksCompleted.length})</a>
                                </li>
                            </ul>
                            <div className="list-task">
                                <div>
                                    {tasks.map((task) => {
                                        return (
                                            <div className="item-task" onClick={() => this.onClickTask(task)}>
                                                <div className="task-icon"
                                                     style={{backgroundColor: task.task_list.color}}
                                                     dangerouslySetInnerHTML={{__html: task.task_list.icon}} />
                                                <div className="task-content">
                                                    <div className="task-title">
                                                        {task.title}
                                                        {
                                                            task.register && task.register.saler &&
                                                            <div className="tag"
                                                                 style={{backgroundColor: "#" + task.register.saler.color}}>
                                                                {getShortName(task.register.saler.name)}
                                                            </div>
                                                        }

                                                    </div>
                                                    <div>
                                                        {task.task_list.title} - {task.remain_time}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                }
            </div>
        );
    }
}

MyTaskContainer.propTypes = {
    user: PropTypes.object,
};

export default MyTaskContainer;