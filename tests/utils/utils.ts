import * as fs from 'fs';

export function getLoginData(){

    const filePath = "loginData.json";
    const rawData = fs.readFileSync(filePath);
    const jsonData = JSON.parse(rawData.toString());

    return{
        email: jsonData.email as string,
        password: jsonData.password as string,
    };
}