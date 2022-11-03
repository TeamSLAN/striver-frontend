// all requests/responses to backend are in JSON format

const remote = "https://striver.nighthawkcodescrums.gq";
// const remote = "http://127.0.0.1:5000";

// references to HTML elements on the page
const quote = document.getElementById("quote");
const quoteAuthor = document.getElementById("quoteAuthor");
const likes = document.getElementById("likeCount");
const dislikes = document.getElementById("dislikeCount");
const commentList = document.getElementById("commentList");
const commentName = document.getElementById("commentName");
const commentText = document.getElementById("commentText");
let currentQuoteID = -1;

// send POST request to backend with:
//   - current quote id
// get back:
//   - total likes on quote
const incrementLikes = async () => {
    if (currentQuoteID === -1) return;
    const { likes: count } = await fetch(remote + "/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: currentQuoteID }),
    }).then((r) => r.json());
    likes.innerHTML = `${count}`;
};

const incrementDislikes = async () => {
    if (currentQuoteID === -1) return;
    const { dislikes: count } = await fetch(remote + "/dislike", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: currentQuoteID }),
    }).then((r) => r.json());
    dislikes.innerHTML = `${count}`;
};

// given a list of comments, add them to the page with
//   - comment author
//   - comment text
//   - like/dislike buttons with the current count
const setComments = async (comments) => {
    commentList.innerHTML = "";
    Object.entries(comments).forEach(([uuid, comment]) => {
        const el = document.createElement("div");
        el.innerHTML = `<h4>${comment["name"]}</h4>\n`;
        el.innerHTML += `<p>${comment["message"]}</p>\n`;
        el.innerHTML += `
                        <button type="button" class="btn btn-success" onclick="likeComment(event)" id="${uuid}">
                            <span id="comment-${uuid}-likes">${comment["likes"]}</span>
                            <i class="bi bi-hand-thumbs-up-fill"></i>
                        </button>\n`;
        el.innerHTML += `
                        <button type="button" class="btn btn-danger" onclick="dislikeComment(event)" id="${uuid}">
                            <span id="comment-${uuid}-dislikes">${comment["dislikes"]}</span>
                            <i class="bi bi-hand-thumbs-down-fill"></i>
                        </button>`;
        el.className = "mt-3 mb-1";

        commentList.appendChild(el);
    });
};

// send GET request to backend to get the quote
// update page to display new quote, quote author, likes/dislikes, comments
const getQuote = async () => {
    const res = await fetch(
        remote + "/quote?" + new URLSearchParams({ prev: currentQuoteID })
    ).then((r) => r.json());
    currentQuoteID = Number.parseInt(Object.keys(res)[0]);
    const currentQuote = res[currentQuoteID];

    likes.innerHTML = `${currentQuote["likes"]}`;
    dislikes.innerHTML = `${currentQuote["dislikes"]}`;

    const [msg, author] = currentQuote["quote"].split("—").map((i) => i.trim());
    quote.innerHTML = msg;
    quoteAuthor.innerHTML = author;

    setComments(currentQuote["comments"]);
};

// send POST request to backend to submit comment with:
//   - id: current quote id
//   - name: author of quote
//   - message: comment message
const submitComment = async () => {
    if (currentQuoteID === -1) return;
    const { comments } = await fetch(remote + "/addComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: currentQuoteID,
            name: commentName.value,
            message: commentText.value,
        }),
    }).then((r) => r.json());
    setComments(comments);
};

// send POST request to backend to like a comment with:
//    - quote id
//    - comment id
const likeComment = async (e) => {
    const commentId = e.currentTarget.id;
    const { likes: count } = await fetch(remote + "/likeComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            quote_id: currentQuoteID,
            comment_id: commentId,
        }),
    }).then((r) => r.json());

    document.getElementById(`comment-${commentId}-likes`).innerHTML = count;
};

const dislikeComment = async (e) => {
    const commentId = e.currentTarget.id;
    const { likes: count } = await fetch(remote + "/dislikeComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            quote_id: currentQuoteID,
            comment_id: commentId,
        }),
    }).then((r) => r.json());

    document.getElementById(`comment-${commentId}-dislikes`).innerHTML = count;
};
