import TreeShow from '../containers/wrapped-tree.js'
import React from 'react'
import {connect} from 'react-redux'
import {Button,ButtonToolbar,Row,Col,Form} from 'react-bootstrap'

import {
	CREATE_NODE,
	DELETE_NODE,
	ADD_CHILD,
	REMOVE_CHILDREN,
	SELECT
} from '../constants/tree-types.js'
import * as actions from '../actions/tree-actions.js'
import CommandControl from './command-control.js'

const Tree = (props) => (
	<div>
		<TreeControl {...props}/> 
		<TreeShow tree_name="treeGraph" width={700} height={700} handleSelect={props.select}/>
	</div>
)


            
class TreeControl extends React.Component{
	constructor(props){
		super(props);
		this.ref_arrs=[];
	}
	chooseClickEvent=(command)=>{
		switch(command){
			case ADD_CHILD: 
				return (e)=>{
					e.preventDefault();
					const value = this.ref_arrs[command].value;
					const node = this.props.createNode(value);
					this.props.addChild(node.id);
				};
			case DELETE_NODE:
				return (e)=>{
					e.preventDefault();
					// const value = this.ref_arrs[command].value;
					// const node = this.props.createNode(value);
					this.props.deleteNode();
				};
			case REMOVE_CHILDREN:
				return (e)=>{
					e.preventDefault();
					// const value = this.ref_arrs[command].value;
					this.props.removeChildren();
				}
			default:
				return (e)=>{
					e.preventDefault();
					const value = this.ref_arrs[command].value;
					console.log(value);
				};

		}
	}
	render(){
		const commands=this.props.commands;
		const command_views= commands.map((command,i)=>(
			<CommandControl 
				key={i}
				command_name={command}
				handleClick={this.chooseClickEvent(command)}
				refFunc={node=>this.ref_arrs[command]=node}
			/>
			));
		return (
			<Row>{command_views}</Row>
			);
	}
}


export default connect(
	state=>({commands:[	
	DELETE_NODE,
	ADD_CHILD,
	REMOVE_CHILDREN,]}),
	actions
	)(Tree)

