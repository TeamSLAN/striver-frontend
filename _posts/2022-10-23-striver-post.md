---
toc: true
layout: post
description: Striver post
categories: [markdown]
title: Striver App
author: Kalani Cabral-Omana
show_tags: true
comments: true
---

## Quote

<button onclick="getQuote()">Get new quote</button> 
<!-- runs getQuote function -->

<p id="quote"></p>
<!-- quote displayed here -->

<button type="button" onclick="incrementLikes()">Like</button>
<!-- runs incrementLikes function -->

<p id="likeCount">N/A</p>
<!-- displays like count -->

<button type="button" onclick="incrementDislikes()">Dislike</button>
<!-- runs incrementdislikes function -->

<p id="dislikeCount">N/A</p>
<!-- dislays like count -->

<script>
    const remote = "https://striver.nighthawkcodescrums.gq";
    // link to api
    const quote = document.getElementById("quote");
    // defines the quote id
    const likes = document.getElementById("likeCount");
    // defines the likecount id
    const dislikes = document.getElementById("dislikeCount");
    // defines the dislikecount id
    let currentQuoteID = -1;
    // variable to store the id of the quote

// incrementlikes fucntion
    const incrementLikes = async () => {
        if (currentQuoteID === -1) return;
        const { likes: count } = await fetch(remote + "/like", {
            // /like is the endpoint which runs incrementlikes function in the backend
            method: "POST",
            // sends the QuoteID to the backend and the backend send the numebr of lieks (sends and recieves)
            headers: { "Content-Type": "application/json" },
            // tells backend that it will send json
            body: JSON.stringify({ id: currentQuoteID }),
            // converts QuoteID to json
        }).then((r) => r.json());
        likes.innerHTML = `${count} likes`;
        // sets the lieks id as the most recent amount of likes
    };

// incrementdislies function
    const incrementDislikes = async () => {
        if (currentQuoteID === -1) return;
        const { dislikes: count } = await fetch(remote + "/dislike", {
            // /dislike is the endpoint which runs incrementlikes function in the backend
            method: "POST",
            // sends the QuoteID to the backend and the backend send the numebr of lieks (sends and recieve)
            headers: { "Content-Type": "application/json" },
            // tells backend that it will send json
            body: JSON.stringify({ id: currentQuoteID }),
            // converts QuoteID to json
        }).then((r) => r.json());
        dislikes.innerHTML = `${count} dislikes`;
        // sets the dislieks id as the most recent amount of dislikes
    };

// getQuote function
    const getQuote = async () => {
        const res = await fetch(remote + "/quote").then((r) => r.json());
        // gets the quote
        currentQuoteID = Number.parseInt(Object.keys(res)[0]);
        // gets the QuoteID to be used for incrementing the likes and dislikes
        const currentQuote = res[currentQuoteID];
        // retrieves the information of the quote (likes, dislikes)

        likes.innerHTML = `${currentQuote["likes"]} likes`;
        // sets the likes on the page
        dislikes.innerHTML = `${currentQuote["dislikes"]} likes`;
        // sets the dislikes on the page
        quote.innerHTML = currentQuote["quote"];
        // sets the quote on the page
    };

    const get
</script>