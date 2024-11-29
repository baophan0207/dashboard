import React from "react";
import "./CommonComponent.css";
import PropTypes from "prop-types";

class BeaconSpot extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        let {spotStyle, open} = this.props;
        return (
            open?
                <div className="beacon-container"
                     style={{
                         background:spotStyle.color,
                         top:       spotStyle.top,
                         left:      spotStyle.left,
                         bottom:    spotStyle.bottom,
                         right:     spotStyle.right,
                         width:     spotStyle.size,
                         height:    spotStyle.size,
                     }}>
                    <div className="beacon-spot"/>
                </div>
                :
                null
        );
    }
}

BeaconSpot.defaultProps = {
    open: false,
    spotStyle:{
        top: "50%",
        bottom: "auto",
        left: "95%",
        right: "auto",
        color: "var(--cta-color)",
        size:"10px"
    }
}

BeaconSpot.propTypes = {
    open:       PropTypes.object.isRequired,
    spotStyle:   PropTypes.object.isRequired,
};
export default BeaconSpot