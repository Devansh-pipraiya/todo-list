# 🎯 Title: todo-list

### A project-based todo app built with vanilla JavaScript

**Project Overview:**
This project is part of **[The Odin Project](https://www.theodinproject.com)** course, built to practice:

- Creating objects dynamically with **factory functions** (todo cards) and organizing code into **ES modules**
- **Separating application logic** (`todo.js`, `storage.js`) from **DOM code** (`dom.js`, `modal.js`, `task-card.js`)
- Persisting data with the **Web Storage API** (`localStorage` + JSON)
- Bundling with **webpack** and using an npm library (**date-fns**)

---

> 📌 **Project status:** Completed ✅ | 🌐 [Live Preview](https://devansh-pipraiya.github.io/todo-list/)

---

## Preview 👀

<!-- Add a screenshot or GIF here, for example: -->
<!-- [![Demo](./screenshots/preview.png)](https://devansh-pipraiya.github.io/todo-list/) -->

## 🚀 Features

- ✅ **Add, edit and delete tasks** with title, description, due date, priority, project and notes
- 📁 **Projects**: a default Inbox, plus your own projects that you can create and delete
- 🗂️ **"All" view** to see tasks from every project in one list
- ☑️ **Mark tasks as complete** with a checkbox
- 🔎 **Filters** for Completed, Today and Upcoming tasks, with a reset button
- 🕒 **Friendly due dates** like "Today" and "Tomorrow", powered by `date-fns`
- 🔼 **Priority arrows** on each task card
- 🔀 **Move tasks between projects** while editing
- 💾 **Auto-saved** in `localStorage`, so your data stays after a refresh
- 📱 **Responsive layout** that works on phones and desktops

## 🛠️ Built With

- HTML5, CSS3, JavaScript (ES modules)
- [webpack](https://webpack.js.org/) (`html-webpack-plugin`, `style-loader`, `css-loader`, `webpack-dev-server`)
- [date-fns](https://date-fns.org/)

## 📚 What I Learned

- How to structure a project with **ES modules**, keeping **logic and DOM code in separate modules** and using a **factory function** with **callbacks** to build task cards without coupling the UI to the data layer
- That `localStorage` only stores **JSON**, so dates need to be converted back into `Date` objects when loading
- How to centralize UI state (current project and current filter) and expose it through **getter functions**
- Setting up and configuring **webpack** with loaders, plugins and an HTML template
- Using npm packages like **date-fns** to format and compare dates (`isToday`, `isTomorrow`, `isYesterday`, `format`)

## ⚙️ Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/Devansh-pipraiya/todo-list.git
cd todo-list

# 2. Install dependencies
npm install

# 3. Start the dev server
npx webpack serve --open

# 4. Or create a build in /dist
npx webpack
```

## 🧩 Project Structure

```
src/
├── index.js        # entry point: imports styles, inits modals, first render
├── todo.js         # application logic: projects & todos (add / edit / delete / toggle)
├── storage.js      # localStorage save/load + default Inbox data
├── dom.js          # rendering, filters, sidebar project tabs, UI state
├── modal.js        # task & project dialogs (add / edit modes)
├── task-card.js    # factory that builds a task card DOM element
├── template.html   # HTML template used by HtmlWebpackPlugin
└── css/
    ├── modern-normalize.css
    └── styles.css
```

## 📍 Attributions

| Resource           | Source                                                                                               |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| Project assignment | [The Odin Project: Todo List](https://www.theodinproject.com/lessons/node-path-javascript-todo-list) |
| Date formatting    | [date-fns](https://github.com/date-fns/date-fns)                                                     |
| CSS normalization  | [modern-normalize](https://github.com/sindresorhus/modern-normalize)                                 |
| CSS reset          | Custom reset based on [Josh Comeau's CSS Reset](https://www.joshwcomeau.com/css/custom-css-reset/)   |
| Bundler            | [webpack](https://webpack.js.org/)                                                                   |

## 🔨 To-Do

- [ ] Add a settings menu to import and export projects as a JSON file
- [ ] Add an expandable view for full task details (right now they only show when you press the Edit button)
- [ ] Refactor for better tab switching and rendering logic, with separate state management
