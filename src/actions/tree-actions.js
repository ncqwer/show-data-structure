import {
	CREATE_NODE,
	DELETE_NODE,
	ADD_CHILD,
	REMOVE_CHILDREN,
	SELECT
} from '../constants/tree-types.js'

let id=1;
export const createNode=(value)=>({
	type:CREATE_NODE,
	value,
	id:id++
})

export const deleteNode=()=>({
	type:DELETE_NODE
})

export const addChild=(id)=>({
	type:ADD_CHILD,
	id
})

export const removeChildren=()=>({
	type:REMOVE_CHILDREN
})

export const select=(id)=>({
	type:SELECT,
	id
})