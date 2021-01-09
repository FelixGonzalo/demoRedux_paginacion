import axios from 'axios'

// constantes
// 3 lo podemos consumir en un componente
const dataInicial = {
  array : [],
  offset: 0
}

const GET_POKEMONES_EXITO = 'GET_POKEMONES_EXITO'
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO'

//reducer
// 2 acepta la lista de pokemones y lo envia a constantes
export default function pokeReducer(state = dataInicial, action) {
  switch (action.type) {
    case GET_POKEMONES_EXITO:
        return {...state, array: action.payload}
    case SIGUIENTE_POKEMONES_EXITO:
        return {...state, array: action.payload.array, offset: action.payload.offset}
    default:
        return state
      break;
  }
}

//actions
// 1 llama a todos los pokemones
// 1 flecha resivimos parametros que necesitamos enviar, 2 otros parametro
export const getPokemonesAccion = () => async (dispatch,getState) => {
  // console.log('getstate ', getState().pokemones.offset)
  const {offset} = getState().pokemones 
  // const offset = getState().pokemones.offset

  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
    dispatch({
      type: GET_POKEMONES_EXITO,
      payload: res.data.results
    })
  } catch (error) {
    console.log(error)
  }
}

export const siguientePokemonAction = (numero) => async (dispatch, getState) => {
  const {offset} = getState().pokemones
  const siguiente = offset + numero

  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${siguiente}`)
    dispatch({
      type: SIGUIENTE_POKEMONES_EXITO,
      payload: {
        array: res.data.results,
        offset: siguiente
      }
    })
  } catch (error) {
    console.log(error)
  }
}
