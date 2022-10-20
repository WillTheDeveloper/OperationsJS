import Customer from 'src/components/Customer/Customer'

export const QUERY = gql`
  query FindCustomerById($id: Int!) {
    customer: customer(id: $id) {
      id
      name
      email
      phone
      address
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Customer not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ customer }) => {
  return <Customer customer={customer} />
}
