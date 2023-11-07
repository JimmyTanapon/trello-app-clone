import {ID,storage} from '@/appwrite'

const uploadeImage = async (file:File)=>{
    if(!file) return
    const fileUploaded = await storage.createFile(
        "64df4d89237d79974ae8",
        ID.unique(),
        file
    );
    return fileUploaded
}
export default uploadeImage