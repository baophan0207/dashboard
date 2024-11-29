import { DefaultCellProps } from '../../CommonComponents/MyTable/TableProps'

export const Headers = [
    {
        DisplayName: 'Patent ID',
        Key: 'PatentId',
        Type: 'custom',
        Design: DefaultCellProps(
            100,
            'auto',
            1,
            true,
            '',
            true,
            false,
            false,
            'Patent Info With condition'
        ),
        Sortable: false,
        Filterable: false,
        Visible: 'always',
    },
    {
        DisplayName: 'Title',
        Key: 'Title',
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
        // Visible: '',
    },
    {
        DisplayName: 'Abstract',
        Key: 'Abstract',
        Type: 'text',
        Design: DefaultCellProps(400, 'auto', 4, true, '', true, false, false),
        Sortable: false,
        Filterable: false,
        // Visible: '',
    },
    {
        DisplayName: 'Class',
        Key: 'Class',
        Type: 'custom',
        Design: DefaultCellProps(
            200,
            'auto',
            2.5,
            true,
            '',
            true,
            false,
            false,
            'CPC List'
        ),
        Sortable: false,
        Filterable: false,
        // Visible: '',
    },
]
