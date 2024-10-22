# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Running the App

To run the app, follow these steps:

1. **Ensure Node.js version 20.9.0 is installed.**
2. **Clone the repository:**

  ```sh
  git clone <repository-url>
  cd weather-app
  ```

3. **Install dependencies using pnpm:**

  ```sh
  pnpm install
  ```

4. **Rename the `.env.template` file to `.env` and add the `VITE_APP_RAPIDAPI_WEATHER_KEY` environment variable:**

  ```sh
  mv .env.template .env
  ```

  Obtain the `VITE_APP_RAPIDAPI_WEATHER_KEY` from [RapidAPI WeatherAPI](https://rapidapi.com/weatherapi/api/weatherapi-com).

5. **For development environment, run:**

  ```sh
  pnpm dev
  ```

6. **For testing, run:**

  ```sh
  pnpm test
  ```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
   // other options...
   parserOptions: {
    project: ['./tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: import.meta.dirname,
   },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
   // Add the react plugin
   react,
  },
  rules: {
   // other rules...
   // Enable its recommended rules
   ...react.configs.recommended.rules,
   ...react.configs['jsx-runtime'].rules,
  },
})
```

## Deployment

The app is deployed on Vercel and can be accessed at: [https://weather-app.vercel.app](https://weather-app.vercel.app)

