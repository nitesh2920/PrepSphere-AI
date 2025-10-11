import { Inngest } from "inngest";

// Create a client to send and receive events
console.log("Creating Inngest client...");
export const inngest = new Inngest({ id: "PrepSphere-AI" });
  console.log("Inngest client created!");
// import { Inngest } from "inngest";

// try {
//   console.log("Creating Inngest client...");
//   export const inngest = new Inngest({ name: "my-app" });
//   console.log("Inngest client created!");
// } catch (err) {
//   console.error("Error creating Inngest client:", err);
//   throw err;
// }
