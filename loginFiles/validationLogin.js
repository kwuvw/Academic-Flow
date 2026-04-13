document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-card');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');

    const showError = (input, message) => {
        input.classList.add('error');
        let errorSpan = input.parentElement.querySelector('.error-text');

        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.classList.add('error-text');
            input.parentElement.appendChild(errorSpan);
        }
        errorSpan.textContent = message;
    };

    const clearError = (input) => {
        input.classList.remove('error');
        const errorSpan = input.parentElement.querySelector('.error-text');
        if (errorSpan) {
            errorSpan.remove();
        }
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            showError(emailInput, 'Введите корректный email');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        if (passwordInput.value.length < 6) {
            showError(passwordInput, 'Пароль должен быть не менее 6 символов');
            isValid = false;
        } else {
            clearError(passwordInput);
        }

        if (isValid) {
            window.location.href = '/studentFilesFolder/dashboard_student.html';
        }
    });
});