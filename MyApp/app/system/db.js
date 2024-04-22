import { firebase_auth, firebase_db , firebase_storage} from '../../firebaseConfig';
import { collection , addDoc , getDocs , updateDoc , doc , getDoc , deleteDoc } from 'firebase/firestore';
import { ref , getDownloadURL , uploadBytesResumable } from 'firebase/storage';

const createPost = async (title, detail, location , photo , anonymous, author) => {
    try { 
        const photoUrl = await uploadImage(photo);
        const postCollectionRef = collection(firebase_db, 'posts');
        await addDoc(postCollectionRef, {
            title: title,
            detail: detail,
            location: location,
            photoUrl: photoUrl,
            anonymous: anonymous,
            author: author,
            time: new Date().toLocaleString(),
            status: 'in progress',
            repost: 0,
        });
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

const uploadImage = async (image) => {
    try {
        const response = await fetch(image);
        const blob = await response.blob();
        const storageRef = ref(firebase_storage , `images/${Math.random().toString(36).substring(7)}`);
        const uploadTask = uploadBytesResumable(storageRef, blob);
        
        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed', 
                (snapshot) => {
                }, 
                (error) => {
                    console.error('Error uploading image:', error); 
                    reject(error);
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            resolve(downloadURL);
                        })
                        .catch((error) => {
                            console.error('Error getting download URL:', error);
                            reject(error);
                        });
                }
            );
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

const repostPost = async (postId) => {
    const postCollectionRef = collection(firebase_db, 'posts');
    const postDocRef = doc(postCollectionRef, postId);
    const postDocSnap = await getDoc(postDocRef);
    if (postDocSnap.exists()) {
        if (await isReposted(postId , firebase_auth.currentUser.email)) {
            await removeReposter(postId , firebase_auth.currentUser.email);
                const repostCount = postDocSnap.data().repost - 1;
                await updateDoc(postDocRef, {
                    repost: repostCount,
                });
            return;
        } else {
            await addReposter(postId , firebase_auth.currentUser.email);
                const repostCount = postDocSnap.data().repost + 1;
                await updateDoc(postDocRef, {
                    repost: repostCount,
                });
        }
    }
}

const addReposter = async (postId , user) => {
    try{
        const postCollectionRef = collection(firebase_db, 'posts' , postId , 'reposter');
    await addDoc(postCollectionRef, {
        user : user,
    });
    } catch (error) {
        console.error('Error adding reposter:', error);
    }
}

const removeReposter = async (postId , user) => {
    try{
        const postCollectionRef = collection(firebase_db, 'posts' , postId , 'reposter');
        const postsSnapshot = await getDocs(postCollectionRef);
        const posts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].user === user) {
                const postDocRef = doc(postCollectionRef, posts[i].id);
                await deleteDoc(postDocRef);
            }
        }
    } catch (error) {
        console.error('Error removing reposter:', error);
    }
}

const isReposted = async (postId , user) => {
    try {
        const postCollectionRef = collection(firebase_db, 'posts' , postId , 'reposter');
        const postsSnapshot = await getDocs(postCollectionRef);
        const posts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].user === user) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return false;
    }
}


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
    repostPost , // done : pass

    createComment , // done : none

    userBookmark , // done : none
    getUserEmail , // done : done (use ._j to get email)

};

export { db };
