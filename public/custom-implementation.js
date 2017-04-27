main();

var store;
function main() {

  // create store
  store = createStore(counterReducer);

  // subscribe handlers
  store.subscribe(updateCounter);

  // initialize the app
  store.dispatch({type: 'INIT'});
}

// custom createStore implementation based on the API in http://redux.js.org/docs/basics/Store.html
function createStore(reducer, initialState = undefined) {
  var state = initialState;
  var listeners = new Set();

  // subscribe - subscribe handlers and allow unsubscribe
  function subscribe(listener) {
    listeners.add(listener);

    return function unsubscribe() { listeners.delete(listener); };
  }

  // dispatch - get new state and call listeners
  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(function handle(listener) { listener(); });
  }

  // get state
  function getState() {
    return state;
  }

  return { subscribe, dispatch, getState };
}

// Reducer
function counterReducer(state = 0, action) {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
      break;
    case 'DECREMENT':
      return state - 1;
      break;
    default:
      return state;
  }
}

// Action Dispatcher 1
function increment() {
  store.dispatch({type: 'INCREMENT'});
}

// Action Dispatcher 2
function decrement() {
  store.dispatch({type: 'DECREMENT'});
}

// handle state changes
function updateCounter() {
  document.getElementById('counter').value = store.getState();
}
