import {useDispatch, useSelector} from 'react-redux'
//dispatch para consumir nuestra accion
//selector para leer el array
import {getPokemonesAccion} from '../redux/pokeDucks'
import {siguientePokemonAction} from '../redux/pokeDucks'

const Pokemones = () => {

  const dispatch = useDispatch()
  const pokemones = useSelector(store => store.pokemones.array)
  console.log(pokemones)

  return (
    <div>
      Lista de pokemones
      <button onClick={() => dispatch(getPokemonesAccion())}>Get Pokemones</button>
      <button onClick={() => dispatch(siguientePokemonAction(20))}>Siguiente</button>
      <ul>
        {
          pokemones.map(item => (
            <li key={item.name}>{item.name}</li>
          ))
        }
      </ul>
    </div>
  );
}
 
export default Pokemones;