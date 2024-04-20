import { firebase_db } from '../../firebaseConfig'; // Import firebase_db from your firebaseConfig
import { collection , addDoc , getDocs } from 'firebase/firestore/lite';

const collectPost = async (title, content, picUrl) => {

    try {
        const postCollectionRef = collection(firebase_db, 'posts');
        await addDoc(postCollectionRef, {
            title: title,
            content: content,
            picUrl: picUrl,
        });
    } catch (error) {
        console.error('Error creating post:', error);
    }

};

const getAllPosts = async () => {
    try {
        const postCollectionRef = collection(firebase_db, 'posts');
        const postsSnapshot = await getDocs(postCollectionRef);
        const posts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
};

const db = { 
    collectPost , // done : pass # Not have comment now
    getAllPosts , // done : pass

};

export { db };
