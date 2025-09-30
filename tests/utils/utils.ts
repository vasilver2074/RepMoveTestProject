import * as fs from 'fs';

export function getLoginData(){

    const filePath = "loginData.json";
    const rawData = fs.readFileSync(filePath);
    const jsonData = JSON.parse(rawData.toString());

    return{
        valid_email: jsonData.valid_email as string,
        valid_password: jsonData.valid_password as string,
        invalid_email: jsonData.invalid_email as string,
        invalid_password: jsonData.invalid_password as string
    };
}