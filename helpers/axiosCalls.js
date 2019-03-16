import axios from 'axios';

const dev = process.env.NODE_ENV !== 'production';

export const GraphQlDevURI = dev ? 'http://localhost:8080/graphql' : 'https://api.coursecamp.io/graphql';
export const host = dev ? 'http://localhost:8080' : 'https://api.coursecamp.io';

export const GraphQlMutate = async (uri, query, token) => {
  try {
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${ token }` : 'undefined'
    };
    const graphQlQuery = {
      query: `
        ${query}
      `
    };
    return axios.post(uri,
      JSON.stringify(graphQlQuery),
      { headers })
  } catch (e) {
    return e;
  }
};
