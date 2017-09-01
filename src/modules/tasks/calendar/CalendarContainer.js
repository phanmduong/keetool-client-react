import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as taskActions from '../taskActions';
import Loading from "../../../components/common/Loading";

class ProjectListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initFullCalendar = this.initFullCalendar.bind(this);
    }

    componentWillMount() {
        this.props.taskActions.loadCalendarEvents(this.props.user.id);
    }

    componentDidUpdate() {
        this.initFullCalendar(this.props.calendarEvents);
    }

    componentDidMount() {
        this.initFullCalendar(this.props.calendarEvents);
    }

    initFullCalendar() {

        const calendarEvents = this.props.calendarEvents;
        let $calendar = $('#calendar');

        let today = new Date();

        console.log(calendarEvents);

        $calendar.fullCalendar({
            viewRender: function (view, element) {
                if (view.name != 'month') {
                    $(element).find('.fc-scroller').perfectScrollbar();
                }
            },
            header: {
                left: 'title',
                center: 'month,agendaWeek,agendaDay',
                right: 'prev,next,today'
            },
            defaultDate: today,
            selectable: true,
            selectHelper: true,
            views: {
                month: { // name of view
                    titleFormat: 'MMMM YYYY'
                    // other view-specific options here
                },
                week: {
                    titleFormat: " MMMM D YYYY"
                },
                day: {
                    titleFormat: 'D MMM, YYYY'
                }
            },

            select: function () {

            },
            editable: false,
            eventLimit: true,
            events: calendarEvents
        });
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">event_note</i>
                        </div>

                        <div className="card-content">
                            <h4 className="card-title">Lịch làm việc</h4>
                        </div>
                        {
                            this.props.isLoading ? <Loading/> : (
                                <div id="calendar" style={{padding: "20px"}}>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

ProjectListContainer.propTypes = {
    taskActions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    calendarEvents: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.login.user,
        calendarEvents: state.personalCalendar.calendarEvents,
        isLoading: state.personalCalendar.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer);