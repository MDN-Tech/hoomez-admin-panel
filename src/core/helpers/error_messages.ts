import axios from "axios";

interface ErrorDetails {
  status?: number;
  message: string;
}

function extractMessage(message?: string | string[]): string {
  if (!message) return "Something went wrong. Please try again.";
  if (typeof message === "string") return message;
  if (Array.isArray(message)) return message[0] || "Something went wrong.";
  return "Something went wrong.";
}

export function getError(error: unknown): ErrorDetails {
  // Handle Axios errors
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = extractMessage(error.response?.data?.message);

    switch (status) {
      case 400:
        return {
          status,
          message:
            message ||
            "Some information seems incorrect. Please check and try again.",
        };
      case 401:
        return {
          status,
          message: message || "You need to log in to continue.",
        };
      case 403:
        return {
          status,
          message: message || "You don’t have permission to do this action.",
        };
      case 404:
        return {
          status,
          message: message || "We couldn’t find what you were looking for.",
        };
      case 500:
        return {
          status,
          message: "Something went wrong on our end. Please try again later.",
        };
      case 503:
        return {
          status,
          message: "Service is temporarily unavailable. Try again shortly.",
        };
      default:
        return {
          status,
          message: message || "Something went wrong. Please try again.",
        };
    }
  }

  // Handle network errors or unknown issues
  return {
    message: "Oops! Something went wrong. Please refresh and try again.",
  };
}
