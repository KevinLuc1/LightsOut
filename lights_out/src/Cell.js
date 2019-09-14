import React, {Component} from "react";
import "./Cell.css";

class Cell extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		// calls the board to flip adjacent cells
		this.props.flipCellsAroundMe();
    
	}


	render() {
		// class will be "Cell" or "Cell Cell-lit"
		let classes = "Cell" + (this.props.isLit ? " Cell-lit" : "")

		return (
			<td className={classes} onClick={this.handleClick} />
		)

	}





}

export default Cell;