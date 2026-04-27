# Sahayak – Crowdfunding & Payment Platform

Sahayak is a full-stack crowdfunding web application built with **Next.js**, **MongoDB**, and **Razorpay**. It enables users to create fundraisers, accept donations securely, and manage campaigns with a modern, responsive interface.

## 🌟 Overview

A complete crowdfunding solution that allows users to:
- Create fundraisers with detailed information and supporting documents
- Accept donations securely through Razorpay payment gateway
- Track donations and manage active campaigns
- View real-time fundraiser statistics and recent contributions

## ✨ Features

- **User Authentication** - Secure login/signup with NextAuth.js
- **Fundraiser Creation** - Create campaigns with target amounts, descriptions, and documents
- **Secure Payments** - Integrated Razorpay payment gateway with verification
- **Real-time Dashboard** - View active fundraisers and recent donations
- **Payment Tracking** - Complete payment history and verification system
- **Responsive Design** - Modern UI built with Tailwind CSS
- **Database Management** - MongoDB integration for data persistence

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | Next.js (App Router), Tailwind CSS |
| **Backend** | Next.js API Routes, MongoDB (Mongoose) |
| **Payments** | Razorpay Payment Gateway |
| **Authentication** | NextAuth.js |
| **Database** | MongoDB |
| **Runtime** | Node.js |

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Razorpay account for payment processing

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sahayak.git
   cd sahayak
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env.local` in the root directory:
   ```env
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_public_key
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   MONGODB_URI=mongodb://localhost:27017/sahayak
   NEXTAUTH_SECRET=your_auth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   ```bash
   # For local MongoDB
   sudo systemctl start mongod
   
   # Or use MongoDB Atlas connection string
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 💳 Payment Flow

1. **Donation Process**: User enters donation details (name, email, amount)
2. **Razorpay Checkout**: Secure payment interface is launched
3. **Payment Verification**: Server verifies payment signature with Razorpay
4. **Database Storage**: Verified payment details are saved to MongoDB
5. **Dashboard Update**: Recent donations appear on the fundraiser dashboard

## 📁 Project Structure

```
sahayak/
├── app/
│   ├── api/
│   │   ├── create-order/route.js      # Razorpay order creation
│   │   ├── verify-payment/route.js    # Payment verification
│   │   ├── get-fundraisers/route.js   # Fetch active fundraisers
│   │   └── get-payments/route.js      # Fetch payment history
│   ├── dashboard/page.js              # Main dashboard
│   ├── payment/page.js                # Payment processing page
│   ├── fundraiser-form/page.js        # Create new fundraiser
│   └── layout.js                      # Root layout
├── lib/
│   └── mongodb.js                     # Database connection
├── models/
│   ├── Payment.js                     # Payment schema
│   └── Fundraiser.js                  # Fundraiser schema
├── components/                        # Reusable UI components
├── public/                           # Static assets
├── .env.local                        # Environment variables
└── package.json                      # Dependencies
```

## 🔧 Configuration

### Razorpay Setup
1. Create a Razorpay account at [razorpay.com](https://razorpay.com)
2. Get your API keys from the dashboard
3. Add keys to your `.env.local` file

### MongoDB Setup
- **Local**: Install MongoDB and run on default port 27017
- **Atlas**: Use MongoDB Atlas connection string for cloud database

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/create-order` | POST | Create Razorpay payment order |
| `/api/verify-payment` | POST | Verify payment signature |
| `/api/get-fundraisers` | GET | Fetch all active fundraisers |
| `/api/get-payments` | GET | Fetch recent payments |

## 🚢 Deployment

### Vercel Deployment
1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables for Production
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=prod_razorpay_key
RAZORPAY_KEY_ID=prod_razorpay_key
RAZORPAY_KEY_SECRET=prod_razorpay_secret
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/sahayak
NEXTAUTH_SECRET=production_secret
NEXTAUTH_URL=https://your-domain.vercel.app
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Future Enhancements

- [ ] Email notifications for donations
- [ ] Social media sharing for fundraisers
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Fundraiser categories and filtering

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Harshit Singh**
- GitHub: [harshitsingh4321](https://github.com/harshitsingh4321)
- LinkedIn: [harshit-singh-a7a360276](https://www.linkedin.com/in/harshit-singh-a7a360276)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Razorpay](https://razorpay.com/) for seamless payment integration
- [MongoDB](https://mongodb.com/) for flexible database solutions
- [Tailwind CSS](https://tailwindcss.com/) for beautiful styling

---

