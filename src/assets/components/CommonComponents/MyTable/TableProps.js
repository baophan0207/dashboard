import {PatentFamilyData} from "./DefaultProps";
import {ComparisonInputs, FamilyApplicantList} from "./CustomTableCell";
import {getColumnWordSize, isValidData} from "../CommonMethods";

export const NumberProps = (pageNumber, pageSize, index) => {
    return (
        {
            MinWidth: getColumnWordSize(pageNumber, pageSize),
            MaxWidth: getColumnWordSize(pageNumber, pageSize),
            Flex: 1,
            LockPinned: true,
            Pinned: 'left',
            Resizable: false,
        }
    )
}

export const ToggleButtonProps = (width) => {
    return (
        {
            MinWidth: width,
            MaxWidth: width,
            Flex: 0,
            LockPinned: false,
            Pinned: '',
            Resizable: false,
            filter: "agTextColumnFilter",
            menuTabs: ["filterMenuTab"],
        }
    )
}

export const DefaultCountProps = (width, name) => {
    let maxWidth = "auto";
    if (name !== undefined && name !== null) {
        maxWidth = 11 * name.length
    }
    return (
        {
            MinWidth: width,
            MaxWidth: maxWidth,
            Flex: 1,
            LockPinned: false,
            Pinned: 'left',
            Resizable: true,
        }
    )

}

export const DefaultCellProps = (minWidth, maxWidth, flex, lockPinned, pinned, resizable, isLink, isSelectable, customDesign="",parentFunctionName="") => {
    let min = minWidth !== undefined && minWidth !== null ? minWidth : "200px";
    let max = maxWidth !== undefined && maxWidth !== null ? maxWidth : "auto";
    let flexGrow = flex !== undefined && flex !== null ? flex : 1;
    let lockPin = lockPinned !== undefined && lockPinned !== null ? lockPinned : false;
    let pin = pinned !== undefined && pinned !== null ? pinned : "";
    let resizability = resizable !== undefined && resizable !== null ? resizable : true;
    let selectable = isSelectable !== undefined && isSelectable !== null ? isSelectable : true;
    let link = isLink !== undefined && isLink !== null ? isLink : true;
    let customCell = customDesign !== undefined && customDesign !== null ? customDesign : "";

    let designProps = {
        MinWidth: min,
        MaxWidth: max,
        Flex: flexGrow,
        LockPinned: lockPin,
        Pinned: pin,
        Resizable: resizability,
        Selectable: selectable,
        IsLink: link,
        CustomCellDesign: customCell,
        ParentFunctionName: parentFunctionName,
    }
    return (
        designProps
    )
}

export const DefaultActionProps = (noOfAction, customCell="",parentFunctionName="") => {
    let width = noOfAction * 30;
    if (width < 100) {
        width = 100;
    }
    return (
        {
            MinWidth: width,
            MaxWidth: width,
            Flex: 1,
            LockPinned: true,
            Pinned: 'right',
            Resizable: false,
            filter: "agTextColumnFilter",
            menuTabs: ["filterMenuTab"],
            CustomCellDesign: customCell,
            ParentFunctionName: parentFunctionName,
        }
    )
}

export const ModelNameProps = {
    MinWidth: 400,
    MaxWidth: "auto",
    Flex: 1,
    LockPinned: false,
    Pinned: 'left',
    CustomCellDesign: "Model Name",
    Resizable: true,

}

export const PatentFamilyHeaders = [
    {
        DisplayName: "No.",
        Key: "no",
        Type: "text",
        Design: NumberProps(1, 10),
        Sortable: false,
        Filterable: true,
    },
    {
        DisplayName: "Document No.",
        Key: "docNo",
        Type: "text",
        Design: DefaultCellProps(
            150,
            200,
            1,
            true,
            '',
            true,
            false,
            false),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Application No.",
        Key: "appNo",
        Type: "text",
        Design: DefaultCellProps(
            400,
            "auto",
            1,
            true,
            '',
            true,
            false,
            false),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Priority No.",
        Key: "priorityNo",
        Type: "text",
        Design: DefaultCellProps(
            150,
            200,
            1,
            true,
            '',
            true,
            false,
            false),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Family Type",
        Key: "familyType",
        Type: "text",
        Design: DefaultCellProps(
            150,
            200,
            1,
            true,
            '',
            true,
            false,
            false),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Publication Date",
        Key: "publicationDate",
        Type: "text",
        Design: DefaultCellProps(
            100,
            200,
            1,
            true,
            '',
            true,
            false,
            false),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Earliest Priority Date",
        Key: "earliestPriorityDate",
        Type: "text",
        Design: DefaultCellProps(
            150,
            200,
            1,
            true,
            '',
            true,
            false,
            false),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Title",
        Key: "title",
        Type: "text",
        Design: DefaultCellProps(
            250,
            "auto",
            1,
            true,
            '',
            true,
            false,
            false),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Applicants",
        Key: "applicant",
        Type: "custom",
        Design: DefaultCellProps(
            150,
            "auto",
            1,
            true,
            '',
            true,
            false,
            false,
            "Family Applicants"),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Inventors",
        Key: "inventor",
        Type: "custom",
        Design: DefaultCellProps(
            150,
            "auto",
            1,
            true,
            '',
            true,
            false,
            false,
            "Family Inventors"),
        Sortable: true,
        Filterable: true,
    },
]

export const ComparisonInfoProps = () => {

}

export const ComparisonHistoryHeaders = [
    {
        DisplayName: "Date & Time",
        Key: "timestamp",
        Type: "text",
        Design: DefaultCellProps(
            150,
            200,
            1,
            true,
            '',
            true,
            false,
            true),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Target Input Type",
        Key: "targetType",
        Type: "text",
        Design: DefaultCellProps(
            200,
            400,
            1,
            true,
            '',
            true,
            false,
            false),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Target Patents & Invention Ideas",
        Key: "tagetInfo",
        Type: "custom",
        Design: DefaultCellProps(
            300,
            "auto",
            1,
            true,
            '',
            true,
            false,
            false,
            "Comparison History"),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Competitive Landscape Option",
        Key: "competitiveLandscapeType",
        Type: "text",
        Design: DefaultCellProps(
            200,
            400,
            1,
            true,
            '',
            true,
            false,
            false),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Competitive Landscape ",
        Key: "competitiveLandscapeInfo",
        Type: "custom",
        Design: DefaultCellProps(
            300,
            "auto",
            1,
            true,
            '',
            true,
            false,
            false,
            "Comparison History"),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Action",
        Key: "competitiveLandscapeType",
        Type: "action",
        Design: DefaultActionProps,
        Sortable: false,
        Filterable: false,
    },
]

export const DynamicTableHeader = [
    {
        DisplayName: "No.",
        Key: "no",
        Type: "text",
        Design: NumberProps(1, 10),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Column 1",
        Key: "col1",
        Type: "text",
        Design: DefaultCellProps(
            150,
            "auto",
            1,
            true,
            '',
            false,
            false,
            false),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Column 2",
        Key: "col2",
        Type: "text",
        Design: DefaultCellProps(
            150,
            "auto",
            1,
            true,
            '',
            false,
            false,
            false),
        Sortable: true,
        Filterable: true,
    },

    {
        DisplayName: "Column 3",
        Key: "col3",
        Type: "text",
        Design: DefaultCellProps(
            150,
            "auto",
            1,
            true,
            '',
            false,
            false,
            false),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Column 4",
        Key: "col4",
        Type: "text",
        Design: DefaultCellProps(
            150,
            "auto",
            1,
            true,
            '',
            false,
            false,
            false),
        Sortable: true,
        Filterable: true,
    },
]

export const FTOFeatureListHeader = [
    {
        DisplayName: "Feature No.",
        Key: "no",
        Type: "text",
        Design: DefaultCellProps(
            100,
            "auto",
            0,
            true,
            '',
            false,
            false,
            false),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Feature",
        Key: "feature",
        Type: "text",
        Design: DefaultCellProps(
            400,
            "auto",
            1,
            true,
            '',
            false,
            false,
            false),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Relevant Patent",
        Key: "patent",
        Type: "custom",
        Design: DefaultCellProps(
            400,
            "auto",
            1,
            true,
            '',
            false,
            false,
            false,
            "Patent List"),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "View Detail",
        Key: "action",
        Type: "action",
        Design: DefaultActionProps(1),
        Sortable: false,
        Filterable: false,
    },
]

export const RelevantPatentHeader = [
    {
        DisplayName: "No.",
        Key: "no",
        Type: "text",
        Design: NumberProps(1, 10),
        Sortable: false,
        Filterable: false,
    },
    {
        DisplayName: "PatentID",
        Key: "id",
        Type: "text",
        Design: DefaultCellProps(
            150,
            200,
            1,
            true,
            'left',
            false,
            false,
            false),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Title",
        Key: "title",
        Type: "text",
        Design: DefaultCellProps(
            250,
            "auto",
            1,
            true,
            '',
            true,
            false,
            false),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "CPC Class",
        Key: "cpc",
        Type: "custom",
        Design: DefaultCellProps(
            300,
            "auto",
            1,
            true,
            '',
            false,
            false,
            false,
            "CPC List"),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Assignee",
        Key: "assignee",
        Type: "custom",
        Design: DefaultCellProps(
            200,
            "auto",
            1,
            true,
            '',
            false,
            false,
            false,
            "Assignee List"),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Granted Date",
        Key: "granted_date",
        Type: "text",
        Design: DefaultCellProps(
            100,
            100,
            1,
            true,
            'left',
            false,
            false,
            false),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Legal Status",
        Key: "legal_status",
        Type: "custom",
        Design: DefaultCellProps(
            100,
            100,
            1,
            true,
            '',
            false,
            false,
            false,
            "Legal Status"),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Similarity Score",
        Key: "similarity_score",
        Type: "custom",
        Design: DefaultCellProps(
            100,
            100,
            1,
            true,
            '',
            false,
            false,
            false,
            "Similarity Score"),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Infringed Features",
        Key: "infringed_feature",
        Type: "custom",
        Design: DefaultCellProps(
            100,
            100,
            1,
            true,
            '',
            false,
            false,
            false,
            "Infringed Feature List"),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "View Detail",
        Key: "action",
        Type: "action",
        Design: DefaultActionProps(1),
        Sortable: false,
        Filterable: false,
    },
]

export const RelevantPatentDetailHeader = [
    {
        DisplayName: "No.",
        Key: "no",
        Type: "text",
        Design: NumberProps(1, 10),
        Sortable: false,
        Filterable: false,
    },
    {
        DisplayName: "Document ID",
        Key: "id",
        Type: "text",
        Design: DefaultCellProps(
            150,
            200,
            1,
            true,
            'left',
            false,
            false,
            false),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "RelevantText",
        Key: "relevantInfo",
        Type: "custom",
        Design: DefaultCellProps(
            250,
            "auto",
            1,
            true,
            '',
            false,
            false,
            false,
            "Relevant Patent Info"),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Legal Status",
        Key: "legal_status",
        Type: "custom",
        Design: DefaultCellProps(
            100,
            100,
            1,
            true,
            '',
            false,
            false,
            false,
            "Legal Status"),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Action",
        Key: "action",
        Type: "action",
        Design: DefaultActionProps(1),
        Sortable: false,
        Filterable: false,
    },
]

export const NoveltyPatentHeader = [
    // {
    //     DisplayName: "No.",
    //     Key: "no",
    //     Type: "text",
    //     Design: NumberProps(1, 10),
    //     Sortable: false,
    //     Filterable: false,
    // },
    {
        DisplayName: "PatentID",
        Key: "PatentID",
        Type: "custom",
        Design: DefaultCellProps(
            200,
            200,
            0,
            true,
            'left',
            false,
            false,
            false,
            "Patent Info With condition"),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Title",
        Key: "Title",
        // Type: "custom",
        Type: "text",
        Design: DefaultCellProps(
            250,
            "auto",
            1,
            true,
            '',
            false,
            false,
            false,
            "Patent Info With condition"),
        Sortable: true,
        Filterable: true,
    },
    {
        DisplayName: "Action",
        Key: "action",
        Type: "action",
        Design: DefaultActionProps(1),
        Sortable: false,
        Filterable: false,
    },
]