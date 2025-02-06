import React from 'react'

export const GlobleVariable = {
  Backend_url: import.meta.env.VITE_BACKEND_URL,

  React_api: [
    import.meta.env.VITE_STABLE_DEFFUSION_API,
    import.meta.env.VITE_STABLE_DEFFUSION_API2,
    import.meta.env.VITE_STABLE_DEFFUSION_API3,
    import.meta.env.VITE_STABLE_DEFFUSION_API4,
    import.meta.env.VITE_STABLE_DEFFUSION_API5,
  ],

  currentApiIndex: 0,
  getCurrentApiKey() {
    console.log(this.currentApiIndex);
    return this.React_api[this.currentApiIndex];
  },

  switchApiKey() {
    this.currentApiIndex = (this.currentApiIndex + 1) % this.React_api.length;
    console.log(`switching to api key index to ${this.currentApiIndex}`);
  },

  // React_api: import.meta.env.VITE_STABLE_DEFFUSION_API,
  // React_apis: import.meta.env.VITE_STABLE_DEFFUSION_API,
  // React_api3: import.meta.env.VITE_STABLE_DEFFUSION_API3,
  // React_api4: import.meta.env.VITE_STABLE_DEFFUSION_API4,
  // React_api: import.meta.env.VITE_STABLE_DEFFUSION_API,


}

const Theme = {
  primary: {

    100: '#0D0D0D',
    50: '#1F1F1F',
    10: '#303030',
  },

  secondary: {
    100: "#71a3c1",
  },

  white: {
    100: "white",
  },

  grey: {
    100: "grey"
  }
}

export default Theme

