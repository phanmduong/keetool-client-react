import React from 'react';
import PropTypes from 'prop-types';

const Image = ({template}) => {
    return (<div
        style={{
            width: '100%',
            background: 'url(' + template.thumbnail_url + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '150px',
            borderRadius: '10px'
        }}>
    </div>);
};

const ItemTemplate = ({template, onClick, selectedTemplate}) => {

    if (template.id === selectedTemplate.id) {
        return (
            <div className="email-template email-template-selected">
                <div className="card">
                    <div className="card-content">
                        <Image template={template}/>
                    </div>
                    <div className="email-template-selected-icon">
                        <i className="material-icons">check_circle</i>
                    </div>
                </div>
            </div>
        )
    } else {

        return (
            <div className="email-template" onClick={() => onClick(template)}>
                <div className="card">
                    <div className="card-content">
                        <Image template={template}/>
                    </div>
                </div>
            </div>
        );
    }


};

ItemTemplate.propTypes = {
    onClick: PropTypes.func.isRequired,
    template: PropTypes.object.isRequired,
    selectedTemplate: PropTypes.object.isRequired,
};


export default ItemTemplate;
