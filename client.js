
let myApp = Vue.createApp({
    data() {
        return {
            posts: [],
            title: [],
            body: [],
            waitingOnPost: false
        }

    },
    methods: {
        listResources() {
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then((response) => response.json())
                .then((json) => this.posts = json);
        },
        createResource() {
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: this.title,
                    body: this.body,
                    userId: 1,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => {
                    if (response.ok) return response.json();
                    else throw new Error("status" + response.status);
                })
                .finally(() => {
                    this.waitingOnPost = false;
                })
                .then((json) => this.posts.push(json));
            this.waitingOnPost = true;
        },
        updateResource(postId) {
            console.log(postId);
            fetch('https://jsonplaceholder.typicode.com/posts/' + postId, {
                method: 'PUT',
                body: JSON.stringify({
                    id: postId,
                    title: 'foo',
                    body: 'bar',
                    userId: 1,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => {
                    if (response.ok) return response.json();
                    else throw new Error("status" + response.status);
                })
                .then((json) => {
                    let i = this.posts.findIndex(post => post.id == json.id); //finds the index where the array element's id matches json.id
                    if (i == -1) throw new Error("Couldn't find post index " + i);
                    this.posts[i] = json;
                });
        },
        patchResource(postId) {
            fetch('https://jsonplaceholder.typicode.com/posts/' + postId, {
                method: 'PATCH',
                body: JSON.stringify({
                    title: 'foo',
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => {
                    if (response.ok) return response.json();
                    else throw new Error("status" + response.status);
                })
                .then((json) => {
                    let i = this.posts.findIndex(post => post.id == json.id); //finds the index where the array element's id matches json.id
                    if (i == -1) throw new Error("Couldn't find post index " + i);
                    this.posts[i] = json;
                });
        },
        deletePost(postId) {
            fetch('https://jsonplaceholder.typicode.com/posts/' + postId, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (response.ok) return response.json();
                    else throw new Error("status" + response.status);
                })
                .then((json) => {
                    let i = this.posts.findIndex(post => post.id == postId); //finds the index where the array element's id matches json.id
                    if (i == -1) throw new Error("Couldn't find post index " + i);
                    this.posts.splice(i, 1);
                });
        }
    }
}).mount("#app");