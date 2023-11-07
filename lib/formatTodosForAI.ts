
const formatTodosForAI = (board:Board)=>{
    const todos =Array.from(board.columns.entries())
    const flatArray = todos.reduce((map,[key,value])=>{
        console.log("map:",map,"key:",key)
        map[key]=value.todos
        return map;
    },{} as {[key in TypedColumn]:Todo[]})


    //reduce ti key:value(length)
    const flatArrayCounted = Object.entries(flatArray).reduce(
        (map,[key,value])=>{
            map[key as TypedColumn] =value.length
            return map
        },
        {}as {[key in TypedColumn]:number}
    );
        return flatArrayCounted
}

export default formatTodosForAI