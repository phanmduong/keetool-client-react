/**
 * Created by phanmduong on 10/20/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Search from '../../components/common/Search';
import FormInputDate from '../../components/common/FormInputDate';
import TooltipButton from '../../components/common/TooltipButton';
import ListOrder from './ListOrder';
import * as goodOrderActions from './goodOrderActions';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';

class OrdersContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: '',
            time: {
                startTime: '',
                endTime: ''
            }
        };
        this.timeOut = null;
        this.ordersSearchChange = this.ordersSearchChange.bind(this);
        this.updateFormDate = this.updateFormDate.bind(this);
        this.loadOrders = this.loadOrders.bind(this);
    }

    componentWillMount() {
        this.loadOrders();
    }

    updateFormDate(event) {
        const field = event.target.name;
        let time = {...this.state.time};
        time[field] = event.target.value;

        if (!helper.isEmptyInput(time.startTime) && !helper.isEmptyInput(time.endTime)) {
            this.props.goodOrderActions.loadAllOrders(1, this.state.query, time.startTime, time.endTime);
            this.setState({time: time, page: 1});
        } else {
            this.setState({time: time});
        }
    }

    ordersSearchChange(value) {
        this.setState({
            page: 1,
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.goodOrderActions.loadAllOrders(1, value, this.state.time.startTime, this.state.time.endTime);
        }.bind(this), 500);

    }

    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.goodOrderActions.loadAllOrders(page, this.state.query, this.state.time.startTime, this.state.time.endTime);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="flex flex-row flex-space-between">
                            <div>
                                <TooltipButton text="Bán hàng" placement="top">
                                    <button className="btn btn-rose">Bán hàng</button>
                                </TooltipButton>
                                <TooltipButton text="Đặt hàng" placement="top">
                                    <button className="btn btn-rose">Đặt hàng</button>
                                </TooltipButton>
                            </div>
                            <div>
                                <TooltipButton text="In dưới dạng pdf" placement="top">
                                    <button className="btn btn-success">
                                        <i className="material-icons">print</i> In
                                    </button>
                                </TooltipButton>
                                <TooltipButton text="Lưu dưới dạng excel" placement="top">
                                    <button className="btn btn-info">
                                        <i className="material-icons">save</i> Lưu về máy
                                    </button>
                                </TooltipButton>
                                <button rel="tooltip" data-placement="top" title="" data-original-title="Remove item"
                                        type="button" className="btn btn-info">
                                    <i className="material-icons">save</i> Lưu về máy
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose"><i
                                className="material-icons">assignment</i>
                            </div>
                            <div className="card-content">
                                <h4 className="card-title">Danh sách đơn hàng</h4>
                                <div className="row">
                                    <Search
                                        onChange={this.ordersSearchChange}
                                        value={this.state.query}
                                        placeholder="Nhập mã đơn hoặc mã/họ tên/SĐT khách hàng"
                                        className="col-md-12"
                                    />
                                    <div className="col-md-3">
                                        <FormInputDate
                                            label="Từ ngày"
                                            name="startTime"
                                            updateFormData={this.updateFormDate}
                                            id="form-start-time"
                                            value={this.state.time.startTime}
                                            maxDate={this.state.time.endTime}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <FormInputDate
                                            label="Đến ngày"
                                            name="endTime"
                                            updateFormData={this.updateFormDate}
                                            id="form-end-time"
                                            value={this.state.time.endTime}
                                            minDate={this.state.time.startTime}

                                        />
                                    </div>
                                </div>
                                <br/>

                                <ListOrder
                                    orders={this.props.orders}
                                    totalPages={this.props.totalPages}
                                    currentPage={this.state.page}
                                    loadOrders={this.loadOrders}
                                    isLoading={this.props.isLoading}
                                    totalCount={this.props.totalCount}
                                    limit={this.props.limit}
                                />

                            </div>
                            {
                                !this.props.isLoading && <div className="card-footer">
                                    <div className="float-right">
                                        <TooltipButton text="Tổng đơn hàng" placement="top">
                                            <div className="btn btn-info btn-simple">
                                                Tổng đơn hàng: {this.props.totalOrder}
                                            </div>
                                        </TooltipButton>
                                        <TooltipButton text="Tổng đơn hàng" placement="top">
                                            <div className="btn btn-danger btn-simple">
                                                Tổng tiền: {this.props.totalMoney}
                                            </div>
                                        </TooltipButton>
                                        <TooltipButton text="Tổng nợ" placement="top">
                                            <div className="btn btn-success btn-simple">
                                                Tổng nợ: {this.props.totalMoney - this.props.totalPaidMoney}
                                            </div>
                                        </TooltipButton>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

OrdersContainer.propTypes = {
    totalMoney: PropTypes.number.isRequired,
    totalOrder: PropTypes.number.isRequired,
    totalPaidMoney: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    orders: PropTypes.array.isRequired,
    goodOrderActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.goodOrders.isLoading,
        totalPages: state.goodOrders.totalPages,
        orders: state.goodOrders.orders,
        totalMoney: state.goodOrders.totalMoney,
        totalOrder: state.goodOrders.totalOrder,
        totalPaidMoney: state.goodOrders.totalPaidMoney,
        limit: state.goodOrders.limit,
        totalCount: state.goodOrders.totalCount,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodOrderActions: bindActionCreators(goodOrderActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersContainer);