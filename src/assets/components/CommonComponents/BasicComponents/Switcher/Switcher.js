import React from "react";
import "./switcher.css";
import PropTypes from "prop-types";
import BeaconSpot from "../../BeaconSpot";

class Switcher extends React.Component{
    constructor(props) {
        super(props);
    }


    changeState(){
        let {checked} = this.props;
        checked = !checked;

        let {onChange}= this.props;
        onChange(checked)
    }

    render() {
        let {disabled,checked, openGuide, guideColor, width, height} = this.props;
        return (
            <div className={
                checked ?
                    disabled? "default-switcher active disabled"
                        :
                        "default-switcher active"
                    :
                    disabled? "default-switcher disabled"
                        :
                        "default-switcher"
            }
                 style={{width: width+"px",height: height+"px"}}
                 onClick={disabled?null:this.changeState.bind(this)}>
                <div className="default-switcher-node" style={{width: height-4+"px",height: height-4+"px"}}/>
                <BeaconSpot open={openGuide} spotStyle={{color: guideColor, left: "50%"}}/>
            </div>
        );
    }

}



Switcher.defaultProps={
    checked:false,
    openGuide: false,
    guideColor:"#51c495",
    width: 40,
    height: 18
}
Switcher.propTypes={
    onChange:       PropTypes.func.isRequired,
    checked:        PropTypes.bool.isRequired,
    openGuide:      PropTypes.bool,
    guideColor:     PropTypes.string,
    width:          PropTypes.string,
}
export default Switcher