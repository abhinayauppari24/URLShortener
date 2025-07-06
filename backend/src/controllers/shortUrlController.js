import { ShortURL } from "../models/shorturl.model.js";
import {nanoid} from 'nanoid'
export const shortUrl = async (req, res) =>{

    try{
        const userId = req.user.id;
        const {originalUrl, expiresAt, title, customUrl} = req.body;

        if(!originalUrl){
            return res.status(400).send({status : "missing original url payload"});
        }

        let shortCode ="";
        if(customUrl){
            shortCode = customUrl;
            let existData = await ShortURL.findOne({shortCode});
            if(existData) return res.status(400).send({status: "duplicate customurl"})

        }else{
            shortCode = nanoid(7);
            let isUnique = false;

            while(!isUnique){
                const existData = await ShortURL.findOne({shortCode});
                if(!existData) isUnique=true;
                else shortCode = nanoid(7);
            }
        }

        const newURL =  new ShortURL({
            originalUrl,
            shortCode,
            userId

        })
        await newURL.save();
        return res.status(200).send(newURL);

    }catch(error){
        console.log(error);
        return resizeBy.status(500).send({status : "INTERNAL_SERVER_ERROR"});
    }

}

export const redirectFunction = async (req, res) =>{
    try{

        const shortCode = req.params.shortcode;
        const data = await ShortURL.findOne({shortCode});
        if(!data){
            return res.status(404).send({status : "NOT_FOUND"});
        }
       return  res.redirect(data.originalUrl);

    }catch(error){
        console.log(error);
        return res.status(500).send({status:" INTERNAL_SERVER_ERROR"});
    }
}