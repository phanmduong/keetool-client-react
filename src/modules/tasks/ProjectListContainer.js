import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as taskActions from './taskActions';

class ProjectListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">


                    <div className="card">

                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>

                        <div className="card-content">
                            <h4 className="card-title">Cơ sở</h4>

                            <div style={{marginTop: "15px"}}>
                                <Link to="/base/create" className="btn btn-rose">
                                    Thêm cơ sở
                                </Link>
                            </div>

                            <Search
                                onChange={this.basesSearchChange}
                                value={this.state.query}
                                placeholder="Tìm kiếm cơ sở (tên, địa chỉ)"
                            />

                            {this.props.isLoadingBases ? <Loading/> :
                                <ListBase
                                    deleteBase={this.deleteBase}
                                    handleSwitch={this.handleSwitch}
                                    bases={this.props.bases}/>}
                        </div>
                    </div>

                    <div className="card-content">
                        <ul className="pagination pagination-primary">
                            {_.range(1, this.props.totalPages + 1).map(page => {
                                if (Number(currentPage) === page) {
                                    return (
                                        <li key={page} className="active">
                                            <a onClick={() => this.loadBases(page)}>{page}</a>
                                        </li>
                                    );
                                } else {
                                    return (
                                        <li key={page}>
                                            <a onClick={() => this.loadBases(page)}>{page}</a>
                                        </li>
                                    );
                                }

                            })}
                        </ul>
                    </div>

                </div>
            </div>
        );
    }
}

ProjectListContainer.propTypes = {
    projects: PropTypes.array.isRequired,
    taskActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        projects: state.task.projects
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer);