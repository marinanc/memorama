import MemoBlock from '../MemoBlock/MemoBlock';
import './Board.css';

/*memoBlock es el listado de blocks mezclados*/
const Board = ({memoBlock}) => {
    return (
        <main className="board">
            {memoBlock.map( (memoBlock, i) => {
                //Iteracion con memoBlock.map
                //Devuele un array de componentenes MemoBlock
                //Dentro de cada MemoBlock vamos a pasar una key (React lo necesita para renderizar elementos integrados)
                //para ello utilizamos el index y el emoji (de esta manera tenemos un identificador unico para cada block)
                //Tambien le pasamos el memoBlock con toda la información del block.
                return <MemoBlock key={`${i}_${memoBlock.emoji}`} memoBlock={memoBlock} />
            })}
        </main>
    )

}

export default Board;