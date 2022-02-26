import { CHAPTER } from '../../data/dummy-data';
import { CHAPTER_ING } from '../actions/chapters';

const initialState = {
    chapter: CHAPTER,
    id: []
}
const chapterReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHAPTER_ING:
            const meal = state.chapter.find(chap => chap.id === action.chapterId);
            return { ...state, id: meal,}
        default:
            if(action.chapterId === undefined){
            }
            return { ...state, id: meal,}
    }
}

export default chapterReducer;