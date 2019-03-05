import React from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'

import * as actions from '../actions/tree-actions.js'
let hsj=1;

function convertDataStructure(root,datas){
	return {
		id:root,
		val:datas[root].value,
		children:datas[root].children.map(id=>convertDataStructure(id,datas))
	}
}

function isKeepTreeSame(root_id,ltree,rtree){
	let no_change=ltree[root_id]===rtree[root_id];
	if(!no_change) return false;
	return ltree[root_id].children.reduce((no_change,current_root)=>{
		if(!no_change) return false;
		const current_no_change=isKeepTreeSame(current_root,ltree,rtree);
		return current_no_change;
	},no_change);
}
class Tree extends React.Component{
	constructor(props){
		super(props);
		this._tree_root={};
		// this.state={select_id:0};
	}

	hightlightChoosed=(svg)=>{
		const selected_id=this.props.tree_data.selected_id;
		const node_circles=svg.selectAll('circle').attr('fill',d => d.children ? "#555" : "#999");
		const hsj=`.treeid_${selected_id}`;
		const select_node_circle=svg.select(`.treeid_${selected_id}`).attr('fill','red');
		const hhh=1;

	}
	calcTreeNodes=()=>{
		const {width,height,tree_data}=this.props;
		const hierarchy_data=convertDataStructure(tree_data.root,tree_data);
		this._tree_root=d3.tree().size([0.8*width,0.8*height])(d3.hierarchy(hierarchy_data));
	}
	drawTree=({g_nodes,g_links})=>{
		// const handleClick=this.props.select;
		const {handleSelect}=this.props;
		let links=g_links.selectAll('path').data(this._tree_root.links());
		const decorateLinkPaths=links=>links.attr('d',d3.linkHorizontal()
		      .x(d => d.y)
		      .y(d => d.x));
		//update
		decorateLinkPaths(links);
		//exit and enter
		links.exit().remove();
		decorateLinkPaths(links.enter().append('path'));

		// const setSelected=id=>this.setState({select_id:id});
		const decorateNodes=nodes=>{
			const hsj=1;
			return nodes.attr('transform',d=>`translate(${d.y},${d.x})`)};
		const decorateNodeCircles=circles=>circles.attr("fill", d => d.children ? "#555" : "#999")
		  .attr("r", 7).attr('treeid',d=>d.data.id).attr('class',d=>`treeid_${d.data.id}`)
		  .on('click',function(){
		  	const value=d3.select(this).attr('treeid');
		  	handleSelect(Number(value));
		  	// const {id}=createNode(7);
		  	// addChild(id);
		  	// setSelected(value);
		  });
		const decorateNodesTexts=texts=>texts.attr("dy", "0.31em")
		  .attr("x", d => d.children ? -27 : 27)
		  .attr("text-anchor", d => !d.children ? "end" : "start")
		  .text(d => {
		  	const hsj=d.data.id;
		  	return hsj;
		  });

		//update
		const data_nodes=this._tree_root.descendants();
		let nodes=g_nodes.selectAll('g').data(data_nodes);
		decorateNodes(nodes);
		let node_texts=g_nodes.selectAll('g>text').data(data_nodes);
		decorateNodesTexts(node_texts);
		let node_circles=g_nodes.selectAll('g>circle').data(data_nodes);
		decorateNodeCircles(node_circles);
		//exit
		nodes.exit().remove();
		//enter
		let new_nodes=nodes.enter().append('g');
		decorateNodes(new_nodes);
		decorateNodesTexts(new_nodes.append('text'));
		decorateNodeCircles(new_nodes.append('circle'));

	}
	componentDidMount(){
		const {tree_name,tree_data,width,height} = this.props;
		const svg=d3.select(`.${tree_name}`).append('svg').attr('width',width).attr('height',height);
		const g=svg.append('g').attr('transform',`translate(${0.1*width},${0.1*height})`);
		const g_links=g.append('g').attr('class','g_links').attr("fill", "none")
					.attr("stroke", "#555")
					.attr("stroke-opacity", 0.4)
					.attr("stroke-width", 1.5);
		const g_nodes=g.append('g').attr('class','g_nodes').attr("stroke-linejoin", "round");
		this.calcTreeNodes();
		this.drawTree({g_links,g_nodes});
		this.hightlightChoosed(svg);

	}
	componentDidUpdate(prev_props,pre_state){
		const {tree_name,tree_data}=this.props;
		const pre_tree_data=prev_props.tree_data;
		const svg=d3.select(`.${tree_name}>svg`);
		const hsj=isKeepTreeSame(0,pre_tree_data,tree_data);
		console.log(hsj);
		console.log(`${pre_tree_data.selected_id},${tree_data.selected_id}`);
		if(!hsj){
			const g_links=svg.select('g>.g_links');
			const g_nodes=svg.select('g>.g_nodes');
			this.calcTreeNodes();
			this.drawTree({g_links,g_nodes});
		}
		this.hightlightChoosed(svg);
	}

	render(){
		const tree_name=this.props.tree_name;
		console.log('begin rendering');
		return (<div><div className={tree_name}></div>
			<button onClick={e=>{this.setState({'hsj':++hsj})}}>HHH</button>
			</div>);
	}
}



export default Tree;