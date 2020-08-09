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
  const locations = ['NYC', 'SFO', 'LAX'];
  // DATA BINDING
  const { data, loading, error } = useQuery(searchCustomersQuery);
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  if (data) {
    if (!$.isEmptyObject(data.searchCustomers)) {
      return (
        <div>
          <ul>
            <h2>customers</h2>
            {data.searchCustomers.edges.map(({ node }) => (
              <li key={node.name}>{node.name}</li>
            ))}
          </ul>
        </div>
      );
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
