# Loop – Habit Tracker

A simple daily habit tracker built with plain HTML, CSS and JavaScript. No database, no build step, no dependencies. Check off habits each day and watch your streaks grow.

## Features

- Add and delete habits
- One tap to mark a habit done for today
- Automatic streak calculation (breaks if a day is missed)
- Data persists locally via `localStorage`
- Responsive layout and visible keyboard focus states

## Tech Stack

HTML5, CSS3, vanilla JavaScript (localStorage)

## Project Structure

```
loop-habit-tracker/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run

1. Clone the repo:
   ```bash
   git clone https://github.com/<your-username>/loop-habit-tracker.git
   ```
2. Open `index.html` in any modern browser.

## How It Works

- Each habit stores an array of completion dates (`YYYY-MM-DD`).
- Toggling today's checkbox adds or removes today's date from that array.
- The streak is computed by walking backward from today (or yesterday, if today isn't checked yet) counting consecutive days present in the array.
- Everything is saved to `localStorage`, so habits persist across browser sessions on the same device.
 ##
## Possible Improvements

- Weekly/monthly calendar view per habit
- Habit categories and reminders
- Export/import habit data as JSON

## Author

Deepshikha - MCA, Chandigarh University

## License

MIT
