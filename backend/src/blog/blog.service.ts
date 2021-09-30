import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) { }
  private posts = []

  // async addPost(createPostDTO: CreatePostDTO): Promise<Post> {
  //   const newPost = await new this.postModel(createPostDTO);
  //   return newPost.save();
  // }

  async addPost(productDto: CreatePostDTO): Promise<Post> {
    const newPost = new this.postModel(productDto)
    return newPost.save()
  }

  // getPosts() {
  //   return this.posts
  // }

  async getPost(id: string) {
    return this.postModel.findById(id).exec()
  }

  async removePost(id: string) {
    return this.postModel.findByIdAndRemove(id)
  }

  async updatePost(id: string, updatePostDto: UpdatePostDTO) {
    return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true })
  }

  // async getPost(postID): Promise<Post> {
  //   const post = await this.postModel
  //     .findById(postID)
  //     .exec();
  //   return post;
  // }

  async getPosts(): Promise<Post[]> {
    const posts = await this.postModel.find().exec();
    return posts;
  }

  async editPost(postID, createPostDTO: CreatePostDTO): Promise<Post> {
    const editedPost = await this.postModel
      .findByIdAndUpdate(postID, createPostDTO, { new: true });
    return editedPost;
  }
  // async deletePost(postID): Promise<any> {
  //   const deletedPost = await this.postModel
  //     .findByIdAndRemove(postID);
  //   return deletedPost;
  // }
}