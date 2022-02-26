
import { KANSIN_ING } from '../actions/kansins';

const initialState = {
    ids: []
}
const kansinReducer = (state2 = initialState, action) => {
    switch(action.type) {
        case KANSIN_ING:
            // console.log(action.datas);
            // state2.ids.pop();
            return{
                //  ...state2, ids: [...state2.ids, action.datas]
                ids: [action.datas]
            }
        default:
            return state2
    }
}

export default kansinReducer;