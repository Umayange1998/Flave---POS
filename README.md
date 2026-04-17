🍽️ Restaurant POS System with QR Payments

A modern Restaurant Point of Sale (POS) system built with React, Node.js, MongoDB, and Stripe.
Supports cash, card (manual), and QR-based online payments with real-time status updates.

🚀 Features
🧾 Order Management
Create and manage customer orders
Track order status (Preparing / Ready)
View recent and all orders
Auto-sort latest orders first


💳 Payment Options
💵 Cash Payments
💳 Card Machine (manual confirmation)
📱 QR Code Payments (Stripe Checkout)

🔄 Real-Time Updates
Live payment status (pending → paid)
Auto UI refresh using React Query
Stripe webhook integration


🪑 Table Management
Assign orders to tables
Update table status (Available / Booked)


🏗️ Tech Stack

Frontend
⚛️ React
🎨 Material UI (MUI)
🔄 React Query (TanStack)
📦 Redux Toolkit
🔳 QR Code Generator (qrcode.react)

Backend
🟢 Node.js + Express
🍃 MongoDB + Mongoose
💳 Stripe API (Payments & Webhooks)
🔐 JWT Authentication
