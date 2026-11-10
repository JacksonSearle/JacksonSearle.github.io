---
title: College Football Playoff odds
order: 3
headline: A live dashboard that shows any college football team's chances of making the playoff.
summary: It pulls this season's scores, rates every team, and plays out the rest of the season 20,000 times to turn the results into plain percentages.
thumb: playoff-odds-team.jpg
thumbAlt: "A team's page: its chance to make the playoff, win the title and win its conference, above its schedule and the Top 25"
stack:
  - Plain JavaScript
  - Web Worker
  - Public ESPN score data
  - GitHub Pages
  - GitHub Actions
live: https://jacksonsearle.github.io/football/
code: https://github.com/JacksonSearle/football
---

## The problem

Late in the season, every fan asks the same things: can my team still make the playoff, what does it need to happen, and which other games matter? The answers depend on hundreds of remaining games, and they change every weekend.

## The result

A site where you pick a team and see its numbers: the chance it makes the 12-team playoff, wins its conference, and wins the title. It shows how much each remaining win would raise those chances, which other games to watch and who to root for, and a projected bracket. The numbers come from my own model and update from the latest scores each time the page loads.

{% shot "playoff-odds-bracket.jpg", "The projected playoff bracket, with a predicted score and win percentage for every game" %}

## How it works

1. **Get the scores.** The page loads this season's results and schedule from ESPN's public data each time it opens.
2. **Rate every team.** Each team gets a strength rating from its scores, adjusted for how good its opponents were. Blowouts count for less, so running up the score on a weak team isn't rewarded.
3. **Play out the season.** The rest of the season, including conference title games and the playoff, is simulated 20,000 times. A team's odds are how often it gets there.
4. **Show what each win is worth.** For the team you follow, the simulation is rerun assuming it wins its next game, then the next two, and so on, to show how its chances move.
5. **Keep it fast.** The simulations run in the background in the visitor's browser, so the page stays responsive and there is no server to maintain.

A second page does the same for Ohio high school football. Its data is refreshed automatically twice a week during the season.
