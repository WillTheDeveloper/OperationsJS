import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import JobForm from 'src/components/Job/JobForm'

export const QUERY = gql`
  query EditJobById($id: Int!) {
    job: job(id: $id) {
      id
      title
      description
      issue
      type
      device
      createdAt
      updatedAt
      customerId
    }
  }
`
const UPDATE_JOB_MUTATION = gql`
  mutation UpdateJobMutation($id: Int!, $input: UpdateJobInput!) {
    updateJob(id: $id, input: $input) {
      id
      title
      description
      issue
      type
      device
      createdAt
      updatedAt
      customerId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ job }) => {
  const [updateJob, { loading, error }] = useMutation(UPDATE_JOB_MUTATION, {
    onCompleted: () => {
      toast.success('Job updated')
      navigate(routes.jobs())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateJob({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Job {job?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <JobForm job={job} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
