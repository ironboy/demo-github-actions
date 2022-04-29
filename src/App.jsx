import { useState, useEffect } from 'react';

// a subclass to FetchHelper
import Author from './utilities/Author';

export default function App() {
  const [authors, setAuthors] = useState([]);
  const [filterText, setFilterText] = useState('');

  // Run this when our component mounts (we can see it on screen)
  useEffect(() => {
    (async () => {
      setAuthors(await Author.find());
    })();
  }, []);

  function addAsFavorite(id) {
    let author = authors.find(x => x.id === id);
    author.isFavorite = !author.isFavorite;
    setAuthors([...authors]);
  }

  function filter(event) {
    let fText = event.target.value;
    setFilterText(fText);
    for (let author of authors) {
      author.hide = !author.name.toLowerCase()
        .includes(fText.toLowerCase());
    }
    setAuthors([...authors]);
  }

  return (
    <main>
      <h1>Author search, version 1.0</h1>
      <input onChange={filter} value={filterText} placeholder="Filter by author name" />
      <div className="author-list">
        {authors.map(({ id, name, description, isFavorite, hide }) => hide ? null :
          <div className="author" key={id}>
            <h3 className="author-name" onClick={() => addAsFavorite(id)}>{isFavorite ? <span className="star">⭐</span> : ''}{name}</h3>
            <p className="author-description">{description}</p>
          </div>
        )}
      </div>
    </main >
  );
}