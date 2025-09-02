import React, {Component} from 'react';
import {CLEARLIST, VISITEDLIST } from '../Constants';

export class AuthAction extends Component {
  static Visited(data) {
    return {type: VISITEDLIST, payload: data};
  }
 
  static ClearRedux() {
    return {type: CLEARLIST};
  }
}

export default AuthAction;
