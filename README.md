## A2 – To-Do (Shortstack)

A simple, single-page to-do app built with HTML, CSS, JavaScript, and Node.js. The server stores an in-memory, tabular dataset and computes a derived field (dueDate) from each item’s priority and createdAt. The client fetches from the server and always renders the authoritative dataset it returns.

- **Deployed URL**: https://a2-shortstack-a25-3d15.onrender.com

- *Local dev*: npm install → npm start → open http://localhost:3000/

## How to Use

1. Enter a Task and choose a Priority (low / medium / high), then click Add.
2. The server creates the row, calculates dueDate (low → +7 days, medium → +3 days, high → +1 day), and returns the updated dataset. The table re-renders immediately.
3. Click Edit on a row to load it into the form; change the task or priority and click Save. The server recomputes dueDate for modified rows and returns the updated dataset.
4. Click Delete to remove a row; the server returns the updated dataset and the table updates.

## Requirements Checklist
## Baseline Functionality

- Server: serves files and maintains a tabular dataset (id, task, priority, createdAt, dueDate).

- Results: page section showing all data currently on the server (table).

- Form/Entry: add and delete data (and modify is implemented as well).

- Server Logic & Derived Field: on new or modified data, the server adds dueDate before integrating with the dataset (low = +7d, medium = +3d, high = +1d).

## HTML

- Form: #todo-form with inputs for Task + Priority and a submit button.

- Results view: table with #results-body listing all server rows.

## CSS

- Selectors: uses element, id, and class selectors.

- Layout: responsive CSS Grid layout (.container).

- Fonts: non-default Google Fonts (Oswald / Story Script).

- External stylesheet: all styles live in public/css/main.css.

## JavaScript

- Client JS fetches from server (GET /todos, POST /todos, POST /todos/update, POST /todos/delete) and re-renders the results.

## Node.js

- HTTP server serves files and creates derived fields in responses. Start with npm start.

## Data Model

- Each to-do row (server memory) has:

{
  "id": "string",
  "task": "string",
  "priority": "low | medium | high",
  "createdAt": "ISO string",
  "dueDate": "ISO string"  // derived from createdAt + priority
}


- Derived field rule: dueDate = createdAt + (priority == high ? 1 : priority == medium ? 3 : 7) days.

## Technical Achievements

- Single-Page App: After any submit (add / edit / delete), the server returns the updated dataset (including the derived field) and the client re-renders from that array—no full page refresh.

- Modify Existing Data: Added POST /todos/update to edit rows. On updates, the server recomputes the derived dueDate based on the (possibly changed) priority, then returns the updated dataset.

Fonts: Google Fonts — Oswald, Story Script.
