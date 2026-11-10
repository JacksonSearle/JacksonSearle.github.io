---
title: Puck Vision
order: 4
headline: A camera that watches a shuffleboard table and keeps score on its own.
summary: It tracks each puck from a live camera feed, scores the round, and shows the result on a TV, with a review step to correct anything the camera missed.
thumb: puck-vision-game.jpg
thumbAlt: "The game screen during a round in demo mode: the board with two tracked pucks, the scoring zones and the score"
stack:
  - Plain JavaScript (no libraries)
  - Browser camera and Canvas APIs
  - Small Python server
code: ""
---

## The problem

Table shuffleboard is scored by walking to the far end of a long table and judging by eye which pucks are past which line. I wanted the table to score itself, using one ordinary webcam and a web browser, with no special hardware.

## The result

A browser app that runs on the TV at the end of the table. A camera above the TV looks down the board. The app finds the red and blue pucks, notices when a throw has finished, scores the round, and shows it on screen. A built-in simulator lets the whole game be played and tested without a camera.

In the simulator, correcting for the height of the pucks cut the position error from about 0.5–0.9 inches to 0.06–0.27 inches.

{% todo "say whether this has been used on a real table with a camera, and how it went" %}

{% shot "puck-vision-demo.mp4", "Short video (20-40 s): a throw on the real table next to the TV, showing the puck being tracked and the score updating. A screen recording of demo mode works if there is no table footage." %}

## How it works

1. **Calibrate once.** Drag four markers onto the corners of the board in the camera view and enter the board's measurements. From that, the app works out where the camera is and how to turn its angled view into a top-down map.
2. **Teach it the pucks.** A four-step guided setup measures the pucks and learns their colors from the camera. The settings change only when you press Apply.
3. **Track every throw.** The app finds each colored puck on the top-down map, separates pucks that are touching, and counts a throw once the board has stopped moving.
4. **Score, then let a person confirm.** After the last throw, a review card shows the round score. It updates live, so a player can nudge a puck the camera missed before accepting.

{% shot "puck-vision-calibrate.jpg", "The calibration screen in demo mode: the four corner handles, the board outline and the calculated camera position" %}
