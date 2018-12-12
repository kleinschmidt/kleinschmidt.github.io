+++
date = "2018-12-11T15:55:18-05:00"
publishdate = "2018-12-12"
draft = true
title = "Cite your code!"
+++

TL;DR: **cite the code you use in your research!**

In lab meeting the other day someone asked what the major R packages for
analyzing psycholinguistic data are, and I had a hard time thinking of
any.[^ignorance] That made me think about _why_ software is such a small part of
our scholarly output.  Part of the reason might simply be that there's not
enough overlap in the specific kinds of analyses we do to justify creating brand
new packages, rather than using domain-general tools (like the
[tidyverse](https://tidyverse.org)).

[^ignorance]: Of course, that could just be my own ignorance.  If I've missed an
    R package that you find really useful in your psycholingustics etc. research
    please let me know and I'll post an update!

But I think there may be a deeper explanation: it's _hard_ to write good, useful
software, and academia does not reward that particular kind of hard work.
<!--more--> Designing, implementing, and maintaining software packages is
difficulty at best and downright consuming at worst.  Being involved with
developing and maintaining some of the
[JuliaStats](https://github.com/JuliaStats) packages has shown me how much work
and energy goes into just providing support to users and keeping things from
breaking as the language changes and other packages are updated.  And, if I'm
being honest, the packages of my own research code that I've released
([`beliefupdatr`](https://github.com/kleinschmidt/beliefupdatr) and
[`phondisttools`](https://github.com/kleinschmidt/phondisttools)) are not
particularly well-crafted.  I basically pushed them out the door when I
submitted the papers behind them in the spirit of openness and the hope that
they might be useful to someone else.  And I think they have been!  But they
could be so much _better_---more flexible, ergonomic, intuitive,
integrated---and if they were I suspect their utility would be much greater.  Of
course, I fix problems, bugs, and incompatibilities with new versions of R as
they come up, but I barely have time for that.  Making a
[package](https://github.com/JuliaCI/BenchmarkTools.jl)
[that](https://github.com/timholy/Revise.jl)
[is](https://github.com/JuliaPlots/Plots.jl)
[truly](https://github.com/tidyverse/dplyr)
[useful](https://github.com/tidyverse/ggplot2) to other people requires a huge
amount of careful, laborious work to design and implement.

As an academic---especially those at the junior professor stage, as I am
now---you are constantly faced with competing demands on your time and energy.
A major consideration is whether investing time in some activity will lead to
more of the gold stars which allow you to advance in your career.  Right now, in
my field, those gold stars are **citations**, and (at least if the conventional
wisdom is to be believed) any activity that does not lead to more gold stars
(citations) is, essentially, a leisure activity.  Absent any change in
incentives and from a purely careerist perspective (which I don't necessarily
endorse), it's not worth it to me to spend the time to develop useful software.
So, what do we get?  A lot of cobbled-together one-off scripts and notebooks,
useful only for the project at hand, guided by oral tradition/lab culture, and
(hopefully) dumped on the internet in a well-intentioned attempt at openness.

Which brings me the take-home message of this post: **cite the software you
use**.  This is _especially_ important if that software is open-source software.
Citing software is important for a lot of reasons, not least of which is that it
feels _good_ to see your software acknowledged as useful in such a public forum,
and developing open source software can often feel like a [thankless
slog](https://nolanlawson.com/2017/03/05/what-it-feels-like-to-be-an-open-source-maintainer/).
But there are two reasons I want to highlight here.  First, you're rewarding the
people who write and maintain that software, in a way that for your fellow
academics will _directly_ help them get a job, tenure, or a promotion.  Second,
by citing software you treat it just like any other piece of intellectual labor
you're building on to do your work, and in doing so you normalize the idea that
good software _is_ useful intellectual labor which should be valued and
encouraged by the academy.

Of course, not all code you write is _software_, in the sense of a product
that's usable by a third party for a task that may be very different than you
originally intended.  But my hunch is that there's a lot of very useful software
hiding out there in bits of one-off research code,[^julia] and that if we rewarded
academics _at all_ for doing the work to take that one-off code over the top to
being useful software we'd collectively save ourselves a lot of
wheel-reinventing.  So, if you use software, cite it.  If you're using an
`R` package, you can get a citation with `citation`:

[^julia]: There's a running joke in the Julia language community that most Julia
    code is written by procrastinating PhD students.

```{r}
citation('rmarkdown')
```

```text
To cite package ‘rmarkdown’ in publications use:

  JJ Allaire, Yihui Xie, Jonathan McPherson, Javier Luraschi, 
  Kevin Ushey, Aron Atkins, Hadley Wickham, Joe Cheng and Winston
  Chang (2018). rmarkdown: Dynamic Documents for R. R package
  version 1.10. https://CRAN.R-project.org/package=rmarkdown

A BibTeX entry for LaTeX users is

  @Manual{,
    title = {rmarkdown: Dynamic Documents for R},
    author = {JJ Allaire and Yihui Xie and Jonathan McPherson and 
      Javier Luraschi and Kevin Ushey and Aron Atkins and Hadley
      Wickham and Joe Cheng and Winston Chang},
    year = {2018},
    note = {R package version 1.10},
    url = {https://CRAN.R-project.org/package=rmarkdown},
  }

```

Finally, I should be clear that I've been remiss in citing the software I use.
I'm trying to do better but it's hard to form new citation habits!
