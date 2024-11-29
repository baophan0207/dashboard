import
    React from "react";
import {Component} from "react";
import './StyleSheet.css'
import ContentEditable from "react-contenteditable";
import propTypes from 'prop-types'


export default class MyTextArea extends Component{
    constructor() {
        super()
        this.contentEditable = React.createRef();
        this.state = {
            html:''
        }
    };

    componentDidMount() {
        this.setState({html:this.props.children})
    }

    handleChange = e => {
        this.setState({html: e.target.value},()=>{
            this.props.handleValue(e)
        });
    };





    render() {
        let {html} = this.state
        let {fontSize,placeHolder,color,disabled,border,className} = this.props
        let StyledObject = {
            color:color,
            fontSize:fontSize,
            border:border
        }
        console.log(html.length)



        return(
            <ContentEditable
                innerRef={this.contentEditable}
                html={html}
                disabled={disabled}
                onChange={this.handleChange}
                tagName='span'
                placeholder={placeHolder}
                className={ html.length === 0 ? `testing-content-editable-empty ${className}` : `testing-conte  nt-editable ${className}`}
                style={StyledObject}
            />
        )}
}


MyTextArea.defaultProps = {
    color: '#000000',
    fontSize: '14px',
    border: 'none',
    placeholder:'It is empty...',
    className:'',
    children:'John Wick',
}

MyTextArea.propTypes ={
    color:propTypes.string,
    fontSize:propTypes.string,
    border:propTypes.string,
    placeholder: propTypes.string,
    disabled:propTypes.bool,
    className: propTypes.string,
}