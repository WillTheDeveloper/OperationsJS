import { jobs, job, createJob, updateJob, deleteJob } from './jobs'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('jobs', () => {
  scenario('returns all jobs', async (scenario) => {
    const result = await jobs()

    expect(result.length).toEqual(Object.keys(scenario.job).length)
  })

  scenario('returns a single job', async (scenario) => {
    const result = await job({ id: scenario.job.one.id })

    expect(result).toEqual(scenario.job.one)
  })

  scenario('creates a job', async (scenario) => {
    const result = await createJob({
      input: {
        title: 'String',
        description: 'String',
        issue: 'String',
        type: 'String',
        device: 'String',
        updatedAt: '2022-10-20T10:35:12.116Z',
        customerId: scenario.job.two.customerId,
      },
    })

    expect(result.title).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.issue).toEqual('String')
    expect(result.type).toEqual('String')
    expect(result.device).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2022-10-20T10:35:12.116Z'))
    expect(result.customerId).toEqual(scenario.job.two.customerId)
  })

  scenario('updates a job', async (scenario) => {
    const original = await job({ id: scenario.job.one.id })
    const result = await updateJob({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a job', async (scenario) => {
    const original = await deleteJob({ id: scenario.job.one.id })
    const result = await job({ id: original.id })

    expect(result).toEqual(null)
  })
})
