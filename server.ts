import adminSeeder from "./adminSeeder";
import app from "./src/app";
import { envConfig } from "./src/Config/envConfig";
function StartServer(){
    adminSeeder()
    app.listen(envConfig.port_number,()=>{
        console.log("Server is started");
    })
}

StartServer()