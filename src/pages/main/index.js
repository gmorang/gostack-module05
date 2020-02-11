import React from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'

import api from '../../services/api';
import { Container, Form, SubmitButton } from './style'

function Main() {
  const [repos, setRepos] = React.useState([]);
  const [text, setText] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    const response = await api.get(`/repos/${text}`)

    const data = {
      name: response.data.full_name
    }

    setRepos([...repos, data]);
    setLoading(false);
    setText('');
  }

  return (
    <Container>
      <h1><FaGithubAlt />Repositories</h1>
      <Form onSubmit={handleSubmit}>
        <input type="text" placeholder="Adicionar repositiorio" value={text} onChange={e => setText(e.target.value)} />
        <SubmitButton loading={isLoading}>
          {!isLoading ? <FaPlus color="#FFF" size={14} /> : <FaSpinner color="#FFF" size={14} />}
        </SubmitButton>
      </Form>


    </Container>
  );
}

export default Main;
