+++
date = "2018-10-12T16:16:22-04:00"
publishdate = ""
draft = true
title = "Hello World"
+++

Why a blog?  Because [Hugo](https://gohugo.io) makes it really easy and why not.

<!--more-->

## Some history

As with the rest of the site, the source is in a [Github
repository](https://github.com/kleinschmidt/kleinschmidt.github.io) repository.
If you look back in the history, you'll see that this site was
[originally](https://github.com/kleinschmidt/kleinschmidt.github.io/tree/4424a5510ec06a601e9a7b49563337ef03e10265)
just a bunch of HTML files with something like a common structure and some
hacked together CSS.

At some point I moved it from our department's FTP server to [Github
pages](https://pages.github.com/), which natively supports Jekyll.  Jekyll also
had the distinct advantage of preferring sites that are mostly HTML with some
template logic mixed in, so that made it pretty painless to add some smarts to
the site without rewriting all my lovingly hand-crafted HTML.



Eventually, I ~~got bored~~ ~~finished my PhD and had a ton of time on my
hands~~ was procrastinating and decided it was time to refresh the site.  I
decided to look at Hugo because it was the new hotness and because it's powered
by Go templates which provide a lot of power.  I wanted to do things like
generate a nicely formatted [list of papers](/work/) on the fly.  I also at that
point was sick of writing HTML by hand so 


The downside of Hugo is that it's not natively supported on Github pages, but
needs to be run to generate the HTML files that actually get hosted.  If I
didn't know any better, I would have to just do this manually and commit all the
generated HTML before updating the Github repository.  But fortunately, since
becoming more involved with open source projects I've learned a bit more about
continuous integration.  So I was able (with some thrashing about) to figure out
how to automatically render and deployed the site with
[Travis](https://travis-ci.org/kleinschmidt/kleinschmidt.github.io).


