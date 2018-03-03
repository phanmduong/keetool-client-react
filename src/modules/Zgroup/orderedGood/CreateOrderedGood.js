/* eslint-disable no-undef */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as orderedGoodActions from "./orderedGoodAction";
import * as PropTypes from "prop-types";
import Loading from "../../../components/common/Loading";
import TooltipButton from '../../../components/common/TooltipButton';
import {Modal} from 'react-bootstrap';
import FormInputText from "../../../components/common/FormInputText";
import * as helper from "../../../helpers/helper";
import {browserHistory} from 'react-router';
import ReactSelect from 'react-select';

const textAlign = {textAlign: "right"};
const btnStyle = { marginRight: 10};

class CreateOrderedGood extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: defaultData,
            showAddModal: false,
            addModalData:defaultAddModalData,
            editIndex: -1,
        };
        this.isEditModal = false;
        this.closeAddModal = this.closeAddModal.bind(this);
        this.openAddModal = this.openAddModal.bind(this);
        this.updateFormAdd = this.updateFormAdd.bind(this);
        this.addGood = this.addGood.bind(this);
        this.remove  = this.remove.bind(this);
        this.onChangeCompany  = this.onChangeCompany.bind(this);
        this.commitData  = this.commitData.bind(this);
        this.onChangeNote  = this.onChangeNote.bind(this);
    }

    componentWillMount() {
        this.props.orderedGoodActions.loadAllGoods();
        this.props.orderedGoodActions.loadAllCompanies();
        
    }

    // componentWillReceiveProps(next){
    //     console.log(next);
    // }

    componentDidUpdate(){
        helper.setFormValidation('#form-ordered-good');
    }

    openAddModal(index){
        if(index || index === 0){
            this.isEditModal = true;
            this.setState({showAddModal: true, addModalData: this.state.data.goods[index], editIndex: index});
        }else {
            this.isEditModal = false;
            this.setState({showAddModal: true, addModalData: defaultAddModalData});
        }
    }

    closeAddModal(){
        this.setState({showAddModal: false});
    }

    updateFormAdd(e) {
        if (!e) return;
        let { addModalData } = this.state;
        if (!e.target) {
            addModalData = {...e};
        } else{
            let name = e.target.name;
            let value = e.target.value;
            addModalData = { ...addModalData, [name]: value };
        }
        this.setState({ addModalData });
    }

    onChangeCompany(e){
        if (e) {
            this.setState({ data: { ...this.state.data, company: e } });
        }
    }

    addGood(){
        if ($('#form-ordered-good').valid()) {
            if(helper.isEmptyInput(this.state.addModalData.id)){
                helper.showErrorNotification("Vui lòng chọn sản phẩm");
                return;
            }
        }else {return;}
        let {goods} = this.state.data;
        let good = this.props.goods.filter((obj) => obj.id === this.state.addModalData.id)[0];
        if(!good) return;
        if(this.isEditModal){
            goods = [...goods.slice(0, this.state.editIndex),
                {...this.state.addModalData, name: good.name},
                ...goods.slice(this.state.editIndex+1, goods.length)
                ];
        }else {
            goods = [...goods, {...this.state.addModalData,  name: good.name}];
        }

        this.setState({
            data: {...this.state.data, goods},
            showAddModal: false,
            addModalData: defaultAddModalData
        });
        helper.showNotification("Đã thêm sản phẩm");
    }

    remove(index){
        helper.confirm("warning", "Xóa","Bạn có chắc muốn xóa?", ()=>{
            let {goods} = this.state.data;
            goods = [...goods.slice(0, index),...goods.slice(index+1, goods.length)];
            this.setState({data: {...this.state.data, goods}});
        });
    }

    onChangeNote(e){
        let note = e.target.value;
        this.setState({data: {...this.state.data,note}});
    }

    commitData(){
        
        let {data} = this.state;
        let {user} = this.props;
        if(!data.company || helper.isEmptyInput(data.company.id)){
            helper.showErrorNotification("Vui lòng chọn nhà phân phối!");
            return;
        }else 
        if(!data.goods || data.goods.length == 0){
            helper.showErrorNotification("Vui lòng thêm sản phẩm!");
            return;
        }
        let res = {
            ...data,
            staff_id: user.id,
            company_id: data.company.id,
            goods: JSON.stringify(data.goods.map(
                (obj)=>{
                    return ({
                        id: obj.id,
                        price: obj.price,
                        quantity: obj.quantity,
                    });
                })
            ) ,

        };
        this.props.orderedGoodActions.createOrderedGood(res);
    }

    render() {
        console.log(this.props);
        let {isLoading, goods, companies, isCommitting} = this.props;
        let {data, showAddModal, addModalData} = this.state;
        let sumQuantity=0, sumPrice=0;
        return (
                    <div className="content">
                        <div className="container-fluid">
                            {(isLoading) ? <Loading/> :
                                <form role="form" id="form-job-assignment" onSubmit={(e) => e.preventDefault()}>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="card">
                                                <div className="card-header card-header-icon" data-background-color="rose">
                                                    <i className="material-icons">event_available</i>
                                                </div>

                                                <div className="card-content">
                                                    <h4 className="card-title">Sản phẩm</h4>
                                                    <div className="table-responsive">
                                                        <table className="table">
                                                            <thead className="text-rose">
                                                            <tr>
                                                                <th style={{width: "10%"}}>STT</th>
                                                                <th style={{width: "40%"}}>Tên</th>
                                                                <th style={textAlign}>Số lượng</th>
                                                                <th style={textAlign}>Phân loại</th>
                                                                <th style={textAlign}>Đơn giá</th>
                                                                <th style={textAlign}>Thành tiền</th>
                                                                <th>
                                                                    <TooltipButton text="Thêm sản phẩm" placement="top">
                                                                        <button style={{ float: "right"}}
                                                                                className="btn btn-fill btn-rose btn-sm"
                                                                                type="button"
                                                                                onClick={()=> this.openAddModal(null)}
                                                                        ><i className="material-icons">add</i>
                                                                        </button>
                                                                    </TooltipButton>
                                                                </th>
                                                            </tr>
                                                            </thead>
                                                            {(data && data.goods && data.goods.length >0) ?
                                                                <tbody>
                                                                {data.goods.map(
                                                                    (obj, index) => {
                                                                        let pr = obj.price * obj.quantity * 1, typeGood = "Khác";
                                                                        sumPrice += obj.price * obj.quantity ;
                                                                        sumQuantity += obj.quantity *1;

                                                                        switch(obj.type){
                                                                            case "book_comic":{
                                                                                if(data.company.discount_comic)
                                                                                sumPrice -= pr*data.company.discount_comic/100;
                                                                                typeGood = "Truyện tranh";
                                                                                break;
                                                                            }
                                                                            case "book_text":{
                                                                                if(data.company.discount_text)
                                                                                sumPrice -= pr*data.company.discount_text/100;
                                                                                typeGood = "Truyện chữ";
                                                                                break;
                                                                            }
                                                                        }

                                                                        return (
                                                                            <tr key={index}>
                                                                                <td>{index + 1}</td>
                                                                                <td>{obj.name}</td>
                                                                                <td style={textAlign}>{obj.quantity}</td>
                                                                                <td style={textAlign}>{typeGood}</td>
                                                                                <td style={textAlign}>{helper.dotNumber(obj.price)}</td>
                                                                                <td style={textAlign}>{helper.dotNumber(obj.price * obj.quantity)}</td>
                                                                                <td><div className="btn-group-action" style={{display:"flex", justifyContent: "center"}}>
                                                                                    <a data-toggle="tooltip" title="Sửa" type="button" rel="tooltip"
                                                                                        onClick={() => {
                                                                                        return this.openAddModal(index);
                                                                                        }}><i className="material-icons">edit</i>
                                                                                    </a>
                                                                                    <a data-toggle="tooltip" title="Xoá" type="button" rel="tooltip"
                                                                                        onClick={() => {
                                                                                        return this.remove(index);
                                                                                        }}><i className="material-icons">delete</i>
                                                                                    </a>
                                                                                </div></td>
                                                                            </tr>
                                                                        );
                                                                    })}
                                                                </tbody>
                                                                : 
                                                                <tbody>
                                                                    <tr><td/><td colSpan={5}>Chưa có sản phẩm</td></tr>
                                                                </tbody>

                                                            }
                                                            <tfoot style={{fontWeight: "bolder", fontSize: "1.1em"}}>
                                                                <tr>
                                                                    <td/>
                                                                    <td>Tổng</td>
                                                                    <td style={textAlign}>{sumQuantity}</td>
                                                                    <td/>
                                                                    <td/>
                                                                    <td style={textAlign}>{helper.dotNumber(sumPrice)}</td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                                    </div>
                                                    {isCommitting ?
                                                            <div className="" style={{display: "flex", flexDirection:"row-reverse",  marginTop:40 }}>
                                                                <button style={btnStyle} className="btn btn-rose disabled" type="button" disabled>
                                                                    <i className="fa fa-spinner fa-spin"/> Đang lưu...
                                                                </button>
                                                            </div>
                                                            :
                                                            <div className="" style={{display: "flex", flexDirection:"row-reverse", marginTop:40 }}>
                                                                <button
                                                                    className="btn btn-fill" type="button"
                                                                    style={btnStyle}
                                                                    onClick={() => {
                                                                        helper.confirm("warning", "Hủy bỏ", "Bạn có chắc muốn hủy không?",
                                                                            () => {
                                                                                return browserHistory.push("/business/ordered-good");
                                                                            }
                                                                        );
                                                                    }}
                                                                ><i className="material-icons">cancel</i> Hủy</button>
                                                                <button
                                                                    className="btn btn-fill btn-rose "
                                                                    style={btnStyle}
                                                                    type="button"
                                                                    onClick={this.commitData}
                                                                    disabled={isCommitting}
                                                                ><i className="material-icons">add</i>  Lưu</button>
                                                            </div>

                                                        }
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card">
                                                <div className="card-header card-header-icon" data-background-color="rose">
                                                    <i className="material-icons">local_shipping</i>
                                                </div>

                                                <div className="card-content">
                                                    <h4 className="card-title">Nhà phân phối</h4>
                                                     <div>
                                                        <label>Chọn nhà phân phối</label>
                                                        <ReactSelect
                                                            disabled={isLoading}
                                                            options={companies || []}
                                                            onChange={this.onChangeCompany}
                                                            value={data.company.id}
                                                            name="company"
                                                            defaultMessage="Chọn nhà phân phối"
                                                        />
                                                    </div>
                                                    <div><br/>
                                                        <div><label>Địa chỉ</label><br/>{data.company.office_address}</div><br/>
                                                        <div><label>Chiết khấu truyện tranh</label><br/>{data.company.discount_comic||0}%</div><br/>
                                                        <div><label>Chiết khấu truyện chữ</label><br/>{data.company.discount_text||0}%</div><br/>
                                                    </div>
                                                    <div>
                                                        <label>Ghi chú</label>
                                                        <div className="comment-input-wrapper">
                                                                <textarea
                                                                    id="textarea-card-comment"
                                                                    name="note"
                                                                    onChange={this.onChangeNote}
                                                                    value={data.note}
                                                                    onKeyUp={() => {
                                                                    }}
                                                                    placeholder="Nhập ghi chú"
                                                                    className="comment-input"
                                                                    required
                                                                    style={{
                                                                        width: "100%",
                                                                        margin: "10px",
                                                                        height: "100px",
                                                                    }}
                                                                />
                                                        </div>
                                                    </div>

                                                    
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </form>}
                        </div>
                        <Modal bsSize="small" show={showAddModal} onHide={this.closeAddModal}>
                            <Modal.Header>
                                <Modal.Title>Thuộc tính
                                    <a data-toggle="tooltip" title="Đóng" type="button" rel="tooltip"
                                       style={{float: "right", color: "gray"}}
                                       onClick={this.closeAddModal}>
                                        <i className="material-icons">highlight_off</i></a>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form role="form" id="form-ordered-good">
                                    <div>
                                        <label>Chọn sản phẩm</label>
                                        <ReactSelect
                                            options={goods || []}
                                            onChange={this.updateFormAdd}
                                            value={addModalData.id}
                                            defaultMessage="Chọn nhà sản phẩm"
                                        />
                                    </div>
                                    <FormInputText
                                        name="quantity" type="number"
                                        label="Số lượng"
                                        value={addModalData.quantity}
                                        minValue="0"
                                        updateFormData={this.updateFormAdd}
                                        placeholder="Nhập số lượng"
                                        required
                                    />
                                    <FormInputText
                                        name="price" type="number"
                                        label="Đơn giá"
                                        value={addModalData.price}
                                        minValue="0"
                                        updateFormData={this.updateFormAdd}
                                        placeholder="Nhập giá"
                                        required
                                    />
                                    <FormInputText
                                        name="" type="number"
                                        label="Thành tiền"
                                        value={addModalData.price * addModalData.quantity}
                                        updateFormData={() => {}}
                                        placeholder="Thành tiền"
                                        disabled
                                    />
                                </form>
                            </Modal.Body>
                            <Modal.Footer>

                                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                                        <button className="btn btn-fill btn-rose" type="button"
                                                onClick={this.addGood}
                                        ><i className="material-icons">add</i> Thêm
                                        </button>
                                        <button className="btn btn-fill" type="button"
                                                onClick={this.closeAddModal}
                                        ><i className="material-icons">cancel</i> Hủy
                                        </button>
                                    </div>

                            </Modal.Footer>
                        </Modal>
                    </div>

        );
    }
}

CreateOrderedGood.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isCommitting: PropTypes.bool.isRequired,
    goods: PropTypes.array,
    companies: PropTypes.array,
    orderedGoodActions: PropTypes.object,
    user: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        isLoading: state.orderedGood.isLoading,
        goods: state.orderedGood.goods,
        companies: state.orderedGood.companies,
        isCommitting: state.orderedGood.isCommitting,
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        orderedGoodActions: bindActionCreators(orderedGoodActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrderedGood);

const defaultData = {
    company: {id: "", name: ""},
    goods: [
        // {id: "1", name: "Sản phẩm 1", quantity: 1, price: 3},
        // {id: "2", name: "Sản phẩm 2", quantity: 2, price: 4},
        // {id: "3", name: "Sản phẩm 3", quantity: 3, price: 5},
    ],
    note: "",
};
const defaultAddModalData= {
    id: "",
    quantity: 0,
    price: 0,
};
