import { Link, routes } from '@redwoodjs/router'

import Jobs from 'src/components/Job/Jobs'

export const QUERY = gql`
  query FindJobs {
    jobs {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No jobs yet. '}
      <Link to={routes.newJob()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ jobs }) => {
  return <Jobs jobs={jobs} />
}
