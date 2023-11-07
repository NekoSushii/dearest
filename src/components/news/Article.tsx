// src/Article.tsx
import React from 'react';

interface ArticleProps {
  article: {
    title: string;
    description: string;
    url: string;
  };
}

function Article({ article }: ArticleProps) {
  return (
    <div className="article">
      <h2 className='title_header'>{article.title}</h2>
      <p>{article.description}</p>
      <button>
        <a href={article.url}>Read more</a>
      </button>
      
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button>
        <a href='/dearest/timeline'>Timeline</a>
      </button>
    
    </div>
  );
}

export default Article;
