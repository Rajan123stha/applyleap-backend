import express from 'express'
import cors from 'cors'
import { getPayload } from 'payload'
import payloadConfig from './src/payload.config' // Import your Payload config

const start = async () => {
  // Initialize Express
  const app = express()

  // Enable CORS
  app.use(
    cors({
      origin: process.env.FRONTEND_ORIGIN || 'https://applyleap.com/', // Replace with your frontend domain
      credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    }),
  )

  // Initialize Payload CMS
  const payload = await getPayload({
    // express: app, // Pass the Express app to Payload
    config: payloadConfig, // Use the imported Payload config
  })

  // Start the server
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    console.log(`Payload Admin URL: ${payload.getAdminURL()}`)
  })
}

start()
