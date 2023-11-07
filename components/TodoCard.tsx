'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd'
import { MinusCircleIcon } from '@heroicons/react/24/solid'
import { useBoardStore } from '@/store/BoradStore'
import getUrl from '@/lib/getURL'


type Props = {
    id: TypedColumn
    todo: Todo
    index: number
    innerRef: (element: HTMLElement | null) => void
    draggableProps: DraggableProvidedDraggableProps
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
}

function TodoCard({
    id,
    todo,
    index,
    innerRef,
    dragHandleProps,
    draggableProps
}: Props) {
    const [deleteTask] = useBoardStore((state)=>[
        state.deleteTask
    ])
    const [imageUrl ,setImageUrl] = useState<string|null>(null);
    useEffect(()=>{
        if(todo.image){
            const fetchImage = async()=>{
                const url = await getUrl(todo.image!)
                if(url){
                    setImageUrl(url.toString())
                }

            }
            fetchImage();
        }
        
    },[todo])
    return (
        <div
            {...dragHandleProps}
            {...draggableProps}
            ref={innerRef}
            className=' bg-white rounded-md space-y-2  drop-shadow-md'
        >

            <div className=' flex justify-between items-center     p-5'>
                <p>{todo.title}</p>
                <button onClick={()=>deleteTask(index,todo,id)} className=' text-red-500 hover:text-red-600'>
                    <MinusCircleIcon
                        className=' h-6 w-6'

                    />
                </button>
            </div>
            {/*image here...  */}
            {imageUrl &&
                        <div className='   w-full rounded-b-md'>
                            <Image
                                width={400}
                                height={200}
                                src={imageUrl} alt={'task image'} 
                                className=' w-full    object-contain rounded-b-md'
                                />
                        </div>
                    }
           

        </div>
    )
}

export default TodoCard