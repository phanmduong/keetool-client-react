import React from 'react';
import PropTypes from 'prop-types';


class ListChildCustomer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <table id="property-table" className="table dataTable" role="grid"
                               aria-describedby="property-table_info">
                            <thead>
                            <tr className="text-rose" role="row">
                                <th className="sorting" tabIndex="0"
                                    aria-controls="property-table" rowSpan="1" colSpan="1"
                                    aria-sort="ascending"
                                    aria-label="Tên thuộc tính: activate to sort column descending"
                                >Tên khách hàng
                                </th>
                                <th className="sorting" tabIndex="0"
                                    aria-controls="property-table" rowSpan="1" colSpan="1"
                                    aria-label="Giá trị khả dụng: activate to sort column ascending"
                                >Số điện thoại
                                </th>
                                <th className="sorting" tabIndex="0"
                                    aria-controls="property-table" rowSpan="1" colSpan="1"
                                    aria-label="Đơn vị khả dụng: activate to sort column ascending"
                                >Địa chỉ
                                </th>
                                <th className="sorting" tabIndex="0"
                                    aria-controls="property-table" rowSpan="1" colSpan="1"
                                    aria-label="Người tạo: activate to sort column ascending"
                                > Ngày mua cuối
                                </th>
                                <th className="sorting" tabIndex="0"
                                    aria-controls="property-table" rowSpan="1" colSpan="1"
                                    aria-label="Người tạo: activate to sort column ascending"
                                >Tổng tiền hàng
                                </th>
                                <th className="sorting" tabIndex="0"
                                    aria-controls="property-table" rowSpan="1" colSpan="1"
                                    aria-label="Người tạo: activate to sort column ascending"
                                > Tiền trả hàng
                                </th>
                                <th className="sorting" tabIndex="0"
                                    aria-controls="property-table" rowSpan="1" colSpan="1"
                                    aria-label="Người tạo: activate to sort column ascending"
                                > Tiền nợ
                                </th>
                                <th className="sorting_disabled" rowSpan="1" colSpan="1"
                                    aria-label style={{width: 52}}/>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.customersList && this.props.customersList.map(
                                () => {
                                    return (
                                        <tr role="row" className="even">
                                            <td className="sorting_1">Tác giả</td>
                                            <td>Hùng, Quân, Gào, Thét</td>
                                            <td>VND, USD</td>
                                            <td>Nguyễn Việt Hùng</td>
                                            <td/>
                                            <td/>
                                            <td/>
                                            <td>
                                                <div className="btn-group-action">
                                                    <div style={{display: 'inline-block'}}>
                                                        <a data-toggle="tooltip" title type="button"
                                                           rel="tooltip"
                                                           data-original-title="Sửa">
                                                            <i className="material-icons">edit</i>
                                                        </a>
                                                    </div>
                                                    <a data-toggle="tooltip" title type="button"
                                                       rel="tooltip" data-original-title="Xoá">
                                                        <i className="material-icons">delete</i>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>

                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

ListChildCustomer.propTypes = {
    customersList: PropTypes.array,
};


export default ListChildCustomer;