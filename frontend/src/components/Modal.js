import React, { Component } from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";

class ResultModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.isModalOpen
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

  componentDidUpdate(prevProps,prevState,snapshot){
	if(prevProps.isModalOpen !== this.props.isModalOpen){
		this.setState({
			open: this.props.isModalOpen
		})
	}
  }

  render() {
	  const {data} = this.props
    return (
      <Modal
        onClose={() => this.setOpen(false)}
        onOpen={() => this.setOpen(true)}
        open={this.state.open}
        // trigger={<Button>Show Modal</Button>}
      >
        <Modal.Header>Determination Complete. Here are the results</Modal.Header>
        <Modal.Content image>
          
		  {this.state.open && data.res.map((currEl, i)=>{
			  const {percentage, status, type} = currEl.result
			  return(
				  <React.Fragment key={i}>
				<Image size="medium" src={this.props.preview[i]} wrapped/>
				<Modal.Description>
				  <Header>{type}</Header>
				  <p>
					Health Status: {status}
				  </p>
				  <p>Accuracy % : {percentage.toFixed(2)}</p>
				</Modal.Description>
				</React.Fragment>
			  )
		  })}

        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => {
			  this.setOpen(false)}
		  } 
			  >
            Dismiss
          </Button>
          <Button
            content="Next"
            labelPosition="right"
            icon="checkmark"
            onClick={() => this.setOpen(false)}
            positive
          />
        </Modal.Actions>
      </Modal>
    );
  }
}


export default ResultModal;
