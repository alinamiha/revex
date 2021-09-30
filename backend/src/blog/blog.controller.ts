import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('blog')
export class BlogController {

  constructor(private readonly blogService: BlogService) { }

  // Submit a post
  // @Post('/post')
  // async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
  //   const newPost = await this.blogService.addPost(createPostDTO);
  //   return res.status(HttpStatus.OK).json({
  //     message: 'Post has been submitted successfully!',
  //     post: newPost,
  //   });
  // }

  // @Put('/edit')
  // async editPost(
  //   @Res() res,
  //   @Query('postID', new ValidateObjectId()) postID,
  //   @Body() createPostDTO: CreatePostDTO,
  // ) {
  //   const editedPost = await this.blogService.editPost(postID, createPostDTO);
  //   if (!editedPost) {
  //     throw new NotFoundException('Post does not exist!');
  //   }
  //   return res.status(HttpStatus.OK).json({
  //     message: 'Post has been successfully updated',
  //     post: editedPost,
  //   });
  // }
  // Delete a post using ID
  @Delete('/delete')
  async deletePost(@Res() res, @Query('postID', new ValidateObjectId()) postID) {
    const deletedPost = await this.blogService.removePost(postID);
    if (!deletedPost) {
      throw new NotFoundException('Post does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Post has been deleted!',
      post: deletedPost,
    });
  }

  // Fetch a particular post using ID
  // @Get('post/:postID')
  // async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
  //   const post = await this.blogService.getPost(postID);
  //   if (!post) {
  //     throw new NotFoundException('Post does not exist!');
  //   }
  //   return res.status(HttpStatus.OK).json(post);
  // }

  // Fetch all posts
  // @Get('posts')
  // async getPosts(@Res() res) {
  //   const posts = await this.blogService.getPosts();
  //   return res.status(HttpStatus.OK).json(posts);
  // }

  @Get('posts')
  getAll() {
    return this.blogService.getPosts()
  }

  @Get('/post/:id')
  getPost(@Param('id') id: string) {
    return this.blogService.getPost(id)
  }

  @Post('/post')
  addPost(@Body() createPostDTO: CreatePostDTO) {
    return this.blogService.addPost(createPostDTO)
  }

  @Put('/post/:id/edit')
  editPost(@Body() updatePostDto: UpdatePostDTO, @Param() id: string) {
    return this.blogService.editPost(id, updatePostDto)
  }
}