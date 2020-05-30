+++
date = "2020-05-29T16:45:01-04:00"
publishdate = ""
draft = true
title = "What do we mean when we say Julia is fast?"
+++

One of the main selling points of the Julia language is that it's "fast".  I
think many people hear this and think that any code they write in Julia will be
fast, but that's not really what that means.  A better way of putting it
is that the _language_ is _not necessarily slow_.

Of course, in any given langauge it's _possible_ to write slow code (just throw a
bunch of `sleep(1000)` in and see what happens).  But in any given language it's
not always possible to write fast code for certain problems/patterns.

I come from a backround where I mostly wrote R/Matlab code.  In both of these
languages, doing the same thing repeatedly is fast, but only as long as you can
stick it into a vector and use a "vectorized" function.  If you do the same
operation using a `for` loop, it's much slower.  When I was learning Matlab in
college I was talking to a friend about how cool and magical vectorization
seemed: you get orders-of-magnitude better performance by putting stuff in
vectors/matrices and operating on those, instead of iterating through with a
`for` loop.  My friend, who unlike me had taken some classes with C++ in high
school, pointed out that there has to be a `for` loop happening somewhere.
This, somewhat embarassingly, blew my mind at the time and remained mysterious
to me for a long time.

Eventually, gradually, I started to understand why: the things you can do in R
or Matlab that are fast are fast because they aren't written in R or Matlab:
they're written in a "fast language" like C/C++/fortran.  The R/Matlab
operations are essentially just convenient interfaces to the "fast language".
