+++
date = "2019-04-25T10:35:26-04:00"
publishdate = ""
draft = true
title = "Kl Guessing Game"
+++

Intuitions for KL divergence for continuous distributions: play a guessing game,
trying to locate a particular point on a number line.  Partner knows the real
location but they can only provide binary "clues".  You have to agree ahead of
time on the meaning of the clues.

You can use as many clues as you'd like before you guess, but you're penalized
each one.  The goal is to guess as close as possible to the actual location.

What's a good strategy?

Intuitively, a good starting point is to divide up the number line into regions
of equal probability.[^maxent]  This is a good strategy because if you move one
of the boundaries then you end up with one big region, where you're both more
likely to get a point to guess *and* more likely to make a big error.

What about when the probability of locations to guess isn't flat?  Instead of
dividing up the line equally...equal probability regions.  (again max ent)

okay what happens if you're WRONG about the distribution that the locations to
be guessed are drawn from?



[^maxent]: The intuition comes from the fact that if you have $n$ bits of
    channel capacity, you want the entropy of your code to be $n$ bits too.
    That is, you want the code word you get at the other end of the channel to
    be maximally unpredictable, since if you can predict the code word without
    observing the input itself then you've lost some information.
