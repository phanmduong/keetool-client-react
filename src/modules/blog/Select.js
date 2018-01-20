import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as blogActions from './blogActions';


class Select extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.timeOut = null;
        // console.log(this.props.categoriesList, "SSSSSSSSSSS");
    }

    componentWillMount(){
        this.props.blogActions.getCategories();
    }

    componentDidMount() {
        $('.selectpicker').selectpicker();
    }
    render(){
        return(
            <div style={{marginTop: 5, marginLeft: -3}}>
                <select
                    value={this.props.category_id}
                    onChange={(event) => this.props.loadByCategory(event.target.value)}
                    className="selectpicker"
                    data-style="btn btn-rose">
                    <option selected disabled value={-1}>{"Chọn theo nhóm"}
                    </option>
                    <option value={0}>{"Tất cả"}
                    </option>

                    {this.props.categoriesList !== null && this.props.categoriesList !== undefined&&
                    this.props.categoriesList.map((item, key) => {
                        return (
                            <option
                                key={key}
                                value={item.id}
                            >
                                { item.name}
                            </option>);
                    })}
                </select>
            </div>
        );
    }
}
Select.propTypes = {
    loadByCategory: PropTypes.func.isRequired,
    categoriesList: PropTypes.array.isRequired,
    category_id: PropTypes.number.isRequired,
    blogActions: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return{
        categoriesList : state.blog.categoriesList,
    };
}
function mapDispatchToProps(dispatch) {
    return{
        blogActions : bindActionCreators(blogActions,dispatch),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Select);