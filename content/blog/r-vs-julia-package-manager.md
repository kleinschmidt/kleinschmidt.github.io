+++
date = "2019-06-06T15:06:56-04:00"
publishdate = ""
draft = true
title = "R vs. Julia: Package Manager"
+++

Managing packages for different projects is a major pain point in any language.
It's also critical since most of the power of languages like R, Julia, and
Python come from the package ecosystems that have grown up around them.

Interacts in a potentially bad way with literate programming: using
RMarkdown/Weave.jl for writing manuscripts.  Ideally by bundling code and text
together you can provide a portable package that allows anyone to reproduce your
analyses and figures.  But ultimately your work is going to depend on external
packages, and in order to guarantee that your analyses can be reproduced, you
need some way of ensuring that your recipient has compatible versions of the
required packages installed.

As all collaborative coding problems, this is true even (especially) when that
recipient is "future-you".

My standard workflow for R used to be something like

1. Install packages as needed into my local library with `install.packages` or
   `devtools::install_*`.
2. Update packages by re-installing when I encounter bugs that have been fixed
   in later versions
   
This is a *bad workflow* for a number of reasons.  First, because all packages
are installed into the global library, all my scripts, RMarkdown documents, and
other R code has to be compatible with the _same_ versions of _every_ package
they use.  This isn't a problem when you're actively working on a single project
and can update your script to keep up with changes in packges, but it becomes a
problem when you put something away for a few weeks or months and then have to
come back and continue work (an extremely common situation for academic papers
which can easily take a month or more in review, and then require updates to the
analyses when the reviews come back).
