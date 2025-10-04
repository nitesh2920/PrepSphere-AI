import { inngest } from "./client";
import { db } from '@/configs/db';
import { USER_TABLE } from '@/configs/schema';
import {eq} from "drizzle-orm"

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const CreateNewUser = inngest.createFunction(
  {id:'create-user'},
  {event:'user.create'},
  async({event,step})=>{

    const {user}=event.data;
    const result=await step.run('Check existing user and create New user if dont exists ',async()=>{
       const result=await db.select().from(USER_TABLE)
          .where(eq(USER_TABLE.email,user?.primaryEmailAddress?.emailAddress))
            console.log(result);
            if(result?.length == 0){
             const userData = await db.insert(USER_TABLE).values({
                name:user?.fullName,
                email:user?.primaryEmailAddress?.emailAddress
              }).returning({
                id:USER_TABLE.id
              })
              console.log(userData)
      
            }
            return result;
    })
    return  'Account Created Successfully'
  }
)