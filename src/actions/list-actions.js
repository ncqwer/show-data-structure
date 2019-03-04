import{
	CREATE_UNTI,
	DELETE_UNTI,
	INSERT_BEFORE,
	INSERT_BEHIND,
	SEARCH,
	SELECT
} from '../constants/list-types.js';
// state example
// const state={
// 	selected_id:0,
// 	head:0,
// 	tail:0
// 	0:{
// 		value:1,
// 		pre:null,
// 		next:2
// 	}
// }

let id = 1;
export const createUnti = (value) => ({
	type:CREATE_UNTI,
	id:id++,
	value
})

export const deleteUnti = () => ({
	type:DELETE_UNTI,
})

export const insertBehind = (id) => ({
	type:INSERT_BEHIND,
	id
})

export const insertBefore = (id) => ({
	type:INSERT_BEFORE,
	id
})

export const search = (value) => ({
	type:SEARCH,
	value
})

export const select = (id) => ({
	type:SELECT,
	id
})