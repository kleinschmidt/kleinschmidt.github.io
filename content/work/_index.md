---
title: Work
footer_img: imgs/walking_away2.jpg
menu: "main"
weight: 2
---

At [Beacon](https://beacon.bio), I work on neuroscience tool development, data
science, and software engineering.

## Open source

I develop and maintain a few open source packages with my collaborators, mostly
around tooling for statistical modeling in Julia:

- [StatsModels.jl](https://github.com/JuliaStats/StatsModels.jl): specify
  regression-style models from tabular data with a familiar R-style "formula"
  syntax that's convenient for users and hackable by package developers.
  [JuliaCon 2018 talk](https://www.youtube.com/watch?v=HORLJrsghs4), [JuliaCon
  2020 talk](https://www.youtube.com/watch?v=lsEv0-TMk5k)
- [RegressionFormulae.jl](https://github.com/kleinschmidt/RegressionFormulae.jl):
  formula syntax extensions for regression modeling with StatsModels.jl,
  inspired by some of the extra features built into R's formula language (e.g.,
  `/` for nesting, `^n` for all interactions up to _n_-way).
- [StandardizedPredictors.jl](https://github.com/beacon-biosignals/StandardizedPredictors.jl):
  safely and reproducibly standardize continuous predictors via centering,
  scaling, and _z_-scoring.  [JuliaCon 2021
  talk](https://www.youtube.com/watch?v=mAgyr8ZvJNg)
- [Effects.jl](https://github.com/beacon-biosignals/Effects.jl): compute effects
  of one or more covariates in a regression model.

For more, see [my Github page](https://github.com/kleinschmidt).

## Academic work

In my academic work, I was interested in how the brain manages to efficiently
allocate representational resources in a world where the statistics of sensory
features changes from situation to situation. I'm particularly interested in how
the **structure** in this sensory non-stationarity makes it possible to adapt to
such changes more efficiently. **Speech perception** serves as an excellent
model organism, because the statistics of the speech signal depend both on
*what* is being said and *who* is saying it, both of which introduce highly
structured variability that listeners are sensitive to.

My work aims to develop explicit, computational models of perception and
adaptation, with a particular emphasis on speech. I think that good theories and
models draw on insights from—and try to make connections between—neuroscience,
behavioral data, and broader computational-level cognitive modeling.

Topics that I've worked on or am interested in include: cognitive neuroscience
of learning and perception, perceptual category learning, phonetic
adaptation/recalibration, acquisition of phonetic categories, and cue
combination and complex acoustic feature extraction. I'm also particularly
interested in increasing awareness and appreciation of Bayesian methods for
modeling (although I don't consider myself a capital-B-Bayesian)
and—especially—data analysis.
