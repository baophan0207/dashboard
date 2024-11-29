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
 var React = require('react');
var CanvasJS = require('./canvasjs.min');
CanvasJS = CanvasJS.Chart ? CanvasJS : window.CanvasJS;

class CanvasJSChart extends React.Component {
	static _cjsContainerId = 0
	constructor(props) {		
		super(props);		
		this.options = props.options ? props.options : {};		
		this.containerProps = props.containerProps ? props.containerProps : {width: "100%", position: "relative"};
		this.containerProps.height = props.containerProps && props.containerProps.height ? props.containerProps.height : this.options.height ? this.options.height + "px" : "400px";
		this.chartContainerId = "canvasjs-react-chart-container-" + CanvasJSChart._cjsContainerId++;
	}	
	componentDidMount() {
		//Create Chart and Render		
		this.chart = new CanvasJS.Chart(this.chartContainerId, this.options);
		this.chart.render();
		
		if(this.props.onRef)
			this.props.onRef(this.chart);
	}	
    shouldComponentUpdate(nextProps, nextState){
		//Check if Chart-options has changed and determine if component has to be updated
        return !(nextProps.options === this.options);
    }
	componentDidUpdate() {
		//Update Chart Options & Render
		this.chart.options = this.props.options;
		this.chart.render();
	}
	componentWillUnmount() {
		//Destroy chart and remove reference
		this.chart.destroy();
		if(this.props.onRef)
			this.props.onRef(undefined);
	}		
	render() {		
		//return React.createElement('div', { id: this.chartContainerId, Style: this.containerProps });
		return <div id = {this.chartContainerId} style = {this.containerProps}/>		
	}	
}

let CanvasJSReact = {
    CanvasJSChart: CanvasJSChart,
    CanvasJS: CanvasJS
};

export default CanvasJSReact;
