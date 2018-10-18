+++
date = "2018-10-12T21:33:45-04:00"
publishdate = ""
draft = true
title = "Zero Cost Abstractions"
+++

One of the things that I'm consistently amazed by working with Julia is the
existence of **zero cost abstractions**: high-level, expressive representations
that are cognitively easy to work with _and_ still fast.  If, like me, you're
used to interpreted langauges like R or Python, this might seem pretty magical.
For an example, let's look at how probability distributions are represented in
[Distributions.jl](https://github.com/JuliaStats/Distributions.jl).

<!--more-->

## Is a distribution just its parameters?

A normal distribution is represented by its mean $\mu$ and its standard
deviation $\sigma$.  In R, if we want to get the probability density of a value
`x` under a standard normal distribution with $\mu=0$ and $\sigma=1$, we call

```r
dnorm(x, mean=0, sd=1)
```

For a different normal distribution, we'd just plug in different values for the
`mean` and `sd` arguments.

Similarly, to calculate the cumulative probability or quantile functions, or
sample a random value, we call the corresponding functions with the mean and
variance as additional parameters:

```r
pnorm(q, mean=0, sd=1)    # cumulative distribution function
qnorm(p, mean=0, sd=1)    # quantile function 
rnorm(n=10, mean=0, sd=1) # draw 10 random values
```

This means that if you want to work with normal distributions, you have to
manually keep track of the parameters (mean and ~~variance~~ standard deviation)
and plug them into the relevant function when you need to make a calculation.

## A container for parameters

In Julia (with
[Distributions.jl](https://github.com/JuliaStats/Distributions.jl)), a normal
distribution is represented explicitly as an instace of the `Normal` type:

```julia
using Distributions
std_normal = Normal(0., 1.)
```

```
Normal{Float64}(μ=0.0, σ=1.0)
```

To get the probability density for a value $x=2$, under this distribution, we
call the `pdf` function:

```julia
pdf(std_normal, 2.0)
```

```
0.05399096651318806
```

And we can generate 10 random values with

```julia
rand(std_normal, 10)
```

```
10-element Array{Float64,1}:
  1.5371852158070969 
  0.6762857328535927 
  0.5555220900051429 
  0.12562560433571343
  0.779145247632087  
  1.9996921433645103 
 -1.9136426415654204 
  1.1104893184040578 
  0.5307413214881564 
  0.45056807852939285
```

Representing a normal distribution as a single object (instead of parameters
just floating around in your code) means that you can pass them around, store
them in collections, etc. without the additional hassle of having to plug the
parameters back into a function every time you want to do something with the
distribution.  We could even define new methods for common functions based on
the `Normal` distribution type, which endows the distributions we've already
created with additional power:

```julia
function Base.:(+)(d1::Normal, d2::Normal)
    Normal(d1.μ + d2.μ, sqrt(d1.σ^2 + d2.σ^2))
end
std_normal + Normal(1., 2.)
```

```
Normal{Float64}(μ=1.0, σ=2.23606797749979)
```

## At what cost?

So far I've just talked about the benefits of having an abstraction.  It's of
course possible to define an abstraction for a normal distribution in R as
well.  But you pay a performance penalty for doing so, because every time you
go to do something with the sturcture you have to _unbox_ the parameters stored
within it and plug them into the functions that do the work (e.g., `dnorm` and
their friends).

You might, like I once did, think that this was an inevitable cost to using
these kinds of abstractions.  But let's see what happens when we define a
`dnorm` function in Julia:

```julia
@inline dnorm(x, mean, sd) = pdf(Normal(mean, sd), x)
dnorm(2.0, 0.0, 1.0)
```

