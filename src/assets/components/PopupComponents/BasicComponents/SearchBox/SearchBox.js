/*

 Copyright (c) 2016-2023, AnyGen AI Inc.  All rights reserved.


 IMPORTANT - PLEASE READ THIS CAREFULLY BEFORE ATTEMPTING TO USE ANY SOFTWARE,

 DOCUMENTATION, OR OTHER MATERIALS.

 This software is the confidential and proprietary information of AnyGen AI Inc

 ("Confidential Information") and is protected by applicable copyright or other

 intellectual property laws and treaties. All title and ownership rights in and

 to the software (including but not limited to any source code, images,

 photographs, animations, video, audio, music, text embedded in the software),

 the intellectual property embodied in the software, and any trademarks or

 service marks of AnyGen AI Inc. that are used in connection with the

 software, are and shall at all times remain exclusively owned by AnyGen AI,

 Inc. and its licensors.  Under no circumstances shall you disclose such

 Confidential Information and trade secrets, distribute, disclose or otherwise

 make available to any third party any portion of the software's source code

 and shall use it only in accordance with the terms of the license agreement

 enclosed with this product or as entered into with AnyGen AI, Inc.


 You are prohibited from any attempt to disassemble the code, or attempt in

 any manner to reconstruct, discover, reuse or modify any source code or

 underlying algorithms of the software.


 THIS SOFTWARE IS PROVIDED "AS IS" AND THERE ARE NO WARRANTIES, CLAIMS OR

 REPRESENTATIONS MADE BY AnyGen AI, INC., OR ITS LICENSORS, SUBSIDIARIES

 AND AFFILIATES, EITHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WARRANTIES

 OF QUALITY, PERFORMANCE, NON-INFRINGEMENT, MERCHANTABILITY, OR FITNESS FOR

 A PARTICULAR PURPOSE, NOR ARE THERE ANY WARRANTIES CREATED BY COURSE OF

 DEALING, COURSE OF PERFORMANCE, OR TRADE USAGE. AnyGen AI, INC. DOES NOT

 WARRANT THAT THIS SOFTWARE WILL MEET ANY CLIENT'S NEEDS OR BE FREE FROM

 ERRORS, OR THAT THE OPERATION OF THE SOFTWARE WILL BE UNINTERRUPTED.
*/

import React from 'react'
import PropTypes from 'prop-types'
import './SearchBox.css'
import Icon from '../../../../IconLibrary/Icon'

class SearchBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchOn: false,
            AlwaysExpand: false,
            searchValue: this.props.value,
        }
        this.searchBtnRef = React.createRef()
        this.searchValueRef = React.createRef()
    }

    componentDidMount() {
        this.getDataFromCaller(this.props)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.getDataFromCaller(nextProps)
    }

    getDataFromCaller(data) {
        if (data.AlwaysExpand !== undefined && data.AlwaysExpand !== null) {
            let { AlwaysExpand } = data
            if (AlwaysExpand) {
                this.setState({
                    onSearch: true,
                })
            }
            this.setState({
                AlwaysExpand: AlwaysExpand,
            })
        }
    }

    handleClickOnSearch() {
        let searchOn = !this.state.searchOn
        this.setState({
            searchOn,
        })
    }

    handleSearchInputBox(event) {
        this.setState({
            searchValue: event.target.value,
        })
    }

    keyPress = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            this.searchBtnRef.current.focus()
            if (
                this.props.onKeyDown !== undefined &&
                this.props.onKeyDown !== null
            ) {
                this.props.onKeyDown()
            } else if (
                this.props.handleSearchOnClick !== undefined &&
                this.props.handleSearchOnClick !== null
            ) {
                this.props.handleSearchOnClick()
            }
        } else if (e.keyCode === 38) {
            e.preventDefault()
            this.searchValueRef.current.focus()
        }
    }

    render() {
        let {
            placeholder,
            onSearch,
            fontSize,
            width,
            disabled,
            value,
            handleSearchOnClick,
            onKeyDown,
        } = this.props
        return (
            <div className="search-box-container">
                <div
                    className="search-box-input-container"
                    style={{ width: width }}
                >
                    {(onKeyDown !== undefined && onKeyDown !== null) ||
                    (handleSearchOnClick !== undefined &&
                        handleSearchOnClick !== null) ? (
                        <input
                            type="text"
                            ref={this.searchValueRef}
                            onKeyDown={(event) => this.keyPress(event)}
                            style={{ fontSize: fontSize + 'px' }}
                            className="search-box-input"
                            value={value}
                            onChange={onSearch}
                            placeholder={placeholder}
                        />
                    ) : (
                        <input
                            type="text"
                            ref={this.searchValueRef}
                            style={{ fontSize: fontSize + 'px' }}
                            className="search-box-input"
                            value={value}
                            onChange={onSearch}
                            placeholder={placeholder}
                        />
                    )}
                    <button className="search-box-icon">
                        <Icon icon="search" size={16} />
                    </button>
                </div>
            </div>
        )
    }
}

SearchBox.defaultProps = {
    AlwaysExpand: false,
    placeholder: 'Search...',
    disabled: false,
    searchSize: '100%',
    fontSize: 12,
}

SearchBox.propTypes = {
    placeholder: PropTypes.string,
    onSearch: PropTypes.func,
    width: PropTypes.string,
    fontSize: PropTypes.number,
    disabled: PropTypes.bool,
}
export default SearchBox
