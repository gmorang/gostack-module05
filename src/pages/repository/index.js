import React from 'react';

import api from '../../services/api';


function Repository({ match }) {
  const [repo, setRepo] = React.useState({});
  const [issues, setIssues] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const getRepo = async () => {
    setLoading(true);

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
  })

  return (
    <h1>Repository: {}</h1>
  );
}

export default Repository;
