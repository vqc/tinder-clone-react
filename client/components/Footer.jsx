Footer = React.createClass({
  getDefaultProps() {
    return {
      tabs: [{name:"Cards", content:<Cards />}, 
            {name: "Tab 2", content:(<div>Tab 2</div>)}, 
            {name: "Tab 3", content: (<div>Tab 3</div>)}]
    }
  },
  render(){
    let props = this.props;
    return(
      <div className="tabs tabs-icon-top">
        {this.props.tabs.map(function(tab, i){
          var boundClick = props.onClick.bind(null, tab.name, tab.content);
          return (
            <a className="tab-item" key={tab.name} onClick={boundClick}>
              <i className="icon ion-star"></i>
              {tab.name}
            </a>
          )
        })}
      </div>
    )
  }

})
