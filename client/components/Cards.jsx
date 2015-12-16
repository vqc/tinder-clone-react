Card = React.createClass({
  getInitialState() {
    return {
      x: 0,
      y: 0,
      initialX: 0,
      initialY: 0,
      dragging: "none",
      color: "none"
    }
  },
  moveCardInit(e) {
    e.preventDefault();
    this.setState({
      initialX: e.touches[0].pageX,
      initialY: e.touches[0].pageY,
      dragging: "none"
    })
  },
  moveCard(e) {
    e.preventDefault();
    deltaX = (e.touches[0].pageX - this.state.initialX)
    deltaY = (e.touches[0].pageY - this.state.initialY)
    if (e.changedTouches[0].pageX < 75) {
      this.setState({
        x: deltaX,
        y: deltaY,
        color: "#ef473a"
      })
    } else if (e.changedTouches[0].pageX > (window.innerWidth - 75)) {
      this.setState({
        x: deltaX,
        y: deltaY,
        color: "#33cd5f"
      })
    } else {
      this.setState({
        x: deltaX,
        y: deltaY,
        color: "white"
      })
    }
  },
  moveCardEnd(e) {
    if (e.changedTouches[0].pageX < 75) {
      this.setState({
        x: -1000,
        y: 0,
        dragging: "all 0.5s ease",
      })
      Meteor.setTimeout(this.props.swipeLeft, 500)
    } else if (e.changedTouches[0].pageX > (window.innerWidth - 75)) {
      this.setState({
        x: 1000,
        y: 0,
        dragging: "all 0.5s ease",
      })
      Meteor.setTimeout(this.props.swipeRight, 500)
    } else {
      this.setState({
        x: 0,
        y: 0,
        dragging: "all 0.5s ease",
        color: "white"
      })
    }
  },

  render(){
    React.initializeTouchEvents(true);
    let cardStyle = {
      transform: "translate(" + 
        this.state.x + "px," + 
        this.state.y + "px)",
      transition: this.state.dragging,
      WebkitTransform: "translate(" +
        this.state.x + "px," +
        this.state.y + "px)" +
        " rotate("+this.state.x/10 + "deg)",
      WebkitTransition: this.state.dragging
    }
    let imageBorder = {
      backgroundColor: this.state.color
    }
    if (this.state.x <= -1000 || this.state.x >= 1000) {
      cardStyle.marginBottom = "-" + (document.getElementsByClassName("card")[0].offsetHeight + 20) + "px"
    }

    return(
      <div className="card" onTouchStart={this.moveCardInit} 
                            onTouchMove={this.moveCard} 
                            onTouchEnd={this.moveCardEnd} style={cardStyle}>
        <div className="item item-body" style={imageBorder}>
          <img className="full-image" src={this.props.card.image} />
          </div>
        <div className="item" style={imageBorder}>
          <h2>{this.props.card.name}</h2>
          <p>{this.props.card.details}</p>
        </div>
        <div>
          <div className="button-bar">
            <button className="button button-small button-assertive" onClick={this.props.swipeLeft}></button>
            <button className="button button-small button-balanced" onClick={this.props.swipeRight}></button>
          </div>
        </div>
      </div>
    )
  }
});

Cards = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    var myCards = Meteor.subscribe("myCards");
    return {
      cards: MyCards.find().fetch(),
      loading: !myCards.ready(),
    }
  },
  swipeLeftHandler(_id) {
    alert("Swiped Left!" + _id);
    MyCards.remove(_id);
  },
  swipeRightHandler(_id) {
    alert("Swiped Right!" + _id);
    MyCards.remove(_id);
  },
  render(){
    let bound = this;
    let cards = this.data.cards.map(function(card){
      return (
        <Card card={card} key={card._id} 
              swipeRight={function(){bound.swipeRightHandler(card._id)}}
              swipeLeft={function(){bound.swipeLeftHandler(card._id)}}/>
      )
    });
    if (this.data.loading) {
      return <h1>Loading</h1>
    }
    return(
      <div>
        {cards}
      </div>
    )
  }
});
