React.initializeTouchEvents(true);
let Transition = React.addons.CSSTransitionGroup;

AppBody = React.createClass({
  Platform:  {
    isIOS: function () {
      return (!!navigator.userAgent.match(/iPad/i) || !!navigator.userAgent.match(/iPhone/i) 
              || !!navigator.userAgent.match(/iPod/i))
              || Session.get('platformOverride') === 'iOS';
    },

    isAndroid: function () {
      return navigator.userAgent.indexOf('Android') > 0
              || Session.get('platformOverride') === 'Android';
    }
  },

  getDefaultProps() {
    return {
      tabs: ["Daily", "Roses", "Specials"]
    }
  },
  getInitialState() {
    return {
      modal: false,
      popup: false
    }
  },
  ionModal(tab, content) {
    this.setState({
      modal: (
        <IonModal modalContent={content}>
          <div className="h1 title">{tab}</div>
          <button onClick={ () => this.setState({modal:false}) } className="button button-icon active">
            <i className="icon ion-ios-close-empty"></i>
          </button>
        </IonModal>
      )
    })
  },
  ionPopup(head, body, button){
    this.setState({
      popup:(
        <IonPopup head={head} body={body}>
          <button onClick={ () => this.setState({popup:false}) } 
            className="button button-positive active">
            {button}
          </button>
        </IonPopup>
      )
    })
  },
  setModalState(status){
    this.setState({
      modal:status
    });
  },
  setPopupState(status){
    this.setState({
      popup:status
    });
  },

  render() {
    var cx = React.addons.classSet;
    var ionicBodyClass = cx({
      'ionic-body': true,
      'platform-cordova': Meteor.isCordova,
      'platform-ios': this.Platform.isIOS,
      'platform-android': this.props.isAndroid
    });
                        
    return (
      <div className={ionicBodyClass}>

        <div className="bar bar-header bar-dark">
          <ReactRouter.Link className="button button-icon icon ion-gear-a" to={"/settings"}></ReactRouter.Link>
          <ReactRouter.Link className="h1 title" to={"/"}>App Name</ReactRouter.Link>
          <ReactRouter.Link className="button button-icon icon ion-heart" to={"/other"}></ReactRouter.Link>
        </div>

        <div className="view">
          
          <div className="scroll-content ionic-scroll">
            <div className="content overflow-scroll has-header has-tabs">
              <ReactRouter.RouteHandler
                ionPopup={this.ionPopup} setPopupState={this.setPopupState}
                ionModal={this.ionModal} setModalState={this.setModalState}/>


            </div>
          </div>
        </div>

        {this.state.modal}
        
        {this.state.popup}

       
        <Footer onClick={this.ionModal} test="test"/>

      </div>
    )
  }
})
