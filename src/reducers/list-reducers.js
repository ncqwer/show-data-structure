 import{
	CREATE_UNTI,
	DELETE_UNTI,
	INSERT_BEFORE,
	INSERT_BEHIND,
	SEARCH,
	SELECT
} from '../constants/list-types.js';

const searchByValue = (state,action) => {
	const search_value = action.value;
	let unti = state[state.head];
	while(unti){
		if(unti.value == search_value) return unti.id;
		unti = state[unti.next];
	}
	return null;
}

const deleteHead = (state) => {
	const selected_id = state.selected_id;
	const next_unti = state[state.head];
	let new_state = {
		...state,
		[next_unti.id]:{
			...next_unti,
			prev:null
		},
		head:next_unti.id,
		selected_id:null
	};
	delete new_state[selected_id];
	return new_state;
}

const deleteTail = (state) => {
	const selected_id = state.selected_id;
	const prev_unti = state[state.tail];
	let new_state = {
		...state,
		[prev_unti.id]:{
			...prev_unti,
			next:null
		},
		tail:prev_unti.id,
		selected_id:null
	};
	delete new_state[selected_id];
	return new_state;
}

const insertHead = (state,id) => {
	const head_unti = state[state.head];
	return {
		...state,
		[head_unti.id]:{
			...head_unti,
			prev:id
		},
		[id]:{
			...state[id],
			next:head_unti.id,
		},
		head:id
	}
}

const insertTail = (state,id) => {
	const tail_unti = state[state.tail];
	return {
		...state,
		[tail_unti.id]:{
			...tail_unti,
			next:id
		},
		[id]:{
			...state[id],
			prev:tail.id,
		},
		tail:id
	}
}
export default (state={
	0:{
		id:0,
		value:0,
		next:null,
		prev:null
	},
	head:0,
	tail:0,
	selected_id:0
},action) => {
	if(action.type === SEARCH){
		return {
			...state,
			selected_id:searchByValue(state,action)
		};
	}
	if(action.type === SELECT){
		return {
			...state,
			selected_id:action.id
		}
	}
	if(state.selected_id === null) return state;
	if(action.type === DELETE_UNTI){
		const selected_id = state.selected_id;
		if(selected_id === state.head) return deleteHead(state);
		if(selected_id === state.tail) return deleteTail(state);
		const selected_unti = state[selected_id];
		const prev_unti = state[selected_unti.prev];
		const next_unti = state[selected_unti.next];
		let new_state =  {
			...state,
			[prev_unti.id]:{
				...prev_unti,
				next:next_unti.id
			},
			[next_unti.id]:{
				...next_unti,
				prev:prev_unti.id
			},
			selected_id:null
		};
		delete new_state[selected_id];
		return new_state;
	}
	if(action.type === INSERT_BEFORE){
		const selected_id = state.selected_id;
		if(selected_id === state.head) return insertHead(state,action.id);
		const selected_unti = state[selected_id];
		const prev_unti = state[selected_unti.prev];
		return {
			...state,
			[prev_unti.id]:{
				...prev_unti,
				next:action.id
			},
			[selected_unti.id]:{
				...selected_unti,
				prev:action.id
			},
			[action.id]:{
				...state[action.id],
				next:selected_id,
				prev:prev_unti.id
			}
		};
	}
	if(action.type === INSERT_BEHIND){
		const selected_id = state.selected_id;
		if(selected_id === state.tail) return insertTail(state,action.id);
		const selected_unti = state[selected_id];
		const next_unti = state[selected_unti.next];
		return {
			...state,
			[next_unti.id]:{
				...next_unti,
				prev:action.id
			},
			[selected_unti.id]:{
				...selected_unti,
				next:action.id
			},
			[action.id]:{
				...state[action.id],
				prev:selected_id,
				next:next_unti.id
			}
		};
	}
	if(action.id){
		return {
			...state,
			[action.id]:{
				value:action.value,
				prev:null,
				next:null,
				id:action.id
			}
		}
	}
	return state;
}