import {connect} from 'react-redux'

import List from '../components/list.js'


import{
	CREATE_UNTI,
	DELETE_UNTI,
	INSERT_BEFORE,
	INSERT_BEHIND,
	SEARCH
} from '../constants/list-types.js';
import * as actions from '../actions/list-actions.js'


export default connect(
	state=>({datas:state,commands:[DELETE_UNTI,INSERT_BEFORE,INSERT_BEHIND,SEARCH]}),
	actions
	)(List)