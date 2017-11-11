import React from 'react';
import PropTypes from "prop-types";
import WareHouseModalContainer from "./modals/WareHouseModalContainer";
import AvatarModalContainer from "./modals/AvatarModalContainer";
import PriceModalContainer from "./modals/PriceModalContainer";
import {dotNumber} from "../../helpers/helper";
import {Link} from "react-router";

class ProductListComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="material-datatables">
                <table id="imported-goods-table" className="table" width="100%">
                    <thead>
                    <tr className="text-rose">
                        <th/>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá bán</th>
                        <th>Nhóm hàng</th>
                        <th>Nhà sản xuất</th>
                        <th>Kho</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.products.map((product) => {
                            return (
                                <tr key={product.id}>
                                    <td>
                                        <img style={{
                                            width: "30px",
                                            height: "30px",
                                            borderRadius: "50%",
                                            verticalAlign: "middle",
                                            background: "url(" + product.avatar_url + ") center center / cover",
                                            display: "inline-block",
                                            float: "right",
                                            marginLeft: "3px"
                                        }} data-toggle="tooltip" title="" type="button"
                                             rel="tooltip"
                                             data-original-title="Batman"/>
                                    </td>
                                    <td style={{width: "130px"}}>
                                        <a className="text-name-student-register"
                                           rel="tooltip" title=""
                                           data-original-title="Remove item"
                                           onClick={() => this.props.showAvatarModal(product)}>{product.code}</a>
                                    </td>
                                    <td style={{width: "130px"}}>{product.name}</td>
                                    <td style={{width: "95px"}}>{product.quantity}</td>
                                    <td>
                                        <a onClick={() => this.props.showPriceModal(product)}>
                                            {dotNumber(product.price)}đ
                                        </a>
                                    </td>
                                    <td style={{width: "115px"}}>
                                        {product.good_category_id ?
                                            this.props.categories.filter(category => category.id === product.good_category_id)[0].name : "Chưa có"
                                        }
                                    </td>
                                    <td style={{width: "120px"}}>
                                        {product.manufacture_id ?
                                            this.props.manufactures.filter(manufacture => manufacture.id === product.manufacture_id)[0].name : "Chưa có"
                                        }
                                    </td>
                                    <td>
                                        <a className="text-name-student-register"
                                           rel="tooltip" title=""
                                           data-original-title="Remove item"
                                           onClick={() => this.props.showWareHouseModal(product)}>
                                            {
                                                !product.warehouses ? (
                                                    <p>Chưa có</p>
                                                ) : (
                                                    <p>{product.warehouses.length}</p>
                                                )
                                            }
                                        </a>
                                    </td>
                                    <td>
                                        <div className="btn-group-action">
                                            <Link to={`/good/${product.id}/edit`}
                                                  style={{color: "#878787"}}
                                                  data-toggle="tooltip" title=""
                                                  type="button" rel="tooltip"
                                                  data-original-title="Sửa"><i
                                                className="material-icons">edit</i></Link>
                                            <a style={{color: "#878787"}}
                                               data-toggle="tooltip" title=""
                                               type="button" rel="tooltip"
                                               data-original-title="Xoá"><i
                                                className="material-icons">delete</i></a>
                                            <a style={{color: "#878787"}}
                                               data-toggle="tooltip" title=""
                                               type="button" rel="tooltip"
                                               data-original-title="Ngừng kinh doanh">
                                                <i className="material-icons">pause</i></a>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
                <PriceModalContainer
                    showPriceModal={this.props.showPriceModal}/>
                <WareHouseModalContainer
                    showWareHouseModal={this.props.showWareHouseModal}/>
                <AvatarModalContainer
                    showAvatarModal={this.props.showAvatarModal}/>
            </div>
        );
    }
}

ProductListComponent.propTypes = {
    products: PropTypes.array.isRequired,
    showPriceModal: PropTypes.func.isRequired,
    showWareHouseModal: PropTypes.func.isRequired,
    showAvatarModal: PropTypes.func.isRequired,
    setTable: PropTypes.func.isRequired,
    manufactures: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired
};

export default ProductListComponent;