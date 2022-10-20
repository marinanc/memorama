import './App.css';
import { useEffect, useState } from 'react';
import Board from './components/Board/Board';
const emojiList = [...'💣🧤🎩🌮🎱🌶🍕🦖'];

const App = () => {
  /*shuffledMemoBlocks -> donde se guardan las imagenes desordenadas (inicializar en un array vacio)
   *setShuffledMemoBlocks -> para modificar la variale shuffledMemoBlocks
  */
  const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]);

  /*selectedMemoBlock -> donde vamos a guardar cuál es el bloque seleccionado al hacer click en un bloque (inicializa en null)*/
  const [selectedMemoBlock, setSelectedMemoBlock] = useState(null);

  /*animating -> para saber si aún estamos haciendo la animación (el usuario no puede hacer otro click
  *cuando todavía se está animando el click anterior)
  */
  const [animating, setAnimating] = useState(false);

  /* Tiene como parámetros una función y un array de dependencias.
   * El array de dependencias está vacio indicando que se tiene que ejecutar una sola vez (cuando se renderiza)
   * Dentro de la función se crea la constante shuffledEmojiList
  */
  useEffect( () => {
    /* Se guarda el resultado de llamar a la función shuffleArray pasándole como argumento un array con la lista de emojis, dos veces.
    * (dos veces porque necesitamos que las imágenes estén dos veces para que el usuario pueda encontrar la pareja)
    */
    const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList]);

    /* Devuelve un MemoBlock con un emoji, si está flipped (para empezar va a ser falso)
     * y un index i para saber de que MemoBlock se trata
    */
    setShuffledMemoBlocks(shuffledEmojiList.map( (emoji, i) => ({ index:i, emoji, flipped:false }) ));
  }, []);

  /*Para mezclar las imágenes.
   *Recibe un array, devuelve ese mismo array pero con sus valores en posiciones aleatorias
  */
  const shuffleArray = a => {
    for (let i=a.lenght-1; i>0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /*Se ejecuta cada vez que se hace click en un bloque
  * param: memoBlock
  */
  const handleMemoClick = memoBlock => {
    //Se crea una constante con el bloque que fue clickeado, setteando el click en true
    const flippedMemoBlock = {...memoBlock, flipped: true};
    //Copia de la lista de bloques
    let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
    //En la copia reemplazamos el bloque seleccionado por el bloque dado vuelta con splice
    //memoBlock.index -> indice del que queremos reemplazar
    //1 -> solo un elemento
    //flippedMemoBlock -> elemento que queremos poner en su lugar
    shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
    //Setteamos el nuevo listado de bloques con el bloque dado vuelta
    setShuffledMemoBlocks(shuffledMemoBlocksCopy);

    if(selectedMemoBlock === null) {
      //No habia un bloque seleccionado anteriormente...
      //Entonces setteamos el bloque seleccionado con el bloque clickeado
      setSelectedMemoBlock(memoBlock);
    } else if(selectedMemoBlock.emoji === memoBlock.emoji) {
      //La selección es correcta (el emoji del bloque seleccionado coincide con el bloque previo)...
      //Setteamos a null para poder seguir jugando
      setSelectedMemoBlock(null);
    } else {
      //Habia un bloque seleccionado anteriormente, pero no coincide con la imagen del clickeado...
      //Realizar animación y dar tiempo para visualizar las imagenes
      setAnimating(true);
      setTimeout(() => {
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
        shuffledMemoBlocksCopy.splice(selectedMemoBlock.index, 1, selectedMemoBlock);
        setShuffledMemoBlocks(shuffledMemoBlocksCopy);
        setSelectedMemoBlock(null);
        setAnimating(false);
      }, 1000);
    }
  }

  return (
    <Board memoBlock={shuffledMemoBlocks} animating={animating} handleMemoClick={handleMemoClick} />
  );
}

export default App;
