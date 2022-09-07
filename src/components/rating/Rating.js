import React from "react"
import {FaStar} from "react-icons/fa"
import { useState } from "react";
import Button from "../button/Button";
import { comics } from "../../api/tmdbApi";
import { access_token } from "../../store/login";
import { useRecoilState } from "recoil";
import { message } from "antd";




const StarRating = ({endpoint}) =>{
    const [accessToken, setAccessToken] = useRecoilState(access_token);
    const [rating,setRating] = useState(null);
    const [hover,setHover] = useState(null);
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };

    const ratingBook = async () =>{
        console.log(endpoint);
        try{
              const params = {rating: rating}
        const response = await comics.ratingBook(endpoint,params,config) 
        message.success('Rating thành công')
        }
        catch {
                console.log("Lỗi rồi");
        }   
     
    }
    return (
        <div>
            {[...Array(5)].map((star,i) =>{
                 const ratingValue = i+1;
              return (
               
                 <label key={i}>
                     <input type="radio" name="rating" value={ratingValue} onClick={() => setRating(ratingValue)}/>
                      <FaStar className="starbook" size={30} color={ratingValue <= (hover||rating) ? "#ffc107"   : "#e4e5e9"}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={()=> setHover(null)}/>
                </label>
              )
               
            })}
            <Button className="ml-1 small" onClick={ratingBook}>Rating</Button>
            
        </div>
    )
}

export default StarRating