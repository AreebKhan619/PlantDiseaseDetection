import React from "react";
import {
  Button,
  Header,
  Icon,
  Segment,
  Dimmer,
  Loader
} from "semantic-ui-react";
import { Component } from "react";
import Dropzone from "react-dropzone";
import UploadService from "../services/upload-files.service";
import clone from "../services/cloneUtil";
import { ImgContainer, TopRightCross } from "../components/Styled";
import axios from "axios"
class SegmentExample extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      previewArray: [],
      selectedFiles: []
    };
  }

  handleCrossClick = _index => {
    let t = clone([...this.state.selectedFiles]);
    t.splice(_index, 1);

    this.setState({
      selectedFiles: t
    });

    this.showImgs(t);
  };

  setFileInState = async e => {
    let toArray;
    if (this.state.selectedFiles.length) {
      toArray = clone([...this.state.selectedFiles]);
      toArray = toArray.concat([...e.target.files]);
    } else {
      toArray = [...e.target.files];
    }

    this.setState({
      selectedFiles: toArray
    });
    this.showImgs(toArray);
  };

  upload = async () => {
    // let currentFile = this.state.selectedFiles[0];

    // this.setState({
    //   progress: 0,
    //   currentFile: currentFile
    // });

    let arrayOfYourFiles = this.state.selectedFiles;
    // create formData object
    const formData = new FormData();
    arrayOfYourFiles.forEach(file => {
      formData.append("image", file);
    });

    const response = await axios({
      method: "POST",
      url: "http://localhost:5000/",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    console.log(formData, response)

    // UploadService.upload(currentFile, event => {
    //   this.setState({
    //     progress: Math.round((100 * event.loaded) / event.total)
    //   });
    // })
    //   .then(response => {
    //     this.setState({
    //       message: response.data
    //     });
    //   })
    //   .catch(() => {
    //     this.setState({
    //       progress: 0,
    //       message: "Could not upload the file!",
    //       currentFile: undefined
    //     });
    //   });

    this.setState({
      selectedFiles: []
    });
  };

  showImgs = _filesArray => {
    let temp = [];

    _filesArray.forEach((currEl, i) => {
      temp.push(URL.createObjectURL(currEl));
    });

    this.setState({
      previewArray: temp
    });
  };

  render() {
    return (
      <>
        {/* <Dropzone
          accept="image/*"
          onDrop={acceptedFiles => {
            // this.setFileInState(acceptedFiles)
            console.log(acceptedFiles)
          }
        }
        >
          {({ getRootProps, getInputProps }) => ( */}
        <Segment
          placeholder
          style={{ marginLeft: "150px", width: "100%" }}
          // {...getRootProps()}
        >
          <Header icon>
            <Icon name="search" />
            {/* <input {...getInputProps()} /> */}
            You haven't uploaded any image to check for diseases.
          </Header>
          <Segment.Inline>
            <Button
              primary
              onClick={() => this.inputRef.current.click()}
              style={{ marginBottom: "10px" }}
            >
              {this.state.selectedFiles?.length ? "Add" : "Select"} Files
            </Button>
            {/* <Button positive onClick={this.showImgs}>Yup</Button> */}
          </Segment.Inline>
          {/* <p className="extra ui" style={{ textAlign: "center" }}>
            Alternately, drag and drop images here
          </p> */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              // width: "fit-content",
              flexWrap: "wrap",
              marginBottom: "10px",
              position: "relative",
              justifyContent: "center"
            }}
          >
            <Dimmer
              style={{ backgroundColor: "#81ce93e0", borderRadius: "10px" }}
              active={false}
            >
              <Loader />
            </Dimmer>
            {this.state.previewArray.map((currEl, i) => {
              return (
                <React.Fragment key={i}>
                  <ImgContainer>
                    <TopRightCross onClick={() => this.handleCrossClick(i)}>
                      X
                    </TopRightCross>
                    <img
                      src={this.state.previewArray[i]}
                      style={{
                        height: "inherit",
                        width: "inherit",
                        borderRadius: "inherit"
                      }}
                      alt="hehe"
                    />
                  </ImgContainer>
                </React.Fragment>
              );
            })}
          </div>
          {this.state.previewArray.length && (
            <Button secondary onClick={this.upload}>
              Upload
            </Button>
          )}
        </Segment>

        {/* )}
        </Dropzone> */}
        <input
          ref={this.inputRef}
          type="file"
          multiple={true}
          name="image"
          style={{ display: "none" }}
          accept="image/*"
          onChange={this.setFileInState}
        />
      </>
    );
  }
}

export default SegmentExample;
