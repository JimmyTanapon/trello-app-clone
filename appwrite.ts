import { Client, Account,Databases,ID, Storage } from "appwrite";

const client = new Client();


// process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!) // Your project ID
;
const account =new Account(client)
const database = new Databases(client)
const storage =new Storage(client)
export {account,database,storage,ID};
