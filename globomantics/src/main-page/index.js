import React, { Component } from 'react';
import './main-page.css';
import Header from './header';

class App extends Component {
  state = {};
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  fetchHouses = () => {
    fetch('/houses.json')
    .then(rsp => rsp.json())
    .then(allHouses => {
      this.allHouses = allHouses;
    });
  }

  determineFeaturedHouse = () => {
    if (this.allHouses) {
      const randomIndex = Math.floor(Math.random() * this.allHouses.length);
      const featuredHouse = this.allHouses[randomIndex];
      this.setState({ featuredHouse })
    }
  }

  render() {
    return (
      <div className="container">
        <Header subtitle="Providing houses all over the world"/>
      </div>
    );
  }
}

export default App;
