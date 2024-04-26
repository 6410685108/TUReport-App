import { firebase_auth, firebase_db , firebase_storage} from '../../firebaseConfig';
import { collection , addDoc , getDocs , updateDoc , doc , getDoc , deleteDoc ,query , where } from 'firebase/firestore';
import { ref , getDownloadURL , uploadBytesResumable } from 'firebase/storage';
import { updateProfile } from 'firebase/auth'

const createPost = async (title, detail, location , photo , anonymous) => {
    try { 
        const photoUrl = await uploadImage(photo, 'posts');
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

const uploadImage = async (image , path) => {
    try {
        const response = await fetch(image);
        const blob = await response.blob();
        const storageRef = ref(firebase_storage , `${path}/${Math.random().toString(36).substring(7)}`);
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

const repostPost = async (postId,isReposted) => {
    const postCollectionRef = collection(firebase_db, 'posts');
    const postDocRef = doc(postCollectionRef, postId);
    const postDocSnap = await getDoc(postDocRef);
    if (postDocSnap.exists()) {
        if(isReposted){
            console.log('unrepost');
            const repostCount = postDocSnap.data().repost - 1;
            await updateDoc(postDocRef, {
                repost: repostCount,
            });
            return true;
        } else {
            console.log('repost');
            const repostCount = postDocSnap.data().repost + 1;
            await updateDoc(postDocRef, {
                repost: repostCount,
            });
            return false;
        }
    }
}

const addReposter = async (postId) => {
    try {
        const postCollectionRef = collection(firebase_db, 'posts', postId, 'reposter');
        await addDoc(postCollectionRef, {
            user: {
                uid: firebase_auth.currentUser.uid,
            },
        });
    } catch (error) {
        console.error('Error adding reposter:', error);
    }
}

const removeReposter = async (postId) => {
    const uid = firebase_auth.currentUser.uid;
    try {
        const postCollectionRef = collection(firebase_db, 'posts', postId, 'reposter');
        const q = query(postCollectionRef, where("user.uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    } catch (error) {
        console.error('Error removing reposter:', error);
    }
}

const isReposted = async (postId) => {
    const uid = firebase_auth.currentUser.uid;
    try {
        const postCollectionRef = collection(firebase_db, 'posts', postId, 'reposter');
        const q = query(postCollectionRef, where("user.uid", "==", uid));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    } catch (error) {
        console.error('Error checking repost:', error);
        return false;
    }
}

const editPost = async (postId, newTitle, newContent, newPicUrl) => { // it old function if want to use tell James
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

const deletePost = async (postId) => {
    const postCollectionRef = collection(firebase_db, 'posts');
    const postDocRef = doc(postCollectionRef, postId);

    const postDocSnap = await getDoc(postDocRef);

    if (postDocSnap.exists()) {
        await deleteDoc(postDocRef);
    } else {
        console.log('Post not found');
    }
}

const changeStatusPost = async (postId, status) => {
    const postCollectionRef = collection(firebase_db, 'posts');
    const postDocRef = doc(postCollectionRef, postId);

    const postDocSnap = await getDoc(postDocRef);

    if (postDocSnap.exists()) {
        await updateDoc(postDocRef, {
            status: status,
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
        if (await isBookmarked(postId)) {
            console.log('remove bookmark');
            await removeBookmark(postId);
        } else {
            console.log('add bookmark');
            const userRef = doc(firebase_db, 'users', userId);
            const bookmarkRef = collection(userRef, 'bookmark');
            await addDoc(bookmarkRef, {
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
        const userRef = doc(firebase_db, 'users', userId); 
        const postCollectionRef = collection(userRef, 'bookmark'); 
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
        const userRef = doc(firebase_db, 'users', userId); 
        const postCollectionRef = collection(userRef, 'bookmark'); 
        const q = query(postCollectionRef, where("postId", "==", postId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    } catch (error) {
        console.error('Error removing bookmark:', error);
    }
}

const getBookmarkPosts = async () => {
    const bookmarkedPosts = [];
    const userId = firebase_auth.currentUser.uid;
    try {
        const userRef = doc(firebase_db, 'users', userId ); 
        const postCollectionRef = collection(userRef, 'bookmark' ); 
        const postSnapshot = await getDocs(postCollectionRef);
        
        const postIds = postSnapshot.docs.map(doc => doc.data().postId);
        for (let i = 0; i < postIds.length; i++) {
            const postId = postIds[i];
            const post = await getPost(postId);
            bookmarkedPosts.push(post);
        }
        
        return bookmarkedPosts;
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
    try{
        const photoUrl = await uploadImage(photo, 'users');
        const userId = firebase_auth.currentUser.uid;
        const userRef = doc(firebase_db, 'users', userId);
        await updateDoc(userRef, {
            photo: photoUrl,
        });
        updateProfile(firebase_auth.currentUser, { photoURL: photoUrl });
    }
    catch{
        console.error('Error uploading user photo:', error);
    }
}

const getThisUserPhoto = async () => {
    const res = firebase_auth.currentUser.photoURL;
    return res;
}

const getUserPhoto = async (userId) => {
    try{
        const userRef = doc(firebase_db, 'users', userId);
        const userDoc = await getDoc(userRef);
        return userDoc.data().photo;
    } catch{
        console.error('Error fetching user photo:', error);
    }
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

const setDisplayName = async (name) => {
    updateProfile(firebase_auth.currentUser, { displayName: name });
}

const getCurrentUser = () => {
    return firebase_auth.currentUser;
}




const db = {
    createPost ,
    editPost ,
    getAllPosts ,
    deletePost,
    changeStatusPost,
    
    repostPost ,
    isReposted,
    addReposter,
    removeReposter,

    createComment ,
    getAllComments,

    userBookmark ,
    getBookmarkPosts,
    
    showCurrentUserInfo,
    uploadUserPhoto,
    getThisUserPhoto,
    getUserPhoto,
    setDisplayName,
    getCurrentUser,
};

export { db };
