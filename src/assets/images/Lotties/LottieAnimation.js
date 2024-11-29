import React from "react";
import Lottie from "react-lottie";
import {AnimationList} from "./AnimationList";
import PropTypes from "prop-types";
import PageNotFound from "./Animations/404Error.json";
import BlinxLogo from "./Animations/blinxLogo.json";
import Dashboard from "./Animations/dashboard.json";
import FourHoop from "./Animations/four_hoop.json";
import Moon from "./Animations/moon.json";
import Organization from "./Animations/organization.json";
import Planet from "./Animations/planet.json";
import Search from "./Animations/searching.json";
import Welcome from "./Animations/welcome.json";
import BlueWelcome from "./Animations/welcome_blue.json";
import UnderConstruction from "./Animations/underConstruction.json";
import UnderConstruction1 from "./Animations/underConstruction1.json";
import UnderConstruction2 from "./Animations/underConstruction2.json";
import BuildingApp from './Animations/download_progress.json';
import CellLoader from './Animations/Cell_Loader.json';

 class LottieAnimation extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        let {lotti, width, height, className, blendMode}=this.props;
        return (
            <div className={className} style={{ height:height, width:width, mixBlendMode: blendMode }}>

            <Lottie options={{
                    loop: true,
                    autoplay: true,
                    animationData: AnimationList[lotti],
                    rendererSettings: {preserveAspectRatio: "xMidYMid slice",}
                }} height={height} width={width} />
            </div>
        );
    }
};

LottieAnimation.defaultProps = {
    className: "default-lotti-size",
    blendMode: "unset"
}
LottieAnimation.propsType = {
    lotti : PropTypes.oneOf([
        "PageNotFound",
        "BlinxLogo",
        "Dashboard",
        "FourHoop",
        "Moon",
        "Organization",
        "Planet",
        "Search",
        "Welcome",
        "BlueWelcome",
        "UnderConstruction",
        "UnderConstruction1",
        "UnderConstruction2",
        "RoeStructure",
        "BuildingApp",
        "CellLoader"
    ]).isRequired,
    className: PropTypes.string.isRequired,
}

export default LottieAnimation;