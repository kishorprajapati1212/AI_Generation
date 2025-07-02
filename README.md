# 🌌 VisionVerse – AI-Powered Media Generation Platform

**VisionVerse** is a revolutionary AI-based web application that enables users to generate videos from images, create stunning visuals from text prompts, and even design immersive skyboxes — all through the power of artificial intelligence.

🔗 Live Demo (if hosted): [https://yourvisionverseurl.com](https://vision-verse.netlify.app/)  

---

## 🚀 Features

### 🔮 AI-Powered Generation
- 🖼️ **Image Generation** from text prompts using Stable Diffusion or similar models.
- 🎥 **Video Generation** from single images with advanced models like Pyramid Flow.
- 🌌 **Skybox Creation** for 3D environments (games, VR/AR, WebGL).

### 🧠 Smart User Experience
- 🔐 **Authentication** & secure user management
- 📜 **User History**: All generations are saved & viewable anytime
- 🛒 **Stripe Integration**: Seamless payment handling for subscriptions or credit-based usage
- 🌈 **Clean, Modern UI** built with React and Material UI

---

## 🛠️ Tech Stack

| Layer        | Technology                         |
|--------------|-------------------------------------|
| Frontend     | React (Vite), Material UI           |
| Backend      | Node.js, Express.js                 |
| Database     | MongoDB                             |
| AI Models    | Stable Diffusion                    |
| Payments     | Stripe API                          |
| Deployment   | Netlify (Frontend), Render (Backend)|
| Storage      | Cloudinary                          |

---


## 🧪 Installation & Setup (Local)

### 🧩 Prerequisites
- Node.js, npm/yarn
- MongoDB URI
- Stripe API keys
- Python (if self-hosting AI models)
- .env files configured

### 🚗 Running Locally

```bash
# Clone the repo
git clone https://github.com/yourusername/visionverse.git
cd visionverse

# Install dependencies
cd server
npm install

cd ../client
npm install

# Start both frontend and backend
cd ../server
npm start

# In another terminal
cd ../client
npm run dev
