document.addEventListener('DOMContentLoaded', () => {
    const studentCard = document.getElementById('student-card');
    const teacherCard = document.getElementById('teacher-card');

    const selectRole = (roleName, e) => {
        if (e) e.preventDefault(); 

        const userId = localStorage.getItem('userId');
        console.log("Попытка установить роль для ID:", userId); 

        if (!userId) {
            alert("Ошибка: ID не найден. Зарегистрируйтесь снова.");
            window.location.href = '/registerFiles/register.html';
            return;
        }

        fetch(`/auth/update-role/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'text/plain' },
            body: roleName
        })
            .then(response => {
                console.log("Ответ сервера:", response.status);
                if (response.ok) {
                    if (roleName === 'student') {
                        window.location.assign('/studentFilesFolder/dashboard_student.html');
                    } else {
                        window.location.assign('/teacherFilesFoldter/dashboard_teacher.html');
                    }
                } else {
                    alert("Сервер не смог сохранить роль. Код ошибки: " + response.status);
                }
            })
            .catch(error => {
                console.error("Критическая ошибка сети:", error);
                alert("Не удалось связаться с сервером.");
            });
    };

    if (studentCard) studentCard.addEventListener('click', (e) => selectRole('student', e));
    if (teacherCard) teacherCard.addEventListener('click', (e) => selectRole('teacher', e));
});