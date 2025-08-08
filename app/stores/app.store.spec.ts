describe('AppStore', () => {
  it('should exists as store', () => {
    const store = useAppStore()
    expect(store).toBeDefined()
  })

  it('should have basic state', () => {
    const expectedState = {}
    const store = useAppStore()
    expect(store.state).toStrictEqual(expectedState)
  })
})
