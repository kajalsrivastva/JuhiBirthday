# Implementation Plan: Tab-based Routing

## Goal Description
The user wants to switch the web app from a "long scrolling page" to a "tabbed/routed navigation".
- When clicking "Home" in the Navbar, the entire long page with all sections should be shown.
- When clicking any specific section in the Navbar (e.g., "First Scratch Card", "Spin The Wheel"), only that particular section should be rendered on the screen.

## Proposed Changes

### `Navbar.jsx`
- Update the `Navbar` component to accept an `onNavigate` prop.
- In `handleNavClick`, instead of scrolling to the element using `document.getElementById(target).scrollIntoView()`, we will call `onNavigate(target)`.

### `App.jsx`
- Introduce a new state `activeRoute` initialized to `'section-home'`.
- Pass `onNavigate={(target) => { setActiveRoute(target); window.scrollTo(0,0); }}` to the `Navbar`.
- Conditionally render sections based on `activeRoute`:
  - If `activeRoute === 'section-home'`, render the entire original sequence of components (Hero, Text sections, Journey, Vault, Scratch Cards, Wheel, etc.) as the full overview page.
  - If `activeRoute` is a specific section (e.g., `section-scratch`), render *only* that component inside a padded container to prevent overlap with the fixed Navbar.
- Apply a wrapper `div` with `paddingTop: '70px', minHeight: '100vh'` around the individual active components to ensure they display properly below the fixed Navbar.

## Verification Plan
- Manual verification: Click through each link in the Navbar and verify that the page clears out the rest of the content and only shows the selected component.
- Verify that clicking "Home" restores the full scrolling page with all sections.
