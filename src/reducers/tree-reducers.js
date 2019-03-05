import {
	CREATE_NODE,
	DELETE_NODE,
	ADD_CHILD,
	REMOVE_CHILDREN,
	SELECT
} from '../constants/tree-types.js'



const childMethod=(children,action)=>{
	switch(action.type){
		case ADD_CHILD:
			return [
				...children,
				action.id
			];
		case REMOVE_CHILDREN:
			return [];
		default:
			return [];
	}
}


const getAllDescentantNodeId=(root_node,state)=>{
	return root_node.children.reduce((ids,current_id)=>{
			return [
				...ids,
				current_id,
				...getAllDescentantNodeId(state[current_id],state)
			];
		},[]);
}
const deleteMany=(state,ids)=>{
	state={...state};
	//can not delete the root node
	ids.forEach(id=>delete state[id]);
	return {...state};
}


const modifyNodeChildren=(state,id)=>{
	state={
		...state,
		[id]:{
			...state[id],
			children:state[id].children.filter(id=>state[id])
		}
	};
	state[id].children.forEach(id=>modifyNodeChildren(state,id));
	return state;
}

export default (state={
	selected_id:0,
	0:{
		id:0,
		value:0,
		children:[]
	},
	root:0,
},action)=>{
	if(action.type===SELECT){
		return {
			...state,
			selected_id:action.id
		}
	}
	if(state.selected_id===null) return state;
	switch(action.type){
		case CREATE_NODE:
			return {
				...state,
				[action.id]:{
					id:action.id,
					value:action.value,
					children:[]
				}
			}
		case DELETE_NODE:
			const selected_id=state.selected_id;
			if(selected_id===0) return Error('You can\'t delete the root node!!!');
			const needDeleteNodeId_include=[state.selected_id,...getAllDescentantNodeId(state[state.selected_id],state)];
			state={...deleteMany(state,needDeleteNodeId_include),selected_id:null};
			return modifyNodeChildren(state,state.root);
		case REMOVE_CHILDREN:
			const needDeleteNodeId=getAllDescentantNodeId(state[state.selected_id],state);
			state=deleteMany(state,needDeleteNodeId);
		case ADD_CHILD:
			const selected_node=state[state.selected_id];
			return {
				...state,
				[state.selected_id]:{
					...selected_node,
					children:childMethod(selected_node.children,action)
				}
			}
		default:
			return state;
	}
}