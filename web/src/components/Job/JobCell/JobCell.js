import Job from 'src/components/Job/Job'

export const QUERY = gql`
  query FindJobById($id: Int!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Job not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ job }) => {
  return <Job job={job} />
}
