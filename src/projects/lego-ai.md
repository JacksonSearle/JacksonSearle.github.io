---
title: Lego AI
order: 5
headline: A visual tool for building and training neural networks, where every result can be reproduced exactly.
summary: Drag blocks to design a model, watch it train with live charts, and compare runs on a leaderboard.
thumb: lego-ai-build.jpg
thumbAlt: "The Build tab: a model made of stacked colored blocks, with the shapes shown on the arrows"
stack:
  - Python
  - PyTorch
  - Optuna
  - FastAPI
  - React
  - TypeScript
  - Chart.js
code: https://github.com/JacksonSearle/lego_ai
---

## The problem

Trying out an idea for a neural network usually means writing setup code before learning anything. Weeks later it is hard to say which version produced which result, or to get the same result again.

## The result

A web app where a model is a stack of colored blocks. You build it by dragging, train it while watching live charts, and every run lands on a leaderboard. Each run is saved as a small settings file that retrains to exactly the same numbers on the same setup, and the app marks a run as reproduced when a retrain matches.

It also has a guided mode for people new to AI, with 48 built-in lessons and features that unlock as you go.

{% shot "lego-ai-train.jpg", "The Train tab mid-run, with the live loss and accuracy charts" %}

## How it works

1. **Build.** Drag blocks onto a stack. The app checks after every edit that the pieces fit together, so mistakes show up before training starts.
2. **Train.** Pick the settings and press Train. It first checks that the model fits in memory, then shows loss and accuracy as they change.
3. **Tune.** Give ranges instead of single values and the app searches for the best settings automatically.
4. **Compare.** Every run is ranked on a leaderboard. Open one to see its charts, design and settings, or to test it on your own input.
5. **Reproduce.** Any run can be retrained from its saved settings file. Results match bit for bit when run on the CPU with the same software versions.

{% shot "lego-ai-leaderboard.jpg", "The Leaderboard filtered to one dataset, with runs marked as reproduced and one run's results open" %}
