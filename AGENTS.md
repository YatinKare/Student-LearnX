# Agent Basic Documentation

## Project Details:
- Read `/resources/refined_project_overview.md` for overall project goals.
- Read `/ARCHITECTURE.md` for the full‑stack architecture diagram, transcription model choice, MVC design, database options, and task roadmap.

## Developer Notes
 - ALWAYS make sure at the end of every edit, you double check with the SVELTE 5 standards provided in `/resources/svelte+sveltekit+cli_llm.md`
- If you need guidance on what the project entails refer to `resources/refined_project_overview.md`
 - If you are implementing a component, make sure you check daisyUI and tailwind for the appropriate component's and how to style them if they exist.

## Directory Structure
```text
.
├── ARCHITECTURE.md
├── AGENTS.md
├── README.md
├── resources/
│   ├── refined_project_overview.md
│   └── svelte+sveltekit+cli_llm.md
├── server/
│   ├── main.py
│   ├── mockdata.json
│   ├── pyproject.toml
│   └── s3/
│       └── audio/
│           └── audio.mp3
├── src/
│   ├── app.css
│   ├── app.html
│   ├── routes/
│   └── lib/
├── static/
│   ├── favicon.png
│   └── images/
├── start.sh
├── svelte.config.js
├── package.json
└── vite.config.js
```
