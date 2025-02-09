---
title: Work
footer_img: imgs/walking_away2.jpg
menu: "main"
weight: 2
---

At [Beacon](https://beacon.bio), I lead the team that develops tooling for
internal users doing quantitative work, from algorithm development to life
sciences.  I built out our ML platform capabilities, including a dataset
provenance/versioning system (used by all algorithm/life sciences teams across
the organization), distributed training/inference capabilities for our Julia ML
models, and am tech lead on our work developing a Julia runtime for
[Ray.io](https://ray.io).

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

For more, see [my Github](https://github.com/kleinschmidt).

## Academic work

My academic work focused on how people make sense of speech sounds given the
significant variability in meaning-to-sound mappings across different people,
accents, and dialects.  I used a combination of theoretical, behavioral, and
cognitive neuroscience methods, with a particular emphasis on Bayesian cognitive
modeling.  [More...]({{% relref "academic" %}})

My [dissertation](https://github.com/kleinschmidt/diss) was awarded the 2017
[Glushko Prize for Outstanding Doctoral Dissertations in Cognitive Science by
the Cognitive Science
Society](https://cognitivesciencesociety.org/glushko-dissertation-prize/).

My PhD work was supported by a Graduate Research Fellowship from the NSF
(2010-2014) and F31 National Research Service Award from the NIH (2015-2016).
