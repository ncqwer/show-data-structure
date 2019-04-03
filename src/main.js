import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {Row,Col,Form,Button} from 'react-bootstrap'
import * as d3 from 'd3'

import * as actions from './actions/list-actions.js'
import ListApp from './components/list-app.js'
import list_reducer from './reducers/list-reducers.js'
import * as treeActions from './actions/tree-actions.js'
import TreeApp from './components/tree-app.js'
import treeReducer from './reducers/tree-reducers.js'
console.log(`pathname:${location.pathname}`);
const store = createStore(list_reducer);

console.log(store.getState());
store.dispatch(actions.createUnti(1));
store.dispatch(actions.insertBefore(1));
store.dispatch(actions.search(1));
console.log(store.getState());
store.dispatch(actions.createUnti(2));
store.dispatch(actions.insertBehind(2));
console.log(store.getState());
store.dispatch(actions.createUnti(3));
store.dispatch(actions.insertBefore(3));
console.log(store.getState());
store.dispatch(actions.createUnti(4));
store.dispatch(actions.insertBefore(4));
console.log(store.getState());


const tree_store=createStore(treeReducer);
console.log(tree_store.getState());
tree_store.dispatch(treeActions.createNode(1));
tree_store.dispatch(treeActions.addChild(1));
console.log(tree_store.getState());
tree_store.dispatch(treeActions.createNode(2));
tree_store.dispatch(treeActions.addChild(2));
console.log(tree_store.getState());


render(<Provider store={store}>
	<ListApp/>
	</Provider>,document.getElementById('ListApp'));


render(<Provider store={tree_store}>
	<TreeApp tree_name="treeGraph" width={700} height={700}/>
	</Provider>,document.getElementById('TreeApp'));
