Camera = React.createClass({
  camera(){
    MeteorCamera.getPicture(function(error, data){
      if(error){
      }
    });
  },
  render(){
  }
});
