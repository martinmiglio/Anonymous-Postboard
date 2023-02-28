import axios from "axios";

// Decorator function to handle too many requests errors with timeout
export function handleTooManyRequests(timeout) {
  return function (target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          // Too many requests error
          console.warn("Too many requests, retrying after timeout...");
          await new Promise((resolve) => setTimeout(resolve, timeout));
          return await originalMethod.apply(this, args);
        }
        throw error;
      }
    };
    return descriptor;
  };
}

// Decorator function to handle network errors with retry
export function handleNetworkError(retries) {
  return function (target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
      for (let i = 0; i <= retries; i++) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          if (i === retries || !axios.isAxiosError(error)) {
            // Maximum retries reached or not an Axios error
            throw error;
          }
          console.warn(`Network error, retrying (${i + 1}/${retries})...`);
        }
      }
    };
    return descriptor;
  };
}
