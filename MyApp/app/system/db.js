import { firebase_auth, firebase_db , firebase_storage} from '../../firebaseConfig';
import { collection , addDoc , getDocs , updateDoc , doc , getDoc , deleteDoc ,query , where } from 'firebase/firestore';
import { ref , getDownloadURL , uploadBytesResumable } from 'firebase/storage';
import { updateProfile } from 'firebase/auth'
import { get } from 'firebase/database';

const createPost = async (title, detail, location , photo , anonymous) => {
    try { 
        const photoUrl = await uploadImage(photo);
        const postCollectionRef = collection(firebase_db, 'posts');
        await addDoc(postCollectionRef, {
            title: title,
            detail: detail,
            location: location,
            photoUrl: photoUrl,
            anonymous: anonymous,
            author: {
                uid: firebase_auth.currentUser.uid,
                displayName: firebase_auth.currentUser.displayName,
                email: firebase_auth.currentUser.email,
                photo: firebase_auth.currentUser.photoURL,
            },
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
        if (await isReposted(postId)) {
            await removeReposter(postId);
            const repostCount = postDocSnap.data().repost - 1;
            await updateDoc(postDocRef, {
                repost: repostCount,
            });
            return;
        } else {
            await addReposter(postId);
            const repostCount = postDocSnap.data().repost + 1; // Corrected here
            await updateDoc(postDocRef, {
                repost: repostCount,
            });
        }
    }
}

const addReposter = async (postId) => {
    try {
        const postCollectionRef = collection(firebase_db, 'posts', postId, 'reposter');
        await addDoc(postCollectionRef, {
            user: {
                uid: firebase_auth.currentUser.uid,
                displayName: firebase_auth.currentUser.displayName,
                email: firebase_auth.currentUser.email,
                photo: firebase_auth.currentUser.photoURL,
            },
        });
    } catch (error) {
        console.error('Error adding reposter:', error);
    }
}

const removeReposter = async (postId) => {
    const userEmail = firebase_auth.currentUser.email;
    try {
        const postCollectionRef = collection(firebase_db, 'posts', postId, 'reposter');
        const q = query(postCollectionRef, where("user.email", "==", userEmail));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    } catch (error) {
        console.error('Error removing reposter:', error);
    }
}

const isReposted = async (postId) => {
    const userEmail = firebase_auth.currentUser.email;
    try {
        const postCollectionRef = collection(firebase_db, 'posts', postId, 'reposter');
        const q = query(postCollectionRef, where("user.email", "==", userEmail));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    } catch (error) {
        console.error('Error checking repost:', error);
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

const getPost = async (postId) => {
    try {
        const postDocRef = doc(firebase_db, 'posts', postId);
        const postDocSnap = await getDoc(postDocRef);
        if (postDocSnap.exists()) {
            return postDocSnap.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }

}

const userBookmark = async (postId) => {
    const userId = firebase_auth.currentUser.uid;
    try {
        if(await isBookmarked(postId)) {
            await removeBookmark(postId);
        }
        else{
            console.log("Bookmarking post");
            const userRef = doc(firebase_db, 'userbookmark', userId); 
            const postCollectionRef = collection(userRef, 'postIds'); 
            await addDoc(postCollectionRef, {
                postId: postId,
            });
        }
    } catch (error) {
        console.error('Error adding post ID:', error);
    }
};

const isBookmarked = async (postId) => {
    const userId = firebase_auth.currentUser.uid;
    try {
        const userRef = doc(firebase_db, 'userbookmark', userId); 
        const postCollectionRef = collection(userRef, 'postIds'); 
        const q = query(postCollectionRef, where("postId", "==", postId));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    } catch (error) {
        console.error('Error checking bookmark:', error);
        return false;
    }

}

const removeBookmark = async (postId) => {
    const userId = firebase_auth.currentUser.uid;
    try {
        const userRef = doc(firebase_db, 'userbookmark', userId); 
        const postCollectionRef = collection(userRef, 'postIds'); 
        const q = query(postCollectionRef, where("postId", "==", postId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    } catch (error) {
        console.error('Error removing bookmark:', error);
    }
}

const getBookmarkedPosts = async () => {
    const posts = [];
    const userId = firebase_auth.currentUser.uid;
    try {
        const userRef = doc(firebase_db, 'userbookmark', userId); 
        const postCollectionRef = collection(userRef, 'postIds'); 
        const postSnapshot = await getDocs(postCollectionRef);
        const postIds = postSnapshot.docs.map(doc => doc.data().postId);
        for (let i = 0; i < postIds.length; i++) {
                posts.push(await getPost(postIds[i]));
        }
        return posts;
    } catch (error) {
        console.error('Error fetching bookmarked posts:', error);
        return [];
    }
}

const createComment = async (postId, comment) => {
    try {
        const commentCollectionRef = collection(firebase_db, 'posts', postId, 'comments');
        await addDoc(commentCollectionRef, {
            comment: comment,
            author: {
                uid: firebase_auth.currentUser.uid,
                displayName: firebase_auth.currentUser.displayName,
                email: firebase_auth.currentUser.email,
                photo: firebase_auth.currentUser.photoURL,
            },
            time: new Date().toLocaleString(),
        });
    } catch (error) {
        console.error('Error creating comment:', error);
    }
};

const getAllComments = async (postId) => {
    try{
        const commentCollectionRef = collection(firebase_db, 'posts' , postId, 'comments');
        const commentSnapshot = await getDocs(commentCollectionRef);
        const comment = commentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return comment;
    } catch (error) {
        console.error('Error fetching comments:', error);
        return [];
    }
}

const uploadUserPhoto = async (photo) => {
    const photoUrl = await uploadImage(photo);
    updateProfile(firebase_auth.currentUser, { photoURL: photoUrl });
}

const getUserPhoto = async () => {
    const res = firebase_auth.currentUser.photoURL;
    return res;
}

const showCurrentUserInfo = async (info) => {
    const user = firebase_auth.currentUser;
    if(info){
        console.log(user[info]);
    }
    else {
        console.log(user);
    }
}


const db = {
    createPost ,
    editPost ,
    getAllPosts ,
    repostPost ,

    createComment ,
    getAllComments,

    userBookmark ,
    getBookmarkedPosts,
    showCurrentUserInfo,
    uploadUserPhoto,
    getUserPhoto,
};

export { db };
