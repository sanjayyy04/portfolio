# Project detail shared-swarm behavior

Project detail routes restore the normalized agent positions, velocities, colors, roles, and phases saved by the main portfolio when navigating away. The detail-page engine uses those same 15 agents rather than spawning a visually separate swarm.

Case-study targets are processed in document order. A target starts its perimeter-drawing animation only when it enters the viewport; completed targets stay completed, and the next visible target is picked up without resetting the swarm. Between targets, the agents remain in motion. The canvas is a pointer-events-none overlay, so links and page content remain interactive.

Reduced-motion preferences and coarse-pointer devices skip the drawing animation and mark content as ready.


## Detail-page target refinement

The detail-page swarm now targets meaningful visual units only: the project eyebrow/title/intro/actions, overview heading and summary, showcase frame/caption, feature rows, technology stack, workflow steps, and project actions/footer links. Generic section wrappers are not cursor targets, reducing overlapping outlines and visual clutter. Targets start only when a useful portion is inside the viewport; completed targets remain completed on scroll-back. The same shared detail-page swarm renderer and saved agent identities are retained.
