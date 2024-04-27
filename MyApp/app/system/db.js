import { firebase_auth, firebase_db , firebase_storage} from '../../firebaseConfig';
import { collection , addDoc , getDocs , updateDoc , doc , getDoc , deleteDoc ,query , where, setDoc } from 'firebase/firestore';
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
            author: firebase_auth.currentUser.uid,
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

const repostPost = async (postId) => {
    const postCollectionRef = collection(firebase_db, 'posts');
    const postDocRef = doc(postCollectionRef, postId);
    const postDocSnap = await getDoc(postDocRef);
    if (postDocSnap.exists()) {
        if(await isReposted(postId)){
            console.log('unrepost');
            const repostCount = postDocSnap.data().repost - 1;
            await updateDoc(postDocRef, {
                repost: repostCount,
            });
            await removeReposter(postId);
            return false;
        } else {
            console.log('repost');
            const repostCount = postDocSnap.data().repost + 1;
            await updateDoc(postDocRef, {
                repost: repostCount,
            });
            await addReposter(postId);
            notify(postId , firebase_auth.currentUser.uid ,  `repost your post`);
            return true;
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
            const postData = postDocSnap.data();
            postData.id = postId;
            return postData;
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

const getBookmarkPostsID = async () => {
    const userId = firebase_auth.currentUser.uid;
    try {
        const userRef = doc(firebase_db, 'users', userId ); 
        const postCollectionRef = collection(userRef, 'bookmark' ); 
        const postSnapshot = await getDocs(postCollectionRef);    
        const postIds = postSnapshot.docs.map(doc => doc.data().postId);
        return postIds;
    } catch (error) {
        console.error('Error fetching bookmarked posts:', error);
        return [];
    }

}

const notify = async (postid , uid , title) => {
    try { 
        console.log("Create Notify")
        const notifyCollectionRef = collection(firebase_db, 'users' , uid , 'notification');
        await addDoc(notifyCollectionRef, {
            title: title,
            userCreate: uid,
            postid: postid,
            time: new Date().toLocaleString(),
        });
    } catch (error) {
        console.error('Error creating notify:', error);
        throw error;
    }
}

const getNotification = async () => {
    const userId = firebase_auth.currentUser.uid;
    try {
        const userRef = doc(firebase_db, 'users', userId);
        const notificationCollectionRef = collection(userRef, 'notification');
        const notificationSnapshot = await getDocs(notificationCollectionRef);
        const notification = notificationSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return notification;
    } catch (error) {
        console.error('Error fetching notification:', error);
        return [];
    }
};

const deleteAllNotifications = async () => {
    const userId = firebase_auth.currentUser.uid;
    try{
        const userRef = doc(firebase_db, 'users', userId);
        const notificationCollectionRef = collection(userRef, 'notification');
        const notificationSnapshot = await getDocs(notificationCollectionRef);
        notificationSnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    } catch (error) {
        console.error('Error deleting notification:', error);
    }
}


const createComment = async (postId, comment) => {
    try {
        const commentCollectionRef = collection(firebase_db, 'posts', postId, 'comments');
        await addDoc(commentCollectionRef, {
            comment: comment,
            author: firebase_auth.currentUser.uid,
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
        
        await setDoc(userRef, {
            photo: photoUrl,
        }, { merge: true });
        
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
    setUserDisplayName(firebase_auth.currentUser.uid, name);
}

const getCurrentUser = () => {
    return firebase_auth.currentUser;
}

const setUserDisplayName = async (userId, name) => {
    try{
        const userRef = doc(firebase_db, 'users', userId);
        await setDoc(userRef, {
            displayName: name,
        }, { merge: true });
    } catch (error) {
        console.error('Error setting user displayname:', error);
    }
}

const getDisplayNameOfID = async (uid) => {
    try {
        const userRef = doc(firebase_db, 'users', uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            return userDoc.data().displayName;
        } else {
            console.error('User document does not exist');
            return null;
        }
    } catch (error) {
        console.error('Error fetching user displayname:', error);
        return null;
    }
}

const setUserRole = async (role) => {
    const uid = firebase_auth.currentUser.uid;
    try {
        const userRef = doc(firebase_db, 'users', uid);
        await setDoc(userRef, {
            role: 'role',
        }, { merge: true });
    } catch (error) {
        console.error('Error setting user role:', error);
    }
}


const db = {
    createPost ,
    editPost ,
    getAllPosts ,
    deletePost,
    changeStatusPost,
    getPost,

    repostPost ,
    isReposted,
    addReposter,
    removeReposter,

    createComment ,
    getAllComments,

    userBookmark ,
    getBookmarkPostsID,

    getNotification,
    deleteAllNotifications,
    
    showCurrentUserInfo,
    uploadUserPhoto,
    getThisUserPhoto,
    getUserPhoto,
    setDisplayName,
    getCurrentUser,
    getDisplayNameOfID,

    setUserRole,
};

export { db };
