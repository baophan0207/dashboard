import React, { Component } from 'react'
import SearchBox from '../../BasicComponents/SearchBox/SearchBox'
import DropDown from '../../BasicComponents/DropDown/DropDown'
import Icon from '../../../../IconLibrary/Icon'
import TypeBasedSort from '../../BasicComponents/SearchComponent/TypeBasedSort'

class NodesActions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterData: [],
            dropDownFilterList: [],
            dropDownFilterValue: null,
            dropDownList: [],
            sortBy: {},
        }
    }

    componentDidMount() {
        // let dropDownList = []
        // for (let i = 0; i < this.props.filterData.length; i++) {
        //     const { DisplayName, Key, ...item } = {
        //         ...this.props.filterData[i],
        //     }
        //     dropDownList.push({ label: DisplayName, value: Key })
        // }
        this.setState({
            filterData: this.props.filterData,
            // dropDownFilterList: dropDownList,
            // dropDownFilterValue: dropDownList[0],
            dropDownList: this.props.dropDownList,
            sortBy: this.props.sortBy,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dropDownList !== prevProps.dropDownList) {
            this.setState({ dropDownList: this.props.dropDownList })
        }
    }

    handleDropDownFilterChange = (value) => {
        this.setState({ dropDownFilterValue: value })
    }

    render() {
        const {
            sortOrder,
            onSortOrder,
            handleDropDownFilterChange,
            dropDownFilterList,
            dropDownFilterValue,
            dropDownList,
            sortBy,
            onSortBy,
        } = this.props
        // const { dropDownList } = this.state
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div style={{ marginRight: '8px' }}>
                    <SearchBox onSearch={this.props.onSearch} />
                </div>
                <div>
                    <TypeBasedSort
                        sortByOptions={dropDownList}
                        sortBy={sortBy.Name}
                        sortOrder={sortOrder}
                        onChange={(sortBy) => onSortBy(sortBy)}
                        onSortOrderChange={onSortOrder}
                        width={'180px'}
                    />
                </div>
                {/*<button*/}
                {/*    // disabled={disabledSort}*/}
                {/*    className="menu-button"*/}
                {/*    onClick={onSortOrder}*/}
                {/*    style={{*/}
                {/*        backgroundColor: 'white',*/}
                {/*        border: '1px solid #cdcdcd',*/}
                {/*        borderRadius: '4px 0 0 4px',*/}
                {/*        height: '35px',*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <Icon*/}
                {/*        icon={sortOrder === 'asc' ? 'sort_up' : 'sort_down'}*/}
                {/*        size={14}*/}
                {/*    />*/}
                {/*</button>*/}
                {/*<DropDown*/}
                {/*    // icon="sort_down1"*/}
                {/*    // iconColor="black"*/}
                {/*    onChange={handleDropDownFilterChange}*/}
                {/*    list={dropDownFilterList}*/}
                {/*    value={dropDownFilterValue}*/}
                {/*/>*/}
            </div>
        )
    }
}

export default NodesActions
