document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-card');
    const firstNameInput = document.querySelector('#first-name');
    const lastNameInput = document.querySelector('#last-name');
    const emailInput = document.querySelector('#email');

    function validateEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    form.addEventListener('submit', (event) => {
        // Обязательно отменяем стандартный переход, чтобы проверить поля
        event.preventDefault();

        let hasError = false;

        // Проверка Имени
        if (firstNameInput.value.trim() === "") {
            firstNameInput.classList.add('error');
            hasError = true;
        } else {
            firstNameInput.classList.remove('error');
        }

        // Проверка Фамилии
        if (lastNameInput.value.trim() === "") {
            lastNameInput.classList.add('error');
            hasError = true;
        } else {
            lastNameInput.classList.remove('error');
        }

        // Проверка почты
        if (!validateEmail(emailInput.value)) {
            emailInput.classList.add('error');
            hasError = true;
        } else {
            emailInput.classList.remove('error');
        }

        if (hasError) {
            alert('Пожалуйста, заполните поля корректно');
        } else {
            window.location.href = '/registerFiles/role_select.html';
        }
    });
});