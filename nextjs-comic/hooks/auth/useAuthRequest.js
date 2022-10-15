import useAxios from './useAxios'

function useAuth() {
  const { axiosInstance } = useAxios()

  const makeRequestWithAuth = (url, options) => {
    return axiosInstance(url, options)
      .then((res) => res.data)
      .catch((error) =>
        Promise.reject(error?.response?.data?.detail ?? error?.response?.data ?? error)
      )
  }

  return { makeRequestWithAuth }
}

export default useAuth
