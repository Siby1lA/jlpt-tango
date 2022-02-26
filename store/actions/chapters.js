export const CHAPTER_ING = 'CHAPTER_ING';

export const toggleIng = (id) => {
  return {
    type: CHAPTER_ING,
    chapterId: id
  };  
};