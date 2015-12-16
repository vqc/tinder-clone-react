Submission = React.createClass({
  getDefaultProps: function() {
    return {
      image: ''
    };
  },

  render(){
    return(
      <div>
        <div>
          <img src={this.props.image} style="width:100%" />
        </div>
        <div>
          <textarea/>
        </div>
        <div>
          <button className="button button-block button-positive">SEND</button>
        </div>
      </div>
    )
  }
});
