// 2. Sequential vs. Parallel Execution
//SEQUENTIAL EXECUTION
function task(name,duration){
    return new Promise((resolve) =>{
        setTimeout(() => {
            console.log('${name} completed');
            resolve();
            
        }, duration);
    });
}
  async function executeSequentially() {
    console.time("sequential Execution");
    await task("Task 1", 2000);
    await task("Task 2", 2000);
    await task("Task 3", 2000);
    console.timeEnd("sequential Execution");

  }
  executeSequentially();

  //Parallel Execution

  async function executeInParallel(){
    console.time("Parallel Execution");
    const tasks= [
        task("Task 1", 2000),
        task("Task 2", 2000),
        task("Task 3", 2000),
    ];
    await Promise.all(tasks);
    console.timeEnd("Parallel Execution");
  }
  executeInParallel();

  //3. Chaining Promises

  function validateCredentials(username, password){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(username=== "user123" && password=== "password"){
                resolve({userId:1});   
            }
            else{
                reject("Invalied credentails");
            }
        }, 1000);

    });
  }

  function fetchUserDetails(userId){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({userId, name:"Pradhyu", email: "pradhyu@123.com"});
        }, 1000);
    });
    }
  function fetchRecentActivity(user){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {activity: "Logged in", time: "09:00 PM"},
                {activity: "Viewed Homepage", time:"9:10 PM"},
            ]);
        },1000);
    });
  }

  //    Simulate login flow
  function login(username, password){
    validateCredentials(username, password)
    .then((user)=>{
        console.log("Login successful:", user);
        return fetchUserDetails(user.userId);
    })
    .then((details) => {
        console.log("User details:", details);
        return fetchRecentActivity(details);
    })
    .then((activity)=>{
        console.log("Recent activity:", activity);
    })
    .catch((error)=>{
        console.error("Error during login flow:", error);
    });

  }
  login("user123", "password");

  //4. Retry Mechanism

  function fetchData(apiUrl, retries = 3) {
    return new Promise((resolve, reject) => {
      const attemptFetch = (attempt) => {
        console.log(`Attempt ${attempt} to fetch data...`);
        setTimeout(() => {
          // Simulate fetch: 50% chance of success
          if (Math.random() > 0.5) {
            resolve("Data fetched successfully!");
          } else if (attempt < retries) {
            attemptFetch(attempt + 1);
          } else {
            reject("Failed to fetch data after multiple retries");
          }
        }, 1000);
      };
  
      attemptFetch(1);
    });
  }
  
  fetchData("https://example.com/api")
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
  