import React from 'react';
import './comboBox.css';

class DropDownBox extends React.Component{
    constructor(props) {
        super(props);
        this.state ={

        }
    }

    render() {
        return(
            <div className='dropdown-list-container'>
                <button className='dropdown-content-container'>
                    <label></label>
                    <button>

                    </button>
                </button>
                <div className='dropdown-content-list-container'>

                </div>
            </div>
        )
    }
}
export default DropDownBox;