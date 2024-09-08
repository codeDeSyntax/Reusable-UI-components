Here’s an advanced example that demonstrates how to build a Next.js API that handles authentication, integrates with a database, and performs CRUD operations. We'll create an API for managing user profiles, using JWT for authentication and MongoDB as the database.

### Overview of Features:
1. **JWT Authentication**: To protect API routes.
2. **MongoDB Integration**: For user data storage.
3. **CRUD Operations**: Create, Read, Update, Delete user profiles.

### Step 1: Install Required Dependencies
First, install the necessary dependencies:
```bash
npm install jsonwebtoken bcryptjs mongodb
```

- **jsonwebtoken**: To generate and verify JWT tokens.
- **bcryptjs**: To hash passwords.
- **mongodb**: For connecting to a MongoDB database.

### Step 2: Set Up MongoDB Connection
Create a file `lib/mongodb.js` to handle the MongoDB connection.

```javascript
// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
```

### Step 3: Create API Route for User Authentication

1. **Register a New User**: Create the `pages/api/auth/register.js` API to register a new user, hash their password, and store it in the database.

```javascript
// pages/api/auth/register.js
import clientPromise from '../../../lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const userExists = await db.collection('users').findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.collection('users').insertOne({
      username,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered', userId: newUser.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}
```

2. **Login a User and Generate JWT Token**: Create the `pages/api/auth/login.js` API to authenticate a user, check the password, and return a JWT token.

```javascript
// pages/api/auth/login.js
import clientPromise from '../../../lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection('users').findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}
```

### Step 4: Protect API Routes Using JWT

Create middleware that checks if the JWT token is valid before accessing certain routes.

```javascript
// lib/authMiddleware.js
import jwt from 'jsonwebtoken';

export const authMiddleware = (handler) => async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'No authorization header provided' });
  }

  try {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
```

### Step 5: Create User Profile CRUD API

Now, create an API route for managing user profiles.

1. **Get User Profile**: Use the JWT to get the current user's profile.
2. **Update User Profile**: Allow users to update their profile.

```javascript
// pages/api/user/profile.js
import clientPromise from '../../../lib/mongodb';
import { authMiddleware } from '../../../lib/authMiddleware';

async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();

  if (req.method === 'GET') {
    try {
      const user = await db.collection('users').findOne({ _id: req.userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }

  if (req.method === 'PUT') {
    const { username, password } = req.body;

    try {
      const updatedUser = {};

      if (username) updatedUser.username = username;
      if (password) updatedUser.password = await bcrypt.hash(password, 10);

      const result = await db
        .collection('users')
        .updateOne({ _id: req.userId }, { $set: updatedUser });

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User profile updated' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }
}

export default authMiddleware(handler);
```

### Step 6: Environment Variables

In your `.env.local`, make sure you define:
```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/mydatabase
JWT_SECRET=mysecretkey
```

### Step 7: Deploy and Test

After setting this up, deploy your Next.js application on Vercel or Render, and you’ll be able to:

- **Register a user** by sending a `POST` request to `/api/auth/register`.
- **Login a user** and receive a JWT by sending a `POST` request to `/api/auth/login`.
- **Get or update user profile** by sending `GET` or `PUT` requests to `/api/user/profile` with the JWT in the Authorization header.

This demonstrates an advanced API with authentication and MongoDB integration using Next.js.
