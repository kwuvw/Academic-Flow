document.addEventListener('DOMContentLoaded', () => {
    loadIncomingRequests();
    loadAttachedStudents();
});

function loadIncomingRequests() {
    const teacherId = localStorage.getItem('userId');
    const container = document.getElementById('requests-container');

    fetch(`/auth/requests/${teacherId}`)
        .then(res => res.json())
        .then(requests => {
            container.innerHTML = '';
            if (requests.length === 0) {
                container.innerHTML = '<p class="text-hint">Новых заявок нет.</p>';
                return;
            }
            requests.forEach(req => {
                const article = document.createElement('article');
                article.className = 'teacher-item';
                article.innerHTML = `
                    <span class="avatar">👤</span>
                    <div class="teacher-info">
                        <span class="teacher-name">${req.studentName}</span>
                        <span class="teacher-email">Хочет к вам в группу</span>
                    </div>
                    <button class="btn-primary small-btn" onclick="acceptStudent(${req.subId})">Добавить</button>
                `;
                container.appendChild(article);
            });
        });
}

function loadAttachedStudents() {
    const teacherId = localStorage.getItem('userId');
    const container = document.getElementById('attached-students-list');

    fetch(`/auth/my-students/${teacherId}`)
        .then(res => res.json())
        .then(students => {
            container.innerHTML = '';
            students.forEach(std => {
                const article = document.createElement('article');
                article.className = 'teacher-item';
                article.innerHTML = `
                    <span class="avatar">🎓</span>
                    <div class="teacher-info">
                        <span class="teacher-name">${std.name}</span>
                        <span class="teacher-email">Студент прикреплен</span>
                    </div>
                    <button class="btn-secondary small-btn">Удалить</button>
                `;
                container.appendChild(article);
            });
        });
}

function acceptStudent(subId) {
    fetch(`/auth/accept/${subId}`, { method: 'PUT' })
    .then(res => { if (res.ok) location.reload(); });
}