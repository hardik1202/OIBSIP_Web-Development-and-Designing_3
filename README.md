# A Basic TO-DO webapp
A **premium**, modern **To‑Do web application** built with **HTML**, **CSS**, and **Vanilla JavaScript**.  
The UI follows a glass‑morphism design, includes dark‑mode, project categories, a live dashboard and full CRUD operations – all data is persisted in the browser via `localStorage`.
---
## ✨ Features
- **Dynamic task management** – add, edit, delete, mark complete, and view timestamps.
- **Project categories** – create custom projects (e.g., Work, Personal) and assign tasks to them.
- **Dashboard statistics** – real‑time totals for *All*, *Pending* and *Completed* tasks.
- **Dark / Light mode** – a smooth toggle with animated glass panels.
- **User profile** – set a display name and avatar that appear in the navbar.
- **Filtering** – view tasks by a selected project.
- **Responsive layout** – works on mobile phones, tablets and desktop browsers.
- **Local persistence** – all data (tasks, projects, settings, profile) is saved automatically in `localStorage`.
- **No frameworks** – pure HTML/CSS/JS for easy learning and fast loading.
---
## 🛠️ Tech Stack
|
 Technology 
|
 Purpose 
|
|
------------
|
---------
|
|
**
HTML5
**
|
 Page structure, semantic markup 
|
|
**
CSS3
**
|
 Layout, glass‑morphism styling, dark‑mode, animations 
|
|
**
JavaScript
**
|
 Core logic, DOM manipulation, state handling 
|
|
**
Font Awesome
**
|
 Icon library for a polished UI 
|
|
**
Google Fonts – Poppins
**
|
 Modern typography 
|
|
**
localStorage
**
|
 Persistent client‑side storage 
|
|
**
MySQL (optional)
**
|
 Schema for future backend (
`database.sql`
) 
|
---
## 📁 Project Structure
```
A Basic To-Do Webapp/
├── index.html        # Main HTML page
├── style.css         # Glass‑morphism UI & dark mode
├── script.js         # All app logic (tasks, projects, profile, settings)
├── database.sql      # Optional MySQL schema (tasks, projects, user_settings)

```
---
## 🚀 How To Run

 Open a browser and navigate to:
   ```
  https://a-basic-to-do-web-app.netlify.app
   ```
---
## 📖 How to Use
1. **Add a task** – type into the input field and press **Enter** or click the **+** button.
2. **Choose a project** – select a project from the dropdown next to the input.
3. **Mark complete** – click the green check‑mark button on a pending task.
4. **Edit / Delete** – use the pencil or trash icons.
5. **Filter** – use the *Filter* dropdown to view only a specific project.
6. **Profile** – click the avatar in the top‑right to change your name or avatar URL.
7. **Settings** – open the *Settings* link to toggle dark mode or clear all data.
8. **Projects** – manage categories (add/delete) via the *Projects* link.
---
## 📦 Database (Optional)
A `database.sql` file is provided for future server‑side integration. It creates three tables:
- `projects`
- `tasks`
- `user_settings`
You can import it through **phpMyAdmin** or the MySQL command line. The current frontend continues to use `localStorage`; the DB is ready for a later PHP/REST API if you wish to extend the app.
---
## 🗂️ Future Improvements
- Connect a **PHP API** to store tasks, projects and settings server‑side.
- Add **user authentication** (login / registration).
- Implement **drag‑and‑drop** reordering of tasks.
- Export tasks as **CSV / PDF**.
- Enhance the UI with more animations and theme options.
---
## 👤 Author
**hardik jethava**  
---
## 📄 License
This project is **open source** and free to use for learning purposes. Feel free to fork, modify, and share.
---
## 📬 Contact
If you have any questions, suggestions or want to contribute, open an issue on GitHub or reach out directly.
⭐ If you enjoy this project, please give it a star on GitHub!
