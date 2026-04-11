document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-card');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const errorMessage = document.querySelector('#error-message');

    function validateEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    form.addEventListener('submit', (event) => {
        // Останавливаем стандартную отправку, чтобы проверить данные
        event.preventDefault(); 
        
        let hasError = false;

        // Проверка имени
        if (nameInput.value.trim() === "") {
            nameInput.classList.add('error');
            hasError = true;
        } else {
            nameInput.classList.remove('error');
        }

        // Проверка почты
        if (!validateEmail(emailInput.value)) {
            emailInput.classList.add('error');
            hasError = true;
        } else {
            emailInput.classList.remove('error');
        }

        if (hasError) {
            // Показываем сообщение об ошибке вместо alert
            errorMessage.textContent = 'Пожалуйста, заполните поля корректно';
            errorMessage.style.display = 'block';
        } else {
            // Если ошибок нет — скрываем текст ошибки и переходим
            errorMessage.style.display = 'none';
            window.location.href = '/studentFilesFolder/dashboard_student.html'; // Добавили .html
        }
    });
});