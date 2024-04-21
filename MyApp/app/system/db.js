import { firebase_auth, firebase_db } from '../../firebaseConfig'; // Import firebase_db from your firebaseConfig
import { collection , addDoc , getDocs , updateDoc , doc , getDoc , setDoc } from 'firebase/firestore/lite';

const createPost = async (title, detail, location , picUrl , anonymous, author) => {
    try {
        const postCollectionRef = collection(firebase_db, 'posts');
        await addDoc(postCollectionRef, {
            title: title,
            detail: detail,
            location: location,
            picUrl: picUrl,
            anonymous: anonymous,
            author: author,
        });
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }

};

const editPost = async (postId, newTitle, newContent, newPicUrl) => {
    const postCollectionRef = collection(firebase_db, 'posts');
    const postDocRef = doc(postCollectionRef, postId);

    const postDocSnap = await getDoc(postDocRef);

    if (postDocSnap.exists()) {
        await updateDoc(postDocRef, {
            title: newTitle,
            content: newContent,
            picUrl: newPicUrl,
        });
    } else {
        console.log('Post not found');
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

const createComment = async (postId, content, author) => {
    try {
        const commentCollectionRef = collection(firebase_db, 'posts', postId, 'comments');
        await addDoc(commentCollectionRef, {
            content: content,
            author , author,
        });
    } catch (error) {
        console.error('Error creating comment:', error);
    }
};


const userBookmark = async (postId, userId) => {
    try {
        const userRef = doc(firebase_db, 'users', userId); 
        const postCollectionRef = collection(userRef, 'postids'); 
        await addDoc(postCollectionRef, {
            postId: postId,
        });
    } catch (error) {
        console.error('Error adding post ID:', error);
    }
};

const getUserEmail = async () => {
    try {
        const currentUser = firebase_auth.currentUser;
        if (currentUser) {
            return currentUser.email;
        } else {
            console.log('No user signed in');
            return null;
        }
    } catch (error) {
        console.error('Error getting user email:', error);
        throw error;
    }
};


const db = {  // code : test
    createPost , // done : pass # Not have comment now
    editPost , // done : none
    getAllPosts , // done : pass

    createComment , // done : none

    userBookmark , // done : none
    getUserEmail ,

};

export { db };
