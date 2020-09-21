import React, { Component } from "react";
import UploadService from "../services/upload-files.service";

import Dropzone from "react-dropzone";

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: {},
      fileInfos: []
    };
  }

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files
    });
  }

  upload = () => {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile
    });

    UploadService.upload(currentFile, event => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total)
      });
    })
      .then(response => {
        this.setState({
          message: response.data
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined
        });
      });

    this.setState({
      selectedFiles: undefined
    });
  };

  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      fileInfos
    } = this.state;

    return (
      <div>
        {currentFile && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}

        <Dropzone
          accept="image/*"
          onDrop={acceptedFiles => console.log(acceptedFiles)}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input name="image" {...getInputProps()} />
                <p>Drag and drop files here</p>
              </div>
            </section>
          )}
        </Dropzone>

        <label className="btn btn-default">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={this.selectFile}
          />
        </label>

        <button
          className="btn btn-success"
          disabled={!selectedFiles}
          onClick={this.upload}
        >
          Upload
        </button>

        <div className="alert alert-light" role="alert">
          We are
          {message.percentage ? message.percentage + "%" : ""} sure that your
          sample of {message.type ? message.type : ""} has
          {message.status ? message.status : ""}
        </div>

        <div className="card">
          <ul className="list-group list-group-flush">
            {fileInfos &&
              fileInfos.map((file, index) => (
                <li className="list-group-item" key={index}>
                  <a href={file.url}>{file.name}</a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
