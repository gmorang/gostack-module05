import React from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';
import Container from '../../components/container';
import { Loading, Owner, IssueList } from './styles';


function Repository({ match }) {
  const [repo, setRepo] = React.useState({});
  const [issues, setIssues] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  const getRepo = async () => {
    const repoName = decodeURIComponent(match.params.name);

    const [repo, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, { params: { state: 'open', per_page: 5 } })
    ])

    setRepo(repo.data);
    setIssues(issues.data);
    setLoading(false);
  }

  React.useEffect(() => {
    getRepo();
  }, [])

  if (isLoading) {
    return <Loading>Carregando</Loading>
  }

  return (
    <Container>
      <Owner>
        <a href="/">Voltar aos repositorios</a>
        <img src={repo.owner.avatar_url} alt={repo.owner.login} />
        <h1>{repo.name}</h1>
        <p>{repo.description}</p>
      </Owner>

      <IssueList>
        {issues.map(item => (
          <li key={String(item.id)}>
            <img src={item.user.avatar_url} alt={item.user.login} />
            <div>
              <strong>
                <a href={item.html_url}>{item.title}</a>
                {item.labels.map(label => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>
              <p>{item.user.login}</p>
            </div>
          </li>
        ))}
      </IssueList>
    </Container>
  );
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string
    })
  }).isRequired
}

export default Repository;
