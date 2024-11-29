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
import './Pagination.css'
import PropTypes from 'prop-types';

class PaginationContent extends React.Component {

    handleSelectPage(event) {
        this.props.onChangePage(Number.parseInt(event.target.value))
    }

    handleChangePage = (pageNumber, action) => {
        this.props.onChangePage(pageNumber, action)
    }

    render() {
        let {noOfPages, currentPage, pageItemsLimit, pageItemsSize, paginationType} = this.props;
        const pageNumbers = [];
        let pageItems = []
        for (let i = 1; i <= noOfPages; i++) {
            pageNumbers.push(i);
            pageItems = pageItems.concat({
                label: "Page " + i,
                value: i
            })
        }
        if (currentPage === undefined) {
            currentPage = 1
        }

        let startLimit = 3;
        startLimit = Math.floor(pageItemsLimit / 2)
        let endLimit = Math.ceil(pageItemsLimit / 2)


        const renderPageNumbers = pageNumbers.map(number => {
            // let displayRule = pageNumbers.length > pageItemsLimit ?
            //     (currentPage < (endLimit+1) ?
            //         number <= (endLimit+1)
            //         :
            //         pageNumbers.length - currentPage <= (startLimit) ?
            //             pageNumbers.length - number <= (endLimit)
            //             :
            //             (number === currentPage || number === currentPage - 1 || number === currentPage + 1))
            //     : (number >= 1)

            let displayRule = false;
            if (pageNumbers.length > pageItemsLimit) {
                if (currentPage < endLimit + 1) {
                    displayRule = number <= (endLimit + 1)
                } else if (pageNumbers.length - currentPage <= startLimit) {
                    displayRule = pageNumbers.length - number <= endLimit
                } else displayRule = number === currentPage || number === currentPage - 1 || number === currentPage + 1;
            } else {
                displayRule = number >= 1
            }

            return (
                displayRule &&
                <button
                    style={{
                        minWidth: pageItemsSize + 'px',
                        minHeight: pageItemsSize + 'px',
                        borderRadius: (pageItemsSize / 2) + 'px'
                    }}
                    key={number}
                    onClick={() => this.handleChangePage(number)}
                    className={`pagination-number ${currentPage === number && 'pagination-number-active'}`}
                >
                    {number}
                </button>
            );
        });

        const renderPageNumbersFirst = pageNumbers.map(number => {
            return (
                pageNumbers.length > pageItemsLimit && currentPage > endLimit && (number === 1) &&
                <>
                    <button
                        style={{
                            minWidth: pageItemsSize + "px",
                            minHeight: pageItemsSize + 'px',
                            borderRadius: (pageItemsSize / 2) + 'px'
                        }}
                        key={number}
                        onClick={() => this.handleChangePage(number)}
                        className={`pagination-number ${currentPage === number && 'pagination-number-active'}`}
                    >
                        {number}
                    </button>
                    <span className="pagination-dots">. . . .</span>
                </>
            )
        });

        const renderPageNumbersLast = pageNumbers.map(number => {
            return (
                pageNumbers.length > pageItemsLimit && pageNumbers.length - currentPage > startLimit && number === pageNumbers.length &&
                <>
                    <span className="pagination-dots">. . . .</span>
                    <button
                        style={{
                            minWidth: pageItemsSize + 'px',
                            minHeight: pageItemsSize + 'px',
                            borderRadius: (pageItemsSize / 2) + 'px'
                        }}
                        key={number}
                        onClick={() => this.handleChangePage(number)}
                        className={`pagination-number ${currentPage === number && 'pagination-number-active'}`}
                    >
                        {number}
                    </button>
                </>
            )
        });

        return (
            paginationType === 'only pager' ?
                <div className="pagination-container">
                    <select
                        onChange={this.handleSelectPage.bind(this)}
                        value={currentPage}
                        name={"currentPage"}
                        className="pagination-page-selector">
                        {
                            pageItems.map(eachPageInfo =>
                                <option key={eachPageInfo.value}
                                        value={eachPageInfo.value}>
                                    {eachPageInfo.label}
                                </option>
                            )
                        }
                    </select>
                </div>
                :
                paginationType === 'only pagination-circle' ?
                    <div className="pagination-container">
                        <button
                            onClick={() => this.handleChangePage(0, "previous")}
                            style={{visibility: currentPage !== 1 ? "visible" : 'hidden'}}
                            disabled={currentPage <= 1}
                            className="pagination-number-prev"
                        >
                            Prev
                        </button>

                        {renderPageNumbersFirst} {renderPageNumbers} {renderPageNumbersLast}

                        <button
                            onClick={() => this.handleChangePage(0, "next")}
                            disabled={currentPage >= pageNumbers.length}
                            style={{visibility: currentPage !== noOfPages ? 'visible' : 'hidden'}}
                            className="pagination-number-next"
                        >
                            Next
                        </button>

                    </div>
                    :
                    <div className="pagination-container">
                        {
                            pageItems.length > 5 ?
                                <select
                                    onChange={this.handleSelectPage.bind(this)}
                                    value={currentPage}
                                    name={"currentPage"}
                                    className="pagination-page-selector">
                                    {
                                        pageItems.map((eachPageInfo, index) =>
                                            <option key={index} value={eachPageInfo.value}>{eachPageInfo.label}</option>
                                        )
                                    }
                                </select>
                                :
                                null
                        }
                        <button
                            onClick={() => this.handleChangePage(0, "previous")}
                            style={{visibility: currentPage !== 1 && pageItems.length > 2 ? "visible" : 'hidden'}}
                            disabled={currentPage <= 1}
                            className="pagination-number-prev"
                        >
                            Prev
                        </button>
                        {renderPageNumbersFirst} {renderPageNumbers} {renderPageNumbersLast}
                        <button
                            onClick={() => this.handleChangePage(0, "next")}
                            disabled={currentPage >= pageNumbers.length}
                            style={{visibility: currentPage !== noOfPages && pageItems.length > 2 ? 'visible' : 'hidden'}}
                            className="pagination-number-next"
                        >
                            Next
                        </button>


                    </div>
        );
    }

}

PaginationContent.defaultProps = {
    pageItemsSize: 32,
}
PaginationContent.propTypes = {
    pageItemsSize: PropTypes.number,
}
export default PaginationContent