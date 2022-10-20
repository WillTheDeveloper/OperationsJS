import { Link, routes } from '@redwoodjs/router'

import Customers from 'src/components/Customer/Customers'

export const QUERY = gql`
  query FindCustomers {
    customers {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No customers yet. '}
      <Link to={routes.newCustomer()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ customers }) => {
  return <Customers customers={customers} />
}
