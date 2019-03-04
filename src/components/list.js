import {Button,ButtonToolbar,Row,Col,Form} from 'react-bootstrap'
import React from 'react'

import CommandControl from './command-control.js'

import{
	CREATE_UNTI,
	DELETE_UNTI,
	INSERT_BEFORE,
	INSERT_BEHIND,
	SEARCH
} from '../constants/list-types.js';


const List = (props) => (
	<div>
		<ListControl {...props}/> 
		<ListShow {...props.datas} handleSelect={props.select}/>
	</div>
)


            
class ListControl extends React.Component{
	constructor(props){
		super(props);
		this.ref_arrs=[];
	}
	chooseClickEvent=(command)=>{
		switch(command){
			case INSERT_BEFORE: 
				return (e)=>{
					e.preventDefault();
					const value = this.ref_arrs[command].value;
					const node = this.props.createUnti(value);
					this.props.insertBefore(node.id);
				};
			case INSERT_BEHIND:
				return (e)=>{
					e.preventDefault();
					const value = this.ref_arrs[command].value;
					const node = this.props.createUnti(value);
					this.props.insertBehind(node.id);
				};
			case SEARCH:
				return (e)=>{
					e.preventDefault();
					const value = this.ref_arrs[command].value;
					this.props.search(value);
				}
			case DELETE_UNTI:
				return (e)=>{
					e.preventDefault();
					this.props.deleteUnti();
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

class ListShow extends React.Component{

	handleClick=(e)=>{
		const handleSelect = this.props.handleSelect;
		const id = Number(e.target.value);
		handleSelect(id);
	}
	renderListNodes = props => {
		let id = props.head;
		let nodes=[];
		while(id){
			const data_node = props[id];
			const variant_type= id===props.selected_id? 'danger':'primary';
			nodes.push(
				<Button key={id}  value={id} variant={variant_type} onClick={this.handleClick}>
					{data_node.value}
				</Button>
				);
			id = data_node.next;
		}
		return nodes;
	}
	render(){
		return (
			<ButtonToolbar>
				{this.renderListNodes(this.props)}
			</ButtonToolbar>
			);
	}
}

export default List;

