# Pill Splitter Challenge

This is a **React + TypeScript** project where users can **draw, drag, and split pills (rounded rectangles)** inside a container.  
The challenge demonstrates **drag & drop interactivity, geometry-based splitting, and dynamic rendering**.

---

##  Features

-  **Create Pills**: Click + drag on empty area to draw a new pill (minimum size `40x40`).
-  **Random Colors**: Each pill is assigned a random color.
-  **Drag Pills**: Pills can be picked and moved around the container.
-  **Split Pills**: 
  - Move the cursor over a pill.  
  - Click → pill splits **horizontally or vertically** depending on cursor position.  
  - Ensures both split parts remain valid (≥ `20px` each).
-  **Crosshair Cursor**: Vertical + Horizontal guide lines follow the mouse pointer.

---

##  Tech Stack

-  **React 18**
-  **TypeScript**
-  **Tailwind CSS** (for styling)
-  **Vite** (for fast build + dev server)

---

##  Project Structure

```

pill-splitter-challenge/
│── public/              # Public assets
│── src/
│   ├── App.tsx          # Main component (drawing, dragging, splitting logic)
│   ├── index.css        # Global styles
│   ├── main.tsx         # React entry point
│   └── vite-env.d.ts    # Vite TS config
│── .gitignore
│── package.json
│── tsconfig.json
│── vite.config.ts
└── README.md

````

---

##  How to Run Locally

1. Clone the repository
   ```bash
   git clone <your-repo-url>
   cd pill-splitter-challenge
````

2. Install dependencies

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install


3. Run the dev server

   ```bash
   npm run dev
   ```

4. Open in Browser

   ```
   http://localhost:5173
   ```

---

##  How to Use

1. Draw a pill:

   * Click + drag anywhere inside the container.
   * A pill (rounded rectangle) will appear.

2. Move a pill:

   * Click + drag an existing pill.
   * Release mouse to drop.

3. Split a pill:

   * Move cursor inside a pill (crosshair shows position).
   * Click → pill splits horizontally or vertically.

---


---

## Future Improvements

*  Undo / Redo functionality
*  Save pills state in localStorage
*  Mobile touch support
*  Animate pill splitting

---

## Author

Fariha Afrin Tamanna

