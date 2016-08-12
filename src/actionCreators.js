import {
  GENERATE_NAME,
  CREATE_PLAYER_SUCCESS,
  CREATE_PLAYER_FAIL,
  POLL_LOBBY_SUCCESS,
  POLL_LOBBY_FAIL,
  SET_COUNTDOWN,
  SET_CHOICE,
  PICK_CHOICE_SUCCESS,
  PICK_CHOICE_FAIL,
} from './actionTypes';
import { Actions } from 'react-native-router-flux';

export function appReady() {
  return function(dispatch, getState) {
    let state = getState();

    if (state.id === -1) {
      dispatch(createPlayer());
    }
    dispatch(generateName());
    Actions.home();
  };
}

export function createPlayer() {
  return function(dispatch, getState) {
    // hit create player endpoint
    // on success: set player id
  };
}

export function createPlayerSuccess(id) {
  return {
    type: CREATE_PLAYER_SUCCESS,
    id: id,
  };
}

export function createPlayerFail() {
  return {
    type: CREATE_PLAYER_FAIL,
  };
}

// simplest action creator
export function generateName() {
  return {
    type: GENERATE_NAME,
  };
}

// This is a thunk.
// redux-thunk supplies store.dispatch() and store.getState()
// to your action creators.
// This is where we will hit the 'join game' endpoint
export function join() {
  return function(dispatch, getState) {
    console.log('hey you\'re in a thunk!');
    // hit endpoint
    // on success, do nothing?? all server side...
  };
}

export function pollLobby() {
  return function(dispatch, getState) {
    // hit 'players in room'/'is room ready' endpoint
    // CHECK HERE IF playerCount === maxPlayerCount to determine ready?? or use ready field
    // on success:not ready dispatch(pollLobbySuccess), dispatch(pollLobby)
    // on success:ready dispatch(pollLobbySuccess), Actions.countdown(), countdown(getState().countdownTime),
    // on fail: handle
  }
}

// this will receive a session (isReady and playerCount??)
export function pollLobbySuccess(data) {
  return {
    type: POLL_LOBBY_SUCCESS,
    playerCount: data.playerCount,
  };
}

export function setCountdown(time) {
  return {
    type: SET_COUNTDOWN,
    time: time,
  };
}

export function countdown(time, callback) {
  return function(dispatch) {
    if (time > 0) {
      let nextTime = time - 1;

      setTimeout(() => {
        dispatch(setCountdown(nextTime));
        if (nextTime > 0) {
          dispatch(countdown(nextTime, callback));
        } else {
          callback();
        }
      }, 1000);
    }
  };
}

export function setChoice(choice) {
  return {
    type: SET_CHOICE,
    choice: choice,
  };
}

export function pickChoice(choice) {
  return function(dispatch) {
    dispatch(setChoice(choice));
    // hit answer endpoint with player's choice, nothing to handle?
  };
}

export function pickChocieSuccess() {
  return {
    type: PICK_CHOICE_SUCCESS,
  };
}

export function pickChocieFail() {
  return {
    type: PICK_CHOICE_FAIL,
  };
}
