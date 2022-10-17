import './App.css';
import { useEffect, useState } from 'react';
import Board from './components/Board/Board';
const emojiList = [...'💣🧤🎩🌮🎱🌶🍕🦖'];

const App = () => {
  /*shuffledMemoBlocks -> donde se guardan las imagenes desordenadas (inicializar en un array vacio)
   *setShuffledMemoBlocks -> para modificar la variale shuffledMemoBlocks
  */
  const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]);

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

  return (
    <Board memoBlock={shuffledMemoBlocks} />
  );
}

export default App;
