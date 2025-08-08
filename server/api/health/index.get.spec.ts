import { $fetch } from '../../../tests/utils/server'

describe('[GET] /api/health', () => {
  it('should return an ok status', async () => {
    const response = await $fetch('/api/health')
    expect(response).toEqual({
      message: 'All systems are running smoothly.',
      status: 200,
    })
  })
})
