import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class AllArtists extends Component {

  constructor(props) {
    super(props);

    this.state = {
      artists: []
    };
  }

  componentDidMount() {
    axios.get('/api/artists/')
      .then(res => res.data)
      .then(artists => {
        this.setState({
          artists
        });
      });
  }

  render () {

    const artists = this.state.artists;

    return (
      <div>
        <h3>Artists</h3>
        <div className="list-group">
        {
          artists.map(artist => (
            <div className="list-group-item" key={artist.id}>
            {/* determine where to actually Link to later! */}
              <Link to="/albums">{ artist.name }</Link>   
            </div>
            ))
        }
        </div>
      </div>
    );
  }
}