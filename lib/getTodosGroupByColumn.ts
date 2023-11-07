import { database } from "@/appwrite"

export const  getTodosGroupedByColumn=async()=>{
    const data = await database.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
    );

    const todos = data.documents;
    const columns =todos.reduce((acc,todo)=>{
        if(!acc.get(todo.status)){
             acc.set(todo.status,{
                id:todo.status,
                todos:[]
             })
        }
        acc.get(todo.status)!.todos.push({
            $id:todo.$id,
            $createdAt:todo.$createdAt,
            title:todo.title,
            status:todo.status,
            // get the image if exists on todo
            ...(todo.image && {image:JSON.parse( todo.image)})
            
        })
        return acc;
    },new Map<TypedColumn,Column>)
    //if colomn dosent inprogress ,todo and  done and them with empty todos
    const columnTypes:TypedColumn[] = ['todo','inprogress','done'];
     for (const columnType of columnTypes){
        console.log('columnType test:',columnType)
        if(!columns.get(columnType)){
            console.log('columns type:',columnType)
            columns.set(columnType,{
                id:columnType,
                todos:[],
            })
        }
     }

     console.log(columns)
    //  sort column by columnTypes
     const sortColumn= new Map(
       Array.from(columns.entries()).sort((a,b)=>(
    columnTypes.indexOf(a[0])-columnTypes.indexOf(b[0])
       ))
     );
     const board:Board={
        columns:sortColumn
     }
     return board

};