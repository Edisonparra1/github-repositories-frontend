import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [repoList, setRepoList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //  solicitud a la API sin encabezados adicionales
        const response = await axios.get('http://localhost:9000/');

        // Actualizar el estado con los datos recibidos
        setRepoList(response.data.repoList);
      } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        setError(`Hubo un error: ${error.message}`);
      } finally {
        
        setLoading(false);
      }
    };

    // Llamado a la función fetchData
    fetchData();
  }, []); 

  // Mostrar el indicador de carga 
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Repositorios más populares</h1>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <ul className="repo-list">
          {repoList.map((repo, index) => (
            <li key={index} className="repo-card">
              <strong className="repo-name">{repo.name}</strong> - {repo.description} (Stars: {repo.stars})
              <br />
              <a href={repo.url} target="_blank" rel="noopener noreferrer" className="repo-link">
                Ver en GitHub
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
