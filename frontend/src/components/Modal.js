import React, { Component } from "react";
import { Button, Header, Image, Modal, Message, Grid } from "semantic-ui-react";
import MainContext from "../Context";
import DuckDuckGo from "./DuckDuckGo"

class ResultModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
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
    return (
      <MainContext.Consumer>
        {stateObj => (
          <Modal
            onClose={() => this.setOpen(false)}
            onOpen={() => this.setOpen(true)}
            open={this.state.open}
            // trigger={<Button>Show Modal</Button>}
          >
            <Modal.Header>
              Determination Complete. Here are the results
            </Modal.Header>
            <Modal.Content image>
              {this.state.open &&
                this.context.response.res.map((currEl, i) => {
                  let { percentage, status, type } = currEl.result;
                  status = status.replace("_", " ")
                  return (
                    <React.Fragment key={i}>
                      <Image
                        size="medium"
                        style={{ borderRadius: "inherit" }}
                        src={this.context.previewArray[i]}
                        wrapped
                      />
                      <Modal.Description style={{ width: "inherit" }}>
                        <Grid columns="three" divided>
                          <Grid.Row>
                            <Grid.Column>
                              <div style={{ marginBottom: "10px" }}>
                                <Header as="h3" style={{ margin: "0" }}>
                                  {type}
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
                                <Header as="h3" style={{ margin: "0" }}>
                                  {status}
                                </Header>
                                <Header
                                  as="h5"
                                  color="grey"
                                  style={{ margin: "0" }}
                                >
                                  {/* Health Status */}
                                  Health condition
                                </Header>
                              </div>
                            </Grid.Column>
                            <Grid.Column>
                              <div style={{ marginBottom: "10px" }}>
                                <Header as="h3" style={{ margin: "0" }}>
                                  {percentage.toFixed(2)}%
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

                      {status.toLowerCase() !== "healthy" && (
                      <DuckDuckGo data={{plant: type, disease: status}}/>
                      )}
                      
                      </Modal.Description>
                    </React.Fragment>
                  );
                })}
            </Modal.Content>
            <Modal.Actions>
              <Button
                color="black"
                onClick={() => {
                  this.setOpen(false);
                }}
              >
                Dismiss
              </Button>
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
  }
}
ResultModal.contextType = MainContext;

export default ResultModal;
