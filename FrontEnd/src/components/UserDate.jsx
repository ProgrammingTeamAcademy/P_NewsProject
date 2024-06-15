/**
 * post object contains information about the post/news
 * @typedef {{
*  id: string,
*  title: string,
*  content: string,
*  tags: String[],
*  video:URL|null,
*  image:URL|null,
*  preview:URL|null
* }} Post
*/

/** get posts from backend
* @return {Promise<{
    username: String,
    email: String
}>}
*/


export async function getUserData() {
    return {
        username: "username",
        email: "example@example.com",
    }
}

/** get posts from backend
* @return {Promise<Post>}
*/

export async function getPost() {
    return {
        id: crypto.randomUUID(),
        title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit",
        content: "content",
        tags: ["tag1", "tag2", "tag3"],
        video: null,
        image: '/image/example.jpg',
        preview: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp'
    }
}

/** get posts from backend
* @return {Promise<Post[]>}
*/

export async function getPosts() {

    return Array.from({length: 10}).map(x => (
        {
            id: crypto.randomUUID(),
            title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit",
            content: "content",
            tags: ["tag1", "tag2", "tag3"],
            video: null,
            image: '/image/example.jpg',
            preview: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp'
        }))

}

// TODO link this functions with the backend