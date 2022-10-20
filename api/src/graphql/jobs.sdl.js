export const schema = gql`
  type Job {
    id: Int!
    title: String!
    description: String!
    issue: String!
    type: String!
    device: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    customer: Customer!
    customerId: Int!
  }

  type Query {
    jobs: [Job!]! @requireAuth
    job(id: Int!): Job @requireAuth
  }

  input CreateJobInput {
    title: String!
    description: String!
    issue: String!
    type: String!
    device: String!
    customerId: Int!
  }

  input UpdateJobInput {
    title: String
    description: String
    issue: String
    type: String
    device: String
    customerId: Int
  }

  type Mutation {
    createJob(input: CreateJobInput!): Job! @requireAuth
    updateJob(id: Int!, input: UpdateJobInput!): Job! @requireAuth
    deleteJob(id: Int!): Job! @requireAuth
  }
`
