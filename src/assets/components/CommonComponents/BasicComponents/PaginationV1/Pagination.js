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
import React from "react";
import PaginationContent from "./PaginationContent";
import PropTypes from 'prop-types';

class Pagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageItemsLimit: this.props.pageItemsLimit!==undefined?this.props.pageItemsLimit: 7,
            currentPage: this.props.currentPage,
            noOfPages: this.props.noOfPages
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let currentPageItems = 7;
        if (this.props.pageItemsLimit!==undefined){
            currentPageItems = this.props.pageItemsLimit
        }
        if (prevProps["currentPage"] !== this.props.currentPage || prevProps["noOfPages"] !== this.props.noOfPages  || prevProps["pageItemsLimit"] !== currentPageItems){
            this.setState({
                pageItemsLimit: currentPageItems,
                currentPage  : this.props.currentPage,
                noOfPages : this.props.noOfPages
            })
        }
    }

    handleChangePage = (pageNumber, action) => {
        let currentPage = pageNumber
        if (action !== undefined) {
            if (action === "previous") {
                currentPage = this.state.currentPage - 1
            } else if (action === "next") {
                currentPage = this.state.currentPage + 1
            } else {
                //directly clicked the page
            }
        }
        if (currentPage !== this.state.currentPage) {
            this.props.onChangePage(currentPage)
        } else {
            this.setState({
                currentPage
            })
        }
    }

    render() {
        const {currentPage, noOfPages, pageItemsLimit} = this.state;
        let {paginationType} = this.props;
        return (
            <PaginationContent
                pageItemsLimit={pageItemsLimit}
                noOfPages={noOfPages}
                currentPage={currentPage}
                onChangePage={this.handleChangePage}
                paginationType={paginationType}
                pageItemsSize={24}
            />
        )
    }
}

Pagination.defaultProps ={
    pageItemsLimit: 7,
    paginationType: 'both',
}
Pagination.propTypes = {
    paginationType: PropTypes.oneOf(['only pager','only pagination-circle','both'])
}

export default Pagination