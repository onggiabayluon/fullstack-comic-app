import useAxios from '@/hooks/auth/useAxios'

const useStripeApi = () => {
  const { makeAuthRequest } = useAxios()

  function buyCoin({ coin }) {
    return makeAuthRequest(`buy-coin`, {
      method: 'POST',
      data: { coin },
    })
  }

  function createStripePayment({ coin }) {
    return makeAuthRequest(`create-payment`, {
      method: 'POST',
      data: { coin },
    })
  }

  return {
    createStripePayment,
    buyCoin,
  }
}

export default useStripeApi
