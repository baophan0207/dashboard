import { DefaultCellProps } from '../../CommonComponents/MyTable/TableProps'

export const Headers = [
    {
        DisplayName: 'Node ID',
        Key: 'id',
        Type: 'text',
        Design: DefaultCellProps(100, 'auto', 1, true, '', true, false, false),
        Sortable: false,
        Filterable: false,
    },
    {
        DisplayName: 'Node Name',
        Key: 'name',
        Type: 'text',
        Design: DefaultCellProps(
            100,
            'auto',
            1.5,
            true,
            '',
            true,
            false,
            false
        ),
        Sortable: false,
        Filterable: false,
    },
    {
        DisplayName: 'Description',
        Key: 'description',
        Type: 'text',
        Design: DefaultCellProps(400, 'auto', 8, true, '', true, false, false),
        Sortable: false,
        Filterable: false,
    },
    {
        DisplayName: 'Selectable',
        Key: 'selectable',
        Type: 'custom',
        Design: DefaultCellProps(
            200,
            'auto',
            1,
            true,
            '',
            true,
            false,
            false,
            'Boolean List'
        ),
        Sortable: false,
        Filterable: false,
    },
    {
        DisplayName: 'Visible',
        Key: 'visible',
        Type: 'custom',
        Design: DefaultCellProps(
            200,
            'auto',
            1,
            true,
            '',
            true,
            false,
            false,
            'Boolean List'
        ),
        Sortable: false,
        Filterable: false,
    },
]
