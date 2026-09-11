# Workflow Editor (SVG)

:::info Not Yet in Stable Release

This feature is not yet part of a stable iDempiere release and may change.
:::

**Goal:** Technical
**Developer:** [Markus Bozem](https://wiki.idempiere.org/en/User:Mbozem)
**Feature Ticket:** [IDEMPIERE-7097](https://idempiere.atlassian.net/browse/IDEMPIERE-7097)

## Editing workflows in the browser

Workflows are modelled in the **Workflow Editor** form and viewed in the **Workflow** window. Until now the editor relied on server-rendered images: connectors were hard to read in dense workflows, labels overlapped, and interactions such as moving nodes or creating transitions required full round trips.

This feature renders the workflow as a vector **SVG graph directly in the browser** (`wfgraph.js`). The server only sends the layout model; panning, zooming, selection and drag operations run locally. The NetBeans Visual Library dependency used by the old server-side rendering is removed. (The Swing client keeps its previous rendering; everything below describes the ZK web UI.)

## Connectors that stay readable

- Connectors leave a node through the **right or bottom** border and enter through the **top or left** border. Anchors are spread evenly, parallel connectors share lanes so they never lie on top of each other, and direct neighbours connect straight.
- **Sequence badges** at the line start show the transition sequence when a node has more than one outgoing transition.
- **Description chips** sit centered on the longest free segment of the line (rotated on vertical segments). Overlong texts are shortened with `…`; hovering shows the full text.
- Transitions with workflow conditions show a **diamond** instead of a circle; hovering the diamond or the line lists the conditions.
- Dashed lines with an **S** badge are standard user workflow transitions, only valid when *Complete* is selected in the document.

## Modelling with drag and drop

- **Drag** a node card to move it to another grid cell. Dropping onto an unpinned node is allowed; the layout resolves the collision. The view keeps its scroll position.
- Every editable node shows a **blue dot** on its right border (hover the card; always visible on touch screens). **Drag** from the dot onto another node to create a transition; the target shows its docking point on the left border.
- **Right-click** a node or a line for the context menu: Zoom, Properties, Pin/Release position, Delete. *Double-click* opens properties directly, the `Delete` key removes the selection.
- Node properties edit name, description and the pinned position; unpinning returns the node to automatic layout. Transition properties edit sequence and description. Nodes of another client are grayed out and read only.

## Symbol bar, zoom and touch screens

- The symbol bar above the graph holds the workflow picker and canvas zoom (`−`/`+`/fit/`1:1` with a live `%` display; a single zoom menu on mobile clients). The display panel offers the same zoom bar without editing functions.
- The interaction hint lives as a status line below the graph.
- On touch screens (**iPhone/iPad verified**): **long press** replaces right-click, a **second tap** on a selected node opens its menu, and tapping a line, chip or badge opens the transition menu. Toolbar buttons and menu entries meet the 44 px touch target size, text selection and the iOS copy menu do not interfere, and small screens start fitted to the width.

## Example use case: approval workflow with conditions

Consider a purchase order approval with two outgoing transitions from the review step: one for approval, one for rejection with a condition on the approval flag.

1. Open the **Workflow Editor**, pick the workflow and drag the nodes into place.
2. Drag from the blue dot of the review node onto each follow-up node to create the transitions.
3. Open the transition properties and set sequence (`10`, `20`) and description; add the condition to the rejection transition in the transition window (Zoom).
4. Back on the canvas, both transitions carry numbered badges and the conditional one shows a **diamond**; hovering it lists the condition.

## Configuration and migration

Apply `migration/iD14/.../202609081138_IDEMPIERE-7097.sql` and `.../202609101200_IDEMPIERE-7097.sql` (both `postgresql` and `oracle` variants exist). They add the graph message texts (`ZoomOut`, `ZoomIn`, `FitToWidth`, `ActualSize`, `WFGraphHint`, `NoWorkflowNodes`, `WFPinPosition`, `WFUnpinPosition`, `WFPinnedPosition`, `WFStdUserWorkflowOnly`; all IDs centrally reserved). The texts are currently English only.

You can verify the deployed client version in the browser console via `idempiere.wfgraph.version`.

## Impact

Workflow modelling moves from static server images to an interactive canvas: denser workflows stay legible, daily tasks (reordering, reconnecting, documenting transitions) need fewer clicks, and the same graph powers editing, display and touch devices.
