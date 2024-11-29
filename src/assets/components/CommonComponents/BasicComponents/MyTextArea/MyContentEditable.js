import React from "react";
import {Component} from "react";
import './StyleSheet.css'
import ContentEditable from "react-contenteditable";
import propTypes from 'prop-types';
import {isValidData, getParseData} from "../../CommonMethods";

export default class MyContentEditable extends Component {
    constructor() {
        super()
        this.contentEditable = React.createRef();
        this.state = {
            templateType: "",
            html: "Write an essay about the impact of {topic}",
            promptFormat: "f-string"
        }
    };

    componentDidMount() {
        this.setState({
            html: this.props.children,
            templateType: this.props.templateType,
            promptFormat: this.props.promptFormat,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.templateType !== prevProps.templateType || this.props.promptFormat !== prevProps.promptFormat) {
            this.setState({
                templateType: this.props.templateType,
                html: this.props.children,
                promptFormat: this.props.promptFormat,
            })
        }
    }

    handleChangePromptText = (event) => {
        // event.preventDefault()
        let eventValue = event.target.value;
        console.log("#content editable change: ", event.target.value)
        let extractedText = this.extractTextContent(eventValue)
        let emptyCase = false
        if (extractedText === "") {
            emptyCase = true
        }
        if (emptyCase) {
            this.setState({
                html: extractedText
            })
        } else {
            this.setState({
                html: eventValue
            })
        }
        if (this.props.originalTextNeeded === true){
            this.props.onUpdateChanges(extractedText, event.target.value)
        }else{
            this.props.onUpdateChanges(extractedText)
        }
    }

    extractTextContent(s) {
        let span = document.createElement("span");
        span.innerHTML = s;
        return span.textContent || span.innerText
    }

    getPromptTextCodedForEachText = (text, originalText, matchType) => {
        let preparedDiv = ""
        if (matchType === 1) {
            preparedDiv += "{"
            let dynamicVariable = text.slice(1, text.length - 1)
            preparedDiv += "<span class='coded-color'>" + dynamicVariable + "</span>"
            preparedDiv += "}"

        } else if (matchType === 2) {
            let dynamicVariable = text.slice(0, text.length - 1)
            preparedDiv += "<span class='coded-color'>" + dynamicVariable + "</span>"
            preparedDiv += "}"

        } else if (matchType === 3) {
            preparedDiv += "{"
            let dynamicVariable = text.slice(1, text.length)
            preparedDiv += "<span class='coded-color'>" + dynamicVariable + "</span>"

        } else if (matchType === 4) {
            preparedDiv = "<span class='coded-color'>" + originalText + "</span>"
        } else {
            preparedDiv = text
        }
        return preparedDiv
    }

    getPromptTextWithCodedColor = (promptText) => {
        console.log("#getPromptTextWithCodedColor: ", promptText)
        // promptText = this.extractTextContent(promptText)
        let promptFormat = this.state.promptFormat // if the text is extracted, cursor is not ok anymore
        // check for dynamic variable included or not
        let preparedDiv = ""
        if (isValidData(promptText)) {
            let splitArrWithSpace = promptText.split(" ")
            if (splitArrWithSpace.length === 1) {
                let originalText = splitArrWithSpace[0]
                originalText = originalText.replace(/[\u200B-\u200D\uFEFF]/g, '')
                let text = originalText.trim()

                if (promptFormat === "f-string") {
                    let matchType;
                    // check for {{}}, {{}, {}}
                    if (text.startsWith("{{") && text.endsWith("}}")) {
                        matchType = 1
                    } else if (text.startsWith("{{") && text.endsWith("}")) {
                        matchType = 2
                    } else if (text.startsWith("{") && text.endsWith("}}")) {
                        matchType = 3
                    } else if (text.startsWith("{") && text.endsWith("}")) {
                        matchType = 4
                    } else {
                        matchType = 5
                    }

                    preparedDiv += this.getPromptTextCodedForEachText(text, originalText, matchType)
                } else {
                    if (text.startsWith("{{") && text.endsWith("}}")) {
                        preparedDiv = "<span class='coded-color'>" + originalText + "</span>"
                    } else {
                        preparedDiv = text
                    }
                }
            } else {
                let originalText = splitArrWithSpace[0]
                originalText = originalText.replace(/[\u200B-\u200D\uFEFF]/g, '')
                // let text = originalText.trim()
                // let {foundDynamicVariable, foundCase} = checkDynamicVariableByPromptFormat(text, promptFormat)
                // if (foundDynamicVariable) {
                //     if (promptFormat === "f-string") {
                //         preparedDiv += this.getPromptTextCodedForEachText(text, originalText, foundCase)
                //     } else {
                //         preparedDiv += "<span class='coded-color'>" + originalText + "</span>";
                //     }
                // } else {
                //     preparedDiv += text
                // }
                //
                // for (let index = 1; index < splitArrWithSpace.length; index++) {
                //     preparedDiv += " " // since it is separated with space
                //     originalText = splitArrWithSpace[index]
                //     let text = originalText.trim()
                //     let {foundCase, foundDynamicVariable} = checkDynamicVariableByPromptFormat(text, promptFormat)
                //     if (foundDynamicVariable) {
                //         if (promptFormat === "f-string") {
                //             preparedDiv += this.getPromptTextCodedForEachText(text, originalText, foundCase)
                //         } else {
                //             preparedDiv += "<span class='coded-color'>" + originalText + "</span>";
                //         }
                //     } else {
                //         preparedDiv += originalText
                //     }
                // }
            }
        }
        return preparedDiv
    }

    render() {
        let {html} = this.state
        let {fontSize, placeholder, color, disabled, border, className} = this.props;
        let styleInfo = {
            display: "block",
            // background: "lightgray",
            // padding: "3px"
        }
        // if (this.state.html.length > 0) {
        //     if (this.state.html.length === 1) {
        //         // check if the text includes characters or not
        //         let replaceText = this.state.html.replace(/[\u200B-\u200D\uFEFF]/g, '')
        //         if (replaceText.length !== 0) {
        //             styleInfo = {
        //                 display: "inline"
        //             }
        //         }
        //     } else {
        //         styleInfo = {
        //             display: "inline"
        //         }
        //     }
        // }
        // console.log("#style info for content editable: ", styleInfo)
        return (
            <ContentEditable
                innerRef={this.contentEditable}
                style={styleInfo}
                tagName="span"
                // tagName="pre"
                placeholder={placeholder}
                className={className}
                // className={html.length === 0 ? `testing-content-editable-empty ${className}` : `testing-content-editable ${className}`}
                // html={this.getPromptTextWithCodedColor(this.state.html)}
                html={this.state.html}
                disabled={disabled === true}
                onChange={(event) => this.handleChangePromptText(event)}
            />
        )
    }
}

export class SimpleContentEditable extends Component {
    constructor(props) {
        super(props)
        this.contentEditable = React.createRef();
        this.state = {
            html: this.props.html,
            newLineBreak: false,
            textList: [],
            replaceKeyword: "#$#"
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {textList = []} = nextProps;
        this.setState({
            html: nextProps.html,
            textList
        })
    }

    removeTags = (str) => {
        if ((str === null) || (str === '')) {
            return "";
        } else {
            str = str.toString();
            return str.replace(/(<([^>]+)>)/ig, this.state.replaceKeyword);
        }
    }

    getTextList = (html) => {
        let textList = []
        if (html) {
            if (html === "<br>") {

            } else {
                let splitArr = html.split("<br>")
                let hasTextDataByIndex = {}
                // console.log("#Split with <br>: ", splitArr)
                splitArr.map((eachText, index) => {
                    if (isValidData(eachText)) {
                        let textAfterRemoved = this.removeTags(getParseData(eachText))
                        let innerSplitArr = textAfterRemoved.split(this.state.replaceKeyword)
                        // console.log("#innerSplitArr: ", innerSplitArr)
                        let innerTextList = []
                        let foundText = false
                        innerSplitArr.map(eachInnerText => {
                            if (isValidData(eachInnerText)) {
                                // console.log("#eachInnerText: ", eachInnerText)
                                if (eachInnerText.includes("\n")) {
                                    innerTextList = innerTextList.concat(eachInnerText.split("\n"))
                                } else {
                                    innerTextList.push(eachInnerText)
                                }
                                foundText = true
                            }
                        })
                        if (textAfterRemoved === eachText) {
                            foundText = false
                        }

                        if (eachText === "</div><div>") {
                            foundText = true
                        }
                        hasTextDataByIndex[index] = foundText

                        if (index > 0) {
                            if (innerTextList.length === 0) {
                                // check if the previous one ends with div or not
                                if (splitArr[index - 1].endsWith("<div>")) {
                                    textList.push("") // add empty text list
                                }
                            } else {
                                // if (hasTextDataByIndex[index - 1] === true && ) {
                                //     textList.push("")
                                // }
                                if (hasTextDataByIndex[index - 1] === true && splitArr[index - 1].endsWith("<div>")) {
                                    textList.push("")
                                }
                            }
                        }
                        textList = textList.concat(innerTextList)
                    } else {
                        textList.push("")
                    }
                })
            }
        }
        return textList
    }

    handleChange = evt => {
        let html = evt.target.value;
        let textList = []
        if (html) {
            textList = this.getTextList(html)
        }
        console.log("#html : ", html)
        console.log("#textList : ", textList)
        if (html === "<br>") {
            html = ""
        }
        this.setState({
            html: html,
            textList
        });
        this.props.onUpdateChanges({html, textList})
    };

    sanitizeConf = {
        allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
        allowedAttributes: {a: ["href"]}
    };

    onKeyDown = (e) => {
        // console.log("#keydown: ", e.keyCode)
        // if (e.keyCode === 13) {
        //     this.setState({
        //         newLineBreak: true,
        //     })
        // }
    }

    render() {
        let {fontSize, placeholder, color, disabled, border, className} = this.props;
        let styleInfo = {
            display: "block",
        }

        console.log("SimpleContentEditable: ", this.state.html)
        return (
            <ContentEditable
                className={className}
                style={styleInfo}
                placeholder={placeholder}
                tagName="pre"
                html={this.state.html} // innerHTML of the editable div
                disabled={disabled} // use true to disable edition
                onChange={this.handleChange} // handle innerHTML change
                onKeyDown={this.onKeyDown}
                // onBlur={this.sanitize}
            />
        )
    }
}

MyContentEditable.defaultProps = {
    color: '#000000',
    fontSize: '14px',
    border: 'none',
    placeholder: 'Write an essay about the impact of {{topic}} on {{impacted_area}}',
    className: '',
    children: '',
}

MyContentEditable.propTypes = {
    color: propTypes.string,
    fontSize: propTypes.string,
    border: propTypes.string,
    placeholder: propTypes.string,
    disabled: propTypes.bool,
    className: propTypes.string,
}



