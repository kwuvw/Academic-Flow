document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-card');
    const firstName = document.querySelector('#first-name');
    const lastName = document.querySelector('#last-name');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    // Предположим, у тебя есть поле confirm-password в HTML
    const confirmPassword = document.querySelector('#confirm-password');

    const showError = (input, message) => {
        input.classList.add('error');
        let errorSpan = input.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains('error-text')) {
            errorSpan = document.createElement('span');
            errorSpan.classList.add('error-text');
            input.parentNode.insertBefore(errorSpan, input.nextSibling);
        }
        errorSpan.textContent = message;
    };

    const clearError = (input) => {
        input.classList.remove('error');
        const errorSpan = input.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains('error-text')) {
            errorSpan.remove();
        }
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        if (firstName.value.trim().length < 2) {
            showError(firstName, 'Введите имя');
            isValid = false;
        } else clearError(firstName);

        if (lastName.value.trim().length < 2) {
            showError(lastName, 'Введите фамилию');
            isValid = false;
        } else clearError(lastName);

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            showError(email, 'Неверный формат почты');
            isValid = false;
        } else clearError(email);

        if (password.value.length < 8) {
            showError(password, 'Минимум 8 символов');
            isValid = false;
        } else clearError(password);

        if (confirmPassword && confirmPassword.value !== password.value) {
            showError(confirmPassword, 'Пароли не совпадают');
            isValid = false;
        } else if (confirmPassword) clearError(confirmPassword);

        if (isValid) {
            const UserData = {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value
            }

            fetch('/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(UserData)
            })


                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Ошибка регистрации на сервере");
                    }
                })
                .then(user => {
                    localStorage.setItem('userId', user.id);

                    window.location.href = '/registerFiles/role_select.html';
                })
                .catch(error => {
                    alert("Произошла ошибка: " + error.message);
                });
        }
    });
});