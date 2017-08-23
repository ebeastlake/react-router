import React, { Component } from 'react';
import AllAlbums from './AllAlbums';
import AllArtists from './AllArtists';
import SingleAlbum from './SingleAlbum';
import Sidebar from './Sidebar';
import Player from './Player';
import {Route, HashRouter} from "react-router-dom";

export default class Main extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <HashRouter>
        <div id="main" className="container-fluid">
          <div className="col-xs-2">
            <Sidebar />
          </div>
            <div className="col-xs-10">
              <Route exact path='/' component={AllAlbums} />
              <Route exact path='/albums' component={AllAlbums} />
              <Route exact path='/artists' component={AllArtists} />
              <Route exact path='/single-album/:albumId' component={SingleAlbum} /> 
            </div>
          <Player />
        </div>
      </HashRouter>
    );
  }
}
