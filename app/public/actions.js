import fetch from 'isomorphic-fetch';


export const SET_STATE = 'SET_STATE';
export function setState(state) {
  return {
    type: SET_STATE,
    state
  };
}

export const SET_WINDOW_SIZE = 'SET_WINDOW_SIZE';
export function setWindowSize(size) {
  return {
    type: SET_WINDOW_SIZE,
    size
  };
}

export const FETCH_PARK_INFO = 'FETCH_PARK_INFO';
export function fetchParkInfo(parkId) {
  return {
    type: FETCH_PARK_INFO,
    parkId
  };
}

export const REQUEST_FEATURED_PARKS = 'REQUEST_FEATURED_PARKS';
export function requestFeaturedParks() {
  return {
    type: REQUEST_FEATURED_PARKS
  };
}

export const RECEIVE_FEATURED_PARKS = 'RECEIVE_FEATURED_PARKS';
export function receiveFeaturedParks(parks) {
  return {
    type: RECEIVE_FEATURED_PARKS,
    parks,
    receivedAt: Date.now()
  };
}

export function fetchFeaturedParks() {
  return (dispatch) => {
    dispatch(requestFeaturedParks());

    return fetch('/api/featured_parks.json')
      .then(response => response.json())
      .then(parks => dispatch(receiveFeaturedParks(parks)))
      .catch(err => console.warn(err.stack));
  };
}


export const CLEAR_MOST_SHARED_PARKS = 'CLEAR_MOST_SHARED_PARKS';
export function clearMostSharedParks() {
  return {
    type: CLEAR_MOST_SHARED_PARKS
  };
}

export const REQUEST_MOST_SHARED_PARKS = 'REQUEST_MOST_SHARED_PARKS';
export function requestMostSharedParks() {
  return {
    type: REQUEST_MOST_SHARED_PARKS
  };
}

export const RECEIVE_MOST_SHARED_PARKS = 'RECEIVE_MOST_SHARED_PARKS';
export function receiveMostSharedParks(parks, interval, bbox) {
  parks.others.forEach((item) => {
    item.other = 1;
    item.total = item.total ? +item.total : 0;
  });

  const combined = parks.top.concat(parks.others);

  combined.sort((a, b) => {
    return +b.total - +a.total;
  });

  return {
    type: RECEIVE_MOST_SHARED_PARKS,
    parks: combined,
    receivedAt: Date.now(),
    interval: interval,
    bbox: bbox
  };
}

export function fetchMostSharedParks(interval = 'week-now', bbox, allSubQuery) {
  return (dispatch) => {
    dispatch(requestMostSharedParks());

    let params = 'interval=' + interval;
    if (bbox) {
      params += '&bbox=' + bbox.join(',');
    }

    if (allSubQuery) {
      params += '&all=1';
    }

    return fetch('/api/most_shared_parks.json?' + params)
      .then(response => response.json())
      .then(parks => dispatch(receiveMostSharedParks(parks, interval, bbox)))
      .catch(err => console.warn(err.stack));
  };
}

export const REQUEST_SELECTED_PARK = 'REQUEST_SELECTED_PARK';
export function requestSelectedPark() {
  return {
    type: REQUEST_SELECTED_PARK
  };
}

export const RECEIVE_SELECTED_PARK = 'RECEIVE_SELECTED_PARK';
export function receiveSelectedPark(park, parkid) {
  return {
    type: RECEIVE_SELECTED_PARK,
    park,
    parkid,
    receivedAt: Date.now()
  };
}

export const REQUEST_SELECTED_PARK_PHOTOS = 'REQUEST_SELECTED_PARK_PHOTOS';
export function requestSelectedParkPhotos() {
  return {
    type: REQUEST_SELECTED_PARK_PHOTOS
  };
}

export const RECEIVE_SELECTED_PARK_PHOTOS = 'RECEIVE_SELECTED_PARK_PHOTOS';
export function receiveSelectedParkPhotos(rsp) {
  return {
    type: RECEIVE_SELECTED_PARK_PHOTOS,
    images: rsp.images,
    totalImages: rsp.totalImages,
    receivedAt: Date.now()
  };
}

export function fetchSelectedPark(id) {
  return (dispatch) => {
    dispatch(requestSelectedPark());

    return fetch('/api/selected_park.json?id=' + id)
      .then(response => response.json())
      .then(park => dispatch(receiveSelectedPark(park, id)))
      .catch(err => console.warn(err.stack));
  };
}

export const CLEAR_SELECTED_PARK = 'CLEAR_SELECTED_PARK';
export function clearSelectedPark() {
  return {
    type: CLEAR_SELECTED_PARK
  };
}

export function clearSelectedParkData() {
  return (dispatch) => {
    dispatch(clearSelectedPark());
  };
}

export function fetchSelectedParkPhotos(id, offset) {
  return (dispatch) => {
    dispatch(requestSelectedParkPhotos());

    return fetch('/api/park/' + id + '/photos?offset=' + (offset || 0))
      .then(response => response.json())
      .then(images => dispatch(receiveSelectedParkPhotos(images)))
      .catch(err => console.warn(err.stack));
  };
}

/* =====  Selected Activities  ====== */
export const CLEAR_SELECTED_ACTIVITY = 'CLEAR_SELECTED_ACTIVITY';
export function clearSelectedActivity() {
  return {
    type: CLEAR_SELECTED_ACTIVITY
  };
}

export function clearSelectedActivityData() {
  return (dispatch) => {
    dispatch(clearSelectedActivity());
  };
}

export const REQUEST_SELECTED_ACTIVITY = 'REQUEST_SELECTED_ACTIVITY';
export function requestSelectedActivity() {
  return {
    type: REQUEST_SELECTED_ACTIVITY
  };
}

export const RECEIVE_SELECTED_ACTIVITY = 'RECEIVE_SELECTED_ACTIVITY';
export function receiveSelectedActivity(parks, activity) {
  return {
    type: RECEIVE_SELECTED_ACTIVITY,
    parks,
    activity,
    receivedAt: Date.now()
  };
}

export function fetchSelectedActivity(activity, bbox) {
  return (dispatch) => {
    dispatch(requestSelectedActivity());

    let params = 'activity=' + activity;
    if (bbox) {
      params += '&bbox=' + bbox.join(',');
    }

    return fetch('/api/selected_activity.json?' + params)
      .then(response => response.json())
      .then(parks => dispatch(receiveSelectedActivity(parks, activity)))
      .catch(err => console.warn(err.stack));
  };
}
