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

import "./confidenceThresholdSlider.css";
import {createMuiTheme} from "@material-ui/core/styles";
import Slider, {
    SliderThumb,
} from "@mui/material/Slider";
import {withStyles} from "@material-ui/styles";
import React from "react";
import PropTypes from "prop-types";
import {isValidData} from "../CommonMethods";

function ConfidenceThresholdThumb(props, value) {
    const {children, ...other} = props;
    let textValue = "0"
    if (isValidData(value)) {
        if (value === 0) {
            textValue = 0
        } else {
            if (Number.isInteger(value)) {
                textValue = "." + value
            } else {
                let roundValue = Math.ceil(value)
                textValue = "." + roundValue
            }
        }
    }
    return (
        <SliderThumb {...other}>
            {children}
            <div className="confidence-threshold">
                {textValue}
            </div>
        </SliderThumb>
    );
}

const ConfidenceThresholdSlider = (props) => {
    let {value, minValue, maxValue, onChange} = props;
    const [testValue, setTestValue] = React.useState(30);

    //onChange?: (event: Event, value: number | number[], activeThumb: number) => void;
    //   /**
    //    * Callback function that is fired when the `mouseup` is triggered.
    //    *
    //    * @param {React.SyntheticEvent | Event} event The event source of the callback. **Warning**: This is a generic event not a change event.
    //    * @param {number | number[]} value The new value.
    //    */
    //   onChangeCommitted?: (event: React.SyntheticEvent | Event, value: number | number[]) => void;

    const muiTheme = createMuiTheme({
        overrides: {
            MuiSlider: {
                thumb: {
                    color: "yellow",
                },
                track: {
                    color: 'red'
                },
                rail: {
                    color: 'black'
                }
            }
        }
    });

    const CustomSliderStyles = {
        '& .MuiSlider-thumb': {
            width: "20px !important",
            height: "20px !important",
            display: "flex !important",
            alignItems: "center !important",
            justifyContent: "center !important",
            fontSize: "10px !important",
        },
        '& .MuiSlider-track': {
            backgroundImage: "linear-gradient(51deg, rgba(203,59,59,1) 2%, rgba(210,90,143,1) 65%, rgba(220,129,54,1) 100%)",
            height: "5px !important",
            borderRadius: "5px !important",
            opacity: "100% !important",
            border: "none !important"
        },
        '& .MuiSlider-rail': {
            backgroundImage: `linear-gradient(51deg, rgba(213,220,54,1) ${value}%, rgba(90,210,126,1) ${value + 12}%, rgba(28,152,92,1) 100%)`,
            height: "5px !important",
            borderRadius: "5px !important",
            opacity: "100% !important",
            border: "none !important",
        },
        '& .MuiSlider-active': {
            color: "#f5e278"
        }
    };

    const AmountSlider = createMuiTheme({
        rail: {
            backgroundImage: `linear-gradient(51deg, rgba(213,220,54,1) ${value}%, rgba(90,210,126,1) ${value + 12}%, rgba(28,152,92,1) 100%)`,
            height: "5px !important",
            borderRadius: "5px !important",
            opacity: "100% !important",
            border: "none !important",
        },
        track: {
            backgroundImage: "linear-gradient(51deg, rgba(203,59,59,1) 2%, rgba(210,90,143,1) 65%, rgba(220,129,54,1) 100%)",
            height: "5px !important",
            borderRadius: "5px !important",
            opacity: "100% !important",
            border: "none !important"
        },
        thumb: {
            width: "20px !important",
            height: "20px !important",
            display: "flex !important",
            alignItems: "center !important",
            justifyContent: "center !important",
            fontSize: "10px !important",
        },
        overrides: {
            MuiSlider: {
                rail: {
                    backgroundImage: `linear-gradient(51deg, rgba(213,220,54,1) ${value}%, rgba(90,210,126,1) ${value + 12}%, rgba(28,152,92,1) 100%)`,
                    height: "5px !important",
                    borderRadius: "5px !important",
                    opacity: "100% !important",
                    border: "none !important",
                },
                track: {
                    backgroundImage: "linear-gradient(51deg, rgba(203,59,59,1) 2%, rgba(210,90,143,1) 65%, rgba(220,129,54,1) 100%)",
                    height: "5px !important",
                    borderRadius: "5px !important",
                    opacity: "100% !important",
                    border: "none !important"
                },
                thumb: {
                    width: "20px !important",
                    height: "20px !important",
                    display: "flex !important",
                    alignItems: "center !important",
                    justifyContent: "center !important",
                    fontSize: "10px !important",
                },
            }
        }
    });

    const ConfidenceThresholdSlider = withStyles({
        rail: {
            backgroundImage: `linear-gradient(51deg, rgba(213,220,54,1) ${value}%, rgba(90,210,126,1) ${value + 12}%, rgba(28,152,92,1) 100%)`,
            height: "5px !important",
            borderRadius: "5px !important",
            opacity: "100% !important",
            border: "none !important",
        },
        track: {
            backgroundImage: "linear-gradient(51deg, rgba(203,59,59,1) 2%, rgba(210,90,143,1) 65%, rgba(220,129,54,1) 100%)",
            height: "5px !important",
            borderRadius: "5px !important",
            opacity: "100% !important",
            border: "none !important"
        },
        thumb: {
            width: "20px !important",
            height: "20px !important",
            display: "flex !important",
            alignItems: "center !important",
            justifyContent: "center !important",
            fontSize: "10px !important",
        },
    })(Slider);

    const handleChangeSlider = (event, sliderValue, activeThumb) => {
        // console.log("#handle change slider: ", event)
        // console.log("#sliderValue: ", sliderValue)
        // console.log("#activeThumb: ", activeThumb)
        value = sliderValue
        onChange(value)
    }

    const handleChangeSliderCommitted = (event, sliderValue, activeThumb) => {
        console.log("#handle change slider committed: ", sliderValue, ", ", activeThumb)
    }

    const handleChange = (event, newValue) => {
        setTestValue(newValue);
    };

    return (
        <div className="confidence-threshold-slider">
            <Slider sx={CustomSliderStyles}
                    onChange={(event, sliderValue, activeThumb) => handleChangeSlider(event, sliderValue, activeThumb)}
                    min={minValue}
                    max={maxValue}
                    value={value}
                    step={1}
                    slots={{thumb: (thumbProps) => ConfidenceThresholdThumb(thumbProps, value)}}
            />

            {/*<ThemeProvider theme={muiTheme}>*/}
            {/*    <Slider min={18} max={90} defaultValue={40} />*/}
            {/*</ThemeProvider>*/}

            {/*<ThemeProvider theme={AmountSlider}>*/}
            {/*    <Slider*/}
            {/*        onChange={(event, sliderValue, activeThumb) => handleChangeSlider(event, sliderValue, activeThumb)}*/}
            {/*        min={minValue}*/}
            {/*        max={maxValue}*/}
            {/*        value={value}*/}
            {/*        step={1}*/}
            {/*        // marks={true}*/}
            {/*        slots={{thumb: (thumbProps) => ConfidenceThresholdThumb(thumbProps, value)}}*/}
            {/*    />*/}
            {/*</ThemeProvider>*/}

            {/*<ThemeProvider theme={ConfidenceThresholdSlider}>*/}
            {/*    <Slider*/}
            {/*        onChange={(event, sliderValue, activeThumb) => handleChangeSlider(event, sliderValue, activeThumb)}*/}
            {/*        min={minValue}*/}
            {/*        max={maxValue}*/}
            {/*        value={value}*/}
            {/*        step={1}*/}
            {/*        slots={{thumb: (thumbProps) => ConfidenceThresholdThumb(thumbProps, value)}}*/}
            {/*    />*/}
            {/*</ThemeProvider>*/}

            {/*<ConfidenceThresholdSlider*/}
            {/*    onChange={(event, sliderValue, activeThumb) => handleChangeSlider(event, sliderValue, activeThumb)}*/}
            {/*    min={minValue}*/}
            {/*    max={maxValue}*/}
            {/*    value={value}*/}
            {/*    step={1}*/}
            {/*    // marks={true}*/}
            {/*    slots={{thumb: (thumbProps) => ConfidenceThresholdThumb(thumbProps, value)}}*/}
            {/*/>*/}
        </div>
    );
};

export default ConfidenceThresholdSlider;

ConfidenceThresholdSlider.defaultProps = {
    minValue: 0,
    maxValue: 100
}
ConfidenceThresholdSlider.propTypes = {
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
}
