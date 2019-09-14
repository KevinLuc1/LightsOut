import React, {Component} from "react";
import Cell from "./Cell";
import "./Board.css";


class Board extends Component {
  static defaultProps = {
    numRows: 5,
    numCols: 5,
    chanceLightStartsOn: 0.25
  }
	constructor(props) {
		super(props);

    //the initial state
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
	}

	createBoard() {
		let board = [];

    // loop over the rows 
    for (let y = 0; y < this.props.numRows; y++) {
      let row = [];
      // loop over the columns in each row
      for (let x = 0; x < this.props.numCols; x++){
        //decide if something is on or off
        // pushing into rows a bunch of true or false
        row.push(Math.random() < this.props.chanceLightStartsOn)
      }
      board.push(row)
    }


		return board;
	}


	flipCellsAdjacent(coordinate) {
    
		let {numCols, numRows} = this.props;
		let board = this.state.board;

    // splitting to make it "y-x" into "y"-"x"
    // mapping through it with the Number function
    //  converts into string 'y' and 'x' into number y and x
		let [y,x] = coordinate.split("-").map(Number)
    

		function flipCell(y, x){
			// if this coordinate is actually on the board, flip it

			if (x >= 0 && x < numCols && y >= 0 && y < numRows){
				board[y][x] = !board[y][x];
			}
		}
    // flip initial cell(clicked cell)
    flipCell(y,x)
    //flip left
    flipCell(y, x-1)
    //flip right
    flipCell(y, x+1)
    //flip above
    flipCell(y-1, x)
    //flip below
    flipCell(y+1, x)


    // check every row, then check every cell in each row 
    //   to see if they're false or (!cell meaning cell not true)
    let hasWon = board.every(row => row.every(cell => !cell))

    // set the state with that new board with cells flipped
		this.setState({board, hasWon});
    // identical to this.setState({board:board, hasWon:hasWon})
	}




	render() {

    if (this.state.hasWon){
      return <h1> Good job! </h1>
    }

    let tableBoard = [];
    for (let y = 0; y < this.props.numRows; y++){
      
      let row = [];

      for (let x = 0; x < this.props.numCols; x++){
        let coordinate = `${y}-${x}`

        // we are looking into the y row and x col within state
        // that already has a true of false defiend 
        row.push(
            <Cell key={coordinate} 
            isLit={this.state.board[y][x]} 

            flipCellsAroundMe={() => this.flipCellsAdjacent(coordinate) }

            />


          )

      }
      
     
      tableBoard.push(<tr key={y}>{row}</tr>)



    }

		return (
      <div>
        <div className="Board-title">
          <div className="lights"> Lights </div>
          <div className="out"> Out </div>
        </div>
  			<table className="Board">	
  				<tbody>
  					{tableBoard}
  				</tbody>
  			</table>
      </div>
		)


	}




}

export default Board;