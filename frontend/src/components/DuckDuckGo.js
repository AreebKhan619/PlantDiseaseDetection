import React, { Component } from "react";
import { Message, Dimmer, Loader, Modal, Button } from "semantic-ui-react";
import axios from "axios";

class DuckDuckGo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      data: [],
      resultsView: false,
      articleDetails: {
        currentPage: 0,
        lastPage: 0
      }
    };
  }

  componentDidMount() {
    this.getFromDuckDuckGo();
  }

  getFromDuckDuckGo = async () => {
    const { plant, disease } = this.props.data;
    const response = await axios.post(
      "http://localhost:5000/scrape",
      { plant, disease },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    console.log(response.data);
    this.setState({
      loaded: true,
      data: response.data.res,
      articleDetails: {
        currentPage: 0,
        lastPage: response.data.res.length - 1
      }
    });
  };

  outsideNavigator = link => {
    let w = window.open(link, "_blank");
    w.focus();
  };

  render() {
    const currPage = this.state.articleDetails.currentPage;
    const lastPage = this.state.articleDetails.lastPage;

    if (!this.state.resultsView) {
      return (
        <>
          <Message
            className="hoverable"
            onClick={() =>
              this.outsideNavigator(this.state.data[currPage].link)
            }
          >
            <Dimmer
              style={{
                backgroundColor: "#81ce93e0",
                borderRadius: "10px",
                minHeight: "100px"
              }}
              active={!this.state.loaded}
            >
              <Loader />
            </Dimmer>
            {this.state.loaded && (
              <>
                <Message.Header>
                  {this.state.data[currPage].text}
                </Message.Header>
                <p>{this.state.data[currPage].description}</p>
              </>
            )}
          </Message>

          <div style={{ textAlign: "center" }}>
            {this.state.data.length > 1 && (
              <>
                  <Button
                    content="Previous Article"
                    disabled={this.state.articleDetails.currentPage === 0}
                    labelPosition="left"
                    floated="left"
                    icon="arrow left"
                    onClick={() =>
                      this.setState({
                        articleDetails: {
                          ...this.state.articleDetails,
                          currentPage: this.state.articleDetails.currentPage - 1
                        }
                      })
                    }
                    // positive
                  />

                <Button
                  content="View All Articles"
                  onClick={() => this.setState({ resultsView: true })}
                  // labelPosition="left"
                  // icon="eye"
                  // onClick={() => this.setOpen(false)}
                  // positive
                />

                        <Button
                        disabled={this.state.articleDetails.currentPage===this.state.articleDetails.lastPage}
                        content="Next Article"
                        labelPosition="right"
                        floated="right"
                        icon="arrow right"
                        onClick={() =>
                          this.setState({
                            articleDetails: {
                              ...this.state.articleDetails,
                              currentPage: this.state.articleDetails.currentPage + 1
                            }
                          })
                        }
                        // onClick={() => this.setOpen(false)}
                        // positive
                      />
             
              </>
            )}
          </div>
        </>
      );
    } else {
      return (
        <Modal
          open={this.state.resultsView}
          onClose={() => this.setState({ resultsView: false })}
          // onOpen={() => setOpen(true)}
          // trigger={<Button>Scrolling Content Modal</Button>}
        >
          <Modal.Header>
            Results for Treatment of {this.props.data.plant} for{" "}
            {this.props.data.disease}{" "}
          </Modal.Header>
          <Modal.Content image scrolling>
            <Modal.Description>
              {this.state.data.map((currEl, i) => {
                return (
                  <Message
                    className="hoverable"
                    onClick={() => {
                      this.outsideNavigator(currEl.link);
                    }}
                    key={i}
                    style={{ maxWidth: "fit-content" }}
                  >
                    <Message.Header>{currEl.text}</Message.Header>
                    <p>{currEl.description}</p>
                  </Message>
                );
              })}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={() => this.setState({ resultsView: false })}
              secondary
            >
              Dismiss
              {/* <Icon name='chevron right' /> */}
            </Button>
          </Modal.Actions>
        </Modal>
      );
    }
  }
}

export default DuckDuckGo;
