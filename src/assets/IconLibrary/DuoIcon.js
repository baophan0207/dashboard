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
import DuoIconLibrary from './DuoIconLibrary';
import BusinessDuoIconLibrary from './BusinessDuoIconLibrary';
import PropTypes from 'prop-types';
import {DuoIconColorList} from "./DuoIconColorList";
import {checkEmpty} from "../components/CommonComponents/CommonMethods";
import {MyTooltip} from "../components/CommonComponents/BasicComponents/Tooltip/Tooltip";

// const DefaultStyles = {display: 'inline-block', verticalAlign: 'middle', boxShadow: '1px 1px 4px #cdcdcd'};

const checkUndefined = (element) => {
    return (element !== undefined && element !== null && element.length !== 0)
}

const DuoIcon = ({
                     type,
                     title,
                     size,
                     stroke,
                     transform,
                     styles,
                     name,
                     viewBox,
                     className,
                     colorList,
                     contentList,
                     onMouseOver,
                     onClick,
                     fillRule,
                 }) => {
    let DuoIcons = type === "Business" ? BusinessDuoIconLibrary : DuoIconLibrary;
    // const style = {...DefaultStyles, styles};
    const ColorList = (
        colorList !== undefined ?
            DuoIcons[name] !== undefined ?
                DuoIcons[name].map(_ =>
                    colorList.map(colorL =>
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
            ).map(ColorList =>
                ColorList.colorList.map(colorL =>
                    colorL
                )
            )
    )
    let iconContentList = !checkEmpty(contentList) ? contentList : !checkEmpty(DuoIcons[name]) ? DuoIcons[name] : []
    if (onMouseOver !== undefined && onMouseOver !== null) {
        return (
            <MyTooltip title={title}>
                <svg
                    onMouseOver={onMouseOver}
                    onClick={onClick}
                    className={className}
                    style={styles}
                    viewBox={checkUndefined(viewBox) ? viewBox : "0 0 24 24"}
                    width={`${checkUndefined(size) ? size : 24}px`}
                    height={`${checkUndefined(size) ? size : 24}px`}
                    xmlns="https://www.w3.org/2000/svg"
                    // smlnsXlink="https://www.w3.org/1999/xlink"
                >
                    {
                        !checkEmpty(iconContentList) ?
                            iconContentList.map((_, index) => (
                                    ColorList[0] !== undefined ?
                                        fillRule !== "" ?
                                            <path d={iconContentList[index]}
                                                  fill={ColorList[0][index]}
                                                  fillRule={fillRule}
                                                  stroke={stroke} transform={transform}
                                                  key={index}
                                            />
                                            :
                                            <path d={iconContentList[index]}
                                                  fill={ColorList[0][index]}
                                                  stroke={stroke} transform={transform}
                                                  key={index}
                                            />
                                        :
                                        fillRule !== "" ?
                                            <path d={iconContentList[index]}
                                                  fill={ColorList[index]}
                                                  fillRule={fillRule}
                                                  stroke={stroke} transform={transform}
                                                  key={index}
                                            />
                                            :
                                            <path d={iconContentList[index]}
                                                  fill={ColorList[index]}
                                                  stroke={stroke} transform={transform}
                                                  key={index}
                                            />
                                )
                            )
                            :
                            console.log(">>>>:", name)
                    }
                </svg>
            </MyTooltip>
        )
    } else {
        return (
            <MyTooltip title={title}>
                <svg
                    className={className}
                    onClick={onClick}
                    style={styles}
                    viewBox={checkUndefined(viewBox) ? viewBox : "0 0 24 24"}
                    width={`${checkUndefined(size) ? size : 24}px`}
                    height={`${checkUndefined(size) ? size : 24}px`}
                    xmlns="https://www.w3.org/2000/svg"
                    // smlnsXlink="https://www.w3.org/1999/xlink"
                >
                    {
                        !checkEmpty(iconContentList) && !checkEmpty(ColorList) ?
                            iconContentList.map((_, index) => (
                                    ColorList[0] !== undefined ?
                                        fillRule !== "" ?
                                            <path d={iconContentList[index]}
                                                  fill={ColorList[0][index]}
                                                  stroke={stroke} transform={transform}
                                                  fillRule={fillRule}
                                                  key={index}
                                            />
                                            :
                                            <path d={iconContentList[index]}
                                                  fill={ColorList[0][index]}
                                                  stroke={stroke} transform={transform}
                                                  key={index}
                                            />
                                        :
                                        fillRule !== "" ?
                                            <path d={iconContentList[index]}
                                                  fill={ColorList[index]}
                                                  stroke={stroke} transform={transform}
                                                  fillRule={fillRule}
                                                  key={index}
                                            />
                                            :
                                            <path d={iconContentList[index]}
                                                  fill={ColorList[index]}
                                                  stroke={stroke} transform={transform}
                                                  key={index}
                                            />
                                )
                            )
                            :
                            console.log(">>>>:", name)
                    }
                </svg>
            </MyTooltip>
        )
    }
}
DuoIcon.defaultProps = {
    size: 24,
    stroke: '',
    styles: {},
    viewBox: "0 0 24 24",
    className: "",
    type: 'SimpleDuoIcon',
    title: "",
    fillRule: ""
}
DuoIcon.propTypes = {
    size: PropTypes.number,
    color: PropTypes.object,
    name: PropTypes.string.isRequired,
    viewBox: PropTypes.string,
    // style: PropTypes.shape(PropTypes.object),
    style: PropTypes.object,
    className: PropTypes.string,
    transform: PropTypes.string,
    colorList: PropTypes.array,
    fillRule: PropTypes.oneOf(["", "evenodd", "inherit", "nonezero"]),
    type: PropTypes.oneOf(['SimpleDuoIcon', 'Business']).isRequired,
}
export default DuoIcon;