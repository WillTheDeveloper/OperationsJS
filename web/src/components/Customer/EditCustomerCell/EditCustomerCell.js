import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CustomerForm from 'src/components/Customer/CustomerForm'

export const QUERY = gql`
  query EditCustomerById($id: Int!) {
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
const UPDATE_CUSTOMER_MUTATION = gql`
  mutation UpdateCustomerMutation($id: Int!, $input: UpdateCustomerInput!) {
    updateCustomer(id: $id, input: $input) {
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

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ customer }) => {
  const [updateCustomer, { loading, error }] = useMutation(
    UPDATE_CUSTOMER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Customer updated')
        navigate(routes.customers())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateCustomer({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Customer {customer?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CustomerForm
          customer={customer}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
