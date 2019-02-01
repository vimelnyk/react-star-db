import React, { Component } from 'react';
import SwapiSerwice from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './random-planet.css';

export default class RandomPlanet extends Component {
  swapiSerwice = new SwapiSerwice();
  state = {
   planet: {},
   loading: true,
   error:false
  };
  constructor(){
    super();
    console.log('conbstructor')
    this.updatePlanet();
    this.inrerval = setInterval(this.updatePlanet, 1500)
  };
  componentDidMount(){
    console.log('componentDidMount')
  }
  onPlanetLoaded = (planet) =>{
    this.setState({planet, loading:false})
  };

  onError = (err) => {
      this.setState({error:true, loading:false})
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random()*17) + 2;
    this.swapiSerwice.getPlanet(id).then(this.onPlanetLoaded).catch(this.onError);
  };

  render() {
    console.log('componentDidMount')
    const {  planet, loading, error } = this.state;
    const hasData = !(loading || error);
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {errorMessage}
        {content}      
      </div>
    );
  }
}

const PlanetView = ({planet}) => {
  const {  id, name, population, rotationPeriod, diameter } = planet;
  return(
  <React.Fragment>
   <img className="planet-image"
            src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4>{ name }</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{ population }</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{ rotationPeriod }</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{ diameter }</span>
            </li>
          </ul>
        </div>
  </React.Fragment>
  );
}