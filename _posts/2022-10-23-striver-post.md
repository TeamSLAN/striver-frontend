---
toc: true
layout: post
description: Striver post
categories: [markdown, Week 0]
title: Striver App
author: Kalani Cabral-Omana
show_tags: true
comments: true
---

## Quote

<button onclick="getQuote()">Get new quote</button>

<p id="quote"></p>

<button type="button" onclick="incrementLikes()">Like</button>

<p id="likeCount">N/A</p>

<button type="button" onclick="incrementDislikes()">Dislike</button>

<p id="dislikeCount">N/A</p>

<script>
    const remote = "https://striver.nighthawkcodescrums.gq";
    const quote = document.getElementById("quote");
    const likes = document.getElementById("likeCount");
    const dislikes = document.getElementById("dislikeCount");
    let currentQuoteID = -1;

    const incrementLikes = async () => {
        if (currentQuoteID === -1) return;
        const { likes: count } = await fetch(remote + "/like", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: currentQuoteID }),
        }).then((r) => r.json());
        likes.innerHTML = `${count} likes`;
    };

    const incrementDislikes = async () => {
        if (currentQuoteID === -1) return;
        const { dislikes: count } = await fetch(remote + "/dislike", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: currentQuoteID }),
        }).then((r) => r.json());
        dislikes.innerHTML = `${count} dislikes`;
    };

    const getQuote = async () => {
        const res = await fetch(remote + "/quote").then((r) => r.json());
        currentQuoteID = Number.parseInt(Object.keys(res)[0]);
        const currentQuote = res[currentQuoteID];

        likes.innerHTML = `${currentQuote["likes"]} likes`;
        dislikes.innerHTML = `${currentQuote["dislikes"]} likes`;
        quote.innerHTML = currentQuote["quote"];
    };
</script>
