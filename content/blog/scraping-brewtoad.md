+++
date = "2018-12-21T11:30:18-05:00"
publishdate = "2018-12-21"
draft = false
title = "Web scraping with Julia"
+++

One of my grad school procrastination projects was learning how to brew beer.  I
started off using a website called Hopville to keep track of the recipes I
brewed, until they were acquired in 2013 by Brewtoad.  Both sites provided a
really convenient way to play around with recipe ideas, learn from others, and
keep track of how each step of each brew went which was really helpful as a
beginner.

Now, just five years later, Brewtoad is shutting down.[^ask-for-money] With no
way to easily grab an archive of the dozens of recipes and brew logs I've saved
on the site, and no public API.[^xml]  So, the only remaining option is to go
through and download the HTML for each page, one-by-one.  I _could_ do that
myself but I ~~don't have time for that~~ think that's a task more appropriate
for a computer.  So I wrote a [Julia
script](https://github.com/kleinschmidt/brewtoad-scrape.jl) to scrape a user's
recipes and brew logs.

<!--more-->

One neat thing was that the sluggish brewtoad servers---never particularly
snappy and now positively groaning under the weight of desperate users
appending `.xml` to the ends of their recipes one by one before they're gone
forever on December 31---provide the perfect use case for `@async`:

```julia
function main(userid)
    recipes = recipe_links(userid)
    # wait for all recipes to finish processing before return
    @sync begin
        for recipe in recipes
            # fetch and process each recipe asynchronously
            @async process_recipe(recipe)
        end
    end
end
```

I was sure that this was too easy to work the first time but lo, no problems.
The only fiddly bit is remembering to enclose all the `@async` calls in a
`@sync begin ... end` block but I'd seen enough examples with that pattern to
know what to do.

The library I used for HTML parsing was
[Gumbo.jl](https://github.com/JuliaWeb/Gumbo.jl), which wraps Google's Gumbo.
This worked great for my purposes, but does not include any functionality for
extracting desired elements from the result.  If you look at my script you can
see at least three different and rather clumsy ways I tried to roll my own
selector queries:

1. A `for` loop with lots of `if`/`else`

    ```julia
    for node in PreOrderDFS(page.root)
        node isa HTMLElement{:a} || continue
        class = get(attrs(node), "class", "")
        if class == "recipe-link"
            link = attrs(node)["href"]
            push!(recipelinks, link)
            println(link)
        elseif class == "next_page"
            push!(pages, baseurl * attrs(node)["href"])
            println("Next page: ", attrs(node)["href"])
        end
    end
    ```
 
2. [`Iterators.filter`](https://docs.julialang.org/en/v1/base/iterators/index.html#Base.Iterators.filter)

    ```julia
    title = Iterators.filter(n -> n isa HTMLText && 
                                 n.parent isa HTMLElement{:h1},
                             PreOrderDFS(recipe.root))
    ```

3. a [list
   comprehension](https://docs.julialang.org/en/v1/manual/arrays/#Comprehensions-1).
   with an `if` clause

    ```julia
    brewlog_links = 
        [attrs(n)["href"]
         for n
         in PreOrderDFS(brewlogs.root)
         if n isa HTMLElement{:a} && 
             occursin(r"brew-logs/", get(attrs(n), "href", ""))]
    ```

I'm not aesthetically thrilled with any of these but they all get the job done.
If I get a chance I'll go back and re-write it with
[Cascadia.jl](https://github.com/Algocircle/Cascadia.jl),[^cascadia] which I
didn't see until after I'd basically written the script but _does_ provide a
convenient way to query the parsed HTML.

Finally, at some point requests to brewtoad.com from HTTP.jl started to return
`403: Forbidden`, even while requests from a browser or even `curl` worked
fine.  So I had to use run `curl` for each request instead of using HTTP.jl just
to finish downloading my own goddamn data.

If you, too, want to save your recipes and logs from oblivion, here's how:

```bash
$ git clone https://github.com/kleinschmidt/brewtoad-scrape.jl.git

$ cd brewtoad-scrape.jl

$ julia --project=. -e "using Pkg; Pkg.instantiate()"

$ julia --project=. scrape.jl <userid>
```

[^ask-for-money]: Probably has something to do with the fact that I've never
    given them any money and my sweet sweet content is sufficiently monetizable
    to run a sustainable business.  Of course they never _asked_ for any money,
    or made it clear in any way that they were in danger of shutting down.  If
    they had I would likely have paid a few bucks a month and I suspect many
    others would too.

[^xml]: Their official suggestion is to "append `.xml` after your recipe URL to
    download a [BeerXML](https://en.wikipedia.org/wiki/BeerXML) file".  There's
    no such export option for the brew logs though, which are at least as
    important to me.

[^cascadia]: "Inspired by, and mostly a direct translation of, the
    [Cascadia](https://github.com/andybalholm/cascadia) CSS Selector library,
    written in [Go](https://golang.org/), by
    [@andybalhom](https://github.com/andybalholm)."

