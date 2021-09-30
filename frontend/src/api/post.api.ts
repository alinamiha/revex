import { CreatePostDTO } from "./dto/post.dto"

export class PostAPI {
  public static async getAll(): Promise<CreatePostDTO[]> {
    const resp = await fetch('http://localhost:5000/blog/posts', {
      method: "GET"
    })

    const data = await resp.json()
    return data
  }
}