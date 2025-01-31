import { expect, test } from '@playwright/test'
import { LoginDTO } from './DTO/LoginDTO'
import { StatusCodes } from 'http-status-codes'

test.describe('Login tests', async () => {
  test('Successful authorization ', async ({ request }) => {
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: LoginDTO.createLoginWithCorrectData(),
    })
    expect(response.status()).toBe(StatusCodes.OK)

    const responseBody = await response.text()
    const jwtRegex = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
    expect(responseBody).toMatch(jwtRegex)
  })

  test('Request with incorrect HTTP method should return METHOD_NOT_ALLOWED status', async ({
    request,
  }) => {
    const response = await request.get('https://backend.tallinn-learning.ee/login/student', {
      data: LoginDTO.createLoginWithCorrectData(),
    })
    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
  })
})
