import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalButtonProps {
  totalPrice: number;
  handlePayment: (PaymentMethod: string) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({
  totalPrice,
  handlePayment,
}) => {
  const initialOptions = {
    clientId:
      "Ad6ibbA8OLGc9gDdjPi_skZhTk-AMXWYmrEsM60dSutbUSkfRiuYH7L_HTpbBVkoFHYuDNuX6ZMcJGN5",
    currency: "USD",
    intent: "capture",
    "disable-funding": "card",
  };

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalPrice.toString(),
          },
        },
      ],
    });
  };

  const onApproveOrder = async (data: any, actions: any) => {
    try {
      const orderCaptureResult = await actions.order.capture();
      console.log(orderCaptureResult);
      handlePayment("PayPal");
    } catch (error) {
      console.error("Error capturing order:", error);
    }
  };

  return (
    <div className="z-10">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons createOrder={createOrder} onApprove={onApproveOrder} />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalButton;
