import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Button, Modal} from "react-bootstrap";
import FormInputText from "../../../components/common/FormInputText";
import Select from "react-select";
import * as addChildGoodActions from './addChildGoodActions';
import Loading from "../../../components/common/Loading";
import {isEmptyInput, showErrorNotification, showNotification} from "../../../helpers/helper";

class AddChildGoodContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.taskChange = this.taskChange.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.saveChildGood = this.saveChildGood.bind(this);
    }


    close() {
        this.props.addChildGoodActions.showAddChildGoodModal(false);
    }

    taskChange(taskOption) {
        this.props.addChildGoodActions.updateTaskId(taskOption.value);
    }

    inputChange(event) {
        let good = {...this.props.good};
        good[event.target.name] = event.target.value;
        this.props.addChildGoodActions.updateChildGoodForm(good);
    }

    saveChildGood() {
        const {good, taskId} = this.props;
        if (isEmptyInput(good.name) || isEmptyInput(good.code) || isEmptyInput(taskId) || taskId === 0) {
            showNotification("Bạn vui lòng nhập đủ tất cả các mục", "top", "right", "warning");
        } else {
            this.props.addChildGoodActions.saveChildGood({
                ...good,
                taskId: taskId
            });
        }

    }

    render() {
        return (

            <Modal show={this.props.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo sản phẩm con</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormInputText
                        name="name"
                        label="Tên"
                        updateFormData={this.inputChange}
                        value={this.props.good.name || ""}
                    />
                    <FormInputText
                        name="code"
                        updateFormData={this.inputChange}
                        label="Mã sản phẩm"
                        value={this.props.good.code || ""}
                    />
                    <div className="form-group">
                        <label>
                            Bảng xuất phát
                        </label>
                        <Select
                            name="board-id"
                            value={this.props.taskId}
                            options={this.props.tasks ? this.props.tasks.map((task) => {
                                return {
                                    ...task,
                                    value: task.id,
                                    label: task.title
                                };
                            }) : []}
                            onChange={this.taskChange}
                        />
                    </div>
                    {
                        this.props.isSaving ? <Loading/> : (
                            <div>
                                <Button
                                    onClick={this.saveChildGood}
                                    className="btn btn-rose">
                                    Lưu
                                </Button>

                                <Button onClick={this.close}>
                                    Đóng
                                </Button>
                            </div>
                        )
                    }

                </Modal.Body>
            </Modal>
        );
    }
}

AddChildGoodContainer.propTypes = {
    tasks: PropTypes.array,
    good: PropTypes.object.isRequired,
    addChildGoodActions: PropTypes.object.isRequired,
    showModal: PropTypes.bool.isRequired,
    taskId: PropTypes.number.isRequired,
    isSaving: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        good: state.task.addChildGood.good,
        tasks: state.task.cardDetail.card.tasks,
        showModal: state.task.addChildGood.showModal,
        taskId: state.task.addChildGood.taskId,
        isSaving: state.task.addChildGood.isSaving
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addChildGoodActions: bindActionCreators(addChildGoodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddChildGoodContainer);