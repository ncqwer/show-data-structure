// import React from 'react'
import {connect} from 'react-redux'

import Tree from '../components/tree.js'
import * as actions from '../actions/tree-actions.js'

export default connect(
	state=>({tree_data:state})
	// dispatch=>{handleClick:id=>dispatch(actions.select(id))}
	// actions
	)(Tree);