import React from "react";
import "./toggleButton.css"
class SimpleToggleButton extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            status: "off"
        }
    }

    render() {

        return (
            <div className="simple-toggle-btn" onClick={()=>this.setState({status: this.state.status==="on"? "off": "on"})}>
                <div className="simple-toggle-btn-eye" style={{marginLeft: this.state.status === "off"?0:"50%"}}/>
            </div>
        );
    }

}

export default SimpleToggleButton