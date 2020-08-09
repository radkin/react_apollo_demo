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
          <table className="table table-hover table-bordered table-info">
            <thead className="thead-dark">
              <tr>
                <th>Customer / Department</th>
                <th>Baseline</th>
                {locations.map(location =>
                  <th key={location}>{location}</th>
                )}
              </tr>
            </thead>
            <tbody>

                {data.searchCustomers.edges.map(({ node }) => (
                  <tr key={node.name}>
                    <td>{node.name}</td>
                    <td>${node.baselinePrice}</td>
                    {locations.map(location =>
                      <td key={location}>${node.locations[location].price}</td>
                    )}
                  </tr>
                ))}


            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default App;
