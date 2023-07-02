## Introduction

This documentation will guide you through the setup and usage of the app.

## Version Information

This repository contains two versions of the app:

1. **PKCE (Authorization Code Flow with Proof Key for Code Exchange)**:
   - Branch: `master`
   - Implements the Authorization Code Flow with PKCE.

2. **Implicit Grant Flow**:
   - Branch: `implicit`
   - Implements the Implicit Grant Flow.

>**Note:** PKCE is considered more secure than the Implicit Grant Flow.

Choose the branch based on the authentication flow you prefer to use.

## Installation

To install the app, follow these steps:

1. Clone the repository from the desired branch:
   ```bash
   git clone -b implicit https://github.com/mohamadKrayem/ITXI-spotify.git
   ```
   or
   ```bash
   git clone -b master https://github.com/mohamadKrayem/ITXI-spotify.git

2. Change to the project directory:

   ```bash
   cd ITXI-spotify
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

## Usage

To run the application locally, execute the following command:

```bash
npm run dev
```

This will start the development server and you can access the application in your web browser at `http://localhost:5173`.

## Features

1. **Great UI/UX with Tailwind CSS**: The app has been designed with a visually appealing and user-friendly interface using the popular CSS framework, Tailwind CSS.

2. **Spotify Account Integration**: Seamlessly login to our app using your Spotify account.

3. **Real-time Search**: Our app implements a search-as-you-type feature, enabling you to search for artists instantly as you type.

4. **Previous Result Persistence**: If you navigate away from a page within the app and return later, the app retains and displays the previous search result. This ensures that you can easily pick up where you left off and conveniently access previously viewed information.

>**Note:** The app does not currently implement a caching feature for search results. This decision was made due to the app's small scale and simplicity, as well as the absence of a backend server. Implementing caching would introduce unnecessary complexity and overhead. The focus of the app is to provide real-time search results and a seamless user experience without the need for caching infrastructure.

5. **Browse Artist Albums**: Explore the albums of any artist within our app. Discover their discography, tracklists, release dates, and more.

6. **Direct Album Access on Spotify**: Seamlessly connect with the Spotify platform to listen to your favorite albums. With a single click, you can open any album directly in Spotify .

## Troubleshooting

If you encounter any issues or have questions, contact me at mohamadkrayem@email.com.
