describe('Config: AppConfig', () => {
  it('should return an app config', () => {
    const config = useAppConfig()

    expect(config).toStrictEqual({
      app: {
        name: 'Nuxt Template',
        version: '1.0.0',
      },
      icon: expect.any(Object),
      nuxt: expect.any(Object),
      ui: expect.any(Object),
    })
  })
})
