import gql from 'graphql-tag'
export const QUERY_CLIENT = gql`
{
clients {
    id
    name
    lastName
    company
}
}
  
`