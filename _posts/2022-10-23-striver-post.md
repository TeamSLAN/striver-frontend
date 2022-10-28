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
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: currentQuoteID }),
        }).then((r) => r.json());
        likes.innerHTML = `${count} likes`;
    };

// incrementdislies function
    const incrementDislikes = async () => {
        if (currentQuoteID === -1) return;
        const { dislikes: count } = await fetch(remote + "/dislike", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: currentQuoteID }),
        }).then((r) => r.json());
        dislikes.innerHTML = `${count} dislikes`;
    };

// get quote function
    const getQuote = async () => {
        const res = await fetch(remote + "/quote").then((r) => r.json());
        currentQuoteID = Number.parseInt(Object.keys(res)[0]);
        const currentQuote = res[currentQuoteID];

        likes.innerHTML = `${currentQuote["likes"]} likes`;
        dislikes.innerHTML = `${currentQuote["dislikes"]} likes`;
        quote.innerHTML = currentQuote["quote"];
    };
</script>
