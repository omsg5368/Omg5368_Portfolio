# Engineering & AI Agent Rules

## 1. Documentation & Project Standards
- **Always Maintain the Core 6 Files**:
  1. `PRD.md`: Tracks requirements, user personas, scope, and acceptance criteria.
  2. `ARCHITECHTURE.md`: System topology, tech stack, data flow, and security boundaries.
  3. `DESIGN.md`: Visual design, color tokens, 3D interaction specs, and component structure.
  4. `MEMORY.md`: Engineering decisions (ADRs), trade-offs, gotchas, and ongoing context.
  5. `RULES.md`: Coding standards, best practices, and agent guidelines (this document).
  6. `TRACKER.md`: Active tasks, completion checklist, and roadmap milestones.
- Any significant architectural change or feature implementation must be reflected across these files.

## 2. Code Quality & Conventions
- **TypeScript / React Best Practices**:
  - Clean modular functional components with explicit props interfaces.
  - No `any` types where avoidable.
  - Proper memory cleanup in `useEffect` hooks for Three.js renderers, animation frames, and resize listeners.
- **Performance & 3D Optimization**:
  - Three.js animation loops must use `requestAnimationFrame` and clean up scene objects, geometries, and materials on component unmount (`dispose()`).
  - Cap device pixel ratio (`Math.min(window.devicePixelRatio, 2)`) to protect GPU performance on mobile devices.
  - Fallback gracefully if WebGL is unavailable or performance is constrained.
- **Styling**:
  - Tailwind CSS with consistent dark-mode cyber/tactical palette.
  - Maintain WCAG AA contrast compliance for text readability over glowing 3D backgrounds.

## 3. Security Guidelines
- Client-side data inputs in the interactive terminal and contact form must be sanitized.
- No sensitive API keys or credentials committed to source code.
- Provide a clear security overview (`How this site is secured`) demonstrating security-first engineering mindset.

## 4. Writing & Tone Guidelines (Unslop Standard)
- Enforce the `unslop` skill standards across all prose, documentation, and portfolio copy.
- Eliminate AI tells, robotic filler phrases ("In today's fast-paced landscape", "Delve into", "Tapestry"), fake Hollywood hacker gimmicks, and inflated marketing slogans.
- Write with authentic, human, senior-engineering clarity: direct, concrete, and grounded in verifiable technical facts.

