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

import React from 'react';
import DuoIcons from './DuoIconLibrary';
import PropTypes from 'prop-types';
import {DuoIconColorList} from "./DuoIconColorList";

const checkUndefined = (element) => {
    return (element !== undefined && element !== null && element.length !== 0)
}

const DuoIcon = ({size, stroke, transform, styles, name, viewBox, className, colorList}) => {
    const ColorList = (
        colorList !== undefined ?
            DuoIcons[name] !== undefined ?
                DuoIcons[name].map((_) =>
                    colorList.map((colorL) =>
                        colorL
                    ))
                :
                console.log(">>:", name)
            :
            DuoIconColorList.filter(DuoColor => {
                    if (DuoColor.image === name) {
                        return DuoColor
                    } else
                        return null
                }
            ).map((ColorList) => ColorList.colorList.map((colorL) => colorL))
    )
    // console.log('Size',size)
    // console.log('viewBox',viewBox)
    return (

        <svg
            className={className}
            style={styles}
            viewBox={checkUndefined(viewBox) ? viewBox : "0 0 24 24"}
            width={`${checkUndefined(size) ? size : 24}px`}
            height={`${checkUndefined(size) ? size : 24}px`}
            xmlns="https://www.w3.org/2000/svg"
            smlnsXlink="https://www.w3.org/1999/xlink"

        >
            {
                DuoIcons[name] !== undefined ?
                    DuoIcons[name].map((_, index) => (
                            ColorList[0] !== undefined ?
                                <path d={DuoIcons[name][index]}
                                      fill={ColorList[0][index]}
                                      stroke={stroke} transform={transform}
                                /> :
                                <path d={DuoIcons[name][index]}
                                      fill={ColorList[index]}
                                      stroke={stroke} transform={transform}
                                />
                        )
                    )
                    :
                    console.log(">>>>:", name)
            }
        </svg>
    )
}
DuoIcon.defaultProps = {
    size: 24,
    stroke: '',
    styles: {},
    viewBox: "0 0 24 24",
    className: ""
}
DuoIcon.propTypes = {
    size: PropTypes.number,
    color: PropTypes.object,
    name: PropTypes.string.isRequired,
    viewBox: PropTypes.string,
    style: PropTypes.shape(PropTypes.object),
    className: PropTypes.string,
    transform: PropTypes.string,
    colorList: PropTypes.array,
}
export default DuoIcon;