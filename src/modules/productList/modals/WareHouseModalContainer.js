import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import * as modalProductAction from './modalProductAction';
import WareHouseTab from './WareHouseTab';
import HistoryTab from "../../inventoryGood/HistoryTab";
import Loading from "../../../components/common/Loading";

class WareHouseModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Modal show={this.props.wareHouseModal}
                   onHide={() => this.props.showWareHouseModal(this.props.productEditing.productPresent)}>
                <a onClick={() => this.props.showWareHouseModal(this.props.productEditing.productPresent)}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Danh sách kho chứa sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container" style={{width: '100%'}}>
                        <div className="row">
                            <div className="col-sm-12 nav-tabs-wrapper">
                                <ul className="nav nav-tabs">
                                    <li className={this.props.showWareHouse && "active"}><a
                                        onClick={this.props.modalProductAction.openWareHouseTab}>Danh sách kho hàng</a>
                                    </li>
                                    <li className={!this.props.showWareHouse && "active"}><a
                                        onClick={this.props.modalProductAction.openHistoryTab}>Lịch sử xuất nhập</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            {
                                this.props.isLoadingHistoryModal ? <Loading/> : (
                                    <div className="col-sm-12">
                                        {
                                            this.props.showWareHouse ?
                                                <WareHouseTab
                                                    productPresent={this.props.productEditing.productPresent}/> :
                                                <HistoryTab
                                                    histories={this.props.histories}
                                                    inventoryInfo={this.props.inventoryInfo}/>
                                        }
                                    </div>
                                )
                            }
                            <div className="col-sm-4"/>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

WareHouseModalContainer.propTypes = {
    histories: PropTypes.array.isRequired,
    wareHouseModal: PropTypes.bool,
    inventoryInfo: PropTypes.object.isRequired,
    modalProductAction: PropTypes.object.isRequired,
    showWareHouseModal: PropTypes.func.isRequired,
    productEditing: PropTypes.object.isRequired,
    showWareHouse: PropTypes.bool,
    isLoadingHistoryModal: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        inventoryInfo: state.inventoryGood.inventoryChecking.inventoryInfo,
        histories: state.inventoryGood.inventoryChecking.histories,
        wareHouseModal: state.productList.modalInProduct.wareHouseModal,
        productEditing: state.productList.productEditing,
        showWareHouse: state.productList.showWareHouse,
        isLoadingHistoryModal: state.inventoryGood.isLoadingHistoryModal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        modalProductAction: bindActionCreators(modalProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WareHouseModalContainer);