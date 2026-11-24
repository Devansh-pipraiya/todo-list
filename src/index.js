// === Styles === //
import "./css/modern-normalize.css";
import "./css/styles.css";

import { initModals } from "./modal.js";
import { renderProject, renderProjectTabs } from "./dom.js";

// Initialize Modals
initModals();

// initial render
renderProject();
renderProjectTabs();
