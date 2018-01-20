import React from 'react';
import ButtonGroupAction from './ButtonGroupAction';
import PropTypes from 'prop-types';

class HistoryExtensionList extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state          = {
            openModal: false,
        };
        this.deleteHistory = this.deleteHistory.bind(this);
        this.acceptHistory = this.acceptHistory.bind(this);

    }
    deleteHistory(id){
        this.props.deleteHistory(id);
    }
    acceptHistory(id){
        this.props.acceptHistory(id);
    }
    render(){
        return (
            <div className="table-responsive">

                <table id="datatables"
                       className="table table-hover"
                       cellSpacing="0" width="100%" style={{width: "100%"}}>
                    <thead className="text-rose">
                    <tr>
                        <th/>
                        <th>Nhân viên</th>
                        <th>Công việc</th>
                        <th>Deadline</th>
                        <th>Deadline mới</th>
                        <th>Lí do</th>
                        <th>Phạt</th>
                        <th>Trạng thái</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map((data)=>{
                            return(
                                <tr key={data.id}>
                                    <td/>
                                    <td>
                                        <a onClick={()=>{return this.props.openStaffModal(data.staff.id);}}>
                                            {data.staff.name}</a>
                                    </td>
                                    <td>
                                        <a onClick={()=>{return this.props.openInfoModal(data.work);}}>
                                            {data.work.name}</a>
                                    </td>
                                    <td>{data.deadline ? data.deadline : "0000-00-00 00:00:00"}</td>
                                    <td>{data.new_deadline ? data.new_deadline : "0000-00-00 00:00:00"}</td>
                                    <td>{data.reason}</td>
                                    <td>{data.penalty}</td>
                                    <td>{
                                        (data.status === "") ?
                                            ( <ButtonGroupAction
                                            object={data}
                                            delete={this.deleteHistory}
                                            accept={this.acceptHistory}
                                            />
                                            )    : (data.status === "Refuse") ?
                                                        <div style={{color: "#bc250c"}}>Đã từ chối</div>
                                                        : <div style={{color: "#03bc16"}}>Đã chấp nhận</div>
                                    }</td>

                                    <td/>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
HistoryExtensionList.propTypes= {
    data : PropTypes.array.isRequired,
    deleteHistory : PropTypes.func,
    acceptHistory : PropTypes.func,
    openInfoModal : PropTypes.func,
    openStaffModal : PropTypes.func,
};
export default HistoryExtensionList;