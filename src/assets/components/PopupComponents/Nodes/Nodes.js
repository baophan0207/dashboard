import React, { useState, useEffect } from 'react'

// My Components
import MyTable from '../BasicComponents/PopupTable/MyTable'

// Local imports
import { Headers } from './TableProps'
import './Nodes.css'

const Nodes = ({ filteredData }) => {
    const [data, setData] = useState(filteredData)

    useEffect(() => {
        setData(filteredData)
    }, [filteredData])

    return (
        <div className="nodes-table-container">
            <MyTable Headers={Headers} Data={data} />
        </div>
    )
}

export default Nodes
