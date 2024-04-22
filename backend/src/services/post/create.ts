import PostModel, { Post } from "@/models/Post"

const createPost = async (post: Omit<Post, "_id">) => {
    const now = new Date()

    post.createdAt = post.updatedAt = now

    const createdPost = await PostModel.create(post)

    return createdPost.toObject()
}

export default createPost
