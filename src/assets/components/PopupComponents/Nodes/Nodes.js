import React, { Component } from 'react'
import MyTable from '../BasicComponents/PopupTable/MyTable'
import { Headers } from './TableProps'
import './Nodes.css'

class Nodes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            header: Headers,
            data: this.props.filteredData,
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.filteredData !== this.props.filteredData) {
            this.setState({
                data: this.props.filteredData,
            })
        }
    }

    render() {
        return (
            <div className="nodes-table-container">
                <MyTable Headers={this.state.header} Data={this.state.data} />
            </div>
        )
    }
}
export default Nodes
