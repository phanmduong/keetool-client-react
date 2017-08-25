import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import * as taskActions from '../taskActions';
import ReactEditor from "../../../components/common/ReactEditor";
import {BASE_URL} from '../../../constants/env';
import Loading from "../../../components/common/Loading";

class CardDetailModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateEditor = this.updateEditor.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.saveCard = this.saveCard.bind(this);
        this.toggleEditCardDescription = this.toggleEditCardDescription.bind(this);
        this.state = {
            isEditing: false,
            description: ""
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            description: nextProps.card.description
        });
    }

    updateEditor(content) {
        this.setState({
            description: content
        });
    }

    toggleEditCardDescription() {
        // this.props.taskActions.editCardDescription();
        this.setState({
            isEditing: !this.state.isEditing
        });
    }

    saveCard() {
        this.props.taskActions
            .saveCard({...this.props.card, description: this.state.description})
            .then(() => {
                this.toggleEditCardDescription();
            });
    }

    cancelEdit() {
        this.setState({
            isEditing: false,
            description: this.props.card.description
        });
    }


    render() {
        const editTooltip = (
            <Tooltip id="tooltip">Chỉnh sửa mô tả công việc</Tooltip>
        );
        return (
            <Modal show={this.props.showModal}
                   bsSize="large" aria-labelledby="contained-modal-title-lg"
                   onHide={this.props.taskActions.closeCardDetailModal}>
                <Modal.Header closeButton>
                    <Modal.Title className="card-modal-title">{this.props.card.title}</Modal.Title>
                    <p> Trong bảng <strong>{this.props.card.board && this.props.card.board.title}</strong></p>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-sm-8">
                            <h4>
                                <strong>Mô tả</strong>
                                <OverlayTrigger placement="right" overlay={editTooltip}>
                                    <a className="card-modal-button" onClick={this.toggleEditCardDescription}>
                                        <i className="material-icons">edit</i>
                                    </a>
                                </OverlayTrigger>
                            </h4>
                            {
                                this.state.isEditing ? (
                                    <div>
                                        {
                                            this.props.isSavingCard ? (
                                                <Loading/>
                                            ) : (
                                                <div>
                                                    <ReactEditor
                                                        urlPost={BASE_URL + "/upload-image?token=" + localStorage.getItem('token')}
                                                        fileField="image"
                                                        value={this.state.description || ""}
                                                        updateEditor={this.updateEditor}/>
                                                    <button
                                                        onClick={this.saveCard}
                                                        className="btn btn-rose">Lưu
                                                    </button>
                                                    <button
                                                        onClick={this.cancelEdit}
                                                        className="btn btn-default">Huỷ
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </div>
                                ) : (
                                    //eslint-disable-next-line
                                    <div dangerouslySetInnerHTML={{__html: this.props.card.description}}>
                                    </div>
                                )
                            }
                        </div>
                        <div className="col-sm-4">
                            <h4>
                                <strong>Thêm</strong>
                            </h4>
                            <div>
                                <button className="btn btn-default">
                                    Việc cần làm
                                </button>

                            </div>
                        </div>
                    </div>


                </Modal.Body>
            </Modal>
        );
    }
}

CardDetailModalContainer.propTypes = {
    showModal: PropTypes.bool.isRequired,
    isSavingCard: PropTypes.bool.isRequired,
    taskActions: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showModal: state.task.cardDetail.showModal,
        isSavingCard: state.task.cardDetail.isSavingCard,
        card: state.task.cardDetail.card
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailModalContainer);