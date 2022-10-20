import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Job/JobsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_JOB_MUTATION = gql`
  mutation DeleteJobMutation($id: Int!) {
    deleteJob(id: $id) {
      id
    }
  }
`

const JobsList = ({ jobs }) => {
  const [deleteJob] = useMutation(DELETE_JOB_MUTATION, {
    onCompleted: () => {
      toast.success('Job deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete job ' + id + '?')) {
      deleteJob({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Issue</th>
            <th>Type</th>
            <th>Device</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Customer id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{truncate(job.id)}</td>
              <td>{truncate(job.title)}</td>
              <td>{truncate(job.description)}</td>
              <td>{truncate(job.issue)}</td>
              <td>{truncate(job.type)}</td>
              <td>{truncate(job.device)}</td>
              <td>{timeTag(job.createdAt)}</td>
              <td>{timeTag(job.updatedAt)}</td>
              <td>{truncate(job.customerId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.job({ id: job.id })}
                    title={'Show job ' + job.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editJob({ id: job.id })}
                    title={'Edit job ' + job.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete job ' + job.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(job.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default JobsList
