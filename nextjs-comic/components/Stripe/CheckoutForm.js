import { CardElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState } from 'react'

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  function stripeTokenHandler(token) {
    // const paymentData = { token: token.id }

    // const response = await fetch('/charge', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(paymentData),
    // })
    // // Return and display the result of the charge.
    // return response.json()

    setIsLoading(false)
  }

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const card = elements.getElement(CardElement)
    const result = await stripe.createToken(card)

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message)
    } else {
      // Send the token to your server.
      // This function does not exist yet; we will define it in the next step.
      stripeTokenHandler(result.token)
    }
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  )
}
