import React from "react";
import "./CommonComponent.css";
import MyCheckbox from "./BasicComponents/Checkbox/MyCheckbox";
import MyDropDown from "./BasicComponents/MyDropDown/MyDropDown";

export class SelectAll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            options: [
                {Name: "Select all in this page"},
                {Name: "Select all in all pages"}
            ],
            activeOption: "Select all in this page"
        }
    }

    componentDidMount() {
        const {checked, options, activeOption} = this.props;
        this.setState({
            checked: checked,
            activeOption,
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {checked, options, activeOption} = nextProps;
        this.setState({
            checked,
            activeOption,
            options: options ? options : this.state.options,
        })
    }

    render() {
        const {checked, activeOption} = this.state;
        const {disabled = false, onChange, onChangeSelect} = this.props;
        return (
            <div className="default-select-all-division">
                <MyCheckbox checked={checked}
                            disabled={disabled}
                            onChange={onChange}
                            className="select-all-checkbox"/>
                <MyDropDown values={this.state.options}
                            className="default-select-all-selector"
                            onChange={onChangeSelect}
                            selectedItem={activeOption}/>
            </div>
        );
    }
}