+++
date = "2019-01-24T16:09:15-05:00"
publishdate = ""
draft = true
title = "Weave Rmarkdown"
+++

# Weave.jl for RMarkdown users

I'm an extremely enthusiastic RMarkdown user, and I try really hard to write all
my papers that involve R code as RMarkdown documents so that they can be
reproduced by others (reviewers, students, others in the field, random people on
the internet).  Weave.jl offers a very similar set of features for Julia code,
but there are some notable differences (and pain points).  This is a quick
summary of how I use Weave.jl ... 

## Startup time

The first time you run any code in Julia it has to compile it.  The standard
workflow is to use a long-running session with something like Revise.jl which
dynamically reloads code when it's changed.  But this doesn't work so well with
a self-contained notebook which (ideally) should be run beginning to end in
order to guarantee repdroducibility (at least locally)

## Cacheing

(Maybe not Weave.jl's fault...it's a fundamental difference between Julia and R
that makes it tricky to implement the same kind of cacheing...

## Sandboxing

Weave.jl will by default try to run your code chunks in a "sandbox" module that
it creates on the fly in order to isolate the notebook code from the rest of
your session.  But there are a number of packages that don't play well with
executing code in a module other than `Main`, including JLD2 which
