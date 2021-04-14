+++
date = "2021-04-14T16:45:35-04:00"
publishdate = "2021-04-14"
title = "Remote emacs+Julia workflow"
+++

In my role at [Beacon](https://beacon.bio), I spend most of my working day
interacting with Julia on a remote machine, and I wanted to document the
workflow that I've settled on.  The very short version is that emacs/TRAMP,
[emacs-jupyter](), and [IJulia]() together provide a pretty smooth---but not
perfect---experience.

<!--more-->

My main criteria are
1. Support interactive workflows in Julia
2. Can display rich output inline (super important for exploratory plotting)
3. Operates over an SSH connection
4. Persistent sessions that survive network hiccups
5. Emacs-based, because my brain was ruined in my first CS classes and I can't
   use anything else at this point

## Emacs/TRAMP mode

TRAMP mode is wonderful in that it mostly Just Works™ and allows you to pretend
you're interacting with the remote host as if it's local.  To activate TRAMP
mode you type `C-x C-f` to open a file (like usual), and then type
`/ssh:<hostname>:` and hit Enter.  Assuming you've set up SSH keys for the
remote host, this should open an SSH connection behind the scenes and then show
the remote filesystem in the normal file picker interface.

Any files you open can be edited exactly as if they're on the local host, and
any changes are sent (in a compressed form) over SSH when you save as usual with
`C-x C-s`.

One nice thing is that TRAMP mode is _sticky_, in the sense that if you're in a
buffer visiting a remote file, when you hit `C-x C-f` to open another file it
starts you in the directory on remote host.  So once I've opened one file it's
pretty seamless.

### Tips for working with TRAMP mode


Sometimes things go sideways for reasons that are completely mysterious to me,
and when that happens I do a "superstitious reset" with `M-x
tramp-cleanup-all-connections` which clears the connections cache.

To break out of the sticky find-file mode, type `/~ <Enter>` to reset to the
local host home directory, or `/ <Enter>` for root.  However, with
[swiper/counsel](https://github.com/abo-abo/swiper), I found that didn't work,
and you need to use `/ C-j` (which in normal circumstances is equivalent to
`<Enter>`, but I guess counsel hijacks that somehow)

Most of the emacs packages you use Just Work™ under TRAMP mode, including [magit
(my absolute favorite git interface)](https://magit.vc/).  However, beware of
magit operations that assume you can roundtrip many small files without
significant latency (e.g., when rebasing a large number of commits).

## `emacs-jupyter` and IJulia

Interacting with Julia is a bit trickier.  I've been using
[`emacs-jupyter`](https://github.com/nnicandro/emacs-jupyter/) with pretty good
results for a while now, and like many things it does Just Work™ with tramp (if
you `M-x run-jupyter-repl` in a remote buffer, it'll launch a kernel on that
remote machine).  However, if you do that then when the connection drops, the
kernel dies, which is not ideal.

Instead, I've settled on using the "server" mode, where you run a jupyter server
on the remote host and connect to it over a forwarded port.  Here are the steps
for that:

1. On the remote host, install jupyter and run `jupyter notebook`.  If you're
   only going to interact with Julia, I prefer to do this directly in Julia via
   something like 
   
   ```julia 
   using Pkg
   Pkg.add("IJulia")
   using IJulia
   IJulia.notebook()
   ```
   
   Make sure you run this in a way that can survive a dropped connection (so in
   [screen](https://www.gnu.org/software/screen/),
   [tmux](https://github.com/tmux/tmux/wiki), etc.), otherwise you'll defeat the
   whole point of this exercise :)
   
2. Forward a port on your localhost to the remote host over SSH (assuming you
   don't want to or can't expose the jupyter port on your remote host):
   
   ```bash
   $ ssh -L 8888:localhost:8888 <hostname>
   ```

3. In emacs, start a new kernel with `M-x jupyter-run-server-repl`.  This will
   start the kernel on the remote server and create an `emacs-jupyter` REPL
   buffer, and associate it with the current buffer if you're visiting a buffer
   in `julia-mode`.  Now `C-c C-z` will switch point to the associated REPL
   buffer (raising it if it's not currently displayed), and `C-c C-c` will send
   code in the current region for eval (defaults to the current line if no
   region is active).

4. To connect a buffer visiting a `.jl` file to a running kernel (say, in a
   new emacs session), then you can `M-x jupyter-connect-server-repl`.

5. To associate a buffer with a REPL buffer that's already connected to a
   kernel, use `M-x jupyter-repl-associate-buffer`.

I prefer using `emacs-jupyter` over a direct REPL connection especially for
interacting with a remote host because it displays (some) rich output directly
in the REPL buffer (PNG and SVG images chief among them).  It's also nice to
have workspace-aware tab-completion like you get in an actual jupyter
notebook (with `M-TAB`).

### Tips

There was for some time a [pretty nasty font-locking bug in
`emacs-jupyter`](https://github.com/nnicandro/emacs-jupyter/issues/219)
triggered by sending long-ish chunks of text to the REPL.  It's been [fixed at
least on trunk](https://github.com/nnicandro/emacs-jupyter/pull/308) but it
doesn't look like it's made it into a release yet, so make sure you're getting a
version since that PR landed.

You can have multiple REPL buffers in a single emacs session

There isn't necessarily a 1-1 relationship between REPL _buffers_ and running
_kernels_ on the remote server: there may be kernels with no REPL buffer
connected to them, and there can be multiple buffers connected to the same
kernel.

There's a difference between _connecting_ to a kernel and _associating_ a buffer
with a REPL.  If you already have a REPL buffer connected to a kernel and you
just want to interact with it from another `.jl` buffer, you want to `M-x
jupyter-repl-associate-buffer`.  If you have a running kernel on the remote host
but not REPL buffer locally, you want to `M-x jupyter-connect-server-repl`.  If
you do this and already have a local REPL buffer, than I _think_ that it'll
(confusingly) create a _new_ buffer connected to the same kernel.

I prefer to keep the associated REPL buffer open because if it's not,
`emacs-jupyter` will open a million new buffers to display `STDOUT`, `STDERR`,
and anything that's `display`ed, in seemingly random locations.  There's
probably a way to turn this off but I'm too lazy to dig into it.

Sometimes things interrupt the connection in a way that `emacs-jupyter` has a
hard time recovering from.  When this happens, I find that it's best to kill the
port-forwarding connection to the server, which causes `emacs-jupyter` to detect
that the websocket connection is closed and clean up after itself.  Then, you
can re-connect the port forwarding SSH connection and everything should pick up
where it left off.

