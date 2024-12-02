import React, { useEffect, memo } from 'react'

// My Components
import SearchBox from '../../BasicComponents/SearchBox/SearchBox'
import TypeBasedSort from '../../BasicComponents/SearchComponent/TypeBasedSort'

const NodesActions = memo(
    ({
        filterData,
        dropDownList,
        sortBy,
        sortOrder,
        onSortOrder,
        onSortBy,
        onSearch,
    }) => {
        useEffect(() => {
            if (process.env.NODE_ENV === 'development') {
                if (!dropDownList || !sortBy) {
                    console.warn('NodesActions: Missing required props')
                }
            }
        }, [dropDownList, sortBy])

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
