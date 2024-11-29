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

import React from 'react';
import "./MyPagination.css";
import Pagination from "../PaginationV1/Pagination";
import MyDropDown from "../MyDropDown/MyDropDown";
import PropTypes from 'prop-types';

export default class MyPagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {
            paginationType,
            noOfPages,
            onChangePage,
            currentPage,
            pageSize,
            showPagination,
            showPageSize,
            showPaginationRow,
            onChangePageSize,
            itemList,
        } = this.props;
        return (
            showPaginationRow ?
                <div className="my-pagination-row">
                    {
                        showPageSize === true &&
                        <div className="page-size-selector-block">
                            {"Page Size:"}
                            <MyDropDown width={"100%"}
                                        height={"100%"}
                                        onChange={onChangePageSize}
                                        selectedItem={pageSize}
                                        values={itemList}
                                        className="page-size-selector"/>
                        </div>
                    }

                    {
                        showPagination &&
                        <Pagination
                            paginationType={paginationType}
                            noOfPages={noOfPages}
                            onChangePage={onChangePage}
                            currentPage={currentPage}
                        />
                    }
                </div>
                :
                null
        );
    }

}

MyPagination.defaultProps = {
    paginationType: "both",
    noOfPages: 10,
    onChangePage: () => {
    },
    currentPage: 1,
    pageSize: 100,
    showPageSize: false,
    showPagination: false,
    showPaginationRow: true,
}

MyPagination.propTypes = {
    paginationType: PropTypes.oneOf(["both", "only pagination-circle", "only pager"]),
    noOfPages: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    showPagination: PropTypes.bool,
    showPaginationRow: PropTypes.bool,
};