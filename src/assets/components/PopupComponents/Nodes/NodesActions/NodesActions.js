import React, { memo } from 'react'

// My Components
import SearchBox from '../../BasicComponents/SearchBox/SearchBox'
import TypeBasedSort from '../../BasicComponents/SearchComponent/TypeBasedSort'

const NodesActions = memo(
    ({ dropDownList, sortBy, sortOrder, onSortOrder, onSortBy, onSearch }) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '8px' }}>
                    <SearchBox onSearch={onSearch} />
                </div>
                <div>
                    <TypeBasedSort
                        sortByOptions={dropDownList}
                        sortBy={sortBy.Name}
                        sortOrder={sortOrder}
                        onChange={onSortBy}
                        onSortOrderChange={onSortOrder}
                        width={'180px'}
                    />
                </div>
            </div>
        )
    }
)

export default NodesActions
