# Click-Finder-Project

### [Live Demo](https://sh00tn1ck29.github.io/Click-Finder-Project/.html)

An analytical dashboard application designed to track and display website user activity statistics. The project integrates with an external REST API to fetch user data and performance metrics dynamically, presenting them in an optimized, interactive table.

---

###  Key Features

- **Dynamic Data Hydration:** Fetches a comprehensive user directory and merges it with individual statistical metrics (total clicks and page views) on the fly via aggregate asynchronous API requests.
- **Advanced Pagination UI:** Fully interactive custom pagination complete with dynamic ellipses (`...`) for large data sets, absolute first/last page jumping, and functional SVG navigation arrows.
- **Asynchronous UX Lifecycle:** Implementation of a global `Linear Progress` loading bar beneath the header to prevent layout shifting and visually notify users during API fetch states.
- **Responsive & Pixel Perfect:** Crafted strictly following Figma design layouts using a Mobile-First pipeline. Responsive adjustments handle everything from mobile screens up to wide desktops.

---

###  Tech Stack

- **Markup:** [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML) (Semantic structure, table architectures)
- **Styling:** [Sass (SCSS)](https://sass-lang.com/) (Modular architecture, custom mixins for responsive layouts)
- **Methodology:** [BEM Class Naming](https://en.bem.info/methodology/) (Block-Element-Modifier for scalable styles)
- **Logic & Async:** [Modern JavaScript (ES6+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) (Native Fetch API, Promises lifecycle management, advanced Array mapping/reducing)

---

###  Breakpoint Management

The interface is completely fluid and handles responsive layouts gracefully across three main viewports managed by custom SASS mixins:

- **Desktop:** `1400px` and above (Full expansive dataset views).
- **Tablet:** From `480px` up to `1400px` (Horizontal overflow container optimization for full data accessibility).
- **Mobile:** From `320px` to `480px` (Compact structural views optimized for smaller touch-screens).

---

###  Author

- **Maksym Shavryhin** — *Main Developer* ([GitHub Profile](https://github.com/sh00tn1ck29))
