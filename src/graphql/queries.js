export const search = {
  searchCustomers: {
    name: 'customers',
    graphql: `query ($cursor: Int, $count: Int) {

      searchCustomers(cursor: $cursor, count: $count, term: "") {
        pageInfo {
          total
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
          queryDuration
        }
        edges {
          node {
            name
            baselinePrice
            locations
          }
        }
      }
    }`
  },

}
