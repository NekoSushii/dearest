import '../../style/News.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Article from './Article'
import { ToastContainer, toast } from 'react-toastify';

const API_KEY = '62f06d5885c7498db8dd9c32983554b5';
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

interface Article {
    title: string;
    description: string;
    url: string;
  }

export default function News() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getStuff() {
        const response = await toast.promise(
            axios.get(API_URL),
            {
                pending: 'Awaiting news API',
                success: 'Completed',
                error: 'API is rejected'
            }
        )
    }
    getStuff()
    
    axios.get(API_URL)
      .then((response: any) =>{
        setArticles(response.data.articles)
        setIsLoading(false)
      })
      .catch((error: any) => {
        console.error(error)
    });
  }, []);

  if(isLoading === true){
    return(
        <div>Loading</div>
    )
  }

  else{
    return (
        <div>
          {articles.map((article, index) => (
            <Article key={index} article={article} />
          ))}
        </div>
      );
  }
 
}