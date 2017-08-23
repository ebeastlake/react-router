import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import axios from 'axios';
import Songs from './Songs';
import AllAlbums from './AllAlbums'

export default class SingleArtist extends Component {

  constructor (props) {
    super(props);
    this.state = {
      artist: {},
      artistAlbums: [],
      artistSongs: []
    }
  }

  componentDidMount() {

    const artistId = this.props.match.params.artistId;

    const getName = axios.get(`/api/artists/${artistId}`);

    const getAlbums = axios.get(`/api/artists/${artistId}/albums`);

    const getSongs = axios.get(`/api/artists/${artistId}/songs`);

    Promise.all([getName, getAlbums, getSongs])
      .then(resArray => {
        return resArray.map(function(res) {
          return res.data
        })
      })
      .then(data => {
        //console.log(data);
        this.setState({
          artist: data[0],
          artistAlbums: data[1],
          artistSongs: data[2]
        });
      });
  }

  render () {
    const artist = this.state.artist; // or however you've named it
    return (
      <div>
        <h3>{ artist.name }</h3>
        <ul className="nav nav-tabs">
          <li><Link to={`/artists/${artist.id}/albums`}>ALBUMS</Link></li>
          <li><Link to={`/artists/${artist.id}/songs`}>SONGS</Link></li>
        </ul>
        <Route path='/artists/:artistId/albums' render={
          () => <AllAlbums albums={this.state.artistAlbums}/>
        }/>
        <Route path='/artists/:artistId/songs' render={
          () => <Songs songs={this.state.artistSongs}/>
        }/>
      </div>
    );
  }

  // render () {
  //   return (

  //     <div>
  //       <h3>{this.state.artist.name}</h3>
  //       <h4>ALBUMS</h4>
  //       <AllAlbums albums={this.state.artistAlbums}/>
  //       <h4>SONGS</h4>
  //       <Songs songs={this.state.artistSongs}/>
  //     </div>
  //   );
  // }
}
