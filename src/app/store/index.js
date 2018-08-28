import createStore from '../../lib/store'
import app from './reducer'

const store = createStore(app)

// store.subscribe(() => {
//   console.log(store.getState())
// })

export default store
