'use client'
import { useBoardStore } from '@/store/BoradStore';
import React, { useEffect } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import Column from './Column';


function Board() {
  const [board, getBoard, setBoardstate,updateTodoInDB] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoardstate,
    state.updateTodoInDB
  ]);

  useEffect(() => {

    getBoard()
  }, [getBoard])

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result
    console.log('destination:',destination)
    console.log('source:',source)

    console.log(type)
    // Check user if draged card  outside of board 
    if (!destination) return
    //handle column drag
    if (type == 'column') {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1)
      entries.splice(destination.index, 0, removed)// Inserts removed at destination.index
      const rearrangedColumn = new Map(entries);
      setBoardstate({
        ...board,
        columns: rearrangedColumn
      })
        return;
    }
    //this step is needed as the indexes are stored as numbers 0,1,2 etc . instead of id's with DnD lib
    const columns = Array.from(board.columns);
    const startColIndex =  columns[Number(source.droppableId)]
    const finishColIndex = columns[Number(destination.droppableId)]

 

    const startCol:Column ={
      id:startColIndex[0],
      todos:startColIndex[1].todos

    }
    const finishCol:Column ={
      id:finishColIndex[0],
      todos:finishColIndex[1].todos

    }
    console.log(startCol,finishCol)
    if(!startCol || !finishCol) return

    if(source.droppableId === destination.droppableId && startCol === finishCol) return

    const newTodos= startCol.todos
    const [todoMoved] = newTodos.splice(source.index,1)
   
    if(startCol.id === finishCol.id){
      // drag same task column
      newTodos.splice(destination.index,0,todoMoved)
      const newCol = {
        id:startCol.id,
        todos:newTodos
      }
      const newColumn =  new Map(board.columns)
      newColumn.set(startCol.id,newCol)
      setBoardstate({...board,columns:newColumn})


    }else{
      //drag to another column
      const  finishTodos = Array.from(finishCol.todos)
      finishTodos.splice(destination.index,0,todoMoved)
  

      const newColumn =  new Map(board.columns)
      const newCol = {
        id:startCol.id,
        todos:newTodos
      }
      newColumn.set(startCol.id,newCol)
      newColumn.set(finishCol.id,{
        id:finishCol.id,
        todos:finishTodos
      })

      updateTodoInDB(todoMoved,finishCol.id)
      setBoardstate({...board,columns:newColumn})


    }


  }
  return (

    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='board' direction='horizontal' type='column' >
        {(provided) => (
          <div
            className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column
                id={id}
                key={id}
                todos={column.todos}
                index={index}
              />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Board