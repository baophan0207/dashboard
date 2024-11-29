/*
 *
 *
 *  Copyright (c) 2016-2023, AnyGen AI Inc.  All rights reserved.
 *
 *
 *  IMPORTANT - PLEASE READ THIS CAREFULLY BEFORE ATTEMPTING TO USE ANY SOFTWARE,
 *
 *  DOCUMENTATION, OR OTHER MATERIALS.
 *
 *  This software is the confidential and proprietary information of AnyGen AI Inc
 *
 *  ("Confidential Information") and is protected by applicable copyright or other
 *
 *  intellectual property laws and treaties. All title and ownership rights in and
 *
 *  to the software (including but not limited to any source code, images,
 *
 *  photographs, animations, video, audio, music, text embedded in the software),
 *
 *  the intellectual property embodied in the software, and any trademarks or
 *
 *  service marks of AnyGen AI Inc. that are used in connection with the
 *
 *  software, are and shall at all times remain exclusively owned by AnyGen AI,
 *
 *  Inc. and its licensors.  Under no
 *   circumstances shall you disclose such
 *
 *  Confidential Information and trade secrets, distribute, disclose or otherwise
 *
 *  make available to any third party any portion of the software's source code
 *
 *  and shall use it only in accordance with the terms of the license agreement
 *
 *  enclosed with this product or as entered into with AnyGen AI, Inc.
 *
 *
 *  You are prohibited from any attempt to disassemble the code, or attempt in
 *
 *  any manner to reconstruct, discover, reuse or modify any source code or
 *
 *  underlying algorithms of the software.
 *
 *
 *  THIS SOFTWARE IS PROVIDED "AS IS" AND THERE ARE NO WARRANTIES, CLAIMS OR
 *
 *  REPRESENTATIONS MADE BY AnyGen AI, INC., OR ITS LICENSORS, SUBSIDIARIES
 *
 *  AND AFFILIATES, EITHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WARRANTIES
 *
 *  OF QUALITY, PERFORMANCE, NON-INFRINGEMENT, MERCHANTABILITY, OR FITNESS FOR
 *
 *  A PARTICULAR PURPOSE, NOR ARE THERE ANY WARRANTIES CREATED BY COURSE OF
 *
 *  DEALING, COURSE OF PERFORMANCE, OR TRADE USAGE. AnyGen AI, INC. DOES NOT
 *
 *  WARRANT THAT THIS SOFTWARE WILL MEET ANY CLIENT'S NEEDS OR BE FREE FROM
 *
 *  ERRORS, OR THAT THE OPERATION OF THE SOFTWARE WILL BE UNINTERRUPTED.
 * /
 */

import React from 'react'
import './StyleSheet.css'
import PropTypes from 'prop-types'
import SearchBox from '../SearchBox/SearchBox'
import Icon from '../../../../IconLibrary/Icon'
import TypeBasedSort from './TypeBasedSort'
import { MultiColumnsSearchBox } from '../CommonMethods'

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // sortOrder: "Ascending",
            sortByOptions: [
                { Name: 'Name', MenuName: 'name' },
                { Name: 'Created at', MenuName: 'created_at' },
            ],
            sortBy: 'name',
            searchValue: this.props.searchValue,
            sortOrder: 'asc',
            disabledSort: false,
            sortByHashmap: {},
            searchBy: '',
            searchByOptions: [],
        }
    }

    componentDidMount() {
        const {
            searchValue,
            disabledSearchBtn,
            sortBy,
            sortOrder,
            disabledSort,
            sortByOptions,
            searchBy,
            searchByOptions,
        } = this.props
        this.setState({
            sortByOptions,
            searchValue,
            disabledSearchBtn,
            sortBy,
            sortOrder,
            disabledSort: disabledSort === true,
            searchBy,
            searchByOptions,
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {
            searchValue,
            disabledSearchBtn,
            sortBy,
            sortOrder,
            disabledSort,
            sortByOptions,
            searchBy,
            searchByOptions,
        } = nextProps
        this.setState({
            sortByOptions,
            searchValue,
            disabledSearchBtn,
            sortBy,
            sortOrder,
            disabledSort: disabledSort === true,
            searchBy,
            searchByOptions,
        })
    }

    render() {
        let {
            onSearch,
            onFilter,
            onSortOrder,
            onSortBy,
            searchBoxWidth,
            searchBoxPlaceholder,
            searchBarType,
            sortType,
            sortWidth,
            searchBox,
            sort,
            filter,
            handleSearchOnClick,
            onChangeSearchColumnName,
        } = this.props
        const { disabled = false, searchValue, disabledSearchBtn } = this.state
        const {
            sortBy,
            sortByOptions,
            sortOrder,
            disabledSort,
            searchBy,
            searchByOptions,
        } = this.state
        return (
            <div
                className={
                    disabled === true
                        ? 'default-search-bar disabled'
                        : 'default-search-bar'
                }
            >
                {searchBox === true ? (
                    searchBarType === 'default' ? (
                        <SearchBox
                            width={searchBoxWidth}
                            onSearch={onSearch}
                            // handleSearchOnClick={handleSearchOnClick}
                        />
                    ) : (
                        <MultiColumnsSearchBox
                            width={searchBoxWidth}
                            itemList={searchByOptions}
                            searchColumnName={searchBy}
                            searchValue={searchValue}
                            value={searchValue}
                            disabled={disabledSearchBtn}
                            placeholder={searchBoxPlaceholder}
                            disableSearchBtn={disabledSearchBtn}
                            handleChangeSearchColumnName={
                                onChangeSearchColumnName
                            }
                            handleChangeSearchValue={onSearch}
                            handleSearchOnClick={handleSearchOnClick}
                        />
                    )
                ) : null}
                {sort && sortType === 'default' ? (
                    <button
                        disabled={disabledSort}
                        className="menu-button"
                        onClick={onSortOrder}
                    >
                        <Icon
                            icon={sortOrder === 'asc' ? 'sort_up' : 'sort_down'}
                            size={14}
                        />
                    </button>
                ) : (
                    <TypeBasedSort
                        disabled={disabledSort}
                        width={sortWidth}
                        sortByOptions={sortByOptions}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        onChange={(sortBy) => onSortBy(sortBy)}
                        onSortOrderChange={onSortOrder}
                    />
                )}
                {filter && (
                    <button className="menu-button" onClick={onFilter}>
                        <Icon icon="filter" size={14} />
                    </button>
                )}
            </div>
        )
    }
}

SearchBar.defaultProps = {
    onSearch: () => {},
    onFilter: () => {},
    onSort: () => {},
    onSortOrder: () => {},
    sortOptionList: [{ Name: 'Name' }, { Name: 'Creation Date' }],
    searchBoxWidth: '200px',
    searchBoxPlaceholder: 'Search',
    searchBarType: 'default',
    sortType: 'default',
    searchBox: true,
    filter: false,
    sort: true,
    sortWidth: '150px',
}

SearchBar.propTypes = {
    onSearch: PropTypes.func,
    onFilter: PropTypes.func,
    onSort: PropTypes.func,
    sortWidth: PropTypes.string,
    onSortOrder: PropTypes.func, //ascending, descending
    sortOptionList: PropTypes.arrayOf(
        PropTypes.shape({
            Name: PropTypes.string,
        })
    ),
    searchBoxWidth: PropTypes.any,
    searchBoxPlaceholder: PropTypes.string,
    searchBarType: PropTypes.oneOf(['default', 'type based search']),
    sortType: PropTypes.oneOf(['default', 'type based sort']),
    searchBox: PropTypes.bool,
    filter: PropTypes.bool,
    sort: PropTypes.bool,
}
