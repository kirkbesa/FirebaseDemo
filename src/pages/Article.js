import { useNavigate, useParams, Link } from "react-router-dom"
import {getDoc, doc, onSnapshot} from 'firebase/firestore';
import {db} from '../firebase/config'
import { useEffect,useState } from 'react';
import EditIcon from '../assets/edit.svg'

export default function Article() {
  const { urlId } = useParams()
  const navigate = useNavigate()

  console.log("id: " + urlId)

  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const ref = doc(db, "articles", urlId);  
      const snapshot = await getDoc(ref);  

      if (snapshot.exists()) {
        setArticle({ id: snapshot.id, ...snapshot.data() });
      } else {
        setTimeout(() => {
          navigate("/");  
        }, 2000);
      }
    };

    fetchArticle();
  }, [urlId, navigate]);
  

  // if (!article) {
  //   setTimeout(() => {
  //     navigate('/')
  //   }, 2000)
  // }

  const handleEdit = async (id) => {
    const ref = doc(db, 'articles', id)
  }

  return (
    <div>
      {!article && <p>No records found!</p>}
      {article && (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>By {article.author}</p>
          <p>{article.description}</p>
          
          <Link to={`/edit/${article.id}`}>
            Edit Article
            <img 
              className="icon"
              onClick={() => handleEdit(article.id)}
              src={EditIcon} alt="delete icon" 
            />
          </Link>

        </div>
      )}
    </div>
  )
}
