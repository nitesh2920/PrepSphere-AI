# Docker Setup for PrepSphere AI

This document explains how to **run** PrepSphere AI using Docker and Docker Compose for both production and development environments.

---

## Prerequisites

- Docker installed on your system  
- Docker Compose installed  
- `.env.local` environment file configured in the project root  

---

## Environment Variables

Create a `.env.local` file in your project root with these variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database
DATABASE_URL=your_database_url

# Google AI
GOOGLE_AI_API_KEY=your_google_ai_api_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=your_stripe_price_id

# Inngest
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# App URL (for production)
NEXT_PUBLIC_HOST_NAME=https://your-domain.com
```
```bash
docker-compose build
docker-compose up
```
