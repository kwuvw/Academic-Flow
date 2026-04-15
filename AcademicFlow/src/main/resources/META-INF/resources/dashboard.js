document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('userId')

    if (!userId) {
        window.location.href = '/loginFiles/login.html'
        return
    }

    fetch(`/auth/user/${userId}`)
        .then(response => {
            if (!response.ok) throw new Error("Пользователь не найден")
            return response.json()
        })

        .then(user => {
            const userNameElement = document.getElementById('user-display-name')
            if (userNameElement) {
                userNameElement.textContent = user.firstName + " " + user.lastName
            }
        })

        .catch(error => {
            console.error("Ошибка загрузки профиля", error)
        })
        
})