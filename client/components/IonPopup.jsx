IonPopup = React.createClass({
  render(){
    return(
      <div className="backdrop visible active">
        <div className="popup-container popup-showing active">
          <div className="popup">
            <div className="popup-head">
              {this.props.head}             
            </div>
            <div className="popup-body">
              {this.props.body}             
            </div>
            <div className="popup-buttons">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
});
