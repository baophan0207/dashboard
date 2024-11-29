import React from "react";
import "./simpleToggle.css";
import PropTypes from "prop-types";

export class SimpleToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
    }

    componentDidMount() {
        const {active} = this.props;
        this.setState({
            active
        })
    }
    componentWillReceiveProps(nextProps, nextContext) {
        const {active} = nextProps;
        this.setState({
            active
        })
    }

    render() {
        let {active} = this.state;
        let {disabled, onChange} = this.props;
        return (
            <button disabled={disabled}
                    className={active ? "simple-toggle-container active" : "simple-toggle-container"}
                    onClick={onChange}>
                <div className="simple-toggle-eye"/>
            </button>
        );
    }
}

SimpleToggle.defaultProps = {
    disabled: false,
}

SimpleToggle.propType = {
    disabled: PropTypes.bool,
    active: PropTypes.bool.isRequired,
}