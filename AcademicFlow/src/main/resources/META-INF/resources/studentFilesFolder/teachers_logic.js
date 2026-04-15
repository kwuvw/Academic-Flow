document.addEventListener('DOMContentLoaded', () => {
    initStudentPage();
});

async function initStudentPage() {
    const attachedIds = await loadAttachedTeachers();
    loadAllTeachers(attachedIds);
}

// Загрузка ПРИНЯТЫХ учителей
async function loadAttachedTeachers() {
    const userId = localStorage.getItem('userId');
    const container = document.getElementById('attached-teachers-list');
    const attachedIds = [];

    try {
        const res = await fetch(`/auth/my-teachers/${userId}`);
        const teachers = await res.json();
        container.innerHTML = '';

        if (teachers.length === 0) {
            container.innerHTML = '<p class="text-hint">У вас пока нет прикрепленных преподавателей.</p>';
            return attachedIds;
        }

        teachers.forEach(t => {
            if (t.teacherId) attachedIds.push(t.teacherId);
            const article = document.createElement('article');
            article.className = 'teacher-item';
            article.innerHTML = `
                <span class="avatar"></span>
                <div class="teacher-info">
                    <span class="teacher-name">${t.name}</span>
                    <span class="teacher-email">Статус: Прикреплен</span>
                </div>
                <button class="btn-secondary small-btn" onclick="removeTeacher(${t.subId})">Удалить</button>
            `;
            container.appendChild(article);
        });
    } catch (e) { console.error(e); }
    return attachedIds;
}

function loadAllTeachers(attachedIds) {
    const container = document.getElementById('teachers-container');
    fetch('/auth/teachers')
        .then(res => res.json())
        .then(teachers => {
            container.innerHTML = '';
            const available = teachers.filter(t => !attachedIds.includes(t.id));

            available.forEach(t => {
                const article = document.createElement('article');
                article.className = 'teacher-item';
                article.innerHTML = `
                    <span class="avatar">👤</span>
                    <div class="teacher-info">
                        <span class="teacher-name">${t.firstName} ${t.lastName}</span>
                        <span class="teacher-email">${t.email}</span>
                    </div>
                    <button class="btn-primary small-btn" onclick="addTeacher(${t.id})">Выбрать</button>
                `;
                container.appendChild(article);
            });
        });
}

function addTeacher(teacherId) {
    const studentId = localStorage.getItem('userId');
    fetch('/auth/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: parseInt(studentId), teacherId: teacherId, status: 'PENDING' })
    }).then(() => location.reload());
}