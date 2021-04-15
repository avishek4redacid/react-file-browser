import React, { Component } from 'react';
import './App.css';
import MainBody from './components/MainBody';
import TopBar from './components/TopBar';
import { setData, setLocation, createFolder } from './actions'
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
      fetch('https://gist.githubusercontent.com/alagu/bfee7d87e0e03cd9bc33693af61281d9/raw/b100b548563ffcb1b554432c3ffdf855f1651547/folder-data.json')
      .then(res => res.json())
      .then((data) => {
        this.props.setData(data);
      })
      .catch(console.log)
  }


  render() {
    return (
      <div>
        <TopBar
            location={this.props.location}
            setLocation={this.props.setLocation}/>
        <MainBody
            items={this.props.items}
            location={this.props.location}
            setLocation={this.props.setLocation}
            createFolder={this.props.createFolder}/>
      </div>
    );
  }
}


// function to convert the global state obtained from redux to local props
function mapStateToProps(state) {
  return {
    items: state.items || [],
    location: state.location || [],
  };
}

export default connect(mapStateToProps, { setData, setLocation, createFolder })(App);
