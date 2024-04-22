import createPost from "@/services/post/create"

import type { Response, Request } from "express"

const create = async (req: Request, res: Response) => {
    const createdPost = await createPost({
        title: req.body.title,
        content: req.body.content,
        author: req.user,
    })

    return res.status(201).json(createdPost)
}

export default create
