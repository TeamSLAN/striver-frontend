const remote = "https://striver.nighthawkcodescrums.gq";
// const remote = "http://127.0.0.1:5000";

const newPostName = document.getElementById("commentName");
const newPostContent = document.getElementById("commentText");
const postList = document.getElementById("postList");

const createPostDOM = (uuid, { goal, name, smileys, thumbs, heart }) => {
    const div = document.createElement("div");
    const header = document.createElement("h2");
    const goalText = document.createElement("p");

    const smileyButton = document.createElement("div");
    const thumbButton = document.createElement("div");
    const heartButton = document.createElement("div");

    header.innerText = name;
    goalText.innerText = goal;
    [
        [smileyButton, "emoji-smile-fill", smileys, "smileys"],
        [thumbButton, "hand-thumbs-up-fill", thumbs, "thumbs"],
        [heartButton, "heart-fill", heart, "heart"],
    ].forEach(([ref, icon, count, reactionName]) => {
        ref.style.display = "inline";
        ref.innerHTML = `
        <button type="button" class="btn btn-secondary" onclick="sendReaction(event, '${reactionName}')" id="${uuid}">
            <span id="rxn-${uuid}-${reactionName}">${count}</span>
            <i class="bi bi-${icon}"></i>
        </button>
        `;
    });

    div.className = "border rounded p-3 mb-4";
    div.append(header);
    div.append(goalText);
    div.append(smileyButton);
    div.append(thumbButton);
    div.append(heartButton);

    return div;
};

const setPosts = (posts) => {
    postList.innerHTML = "";
    Object.entries(posts).forEach(([id, post]) => {
        postList.appendChild(createPostDOM(id, post));
    });
};

const submitPost = async () => {
    if (!newPostName.value || !newPostContent.value) {
        return;
    }

    const goals = await fetch(remote + "/addgoal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: newPostName.value,
            goal: newPostContent.value,
        }),
    }).then((r) => r.json());

    setPosts(goals);
};

const sendReaction = async (e, reaction) => {
    const ref = e.currentTarget;
    const postId = ref.id;

    const res = await fetch(remote + "/react", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            goal_id: postId,
            reaction,
        }),
    }).then((r) => r.json());

    document.getElementById(`rxn-${postId}-${reaction}`).innerHTML =
        res[reaction];
};

const getPosts = async () => {
    const goals = await fetch(remote + "/getgoal").then((r) => r.json());
    setPosts(goals);
};

getPosts();
