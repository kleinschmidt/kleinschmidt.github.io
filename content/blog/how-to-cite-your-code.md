+++
date = "2020-06-08T16:19:12-04:00"
publishdate = "2020-06-08"
draft = false
title = "(How to) cite your code"
+++

I just [submitted a paper](https://psyarxiv.com/6yhbe/) where I tried to follow
my own advice to [cite the code you use]({{< ref "/blog/cite-code.md" >}}).
This project was done with R, which makes it really easy to automatically
generate citations for packages.  With just a bit of glue code you can
automatically generate in-text citations, too.

<!--more--> 

If you're using [`papaja`](https://github.com/crsh/papaja) to prepare your
manuscript in APA format, you can use the `cite_r` command to [automatically
generate citations for R and loaded
packges](https://crsh.github.io/papaja_man/writing.html#citing-r-and-its-packages)
(or any list of packages you want).  I'm not using `papaja` because I'm a
control freak and find it a thrill to wrestle with RMarkdown, pandoc, and
various latex dialects all on my own, but it's actually quite easy to implement
this feature yourself:

```r
library(glue)
library(knitr)

packages = c(
  'base',
  'knitr',
  'rmarkdown',
  # ... etc.
)

knitr::write_bib(packages, file="packages.bib", prefix="R-")

# generate in-text citations (skip base which is cited manually)
citation_strings <- glue("`{pkg}` [@R-{pkg}]", pkg=packages[-1])
# join with ", " and ", and " for last
citation_string <-
  str_c(
    lift(str_c)(
      head(citation_strings, -1), sep=", "
    ),
    ", and ",
    tail(citation_strings, 1)
  )

```

Then in the RMarkdown source you can do something like:

```text
I am also indebted to the developers and maintainers of the R
language [@R-base], as well as the following R packages:
`r citation_string`.
```

This isn't as fancy as the `papaja` version which also generates the loaded
versions as well, but it gets the job done.  You can omit the list of packages
and `knitr::write_bib` will do all the packages you have loaded.
