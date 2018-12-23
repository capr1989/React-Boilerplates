import React from 'react';
import { Query } from 'react-apollo'
import { QUERY_CLIENT } from '../queries/clients';
import client from '../Utils/initApollo.js'

export default ()=>(
    <Query query = {QUERY_CLIENT} client = {client}>

    {({loading, error, data}) =>{
        if(loading) return 'Loading...'
        else if(error) return `Error: ${error.message}`
        else {
            
            return( 
            <React.Fragment> 
            <h2>Listado de Clientes</h2>
            <ul>
            {data.clients.map((client)=>{
                return (
                    <li key = {client.id}>
                        {client.name}__{client.lastName}
                    </li>
                )
            })}
            </ul>
            </React.Fragment>
            )
        }
            }}
    </Query>
)