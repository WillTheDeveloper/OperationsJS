import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_JOB_MUTATION = gql`
  mutation DeleteJobMutation($id: Int!) {
    deleteJob(id: $id) {
      id
    }
  }
`

const Job = ({ job }) => {
  const [deleteJob] = useMutation(DELETE_JOB_MUTATION, {
    onCompleted: () => {
      toast.success('Job deleted')
      navigate(routes.jobs())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete job ' + id + '?')) {
      deleteJob({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Job {job.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{job.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{job.title}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{job.description}</td>
            </tr>
            <tr>
              <th>Issue</th>
              <td>{job.issue}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{job.type}</td>
            </tr>
            <tr>
              <th>Device</th>
              <td>{job.device}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(job.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(job.updatedAt)}</td>
            </tr>
            <tr>
              <th>Customer id</th>
              <td>{job.customerId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editJob({ id: job.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(job.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Job
