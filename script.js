// Data Models & Defaults
let tasks = JSON.parse(localStorage.getItem('tm_tasks')) || [];
let projects = JSON.parse(localStorage.getItem('tm_projects')) || [
    { id: 'general', name: 'General' },
    { id: 'work', name: 'Work' },
    { id: 'personal', name: 'Personal' }
];
let userProfile = JSON.parse(localStorage.getItem('tm_profile')) || {
    name: 'Guest',
    avatar: 'https://ui-avatars.com/api/?name=Guest&background=6366f1&color=fff'
};
let settings = JSON.parse(localStorage.getItem('tm_settings')) || {
    darkMode: false
};

// DOM Elements
const bodyEl = document.getElementById('appBody');
const taskInput = document.getElementById('taskInput');
const taskProjectSelect = document.getElementById('taskProjectSelect');
const addBtn = document.getElementById('addBtn');
const filterProjectSelect = document.getElementById('filterProjectSelect');
const pendingList = document.getElementById('pendingList');
const completedList = document.getElementById('completedList');

// Header Elements
const headerUserName = document.getElementById('headerUserName');
const headerAvatar = document.getElementById('headerAvatar');

// Stats Elements
const totalCountEl = document.getElementById('totalTasksCount');
const pendingCountEl = document.getElementById('pendingTasksCount');
const completedCountEl = document.getElementById('completedTasksCount');

// Modal Elements
const featureModal = document.getElementById('featureModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

// Navigation Links
const navDashboard = document.getElementById('navDashboard');
const navProjects = document.getElementById('navProjects');
const navSettings = document.getElementById('navSettings');
const navProfile = document.getElementById('navProfile');

// Initialization
function init() {
    applySettings();
    updateProfileUI();
    populateProjectDropdowns();
    renderTasks();
}

// Persist Data
function saveData() {
    localStorage.setItem('tm_tasks', JSON.stringify(tasks));
    localStorage.setItem('tm_projects', JSON.stringify(projects));
    localStorage.setItem('tm_profile', JSON.stringify(userProfile));
    localStorage.setItem('tm_settings', JSON.stringify(settings));
}

// App Settings & UI sync
function applySettings() {
    if (settings.darkMode) {
        bodyEl.classList.add('dark-mode');
    } else {
        bodyEl.classList.remove('dark-mode');
    }
}

function updateProfileUI() {
    headerUserName.innerText = userProfile.name;
    headerAvatar.src = userProfile.avatar;
}

function populateProjectDropdowns() {
    // Populate task creation dropdown
    taskProjectSelect.innerHTML = projects.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
    
    // Populate filter dropdown
    const currentFilter = filterProjectSelect.value;
    filterProjectSelect.innerHTML = `<option value="all">All Projects</option>` + 
        projects.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
    
    // Keep selection if it still exists
    if (projects.find(p => p.id === currentFilter) || currentFilter === 'all') {
        filterProjectSelect.value = currentFilter;
    } else {
        filterProjectSelect.value = 'all';
    }
}

// Task Logic
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTask(); });
filterProjectSelect.addEventListener('change', renderTasks);

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    const projectId = taskProjectSelect.value;
    const now = new Date();
    
    const newTask = {
        id: Date.now(),
        text: text,
        projectId: projectId,
        completed: false,
        addedAt: now.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }),
        completedAt: null
    };

    tasks.push(newTask);
    taskInput.value = ''; 
    saveData();
    renderTasks();
}

function renderTasks() {
    pendingList.innerHTML = '';
    completedList.innerHTML = '';
    
    const filter = filterProjectSelect.value;
    let pendingCount = 0;
    let completedCount = 0;

    tasks.forEach(task => {
        // Stats are counted for all tasks
        if (task.completed) completedCount++;
        else pendingCount++;

        // Filter display
        if (filter !== 'all' && task.projectId !== filter) return;

        const projectName = projects.find(p => p.id === task.projectId)?.name || 'Unknown';
        
        const li = document.createElement('li');
        if (task.completed) li.className = 'completed-item';

        let datesHtml = `<span><i class="fa-regular fa-calendar-plus"></i> Added: ${task.addedAt}</span>`;
        if (task.completed) datesHtml += `<span><i class="fa-solid fa-check-double"></i> Completed: ${task.completedAt}</span>`;

        let buttonsHtml = '';
        if (!task.completed) {
            buttonsHtml += `<button class="action-btn complete-btn" onclick="completeTask(${task.id})" title="Mark Complete"><i class="fa-solid fa-check"></i></button>`;
        }
        buttonsHtml += `<button class="action-btn edit-btn" onclick="editTask(${task.id})" title="Edit"><i class="fa-solid fa-pen"></i></button>`;
        buttonsHtml += `<button class="action-btn delete-btn" onclick="deleteTask(${task.id})" title="Delete"><i class="fa-solid fa-trash"></i></button>`;

        li.innerHTML = `
            <div class="task-content">
                <span class="task-text">${task.text}</span>
                <span class="task-badge">${projectName}</span>
            </div>
            <div class="task-dates">${datesHtml}</div>
            <div class="task-actions">${buttonsHtml}</div>
        `;

        if (task.completed) completedList.appendChild(li);
        else pendingList.appendChild(li);
    });

    updateStats(tasks.length, pendingCount, completedCount);
}

window.completeTask = function(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = true;
        task.completedAt = new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
        saveData();
        renderTasks();
    }
};

window.deleteTask = function(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    saveData();
    renderTasks();
};

window.editTask = function(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        const newText = prompt("Edit your task:", task.text);
        if (newText !== null && newText.trim() !== "") {
            task.text = newText.trim();
            saveData();
            renderTasks();
        }
    }
};

function updateStats(total, pending, completed) {
    totalCountEl.innerText = total;
    pendingCountEl.innerText = pending;
    completedCountEl.innerText = completed;
}

// Modal Logic & Templates
function openModal(title, contentHtml) {
    modalTitle.innerHTML = title;
    modalBody.innerHTML = contentHtml;
    featureModal.classList.add('show');
}

function closeModal() {
    featureModal.classList.remove('show');
}

closeModalBtn.addEventListener('click', closeModal);
featureModal.addEventListener('click', (e) => {
    if (e.target === featureModal) closeModal();
});

// Profile Modal
navProfile.addEventListener('click', (e) => {
    e.preventDefault();
    openModal('<i class="fa-solid fa-user-circle"></i> Edit Profile', `
        <div class="modal-form-group">
            <label>Your Name</label>
            <input type="text" id="profileNameInput" value="${userProfile.name}">
        </div>
        <div class="modal-form-group">
            <label>Avatar URL (optional)</label>
            <input type="text" id="profileAvatarInput" value="${userProfile.avatar}">
        </div>
        <button class="modal-btn" onclick="saveProfile()">Save Profile</button>
    `);
});

window.saveProfile = function() {
    const nameInput = document.getElementById('profileNameInput').value.trim() || 'Guest';
    let avatarInput = document.getElementById('profileAvatarInput').value.trim();
    if (!avatarInput) {
        avatarInput = `https://ui-avatars.com/api/?name=${nameInput}&background=6366f1&color=fff`;
    }
    
    userProfile.name = nameInput;
    userProfile.avatar = avatarInput;
    saveData();
    updateProfileUI();
    closeModal();
};

// Settings Modal
navSettings.addEventListener('click', (e) => {
    e.preventDefault();
    openModal('<i class="fa-solid fa-gear"></i> Settings', `
        <div class="toggle-switch">
            <span>Dark Mode</span>
            <label class="switch">
                <input type="checkbox" id="darkModeToggle" ${settings.darkMode ? 'checked' : ''} onchange="toggleDarkMode(this)">
                <span class="slider"></span>
            </label>
        </div>
        <hr style="border:0; border-top:1px solid rgba(150,150,150,0.3); margin: 20px 0;">
        <div style="text-align:center;">
            <p style="margin-bottom: 10px; font-size:0.9rem;">Warning: This action cannot be undone.</p>
            <button class="modal-btn danger" onclick="clearAllData()">Clear All Data</button>
        </div>
    `);
});

window.toggleDarkMode = function(checkbox) {
    settings.darkMode = checkbox.checked;
    saveData();
    applySettings();
};

window.clearAllData = function() {
    if (confirm("Are you sure you want to delete ALL tasks, projects, and settings?")) {
        localStorage.clear();
        location.reload();
    }
};

// Projects Modal
navProjects.addEventListener('click', (e) => {
    e.preventDefault();
    renderProjectsModal();
});

window.renderProjectsModal = function() {
    const listHtml = projects.map(p => `
        <li>
            <span>${p.name}</span>
            ${p.id !== 'general' ? `<button class="action-btn delete-btn" style="width:30px; height:30px;" onclick="deleteProject('${p.id}')" title="Delete"><i class="fa-solid fa-trash"></i></button>` : ''}
        </li>
    `).join('');

    openModal('<i class="fa-solid fa-folder-open"></i> Manage Projects', `
        <div style="display:flex; gap:10px; margin-bottom: 20px;">
            <input type="text" id="newProjectInput" class="form-control" style="flex:1;" placeholder="New project name...">
            <button class="modal-btn" style="width:auto;" onclick="addProject()">Add</button>
        </div>
        <ul class="project-list-modal">
            ${listHtml}
        </ul>
    `);
};

window.addProject = function() {
    const input = document.getElementById('newProjectInput');
    const name = input.value.trim();
    if (name) {
        const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now();
        projects.push({ id, name });
        saveData();
        populateProjectDropdowns();
        renderProjectsModal(); // Re-render the modal content to show the new project
    }
};

window.deleteProject = function(id) {
    if (confirm("Delete this project? Tasks assigned to it will be moved to 'General'.")) {
        projects = projects.filter(p => p.id !== id);
        // Re-assign tasks that were in this project
        tasks.forEach(t => { if (t.projectId === id) t.projectId = 'general'; });
        saveData();
        populateProjectDropdowns();
        renderTasks();
        renderProjectsModal(); // Re-render the modal content to reflect deletion
    }
};

// Link Dashboard back to default view
navDashboard.addEventListener('click', (e) => {
    e.preventDefault();
    filterProjectSelect.value = 'all';
    renderTasks();
});

// Start the app
init();
