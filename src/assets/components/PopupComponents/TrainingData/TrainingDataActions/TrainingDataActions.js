import React, { memo } from 'react'

// My Components
import SearchBox from '../../BasicComponents/SearchBox/SearchBox'
import MyCheckDrop from '../../BasicComponents/DropDown/MyCheckDrop'
import TypeBasedSort from '../../BasicComponents/SearchComponent/TypeBasedSort'

// Local imports
import '../TrainingData.css'

const TrainingDataActions = memo(
    ({
        filteredData,
        searchValue,
        handleSearch,
        dropDownList,
        selectAllItems,
        onChangeSelectAll,
        onChangeSelectItem,
        sortBy,
        sortOrder,
        onSortBy,
        onSortOrder,
    }) => {
        return (
            <div className="header-container">
                <span>
                    Assignee: <span className="special-text">AnyGen</span>
                </span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="mr8">
                        Total patents:{' '}
                        <span className="special-text">
                            {filteredData.length}
                        </span>
                    </span>
                    <div className="mr8">
                        <SearchBox
                            width="150px"
                            value={searchValue}
                            onSearch={handleSearch}
                        />
                    </div>
                    <div className="mr8">
                        <MyCheckDrop
                            title={'Columns to view'}
                            width={'fit-content'}
                            values={dropDownList}
                            selectAllItems={selectAllItems}
                            onChangeSelectAll={onChangeSelectAll}
                            onChangeSelectItem={onChangeSelectItem}
                            onChange={() => {}}
                            selectedCount={
                                dropDownList.filter((item) => item.isSelected)
                                    .length
                            }
                        />
                    </div>
                    <div>
                        <TypeBasedSort
                            sortByOptions={dropDownList}
                            sortBy={sortBy.Name}
                            sortOrder={sortOrder}
                            onChange={onSortBy}
                            onSortOrderChange={onSortOrder}
                        />
                    </div>
                </div>
            </div>
        )
    }
)

export default TrainingDataActions
