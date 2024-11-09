import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {collection, updateDoc, getDoc, doc} from 'firebase/firestore';
import {db} from '../firebase/config'
// styles
import './create.css'

export default function Create() {  
  const { urlId } = useParams()
  const [article, setArticle] = useState(null);
  const [formData, setFormData] = useState({ title: '', author: '', description: ''});

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  
  const navigate = useNavigate()
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const articleRef = doc(db, 'articles', urlId);
    await updateDoc(articleRef, {
      title: title,
      description: description,
      author: author
    });
    navigate('/'); 
  };

  useEffect(() => {
    const ref = doc(db, 'articles', urlId);
    getDoc(ref)
      .then((snapshot)=>{        
        setArticle(snapshot.data());
      })

    const fetchArticle = async () => {
      const ref = doc(db, "articles", urlId);  
      const snapshot = await getDoc(ref);  

      if (snapshot.exists()) {
        setArticle({ id: snapshot.id, ...snapshot.data() });
        setFormData({
          title: snapshot.data().title,
          author: snapshot.data().author,
          description: snapshot.data().description,
        });
      } else {
        setTimeout(() => {
          navigate("/");  
        }, 2000);
      }
    };

    fetchArticle();
  },[])
  

  return (
    <div className="create">
      <h2 className="page-title">Edit Article</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={formData.title}
            required
          />
        </label>
        
        <label>
          <span>Author:</span>
          <input 
            type="text" 
            onChange={(e) => setAuthor(e.target.value)}
            defaultValue={formData.author}
            required
          />
        </label>

        <label>
          <span>Description:</span>
          <textarea 
            onChange={(e) => setDescription(e.target.value)}
            defaultValue={formData.description}
            required
          />
        </label>

        <button className="btn">submit</button>
      </form>
      <button className="btn" onClick={() => navigate('/')}>back</button>
    </div>
  )
}