

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USER_KEY = 'loggedInUser';

export function validateLogin({ email, password }) {
  const errors = {};
  const trimmed = email.trim();

  if (!trimmed) {
    errors.email = 'Email is required';
  } else if (!EMAIL.test(trimmed)) {
    errors.email = 'Enter a valid email';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  return errors;
}

function showError(doc, field, message) {
  const error = doc.getElementById(`${field}-error`);

  error.textContent = message ?? '';
  error.hidden = !message;
}

/**
 * Wires the sign-in form:
 * Shows validation errors or saves the user
 * and opens the list page.
 */
export function initLogin(doc, storage, go) {
  doc.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const email = doc.getElementById('email').value;
    const password = doc.getElementById('password').value;

    const errors = validateLogin({ email, password });

    showError(doc, 'email', errors.email);
    showError(doc, 'password', errors.password);

    if (Object.keys(errors).length === 0) {
      storage.setItem(USER_KEY, email.trim());
      go('list.html');
    }
  });
}
