import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('your_publishable_key_here');

const PaymentForm = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: clientSecret } = await axios.post('http://localhost:5000/api/create-payment-intent', {
      name,
      amount,
    });

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { name },
      },
    });

    if (paymentResult.error) {
      console.error(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        await axios.post('http://localhost:5000/api/save-transaction', {
          name,
          amount,
          transactionId: paymentResult.paymentIntent.id,
        });
        alert('Payment Successful!');
        setName('');
        setAmount('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <CardElement />
      <button type="submit" disabled={!stripe}>Submit</button>
    </form>
  );
};

const WrappedPaymentForm = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default WrappedPaymentForm;

