import React, {useState} from 'react'
import { Container, TextInput } from '@mantine/core';
import { Stack, Text } from '@mantine/core';
import { Button } from '@mantine/core';
import Service from '../utils/http';

const service = new Service();

export default function URLShortener() {

    const [input, setInput] = useState({
        "originalUrl" :"",
        "expiresAt":"",
        "title":"",
        "customUrl":""

    })
    const [response, setResponse] = useState(null);

    async function generateShortUrl(){
        try{
            let data = await service.post("s",input);
            setResponse(data);
            console.long(data);
        }
        catch(error){
            console.log(error);
        }
    }

  return (
    <Container size={"xs"}> 
            <div>
               {response ? <>{response.shortCode}</>:
                <Stack>
                    <Text size="30px" align="Center" >
                        Shorten Your URL
                    </Text>
                    <TextInput 
                        onChange={(e) => {
                            setInput({...input, originalUrl : e.target.value});
                        }}
                    size="md"
                    label="Original Url"
                    description=""
                    placeholder="Input placeholder"
                    required
                    />

                    <TextInput
                        onChange={(e) => {
                            setInput({...input,customUrl : e.target.value});
                        }}
                    size="md"
                    label="Customize your link"
                    description=""
                    placeholder="Input placeholder"
                    />

                    <TextInput
                        onChange={(e) => {
                            setInput({...input, title : e.target.value});
                        }}
                    size="md"
                    label="Title"
                    description=""
                    placeholder="Input placeholder"
                    />

                    <TextInput
                        onChange={(e) => {
                            setInput({...input, oexpiresAt : e.target.value});
                        }}
                    size="md"
                    label="Date of expiry"
                    description=""
                    placeholder="Input placeholder"
                    type = "date"
                    />
                    <Button 
                        disabled = {input.originalUrl.length < 5}
                        onClick={()=>{generateShortUrl()} }
                    fullWidth>generate short url</Button>
                </Stack>
            }
            </div>
    </Container>
  )
}
