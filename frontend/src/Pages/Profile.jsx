import React, {useState,useEffect} from "react";
import Service from "../utils/http";
import { Avatar } from "@mantine/core";
const service = new Service();
import {Stack, Text} from "@mantine/core"

export default function Profile(){
    const [user, setUser] = useState({});

    async function getMyData(){
        try{
            let data = await service.get("user/me");
            setUser(data);
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(() =>{
        getMyData();
    }, [])

    return(
        <div>
            <Stack 
                
                h={300}
                bg="var(--mantine-color-body)"
                align="center"
                justify="center"
                gap="md"
            >
                <Avatar src={user.avatar} alt="its my profile" />
                <Text> {user.name}</Text>
                <Text> {user.email}</Text>
                <Text> {user._id}</Text>


            </Stack>
        </div>
    )
}