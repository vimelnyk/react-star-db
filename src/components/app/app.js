
import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import PeoplePage from '../people-page';
import ErrorBoundry from "../error-boundry";
import Row from "../row/row";
import ItemDetails from "../item-details/item-details";
import SwapiService from '../../services/swapi-service';

import './app.css';

export default class App extends Component {
  swapiService = new SwapiService();
  state = {
    showRandomPlanet: true
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  render() {

    const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;
    const {getPerson, getStarship, getPersonImage, getStarshipImage} = this.swapiService;
    const personDetails = (
      <ItemDetails itemId={11} getData={getPerson} getImageUrl={getPersonImage} />
      );
    const starshipDetails = (
      <ItemDetails itemId={5} getData={getStarship} getImageUrl={getStarshipImage} />
      );

    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />
          
          <Row
              left={personDetails}
              right={starshipDetails} />
        </div>
      </ErrorBoundry>
    );
  }
}
