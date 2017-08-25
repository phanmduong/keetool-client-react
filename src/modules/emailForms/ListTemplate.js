import React from 'react';
import PropTypes from 'prop-types';
import ItemTemplate from './ItemTemplate';

class ListTemplate extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                {this.props.templates.map(template => {
                    return (
                        <ItemTemplate
                            key={template.id}
                            template={template}
                            onClick={this.props.onClickItem}
                        />
                    );
                })}
            </div>
        );
    }
}

ListTemplate.propTypes = {
    templates: PropTypes.array.isRequired,
    onClickItem: PropTypes.func.isRequired
};

export default ListTemplate;