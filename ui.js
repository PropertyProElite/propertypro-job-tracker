// ui.js

const loader = document.getElementById('loader');
const errorBanner = document.getElementById('error-banner');
const errorMessage = document.getElementById('error-message');
const closeErrorBtn = document.getElementById('close-error-btn');

// --- Spinner Controls ---
export const showSpinner = () => {
  loader.classList.add('visible');
};

export const hideSpinner = () => {
  loader.classList.remove('visible');
};

// --- Error Banner Controls ---
closeErrorBtn.addEventListener('click', () => {
  errorBanner.classList.remove('visible');
});

export const handleApiError = (error, userMessage = 'An unexpected error occurred. Please try again.') => {
  console.error('API Error:', error); // Log the full error for developers
  errorMessage.textContent = userMessage;
  errorBanner.classList.add('visible');
};