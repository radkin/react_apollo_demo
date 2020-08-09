/* eslint no-undef: 0 */
import React from 'react';
import $ from 'jquery';
import './App.css';
// Apollo
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import * as queries from './graphql/queries';

const searchCustomersQuery = gql(queries.search.searchCustomers.graphql);

const App = () => {
  // DATA BINDING
  const { loading, error, data } = useQuery(searchCustomersQuery);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  if (data) {
    if (!$.isEmptyObject(data.searchCustomers)) {
      return(
        <ul>
         { data.searchCustomers.edges.map(edge =>
           <li
             key={edge.id}>
             {edge.node.name}
           </li> )
         }
        </ul>
      )
    }
  }
}

export default App;

/*
return (
  <div>
    <a>
      {e => {
        searchCustomers({
          variables: {
            cursor:0,
            count:15
          }
        })
      }}
    </a>
      we have search results
  </div>
);
*/
