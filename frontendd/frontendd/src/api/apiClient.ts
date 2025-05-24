
import axios from 'axios';
import { toast } from 'sonner';

// Base API client with common configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Will need to be updated for production
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || 'Une erreur est survenue';
    
    if (error.response) {
      // Handle specific HTTP error codes
      switch (error.response.status) {
        case 401:
          toast.error('Session expirée. Veuillez vous reconnecter.');
          // Redirect to login or clear auth state
          break;
        case 403:
          toast.error('Vous n\'avez pas les droits nécessaires.');
          break;
        case 404:
          toast.error('Ressource non trouvée.');
          break;
        case 422:
          toast.error('Données invalides.');
          break;
        case 500:
          toast.error('Erreur serveur. Veuillez réessayer plus tard.');
          break;
        default:
          toast.error(message);
      }
    } else if (error.request) {
      // Network error
      toast.error('Impossible de joindre le serveur. Vérifiez votre connexion.');
    } else {
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
