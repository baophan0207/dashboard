import { DefaultCellProps } from '../../CommonComponents/MyTable/TableProps'

export const Headers = [
    {
        DisplayName: 'Upload Data Header',
        Key: 'uploadDataHeader',
        Type: 'text',
        Design: DefaultCellProps(100, 'auto', 1, true, '', false, false, false),
        Sortable: false,
        Filterable: false,
    },
    {
        DisplayName: 'Patent Fields',
        Key: 'patentFields',
        Type: 'text',
        Design: DefaultCellProps(100, 'auto', 1, true, '', false, false, false),
        Sortable: false,
        Filterable: false,
    },
]
