import React from 'react'
import {Col,Form,Row,Button} from 'react-bootstrap'
const CommandControl = ({command_name,refFunc,handleClick}) => (
	<Col><Form.Row>
		<Col> 
		<Form.Group>
			<Form.Label>{command_name}</Form.Label>
			<Form.Control type="text" ref={refFunc} placeholder={0}/>
		</Form.Group>
		</Col>
		<Col>
			<br/>
			<Button size="lg" onClick={handleClick}>{command_name}</Button>
		</Col>
	</Form.Row></Col>
	)

export default CommandControl;
            