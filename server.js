import 'dotenv/config'
const express = require('express'); 
import { clerkMiddleware, clerkClient, requireAuth, getAuth } from '@clerk/express'
const app = express();

const PORT = process.env.PORT || 3000;

const NIMI = process.env.MY_NAME || 'Tundmatu nimi';


app.use(clerkMiddleware())



// Use requireAuth() to protect this route
// If user isn't authenticated, requireAuth() will redirect back to the homepage
app.get('/protected', requireAuth(), async (req, res) => {
  // Use `getAuth()` to get the user's `userId`
  const { userId } = getAuth(req)

  // Use Clerk's JS Backend SDK to get the user's User object
  const user = await clerkClient.users.getUser(userId)

  return res.json({ user })
})


app.get('/api/info', (req, res) => {
    res.status(200).json({
        mission: "Iseseisev deploimine edukas",

        meeskond: NIMI,
        eeg: new Date().toISOString()

    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`API Server töötab selle pordi peale ${PORT}`);
});