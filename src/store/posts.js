export default {
  namespaced: true,
  state: {
    posts: [
      {
        id: 1642310453443,
        title: 'Lorem Ipsum',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut justo tellus.',
        latLng: {lat: 35.89572525865906, lng: -78.93402099609376}
      }
    ],
  },
  mutations: {
    addPost(state, postData) {
      postData.id = Date.now();
      state.posts.push(postData);
      console.log(state.posts);
    },
    clearAll(state) {
      state.posts = [];
    },
    deletePost(state, postId) {
      const postIndex = state.posts.findIndex(post => post.id === postId);
      if (postIndex > -1) {
        state.posts[postIndex].splice
      }
    }
  },
}