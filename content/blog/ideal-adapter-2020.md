+++
date = "2020-05-26T14:02:14-04:00"
publishdate = ""
draft = true
title = "Ideal Adapter 2020"
+++

hindsight, things I'm thinking differently about now.  mostly motivated by
Friston et al. (2020, Hearing Research) and @Olasagasti2018...

First talks about ideal adapter as learning a separate generative model for each
talker.  I don't think that's quite right.  rather, we're talking about how you
always have to infer generative model parameters for teh current context, which
is a very similar claim that they're making (have a prior on formant/speaker
properties).  I think there may be something to the difference between treating
it as a hierarchical model (us) vs. not (them) but I'm not sure.

Second focuses almost exclusively on the belief updating part of the model and
ignores the whole second part of the paper where we talk about how the learning
rate changes based on the prior - weak prior means fast learning and
vice-versa.

But in both cases there's something about what makes a context, or how much teh
generative model is supposed to be stable within a context.  That's another part
of the generative model itself.  If you think that context parameters can vary
*within* a context then you should keep adapting.
