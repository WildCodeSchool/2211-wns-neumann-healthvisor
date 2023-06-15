import "dotenv/config";

module.exports = {
  expo: {
    name: "mobile-client",
    slug: "healthvisor",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      REACT_APP_GRAPHQL_API_URL: process.env.REACT_APP_GRAPHQL_API_URL,
      "eas": {
        "projectId": "e50e910a-df4e-4a55-9256-72f62dc21571"
      }
    },
    jsEngine: "jsc",
  },
};
