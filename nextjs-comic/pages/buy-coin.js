import SideButton from '@/components/Buttons/SideButton'
import SettingLayoutWrapper from '@/components/common/SettingLayoutWrapper'
import { PageSEO } from '@/components/SEO'
import Spinner from '@/components/Skeleton/Spinner'
import useFetch from '@/hooks/api/useFetch'
import { useAsyncFn } from '@/hooks/useAsync'
import classNames from '@/lib/utils/classNames'
import useProductApi from '@/services/productServices'
import useStripeApi from '@/services/stripeService'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { FaCoins } from 'react-icons/fa'

export default function BuyCoin() {
  const [message, setMessage] = useState(null)

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)

    if (query.get('success')) {
      setMessage({
        isSuccess: true,
        description:
          'Order placed! Please Wait around 5 seconds and reload the page. You will receive an email confirmation when process finished.',
      })
    }

    if (query.get('canceled')) {
      setMessage({
        isSuccess: false,
        description: "Order canceled -- continue to shop around and checkout when you're ready.",
      })
    }
  }, [])

  return (
    <>
      <PageSEO title={'Buy Coins'} />
      <SettingLayoutWrapper>
        {message && <Message message={message} />}
        <ProductDisplay />
      </SettingLayoutWrapper>
    </>
  )
}

function ProductDisplay() {
  const { getCoinsUrl } = useProductApi()
  const { data: coinList, isLoading: showCoinList } = useFetch({ url: getCoinsUrl.url })

  const [coinPickedId, setCoinPickedId] = useState(null)
  const { createStripePayment } = useStripeApi()
  const createStripePaymentFn = useAsyncFn(createStripePayment)

  const submitForm = (e) => {
    e.preventDefault()

    createStripePaymentFn
      .execute({ coin: coinPickedId })
      .then((res) => {
        Router.push(res.redirect_to)
      })
      .catch((err) => console.log(err))
  }

  return (
    <form onSubmit={submitForm}>
      <label className="text-base font-medium text-gray-900">Notifications</label>
      <p className="text-sm leading-5 text-gray-500">How do you prefer to receive notifications?</p>
      <fieldset className="mt-4">
        <legend className="sr-only">Notification method</legend>
        <div className="grid grid-cols-2 gap-3 space-y-2 sm:grid-cols-3 lg:gap-0">
          {coinList
            ? coinList.map((coin, index) => {
                return (
                  <SideButton
                    key={coin.name}
                    className={index === 0 ? 'first:mt-2' : ''}
                    title={coin.name}
                    Icon={FaCoins}
                    onBtnClick={() => setCoinPickedId(coin.id)}
                    coinValue={coin.price}
                    isActive={String(coinPickedId) === String(coin.id)}
                  />
                )
              })
            : Array(6)
                .fill()
                .map((index) => {
                  return (
                    <SideButton
                      className={index === 0 ? 'first:mt-2' : ''}
                      key={index}
                      isLoading={showCoinList}
                    />
                  )
                })}
        </div>
      </fieldset>
      <button
        disabled={!coinPickedId || createStripePaymentFn.loading}
        type="submit"
        className="mt-6 flex w-1/3 flex-row items-center justify-center space-x-2 rounded-md border border-transparent bg-indigo-600 py-3 text-center text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
      >
        {createStripePaymentFn.loading ? (
          <div className="flex items-center space-x-2 p-2">
            <Spinner />
            <span className="hidden sm:block">Redirecting...</span>
          </div>
        ) : (
          <span>Buy Coin</span>
        )}
      </button>
    </form>
  )
}

function Message({ message: { isSuccess, description } }) {
  return (
    <div className={classNames(isSuccess ? 'bg-green-50' : 'bg-red-50', 'mb-4 rounded-md  p-4')}>
      <div className="flex">
        <div className="flex-shrink-0">
          {isSuccess ? (
            <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
          ) : (
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          )}
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">
            {isSuccess ? 'Order completed' : 'Order canceled'}
          </h3>
          <div className="mt-2 text-sm text-green-700">
            <p>{description}</p>
          </div>
          {/* <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <button
                type="button"
                className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
              >
                View status
              </button>
              <button
                type="button"
                className="ml-3 rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
              >
                Dismiss
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}
