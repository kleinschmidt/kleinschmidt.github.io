+++
date = "2018-10-12T16:16:22-04:00"
publishdate = "2018-10-17T22:28:22-04:00"
draft = false
title = "Hello World"
+++

Why a blog?  Because why not.

Like the rest of this site, it's powered by [Hugo](https://gohugo.io), a static
site generator powered by Go templates.  The content of each page is written in
[markdown](https://daringfireball.net/projects/markdown/syntax), and rendered
into HTML by a series of hand-crafted templates and CSS.

<!--more-->

## Some history

These templates and CSS are an organic outgrowth of this site's past as a bunch
of HTML and CSS that I hacked together because someone told me I needed to have
a website when I was applying to grad school.[^gh-orig]

[^gh-orig]: The source for this site is [hosted on
    Github](https://github.com/kleinschmidt/kleinschmidt.github.io), so the
    morbidly curious can turn back time to
    [`4424a551`](https://github.com/kleinschmidt/kleinschmidt.github.io/tree/4424a5510ec06a601e9a7b49563337ef03e10265)
    and see for themselves

Because I ~~had abundant free time in grad school~~ love procrastinating, when I
moved the site from our department's FTP server to [Github
pages](https://pages.github.com/), I also refactored the site to generate some
of the repetitive boilerplate HTML using templates.  I chose Jekyll because it's
natively supported by Github pages (so not build step is required), and because
it's natural to write content for a Jekyll site directly in HTML which meant
there was no need to mess with my artisinal, handcrafted HTML
content.[^gh-jekyll]

[^gh-jekyll]: This process starts around
    [`230507b`](https://github.com/kleinschmidt/kleinschmidt.github.io/tree/230507b).

Eventually, I ~~finished my PhD and had a ton of time on my hands~~ was
procrastinating and decided it was time to properly refresh the site.[^gh-hugo]
I decided to look at Hugo because it was the new hotness and because it's
powered by Go templates which provide a lot of power.  I wanted to do things
like generate a nicely formatted [list of papers](/work/) from some
bibliographic data.  Hugo is also more opinionated about the content being in
markdown which is a position I was coming to appreciate more and more.  Markdown
is a great format for both reading and writing structured text, and I was
starting to get sick of editing HTML by hand whenever I wanted to update
something.

[^gh-hugo]: Starting at
    [`36508bf`](https://github.com/kleinschmidt/kleinschmidt.github.io/tree/36508bf),
    reaching something like a finished state around
    [`e94589d`](https://github.com/kleinschmidt/kleinschmidt.github.io/tree/e94589d).

The downside of Hugo is that it's not natively supported on Github pages, but
needs to be run to generate the HTML files that actually get hosted.  If I
didn't know any better, I would have to just do this manually and commit all the
generated HTML before updating the Github repository.  But fortunately, since
becoming more involved with open source projects I've learned a bit more about
continuous integration.  So I was able (with some thrashing about) to figure out
how to automatically render and deployed the site with
[Travis](https://travis-ci.org/kleinschmidt/kleinschmidt.github.io).  If you
yourself don't want to mess around with that, [Netlify](https://www.netlify.com)
provides a great hosting and CI service that includes Hugo, which makes it
much simpler to host a Hugo site.  I've used this for another site I made with
Hugo.

## Blogging with Hugo

Once Hugo was set up, adding a blog was straightforward: add templates for the
list of posts and a single post, and write posts as markdown files in
`content/blog/post-title.md`.

The first template is (`layouts/blog/single.html`), which renders the pages for
individual posts (like this one):

```go-html-template
{{ partial "header.html" . }}
<div id="content" class="blog">
    <h1 class="post-title">{{ .Title }}</h1>
    <div class="post-date" >
        {{ .PublishDate.Format "2 Jan 2006" }}
    </div>
    <div class="post" >
        {{ .Content }}
    </div>
</div>
{{ partial "footer.html" . }}
```

The other template is `layouts/blog/list.html`, which renders the list of posts
at [blog/](/blog)

```go-html-template
{{ partial "header.html" . }}
<div id="content">
    {{ .Content }}
    <div id="posts" >
        <ul class="posts" >
            {{ range .Pages }}
            <li>
                <a class="post-title" href="{{ .Permalink }}">
                    {{ .Title }}
                </a>
                <div class="post-date">
                    {{ .PublishDate.Format "2 Jan 2006" }}
                </div>
                <div class="post-summary">
                    {{ .Summary }}
                </div>
            </li>
            {{ end }}
        </ul>
    </div>
</div>
{{ partial "footer.html" . }}
```

The `nav.html` [partial template](https://gohugo.io/templates/partials/)
renders the navigation menu based on the list of pages automatically generated
by Hugo, so all that's needed to add the "blog" menu entry is a few lines in the
YAML metadata block in `/content/blog/_index.md`:

```markdown
---
title: "Blog"
menu: "main"
weight: 4
---
```

The final piece is a bit of convenience: the `archetypes/default.md` provides a
skeleton markdown file for a new post:

```go-text-template
+++
date = "{{ .Date }}"
publishdate = ""
draft = true
title = "{{ replace .Name "-" " " | title }}"
+++
```

which automatically populates some of the metadata to begin drafting:

```
➜ hugo new blog/a-wonderful-blog-post.md
content/blog/a-wonderful-blog-post.md created

➜ cat content/blog/a-wonderful-blog-post.md
+++
date = "2018-10-17T21:09:19-04:00"
publishdate = ""
draft = true
title = "A Wonderful Blog Post"
+++
```

## What

I'm planning to write about research/lab updates, progress on the JuliaStats
ecosystem (especially the [future of the `@formula`
language](https://github.com/JuliaStats/StatsModels.jl/pull/71) for specifying
and fitting statistical models from tabular data!), and more mundane personal
discoveries, frustrations, and victories while I get my lab going at Rutgers.
