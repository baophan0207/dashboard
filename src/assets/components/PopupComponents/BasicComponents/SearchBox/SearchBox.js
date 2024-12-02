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

import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './SearchBox.css'
import Icon from '../../../../IconLibrary/Icon'

const SearchBox = (props) => {
    const [searchOn, setSearchOn] = useState(false)
    const [alwaysExpand, setAlwaysExpand] = useState(false)
    const [searchValue, setSearchValue] = useState(props.value)

    const searchBtnRef = useRef()
    const searchValueRef = useRef()

    const getDataFromCaller = (data) => {
        if (data.AlwaysExpand !== undefined && data.AlwaysExpand !== null) {
            if (data.AlwaysExpand) {
                setSearchOn(true)
            }
            setAlwaysExpand(data.AlwaysExpand)
        }
    }

    useEffect(() => {
        getDataFromCaller(props)
    }, [props])

    const handleClickOnSearch = () => {
        setSearchOn(!searchOn)
    }

    const handleSearchInputBox = (event) => {
        setSearchValue(event.target.value)
    }

    const keyPress = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            searchBtnRef.current.focus()
            if (props.onKeyDown) {
                props.onKeyDown()
            } else if (props.handleSearchOnClick) {
                props.handleSearchOnClick()
            }
        } else if (e.keyCode === 38) {
            e.preventDefault()
            searchValueRef.current.focus()
        }
    }

    const {
        placeholder,
        onSearch,
        fontSize,
        width,
        disabled,
        value,
        handleSearchOnClick,
        onKeyDown,
    } = props

    return (
        <div className="search-box-container">
            <div
                className="search-box-input-container"
                style={{ width: width }}
            >
                {onKeyDown || handleSearchOnClick ? (
                    <input
                        type="text"
                        ref={searchValueRef}
                        onKeyDown={keyPress}
                        style={{ fontSize: `${fontSize}px` }}
                        className="search-box-input"
                        value={value}
                        onChange={onSearch}
                        placeholder={placeholder}
                    />
                ) : (
                    <input
                        type="text"
                        ref={searchValueRef}
                        style={{ fontSize: `${fontSize}px` }}
                        className="search-box-input"
                        value={value}
                        onChange={onSearch}
                        placeholder={placeholder}
                    />
                )}
                <button ref={searchBtnRef} className="search-box-icon">
                    <Icon icon="search" size={16} />
                </button>
            </div>
        </div>
    )
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
