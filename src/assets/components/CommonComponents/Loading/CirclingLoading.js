import React from 'react';
import './loading.css';
class CirclingLoading extends React.Component{
    render() {
        return (
            <div className='main-loading-container'>
                 <div className="circling-loader">
                     <div id="circling-loader-1" className="circling-loader-circular"/>
                     <div id="circling-loader-2" className="circling-loader-circular"/>
                     <div id="circling-loader-3" className="circling-loader-circular"/>
                     <div id="circling-loader-4" className="circling-loader-circular"/>
                     <div id="circling-loader-5" className="circling-loader-circular"/>
                     <div id="circling-loader-6" className="circling-loader-circular"/>
                     <div id="circling-loader-7" className="circling-loader-circular"/>
                     <div id="circling-loader-8" className="circling-loader-circular"/>
                 </div>
                <div className="two-circle-loading-text">
                        {
                            this.props.loadingText !== undefined && this.props.loadingText !== null?
                                this.props.loadingText
                                :
                                null
                        }
                    </div>
            </div>
        );
    }

}
export default CirclingLoading;