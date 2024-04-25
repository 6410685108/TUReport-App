import { db } from "./db";

const getSortPosts = async (option) => {
    let posts = {} ;
    try {
        const allposts = await db.getAllPosts();
        posts = allposts
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
    let sortedPosts = sortedPosts = [...posts].sort((a, b) => {
        const timeA = parseThaiDate(a.time);
        const timeB = parseThaiDate(b.time);
        return timeB - timeA;
    });

    if (option === 'A-Z') {
        sortedPosts.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            
            if (titleA < titleB) {
                return -1;
            }
            if (titleA > titleB) {
                return 1; 
            }
            return 0; 
        });
    } else if (option === 'Z-A') {
        sortedPosts.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            
            if (titleA < titleB) {
                return 1; 
            }
            if (titleA > titleB) {
                return -1;
            }
            return 0;
        });
    } else if (option === 'Repost'){
        sortedPosts.sort((a, b) => b.repost - a.repost);
    } else if (option === 'Finish'){
        sortedPosts = posts.filter(post => post.status === 'Finish');
    } else if (option == 'MyPost') {
        sortedPosts = posts.filter(post => post.author.uid === db.getCurrentUser().uid);
    } else if (option == 'Bookmark') {
        sortedPosts = await db.getBookmarkPosts();
    }
    return sortedPosts;
}


const parseThaiDate = (timeString) => {
    const [datePart, timePart] = timeString.split(', ');
    const [day, month, year] = datePart.split('/').map(part => parseInt(part));
    const [hour, minute, second] = timePart.split(':').map(part => parseInt(part));
    const yearAD = year - 543;
    return new Date(yearAD, month - 1, day, hour, minute, second);
}

const data = {
    getSortPosts,
};

export { data };
