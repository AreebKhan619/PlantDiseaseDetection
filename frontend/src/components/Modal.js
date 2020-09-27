import React, { Component } from "react";
import { Button, Header, Image, Modal, Icon, Grid } from "semantic-ui-react";
import MainContext from "../Context";
import DuckDuckGo from "./DuckDuckGo";

class ResultModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      resultDetails: {
        currentPage: 0,
        lastPage: 0
      }
    };
  }

  setOpen = value => {
    if (value) {
      this.setState({
        open: value
      });
    } else {
      this.setState({
        open: !this.state.open
      });
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isModalOpen !== this.props.isModalOpen) {
      this.setState({
        open: this.props.isModalOpen
      });
    }
  }

  componentDidMount() {
    console.clear();
    console.log(this.context);
  }

  render() {
    if (this.context.response?.res?.length) {
      let currPage = this.state.resultDetails.currentPage;
      let lastPage = this.context.response.res.length - 1;
      let res = this.context.response.res[currPage].result;
      return (
        <MainContext.Consumer>
          {stateObj => (
            <Modal
              closeIcon
              onClose={() => {
                this.setOpen(false);
                this.context.con.clearUploadQueue();
                this.setState({
                  resultDetails: {
                    currentPage: 0,
                    lastPage: 0
                  }
                })
              }}
              onOpen={() => this.setOpen(true)}
              open={this.state.open}
              closeOnDimmerClick={false}
              // trigger={<Button>Show Modal</Button>}
            >
              <Modal.Header>
                Determination Complete. Here are the results
              </Modal.Header>
              <Modal.Content image>
                {this.state.open && (
                  <React.Fragment>
                    <Image
                      size="medium"
                      style={{ borderRadius: "inherit" }}
                      src={this.context.previewArray[currPage]}
                      wrapped
                    />
                    <Modal.Description style={{ width: "inherit" }}>
                      <Grid columns="three" divided>
                        <Grid.Row>
                          <Grid.Column>
                            <div style={{ marginBottom: "10px" }}>
                              <Header as="h3" style={{ margin: "0" }}>
                                {res.type.replace(/_/g," ")}
                              </Header>
                              <Header
                                as="h5"
                                color="grey"
                                style={{ margin: "0" }}
                              >
                                Crop Type
                              </Header>
                            </div>
                          </Grid.Column>
                          <Grid.Column>
                            <div style={{ marginBottom: "10px" }}>
                              <Header as="h3" style={{ margin: "0", wordBreak: "break-word" }}>
                                {res.status.replace(/_/g," ")}
<Icon name={'circle ' +( res.status.toLowerCase()==="healthy"? 'check' : 'warning')} color={res.status.toLowerCase()==='healthy'? `green`:`red`} />

                                
                              </Header>
                              <Header
                                as="h5"
                                color="grey"
                                style={{ margin: "0" }}
                              >
                                Health condition
                              </Header>
                            </div>
                          </Grid.Column>
                          <Grid.Column>
                            <div style={{ marginBottom: "10px" }}>
                              <Header as="h3" style={{ margin: "0" }}>
                                {res.percentage.toFixed(2)}%
                              </Header>
                              <Header
                                as="h5"
                                color="grey"
                                style={{ margin: "0" }}
                              >
                                Accuracy
                              </Header>
                            </div>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>

                      {res.status.toLowerCase() !== "healthy" && (
                        <DuckDuckGo
                          data={{
                            plant: res.type,
                            disease: res.status.replace(/_/g," ")
                          }}
                        />
                      )}
                    </Modal.Description>
                  </React.Fragment>
                )}
              </Modal.Content>
              <Modal.Actions style={{ display: "flex", alignItems: "center" }}>
                <span style={{ float: "left", fontWeight: "bolder" }}>
                  Result {currPage + 1} of {lastPage + 1}{" "}
                </span>
                {/* <Button
                  color="black"
                  onClick={() => {
                    this.setOpen(false);
                    this.context.con.clearUploadQueue()
                  }}
                  // floated="left"
                >
                  Dismiss
                </Button> */}

                {this.context.response.res.length > 1 && (
                  <>
                    <Button
                      content="Previous Result"
                      labelPosition="left"
                      icon="arrow left"
                      disabled={currPage === 0}
                      onClick={() =>
                        this.setState({
                          resultDetails: {
                            ...this.state.articleDetails,
                            currentPage:
                              this.state.resultDetails.currentPage - 1
                          }
                        })
                      }
                      positive
                    />
                      <Button
                      disabled={currPage===lastPage}
                        content="Next Result"
                        labelPosition="right"
                        icon="arrow right"
                        onClick={() =>
                          this.setState({
                            resultDetails: {
                              ...this.state.articleDetails,
                              currentPage:
                                this.state.resultDetails.currentPage + 1
                            }
                          })
                        }
                        positive
                      />
                  </>
                )}

                {/* <Button
                  content="Next"
                  labelPosition="right"
                  icon="checkmark"
                  onClick={() => this.setOpen(false)}
                  positive
                /> */}
              </Modal.Actions>
            </Modal>
          )}
        </MainContext.Consumer>
      );
    } else {
      return null;
    }
  }
}
ResultModal.contextType = MainContext;

export default ResultModal;
