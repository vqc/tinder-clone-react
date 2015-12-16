Home = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var myData = Meteor.subscribe("myData");
    return {
      users: MyData.find().fetch()
    }
  },
  render() {
    let list = this.data.users.map(function(user) {
      return (
        <User user={user} key={user._id}/>
      )
    })
    return (
      <div className="list">
        {list}
      </div>
    )
  }

});

User = React.createClass({
  render(){
    return (
      <div className="item item-avatar" key={this.props.user._id}>
        <img src={this.props.user.avatar}></img>
        <h2>{this.props.user.name}</h2>
        <p>{this.props.user.email}</p>
      </div>
    )
  }
});
