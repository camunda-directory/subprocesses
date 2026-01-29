# 🎨 Design Specification: Subprocess Hub

**Visual Identity:** "Developer-Grade Clarity."
**Reference:** `developers.camunda.com` (Layout/Cards) & `forum.camunda.io` (Interactions).

This document defines the UI/UX standards for the Subprocess Hub. The goal is to build an interface that feels like a native extension of the Camunda ecosystem—clean, highly legible, and distraction-free.

---

## 1. 🎨 Color System

We adhere strictly to the **Camunda Brand Palette** to ensure familiarity. The UI should be high-contrast and accessible.

### Primary Colors
* **Orangemunda (Primary Action):** `#FC5D0D`
    * *Usage:* Primary buttons, active tabs, "Like" hearts, key highlights.
* **Spacecraft (App Background):** `#F7F7F7`
    * *Usage:* Global page background. Avoid pure white for the main background to reduce eye strain.
* **White (Surface):** `#FFFFFF`
    * *Usage:* Card backgrounds, Sidebar, Navbar, Input fields.
* **Black (Text/Headings):** `#111111` (Soft Black)
    * *Usage:* Main headings, primary text.

### Secondary & UI Colors
* **Look Up (Dark Accent):** `#1F2A44`
    * *Usage:* Footer background, dark mode elements, code block backgrounds.
* **Concrete Grey (Borders/Dividers):** `#E6E7E8`
    * *Usage:* Card borders, table dividers, button outlines.
* **Misty Grey (Secondary Text):** `#666666`
    * *Usage:* Descriptions, timestamps, metadata labels.
* **Greenmunda (Success/Tags):** `#26D07C`
    * *Usage:* "Verified" badges, "Simple" complexity tags.

---

## 2. 🔤 Typography

**Font Family:** `IBM Plex Sans` (Google Font).
* *Fallback:* Inter, Arial, sans-serif.
* *Code:* `JetBrains Mono` or `IBM Plex Mono`.

### Scale & Hierarchy
* **H1 (Page Title):** `32px` / Bold (700). Color: Black.
* **H2 (Section Header):** `24px` / SemiBold (600). Color: Black.
* **H3 (Card Title):** `18px` / Medium (500). Color: Link Blue (`#1F2A44`) or Black.
* **Body:** `16px` / Regular (400). Color: `#111111`. Line-height: 1.6.
* **Small/Meta:** `14px` / Regular. Color: `#666666`.

---

## 3. 📐 Layout & Grid

**Philosophy:** "Content on Cards". The background is always `Spacecraft (#F7F7F7)`, and content lives in `White (#FFFFFF)` containers with subtle definition.

### The Container
* **Max Width:** `1280px` (Centered).
* **Padding:** `24px` horizontal on mobile, `48px` on desktop.

### The Global Navigation (Navbar)
* **Position:** Sticky Top.
* **Background:** White `#FFFFFF`.
* **Border:** Bottom border `1px solid #E6E7E8`.
* **Height:** `64px`.
* **Elements:**
    * **Left:** Project Logo (Aligned with grid).
    * **Center:** Search Bar (Mac-style "Cmd+K" visual).
    * **Right:** GitHub Icon link, "Submit Process" button (Primary).

---

## 4. 🧩 Component Library

### 4.1. The Process Card (The "Netflix" Tile)
*Reference: The "Use Cases" cards on developers.camunda.com.*

* **Container:** White background, `1px solid #E6E7E8` border, `8px` border-radius.
* **Shadow:** None by default. `box-shadow: 0 4px 12px rgba(0,0,0,0.05)` on **Hover**.
* **Transition:** `transform: translateY(-2px)` on Hover.
* **Anatomy:**
    1.  **Header Image (Top):** Fixed height (`160px`). Contains the **Static SVG Preview** of the BPMN. Background of this area should be a subtle dot-pattern or light grid to make the diagram pop.
    2.  **Content (Bottom):** Padding `16px`.
        * **Title:** H3 style. Truncated to 2 lines.
        * **Tags:** Flex row of small pills. Background `#F0F0F0`, Text `#444`. Radius `100px`.
        * **Footer Row:**
            * *Left:* Author Avatar (Small circle 20px) + Name.
            * *Right:* Heart Icon (Outline default, Filled Orange if liked) + Count.

### 4.2. The Command Palette (Search)
* **Trigger:** Input field in Navbar. "Search processes... ⌘K".
* **Style:** Grey background `#F0F2F5`, no border, dark text.
* **Dropdown:** White modal, extensive shadow `0 20px 25px -5px rgba(0, 0, 0, 0.1)`.
* **Results:**
    * **Highlight:** Yellow `#FFF9C4` background for matched terms.
    * **Selection:** Blue light `#E3F2FD` background when navigating with arrows.

### 4.3. Buttons
* **Primary:**
    * Background: `Orangemunda (#FC5D0D)`.
    * Text: White.
    * Hover: Darken 10%.
    * Radius: `4px` (Not fully rounded).
* **Secondary/Outline:**
    * Background: Transparent.
    * Border: `1px solid #000`.
    * Text: Black.
    * Hover: Background `#F7F7F7`.

### 4.4. Detail Page (The Viewer)
* **Layout:** 2-Column Grid (Main 70% | Sidebar 30%).
* **Main Column:**
    * **Canvas:** Large white container, `600px` height. Contains the interactive `bpmn-js` viewer.
    * **Toolbar:** Bottom-right of canvas. Zoom controls, "Reset View".
* **Sidebar Column:**
    * **Metadata:** Title, Description, "Install/Copy" code snippet (styled as a code block).
    * **Actions:** Large "Download XML" button (Secondary).

---

## 5. 💬 Interaction Design (Forum Style)

*Reference: forum.camunda.io*

### Comments Section
* **Location:** Bottom of Detail Page.
* **Style:** "Discourse-lite".
* **Input:** Textarea with a top border. "Write a comment..."
* **Thread:**
    * **Avatar:** `40px` circle, left.
    * **Bubble:** No speech bubble. Text flows directly next to avatar.
    * **Meta:** Username (Bold) • Time (Grey) • "Reply" link.
    * **Reaction:** Small heart icon below comment text.

---

## 6. 📱 Responsive Behavior

* **Mobile (<768px):**
    * Sidebar hides behind a "Filters" button.
    * Grid becomes 1-column.
    * Navbar reduces to Logo + Hamburger Menu.
* **Tablet (768px - 1024px):**
    * Grid: 2-column.
* **Desktop (>1024px):**
    * Grid: 3 or 4 cards per row.
    * Sidebar: Always visible.
