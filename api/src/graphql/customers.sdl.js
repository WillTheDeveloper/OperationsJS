export const schema = gql`
  type Customer {
    id: Int!
    name: String!
    email: String!
    phone: String!
    address: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    jobs: [Job]!
  }

  type Query {
    customers: [Customer!]! @requireAuth
    customer(id: Int!): Customer @requireAuth
  }

  input CreateCustomerInput {
    name: String!
    email: String!
    phone: String!
    address: String!
  }

  input UpdateCustomerInput {
    name: String
    email: String
    phone: String
    address: String
  }

  type Mutation {
    createCustomer(input: CreateCustomerInput!): Customer! @requireAuth
    updateCustomer(id: Int!, input: UpdateCustomerInput!): Customer!
      @requireAuth
    deleteCustomer(id: Int!): Customer! @requireAuth
  }
`
