import {
  customers,
  customer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from './customers'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('customers', () => {
  scenario('returns all customers', async (scenario) => {
    const result = await customers()

    expect(result.length).toEqual(Object.keys(scenario.customer).length)
  })

  scenario('returns a single customer', async (scenario) => {
    const result = await customer({ id: scenario.customer.one.id })

    expect(result).toEqual(scenario.customer.one)
  })

  scenario('creates a customer', async () => {
    const result = await createCustomer({
      input: {
        name: 'String',
        email: 'String',
        phone: 'String',
        address: 'String',
        updatedAt: '2022-10-20T10:35:35.881Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.email).toEqual('String')
    expect(result.phone).toEqual('String')
    expect(result.address).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2022-10-20T10:35:35.881Z'))
  })

  scenario('updates a customer', async (scenario) => {
    const original = await customer({
      id: scenario.customer.one.id,
    })
    const result = await updateCustomer({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a customer', async (scenario) => {
    const original = await deleteCustomer({
      id: scenario.customer.one.id,
    })
    const result = await customer({ id: original.id })

    expect(result).toEqual(null)
  })
})
