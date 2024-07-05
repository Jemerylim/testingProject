import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:5500/api', // Your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies with requests
});

// Request interceptor to add CSRF token
apiClient.interceptors.request.use(
  async (config) => {
    if (['post', 'put', 'delete'].includes(config.method)) {
      try {
        const csrfResponse = await axios.get('http://localhost:5500/api/csrf-token', { withCredentials: true });
        const csrfToken = csrfResponse.data.csrfToken;
        config.headers['CSRF-Token'] = csrfToken;
      } catch (error) {
        console.error('Error fetching CSRF token', error);
        throw error;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      // Clear the cookies
      document.cookie = 'token=; Max-Age=0';

      // Expose a mechanism to handle session invalidation
      if (typeof error.config.onSessionInvalidated === 'function') {
        error.config.onSessionInvalidated();
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
