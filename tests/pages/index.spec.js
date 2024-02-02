import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Index from '@/pages/index.vue'

describe('Index.vue', () => {
  it('should display a success snackbar on successful login', async () => {
    // Variáveis para simular a store
    const mockUser = {
      token: null,
      msgError: null
    }
    const mockPostLogin = vi.fn(() => Promise.resolve({ token: 'mock-token' }))
    const mockGetUser = vi.fn(() => Promise.resolve({ user: { name: 'John Doe' }}))

    // Função para simular o comportamento do componente
    const login = (email, password) => {
      // Validação de email e senha (opcional)

      // Simulando o login
      mockPostLogin({ email, password })

      // Atualizando o estado do usuário
      mockUser.token = 'mock-token'

      // Chamando a função getUser (opcional)
      mockGetUser()

      // Retornando um objeto com o token
      return { token: 'mock-token' }
    }
    // const wrapper = mount(Index, {
    //   props: {
    //     login, // Passando a função login como prop
    //     user: mockUser, // Passando o objeto mockUser como prop
    //   }
    // })
  })


  // ...adicione mais testes para outros cenários (registro, reset de senha, etc.)
})