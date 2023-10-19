import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from '../../../src/assets/wp.png'
import blackLogo from '../../../src/assets/bp.png'
import { store } from "../../store";

export class Pawn extends Figure {
    constructor(color: Colors, cell: Cell){
        super(color, cell)
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo
        this.name = FigureNames.PAWN
    }
    getAvalibleCells(): Cell[]{
        const availableCellsWhite: Cell[] = []

        const availableCellsBlack: Cell[] = []

        if(this.color === Colors.WHITE){
            this.cell.y === 6 && !store.board.getCell(4, this.cell.x).figure ? availableCellsWhite.push(store.board.getCell(this.cell.y - 2, this.cell.x)) : ''
        }
        else{
            this.cell.y === 1 && !store.board.getCell(3, this.cell.x).figure ? availableCellsBlack.push(store.board.getCell(this.cell.y + 2, this.cell.x)) : ''
        }
       
        this.cell.y+1 < 8 && this.cell.x-1 >= 0 ? store.board.getCell(this.cell.y+1, this.cell.x-1).figure ? availableCellsBlack.push(store.board.getCell(this.cell.y+1, this.cell.x-1)) : '' : ''
        this.cell.y+1 < 8 && this.cell.x+1 < 8 ? store.board.getCell(this.cell.y+1, this.cell.x+1).figure ? availableCellsBlack.push(store.board.getCell(this.cell.y+1, this.cell.x+1)) : '' : ''


        this.cell.y-1 >= 0 && this.cell.x-1 >= 0 ? store.board.getCell(this.cell.y-1, this.cell.x-1).figure ? availableCellsWhite.push(store.board.getCell(this.cell.y-1, this.cell.x-1)) : '' : ''
        this.cell.y-1 >= 0 && this.cell.x+1 < 8 ? store.board.getCell(this.cell.y-1, this.cell.x+1).figure ? availableCellsWhite.push(store.board.getCell(this.cell.y-1, this.cell.x+1)) : '' : ''


        this.cell.y+1 < 8 ? store.board.getCell(this.cell.y+1, this.cell.x).figure ? '' : availableCellsBlack.push(store.board.getCell(this.cell.y+1, this.cell.x)) : ''
        this.cell.y-1 >= 0 ? store.board.getCell(this.cell.y-1, this.cell.x).figure ? '' : availableCellsWhite.push(store.board.getCell(this.cell.y-1, this.cell.x)) : ''


        // взятие на проходе
        if(store.enPassant && store.turn === Colors.BLACK && store.previousFigure?.cell.y === this.cell.y && store.previousFigure?.cell.x === this.cell.x+1){
            availableCellsBlack.push(store.board.getCell(this.cell.y+1, this.cell.x+1))
        }

        if(store.enPassant && store.turn === Colors.BLACK && store.previousFigure?.cell.y === this.cell.y && store.previousFigure?.cell.x === this.cell.x-1){
            availableCellsBlack.push(store.board.getCell(this.cell.y+1, this.cell.x-1))
        }

        if(store.enPassant && store.turn === Colors.WHITE && store.previousFigure?.cell.y === this.cell.y && store.previousFigure?.cell.x === this.cell.x+1){
            availableCellsWhite.push(store.board.getCell(this.cell.y-1, this.cell.x+1))
        }

        if(store.enPassant && store.turn === Colors.WHITE && store.previousFigure?.cell.y === this.cell.y && store.previousFigure?.cell.x === this.cell.x-1){
            availableCellsWhite.push(store.board.getCell(this.cell.y-1, this.cell.x-1))
        }
        
        return this.color === Colors.WHITE ? availableCellsWhite : availableCellsBlack
    }
}