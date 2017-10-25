import React from 'react';
import ButtonGroupAction from '../../../components/common/ButtonGroupAction';
import TooltipButton from '../../../components/common/TooltipButton';
import * as helper from '../../../helpers/helper';

class ListGood extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        $('#datatables-goodorders').DataTable({
            dom: '<fl<t>ip>',
            pagingType: "full_numbers",
            lengthMenu: [
                [-1, 10, 25, 50],
                ["Tất cả", 10, 25, 50]
            ],
            iDisplayLength: 10,
            responsive: true,
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Nhập mã barcode hoặc tên hàng hóa",
                lengthMenu: "<div>Hiển thị</div> _MENU_ <div>sản phẩm</div>",
                zeroRecords: "Không tìm thấy sản phẩm",
                infoEmpty: "Không tìm thấy sản phẩm",
                infoFiltered: "(Đã tìm trong _MAX_ sản phẩm)",
                info: "Hiển thị từ _START_ đến _END_ trên _TOTAL_ sản phẩm",
                paginate: {
                    first: "Đầu",
                    last: "Cuối",
                    previous: "Trước",
                    next: "Tiếp",
                },
                emptyTable: "Không có sản phẩm",
            },
            columns: [
                { responsivePriority: 3 },
                { responsivePriority: 2 },
                { responsivePriority: 4 },
                { responsivePriority: 8 },
                { responsivePriority: 6 },
                { responsivePriority: 7 },
                { responsivePriority: 1 },
                { responsivePriority: 5 }
            ]
        });
    }

    componentDidUpdate() {
        $('.dataTables_filter label div').removeClass("form-group-sm");
    }

    render() {
        let totalMoneyAll = 0;
        return (

            <div className="material-datatables">
                <table id="datatables-goodorders" className="table table-striped table-no-bordered table-hover"
                       width="100%">
                    <thead className="text-rose">
                    <tr>
                        <th>STT</th>
                        <th>Mã hàng</th>
                        <th>Tên hàng</th>
                        <th>Số lượng</th>
                        <th>Giá bán</th>
                        <th>Chiết khấu</th>
                        <th>Thành tiền</th>
                        <th className="disabled-sorting"/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.goodOrders.map((goodOrder, index) => {
                            let totalMoney = goodOrder.quantity * goodOrder.price;

                            if (goodOrder.discount_money) {
                                totalMoney -= goodOrder.discount_money;
                            } else {
                                if (goodOrder.discount_percent) {
                                    totalMoney *= (100 - goodOrder.discount_percent) / 100;
                                }
                            }

                            totalMoneyAll += totalMoney;

                            return (
                                <tr key={index}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {goodOrder.code}
                                    </td>
                                    <td>{goodOrder.name}</td>
                                    <td>
                                        {goodOrder.quantity}
                                    </td>
                                    <td>{helper.dotNumber(goodOrder.price)}đ</td>
                                    <td>
                                        <div style={{display: 'inline-block'}}>
                                            {(goodOrder.discount_money || goodOrder.discount_percent) &&
                                            <TooltipButton text="Giảm giá" placement="top">
                                                <div className="flex-row-center">
                                                    <i className="material-icons">card_giftcard</i>
                                                    {goodOrder.discount_money ? helper.dotNumber(goodOrder.discount_money) + 'đ'
                                                        : goodOrder.discount_percent + '%'}
                                                </div>
                                            </TooltipButton>
                                            }
                                        </div>


                                    </td>
                                    <td className="text-align-right">{helper.dotNumber(Math.round(totalMoney))}đ</td>
                                    <td>
                                        <ButtonGroupAction/>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                    <tfoot>
                    <tr>
                        <th/>
                        <th><b>Tổng</b></th>
                        <th className="text-align-right" colSpan="5">
                            <b>{helper.dotNumber(totalMoneyAll)}đ</b>
                        </th>
                        <th/>
                    </tr>
                    <tr>
                        <th/>
                        <th>
                            <b>Giảm</b>
                        </th>
                        <th className="text-align-right" colSpan="5">
                            <b>0%</b>
                        </th>
                        <th/>
                    </tr>
                    <tr>
                        <th/>
                        <th>
                            <b>Thuế</b>
                        </th>
                        <th className="text-align-right" colSpan="5">
                            <b>0%</b>
                        </th>
                        <th/>
                    </tr>
                    <tr>
                        <th/>
                        <th>
                            <h4><b>Phải trả</b></h4>
                        </th>
                        <th className="text-align-right" colSpan="5">
                            <h4><b>{helper.dotNumber(totalMoneyAll)}đ</b></h4>
                        </th>
                        <th/>
                    </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}


export default ListGood;
