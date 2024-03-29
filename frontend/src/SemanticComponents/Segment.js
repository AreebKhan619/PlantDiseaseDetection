import React from "react";
import {
  Button,
  Header,
  Icon,
  Segment,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { Component } from "react";
import ResultModal from "../components/Modal";
import clone from "../services/cloneUtil";
import { ImgContainer, TopRightCross } from "../components/Styled";
import axios from "axios";
import MainContext from "../Context";
import HistoryCards from "../components/HistoryCards"

class SegmentExample extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      previewArray: [],
      selectedFiles: [],
      response: {},
      loading: false,
      con: {
        clearUploadQueue: this.clearUploadQueue
      }
    };
  }

  clearUploadQueue = () => {
    this.setState({
      previewArray: [],
      selectedFiles: []
    });
  };

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
    this.setState({ loading: true });
    // let currentFile = this.state.selectedFiles[0];

    // this.setState({
    //   progress: 0,
    //   currentFile: currentFile
    // });

    let arrayOfYourFiles = this.state.selectedFiles;
    // create formData object
    const formData = new FormData();
    formData.append('user_id', localStorage.getItem("cred"));
    arrayOfYourFiles.forEach(file => {
      formData.append("image", file);
    });

    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:5000/",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      this.setState({
        response: response.data,
        loading: false
      });
      console.log(formData, response);
    } catch (error) {
      console.log(error);
      window.alert(error);
      this.setState({
        loading: false
      });
    }
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
    if (!this.props.isAtHistory) {
      return (
        <MainContext.Provider value={this.state}>
          <Segment
            placeholder
            style={{ marginLeft: "170px", width: "100%" }}
            // {...getRootProps()}
          >
            <ResultModal
              isModalOpen={
                !this.state.loading &&
                (this.state.response?.res?.length ? true : false)
              }
            />

            <Header icon>
              <Icon name="search" />
              {/* <input {...getInputProps()} /> */}
              {/* You haven't uploaded any image to check for diseases. */}
              Upload images to check for diseases.
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
                active={this.state.loading}
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
            {this.state.previewArray.length !== 0 && (
              <Button secondary onClick={this.upload}>
                Upload
              </Button>
            )}
          </Segment>
          <input
            ref={this.inputRef}
            type="file"
            multiple={true}
            name="image"
            style={{ display: "none" }}
            accept="image/*"
            onChange={this.setFileInState}
          />
        </MainContext.Provider>
      );
    } else {
      return (
        <MainContext.Provider value={this.state}>
          <Segment
            placeholder
            style={{ marginLeft: "170px", width: "100%" }}
            // {...getRootProps()}
          >
          
              <HistoryCards />
          </Segment>
        </MainContext.Provider>
      );
    }
  }
}

export default SegmentExample;
