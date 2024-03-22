"use client";
import React from "react";
import { Order } from "@prisma/client";
interface OrdersPageProps {
  orderDetails: Order[];
}
export default function OrdersPage({ orderDetails }: OrdersPageProps) {
  return (
    <div>
      <h1>Orders</h1>
      {orderDetails.map((order) => (
        <div key={order.id}>
          <p>Order ID: {order.id}</p>
          <p>Status: {order.status}</p>
          <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
          {/* <p>Total Price: ${order.totalPrice}</p> */}
          <p>
            {/* Address:{" "}
            {order.address
              ? `${order.address.street} ${order.address.homeNumber}, ${order.address.apartmentNumber}, ${order.address.city}, ${order.address.state}`
              : "N/A"} */}
          </p>
          <h4>Products:</h4>
          {/* <ul>
            {order.products.map((product: any) => (
              <li key={product.id}>
                Name: {product.name}, Manufacturer: {product.manufacturer},
                Price: ${product.price}
              </li>
            ))}
          </ul> */}
        </div>
      ))}
    </div>
  );
}
