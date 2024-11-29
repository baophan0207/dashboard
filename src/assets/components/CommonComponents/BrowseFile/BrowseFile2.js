/*
 *
 *
 *  Copyright (c) 2016-2023, AnyGen AI Inc.  All rights reserved.
 *
 *
 *  IMPORTANT - PLEASE READ THIS CAREFULLY BEFORE ATTEMPTING TO USE ANY SOFTWARE,
 *
 *  DOCUMENTATION, OR OTHER MATERIALS.
 *
 *  This software is the confidential and proprietary information of AnyGen AI Inc
 *
 *  ("Confidential Information") and is protected by applicable copyright or other
 *
 *  intellectual property laws and treaties. All title and ownership rights in and
 *
 *  to the software (including but not limited to any source code, images,
 *
 *  photographs, animations, video, audio, music, text embedded in the software),
 *
 *  the intellectual property embodied in the software, and any trademarks or
 *
 *  service marks of AnyGen AI Inc. that are used in connection with the
 *
 *  software, are and shall at all times remain exclusively owned by AnyGen AI,
 *
 *  Inc. and its licensors.  Under no
 *   circumstances shall you disclose such
 *
 *  Confidential Information and trade secrets, distribute, disclose or otherwise
 *
 *  make available to any third party any portion of the software's source code
 *
 *  and shall use it only in accordance with the terms of the license agreement
 *
 *  enclosed with this product or as entered into with AnyGen AI, Inc.
 *
 *
 *  You are prohibited from any attempt to disassemble the code, or attempt in
 *
 *  any manner to reconstruct, discover, reuse or modify any source code or
 *
 *  underlying algorithms of the software.
 *
 *
 *  THIS SOFTWARE IS PROVIDED "AS IS" AND THERE ARE NO WARRANTIES, CLAIMS OR
 *
 *  REPRESENTATIONS MADE BY AnyGen AI, INC., OR ITS LICENSORS, SUBSIDIARIES
 *
 *  AND AFFILIATES, EITHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WARRANTIES
 *
 *  OF QUALITY, PERFORMANCE, NON-INFRINGEMENT, MERCHANTABILITY, OR FITNESS FOR
 *
 *  A PARTICULAR PURPOSE, NOR ARE THERE ANY WARRANTIES CREATED BY COURSE OF
 *
 *  DEALING, COURSE OF PERFORMANCE, OR TRADE USAGE. AnyGen AI, INC. DOES NOT
 *
 *  WARRANT THAT THIS SOFTWARE WILL MEET ANY CLIENT'S NEEDS OR BE FREE FROM
 *
 *  ERRORS, OR THAT THE OPERATION OF THE SOFTWARE WILL BE UNINTERRUPTED.
 * /
 */

import React, {createRef} from "react";
import "./browseFile.css";
import Icon from "../../../IconLibrary/Icon";
import VerticalEmptyScreen from "../EmptyScreen/VerticalEmptyScreen";
import dropFileImage from "../../../images/DropHere.png"
import Dropzone from "react-dropzone";
import PianoLoading from "../Loading/PianoLoading";
import {CommonLoadingPopup, CreateUUID, isValidData, TRAINING_KEYWORD} from "../CommonMethods";
import {renderSwitchRoe} from "../../../api/RoeServiceApi";
import ResponsePopup from "../BasicComponents/ResponsePopups/ResponsePopup";
import {renderSwitchPatentService} from "../../../api/PatentServiceApi";
import {ApiCallMethod, ParameterTest} from "../../../api/ApiCallMethod";

const dropzoneRef = createRef();
const browseRef = createRef();

export default class BrowseFile2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFileUsage: TRAINING_KEYWORD,
            fileDropStatus: "initial", //initial, dropping, process
            commonLoading: false,
            loadingMessage: "",
            defaultErrorPopup: false,
            defaultErrorText: "",
            RowCount: 0,
            columnNodeMapping: [],
            showFeatureNodesInfo: false,
        }
    }

    componentDidMount() {
        const {selectedFileUsage} = this.props;
        this.setState({
            selectedFileUsage: selectedFileUsage !== undefined ? selectedFileUsage : ""
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("#BrowseFile2 componentWillReceiveProps: ", nextProps)
        const {selectedFileUsage} = nextProps;
        this.setState({
            selectedFileUsage: selectedFileUsage !== undefined ? selectedFileUsage : ""
        })
    }

    handleBrowseOpenFiles() {
        console.log("reached to open files: ", browseRef.current)
        if (dropzoneRef.current) {
            dropzoneRef.current.open()
        }
    }

    handleCancelBrowseFile() {
        console.log("entered to handleCancelBrowseFile")
    }

    handleSaveFileInfo(selectedFileUsage, event) {
        console.log("handleSaveFileInfo :: ", event.target)
        console.log("handleSaveFileInfo selectedFileUsage :: ", selectedFileUsage)
        let browsedFiles = event.target.files;
        console.log("browsedFiles: ", browsedFiles)
        let acceptedFiles = []
        for (let i = 0; i < browsedFiles.length; i++) {
            acceptedFiles = acceptedFiles.concat(browsedFiles[i])
        }
        this.fileUploadOnDrop("browse", selectedFileUsage, acceptedFiles)
    }

    fileUploadOnDrop(screen, selectedFileUsage, acceptedFiles) {
        console.log("#fileUploadOnDrop => screen, acceptedFiles: ", screen, selectedFileUsage, acceptedFiles)
        let startTime = new Date()
        this.setState({
            commonLoading: true,
            loadingMessage: "Uploading"
        })
        let engine = ""
        let fileName = ""
        if (isValidData(acceptedFiles)) {
            let limitCount = 1
            if (this.props.createModel === true) {
                limitCount = 10
            }
            if (acceptedFiles.length !== 0 && acceptedFiles.length <= limitCount) {
                let oneMB = 1024 * 1024
                let chunkSize = 5 * oneMB // default chunk size (5MB)
                let chunks = []
                let start = 0;
                let end = chunkSize

                const data = new FormData()
                let detailStatusIDs = []
                let uploadedFileInfos = []
                acceptedFiles.forEach(file => {
                    if (isValidData(file)) {
                        let fileSize = file.size;
                        fileName = file.name
                        engine = file.name.split(".")[1]
                        data.append("FileName", file);

                        let newStatusID = CreateUUID()
                        detailStatusIDs.push(newStatusID)
                        uploadedFileInfos.push({
                            ID: newStatusID,
                            DetailStatusID: newStatusID,
                            FileName: "",
                            DisplayName: fileName,
                            FileSize: fileSize,
                        })
                        console.log("file name: ", fileName)
                        console.log("file size: ", fileSize)
                        console.log("oen MB size: ", oneMB)

                        if (oneMB < fileSize) {
                            let fileSizeWithMb = fileSize / oneMB
                        }

                        while (start < fileSize) {
                            chunks.push(file.slice(start, end))
                            start = end;
                            end = start + chunkSize;
                        }
                    }
                });

                if (this.props.reinforceFile === true) {
                    if (engine === "csv" || engine === "xlsx" || engine === "json") {
                        let requestID = CreateUUID()
                        renderSwitchPatentService("UploadFileForReinforceData", data, "", '', requestID).then(response => {
                            console.log("response of upload file for reinforce data: ", response.data);
                            if (response.data !== "") {
                                if (response.data.ResponseCode === 1000) {
                                    let results = response.data.Results;
                                    let fileInfo = {
                                        UploadedFileName: results,
                                        OriginalFileName: fileName
                                    }
                                    this.setState({
                                        commonLoading: false
                                    })
                                    this.props.handleSubmitFile(fileInfo)
                                } else if (response.data["ResponseCode"] === 2405) {
                                    this.setState({
                                        commonLoading: false,
                                        defaultErrorPopup: true,
                                        defaultErrorText: "The upload format is not supported by the system. Please make sure the uploaded file includes correct column and values.",
                                    })
                                } else {
                                    this.setState({
                                        commonLoading: false,
                                        defaultErrorPopup: true,
                                        defaultErrorText: 'File upload failed - please try again!',
                                    })
                                }
                            } else {
                                console.log('cannot upload file =>')
                                this.setState({
                                    commonLoading: false,
                                    defaultErrorPopup: true,
                                    defaultErrorText: 'File upload failed - please try again!',
                                })
                            }
                        }).catch(error => {
                            console.log("File Upload Result =>", error);
                            this.setState({
                                commonLoading: false,
                                defaultErrorPopup: true,
                                defaultErrorText: 'The upload format is not supported by the system. Please make sure you are uploading a file that is compatible and try again.',
                            })
                        });
                    } else {
                        this.setState({
                            commonLoading: false,
                            defaultErrorPopup: true,
                            defaultErrorText: "The upload file extension is not supported by the system. Please make sure your file has .csv extension",
                        })
                    }
                } else if (this.props.createModel === true) {
                    if (engine === "csv" || engine === "xlsx") {
                        //detailStatusIDs
                        this.setState({
                            commonLoading: false
                        })
                        console.log("#selectedFileUsage: ", this.state.selectedFileUsage, ", ", this.props.selectedFileUsage, ", ", selectedFileUsage)
                        this.props.handleSubmitFile(data, detailStatusIDs, uploadedFileInfos, selectedFileUsage)
                    } else {
                        this.setState({
                            commonLoading: false,
                            defaultErrorPopup: true,
                            defaultErrorText: "The upload file extension is not supported by the system. Please make sure your file has .csv,.xlsx extension",
                        })
                    }
                } else {
                    if (engine === "csv" || engine === "xlsx" || engine === "json") {
                        // this.handleFileUpload(acceptedFiles[0])
                        // return

                        let requestID = CreateUUID()
                        renderSwitchRoe("uploadFileForMlInfer", data, "", '', requestID).then(response => {
                            console.log("response of file upload results: ", response.data);
                            let endTime = new Date()
                            let rSeconds = (endTime.getTime() - startTime.getTime()) / 1000
                            console.log("Duration of uploaded file: ", rSeconds)
                            if (response.data !== "") {
                                if (response.data.ResponseCode === 1000) {
                                    let results = response.data.Results;
                                    let newFile = {
                                        DisplayName: results[0].DisplayName,
                                        ID: results[0].ID,
                                        FileType: results[0].FileType,
                                        Engine: results[0].FileType,
                                        FileName: results[0].ID,
                                        TableName: results[0].TableName
                                    }
                                    this.firstRowAsHeaderInfo(newFile, true)
                                } else {
                                    this.setState({
                                        commonLoading: false,
                                        defaultErrorPopup: true,
                                        defaultErrorText: 'File upload failed - please try again!',
                                    })
                                }
                            } else {
                                console.log('cannot upload file =>')
                                this.setState({
                                    commonLoading: false,
                                    defaultErrorPopup: true,
                                    defaultErrorText: 'File upload failed - please try again!',
                                })

                            }
                        }).catch(error => {
                            console.log("File Upload Result =>", error);
                            this.setState({
                                commonLoading: false,
                                defaultErrorPopup: true,
                                defaultErrorText: 'The upload format is not supported by the system. Please make sure you are uploading a file that is compatible and try again.',
                            })
                        });
                    } else {
                        this.setState({
                            commonLoading: false,
                            defaultErrorPopup: true,
                            defaultErrorText: "The upload file extension is not supported by the system. Please make sure your file has .csv, .xlsx, .json extension",
                        })
                    }
                }
            } else {
                let message = "A maximum of one file can be uploaded in a go."
                if (this.props.createModel === true) {
                    message = "A maximum of 10 files can be uploaded in a go."
                }
                this.setState({
                    commonLoading: false,
                    defaultErrorPopup: true,
                    defaultErrorText: message
                })
            }
        } else {
            this.setState({
                commonLoading: false,
                defaultErrorPopup: true,
                defaultErrorText: "The upload format is not supported by the system. Please make sure you are uploading a file that is compatible and try again.",
            })
        }
    }


    handleFileUpload = (selectedFile) => {
        if (!selectedFile) {
            alert("Please select a file to upload.");
            return;
        }

        const chunkSize = 5 * 1024 * 1024; // 5MB (adjust based on your requirements)
        const totalChunks = Math.ceil(selectedFile.size / chunkSize);
        const chunkProgress = 100 / totalChunks;
        let chunkNumber = 0;
        let start = 0;
        let end = 0;

        console.log("#totalChunks:: ", totalChunks)
        const uploadNextChunk = async () => {
            if (end <= selectedFile.size) {
                const chunk = selectedFile.slice(start, end);
                const formData = new FormData();
                formData.append("file", chunk);
                formData.append("chunkNumber", chunkNumber);
                formData.append("totalChunks", totalChunks);
                formData.append("originalname", selectedFile.name);

                let chunkInfo = {
                    totalChunks: 1,
                    chunkNumber: 0,
                    fileName: selectedFile.name
                }

                // uploadFileForMlInfer
                const calls = ApiCallMethod("RoeService");
                let parameter = "?chunkInfo=" + JSON.stringify(chunkInfo)
                parameter = ParameterTest(parameter);
                // parameter
                const apiCallUrl = calls.uploadApi + `uploadFileForMlInfer&params=` + parameter

                console.log("#apiCallUrl: ", apiCallUrl)
                fetch(apiCallUrl, {
                    method: "POST",
                    body: formData,
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log({data});
                        console.log("Upload api response: ", data)
                        const temp = `Chunk ${
                            chunkNumber + 1
                        }/${totalChunks} uploaded successfully`;

                        console.log(Number((chunkNumber + 1) * chunkProgress));
                        console.log(temp);
                        chunkNumber++;
                        start = end;
                        end = start + chunkSize;
                        uploadNextChunk();
                    })
                    .catch((error) => {
                        console.error("Error uploading chunk:", error);
                    });
            } else {
                console.log(100);
                console.log("File upload completed");
                this.setState({
                    commonLoading: false,
                })
            }
        };

        uploadNextChunk();
    };

    fileUploadDragOver() {
        // let dragArea = document.getElementById("instant-droppable-zone");
        // dragArea.style.display = "block";
    }

    fileUploadDragLeave() {
        // let dragArea = document.getElementById("instant-droppable-zone");
        // dragArea.style.display = "none";
    }

    firstRowAsHeaderInfo(fileInfo, header) {
        console.log("checking file info for first row as header: ", fileInfo)
        let passData = {
            UploadFileName: fileInfo.TableName,
            FirstRowAsHeader: header,
        }
        let requestID = CreateUUID()
        renderSwitchRoe("firstRowAsHeaderInfo", passData, '', '', requestID).then(
            getResults => {
                console.log("response of get first row as header =>", getResults.data);
                let headerResults = getResults.data.Results
                if (getResults.data["ResponseCode"] === 1000) {
                    let ColumnInfo = headerResults["ColumnInfos"]
                    let RowCount = headerResults.RowCount
                    this.setState({
                        commonLoading: false,
                        ColumnInfo,
                        RowCount,
                        uploadedFileInfo: fileInfo
                    }, () => {
                        console.log("#ColumnInfo to pass: ", ColumnInfo)
                        console.log("#fileInfo to pass: ", fileInfo)
                        this.props.handleSubmitFile(ColumnInfo, RowCount, fileInfo, 'initial')
                    })
                } else {
                    this.setState({
                        commonLoading: false,
                        defaultErrorPopup: true,
                        defaultErrorText: "Failed to upload - invalid data format!",
                    })
                }
            }
        ).catch((e) => {
            console.log("catch error in calling to upload the files: ", e)
            this.setState({
                commonLoading: false,
                defaultErrorPopup: true,
                defaultErrorText: "Failed to upload - failed in checking header info, please try again later.",
            })
        })
    }

    handleClosePopup = (eventName) => {
        this.setState({
            [eventName]: false
        })
    }

    render() {
        let {
            fileDropStatus
        } = this.state;

        let {limitation, label, limitationNote, noShadow, selectedFileUsage, openHelpPopup} = this.props;
        // console.log("#selectedFileUsage in render: ", limitation, ",", selectedFileUsage)
        return (
            <>
                {
                    fileDropStatus === "initial" ?
                        <div className="default-file-drop-zone"
                             style={{boxShadow: noShadow ? "none" : "0px 2px 40px 2px rgba(205, 205, 205, 0.5)"}}>
                            {
                                openHelpPopup !== undefined && openHelpPopup !== null ?
                                    <button onClick={openHelpPopup} className="default-file-drop-zone-help-btn">
                                        <Icon fillRule={"evenodd"} icon={"help"} size={14}/>
                                    </button>
                                    :
                                    null
                            }
                            <Dropzone
                                onDrop={this.fileUploadOnDrop.bind(this, "screen", selectedFileUsage)}
                                onDragEnter={this.fileUploadDragOver.bind(this)}
                                onDragLeave={this.fileUploadDragLeave.bind(this)}
                                noClick={true}
                                disabled={false}
                                ref={dropzoneRef}>
                                {({getRootProps, getInputProps}) => (
                                    <>
                                        <div {...getRootProps()}
                                             className="default-file-drop-dotted-line">
                                            <input {...getInputProps()}
                                                   accept={".csv,.xlsx"}
                                                   type="file"/>

                                            <Icon icon="file_upload" size={50}/>
                                            <p>{label}</p>
                                            <div className="default-file-drop-middle-label">
                                                <div className="default-file-drop-or-line-decoration"/>
                                                <div className="default-label--or">OR</div>
                                            </div>
                                            <button className="default-upload-file-btn"
                                                    onClick={() => this.handleBrowseOpenFiles()}>
                                                {"Browse File"}
                                            </button>

                                            {
                                                limitation &&
                                                <div className="default-limit-note">{limitationNote}</div>
                                            }

                                            <Dropzone
                                                noClick={true}
                                                ref={browseRef}
                                                onFileDialogCancel={() => this.handleCancelBrowseFile()}>
                                                {({getRootProps, getInputProps}) => (
                                                    <section>
                                                        <div {...getRootProps()}>
                                                            <input {...getInputProps()}
                                                                   accept={".csv,.xlsx"}
                                                                   type="file"
                                                                   onChange={this.handleSaveFileInfo.bind(this, selectedFileUsage)}/>
                                                        </div>
                                                    </section>
                                                )}
                                            </Dropzone>

                                            <div id="default-droppable-zone">
                                                <VerticalEmptyScreen
                                                    image={dropFileImage}
                                                    theme={'light'}
                                                    bodyContext="Drop the file to upload"/>
                                            </div>
                                        </div>
                                        {/*<input {...getInputProps()}*/}
                                        {/*       className="upload-zip-file-input-box"*/}
                                        {/*/>*/}
                                    </>
                                )}
                            </Dropzone>
                        </div>
                        :
                        fileDropStatus === "dropping" ?
                            <div className="default-file-drop-dotted-line">
                                <VerticalEmptyScreen image={dropFileImage}
                                                     theme={'light'}
                                                     bodyContext="Drop your file here"/>
                            </div>
                            :
                            <div className="default-file-drop-zone">
                                <PianoLoading/>
                            </div>
                }


                <ResponsePopup open={this.state.defaultErrorPopup}
                               type={"fail"}
                               title={"Alert"}
                               bodyContext={this.state.defaultErrorText}
                               onClose={() => this.handleClosePopup("defaultErrorPopup")}
                               primaryButtonText={"Close"}/>
                {
                    this.state.commonLoading === true &&
                    <CommonLoadingPopup open={true} content={this.state.loadingMessage}/>
                }
            </>
        );
    }
}

BrowseFile2.defaultProps = {
    selectedFileUsage: TRAINING_KEYWORD,
    limitation: true,
    noShadow: true,
    label: "Drag and drop your patent file",
    limitationNote: "Support File Type: CSV, XLSX, JSON"
}