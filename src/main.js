import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import * as list_actions from './actions/list-actions.js'
import ListApp from './containers/wrapped-list.js'
import list_reducer from './reducers/list-reducers.js'

console.log(`pathname:${location.pathname}`);
const store = createStore(list_reducer);

console.log(store.getState());
store.dispatch(list_actions.createUnti(1));
store.dispatch(list_actions.insertBefore(1));
store.dispatch(list_actions.search(1));
console.log(store.getState());
store.dispatch(list_actions.createUnti(2));
store.dispatch(list_actions.insertBehind(2));
console.log(store.getState());
store.dispatch(list_actions.createUnti(3));
store.dispatch(list_actions.insertBefore(3));
console.log(store.getState());
store.dispatch(list_actions.createUnti(4));
store.dispatch(list_actions.insertBefore(4));
console.log(store.getState());


// render(<Tree tree_data={tree_store.getState()} tree_name="treeGraph" width={700} height={700}/>,document.getElementById('app'));
render(<Provider store={store}>
	<ListApp/>
	</Provider>,document.getElementById('ListApp'));