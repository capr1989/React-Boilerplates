import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'


export default new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: ApolloLink.from([
        new HttpLink({
            uri: 'http://localhost:4000/graphql'
        })
    ]),
    cache:
        process.browser && typeof window !== 'undefined'
            ? new InMemoryCache().restore(window.__APOLLO_STATE__)
            : new InMemoryCache()
})