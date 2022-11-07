import axios from "axios";

const config = {
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
};

const configMultipart = {
  headers: {
    "content-type": "multipart/form-data",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

const URL_API = "http://localhost:5000/api";

export const getPosts = async () => {
  try {
    const response = await axios.get(`${URL_API}/post`, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPost = async (id) => {
  try {
    const response = await axios.get(`${URL_API}/post/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (message, image, userId) => {
  try {
    const formData = new FormData();
    formData.append("message", message);
    formData.append("image", image);
    formData.append("userId", userId);
    await axios.post(`${URL_API}/post`, formData, configMultipart);
    if (message < 1) {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

export const modifyPost = async (id, message, image) => {
  try {
    const formData = new FormData();
    formData.append("message", message);
    formData.append("image", image);
    await axios.put(`${URL_API}/post/${id}`, formData, configMultipart);
    if (message < 1) {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (id) => {
  try {
    await axios.delete(`${URL_API}/post/${id}`, config);
  } catch (error) {
    console.log(error);
  }
};

export const deletePicture = async (id) => {
  try {
    await axios.delete(`${URL_API}/post/${id}/picture`, config);
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (id) => {
  try {
    await axios.patch(`${URL_API}/post/${id}/like`, {}, config);
  } catch (error) {
    console.log(error);
  }
};

export const createComment = async (postId, text, commenterId) => {
  try {
    await axios.patch(
      `${URL_API}/post/${postId}/comment`,
      { text, commenterId },
      config
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (postId, commentId) => {
  try {
    await axios.delete(
      `${URL_API}/post/${postId}/comment/${commentId}`,
      config
    );
  } catch (error) {
    console.log(error);
  }
};

export const editComment = async (postId, commentId, text) => {
  try {
    await axios.put(
      `${URL_API}/post/${postId}/comment/${commentId}`,
      { text },
      config
    );
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${URL_API}/user`, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (id) => {
  try {
    const response = await axios.get(`${URL_API}/user/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserPosts = async (id) => {
  try {
    const response = await axios.get(`${URL_API}/post/user/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const editUser = async (id, firstname, lastname, bio, image) => {
  try {
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("bio", bio);
    formData.append("image", image);
    if (firstname < 1) {
      return;
    } else if (lastname < 1) {
      return;
    } else if (bio < 1) {
      return;
    }
    await axios.put(`${URL_API}/user/${id}`, formData, configMultipart);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${URL_API}/user/${id}`, config);
  } catch (error) {
    console.log(error);
  }
};
