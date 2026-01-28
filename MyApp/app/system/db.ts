import { firebase_auth, firebase_db, firebase_storage } from '../../firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, doc, getDoc, deleteDoc, query, where, setDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { updateProfile, User } from 'firebase/auth';

export interface PostData {
  id: string;
  title: string;
  detail: string;
  location: string;
  photoUrl: string;
  anonymous: boolean;
  author: string;
  time: string;
  status: string;
  repost: number;
}

export interface CommentData {
  id: string;
  comment: string;
  author: string;
  time: string;
}

export interface NotificationData {
  id: string;
  title: string;
  userCreate: string;
  postid: string;
  time: string;
}

export interface UserData {
  displayName?: string;
  photo?: string;
  phoneNumber?: string;
  role?: string;
}

const getDate = (): string => {
  const now = new Date();
  const date = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  return `${date}/${month}/${year} ${hour}:${minute}:${second}`;
};

const createPost = async (title: string, detail: string, location: string, photo: string, anonymous: boolean): Promise<void> => {
  try {
    const photoUrl = await uploadImage(photo, 'posts');
    const postCollectionRef = collection(firebase_db, 'posts');
    await addDoc(postCollectionRef, {
      title: title,
      detail: detail,
      location: location,
      photoUrl: photoUrl,
      anonymous: anonymous,
      author: firebase_auth.currentUser?.uid,
      time: getDate(),
      status: 'Pending',
      repost: 0,
    });
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

const uploadImage = async (image: string, path: string): Promise<string> => {
  try {
    const response = await fetch(image);
    const blob = await response.blob();
    const storageRef = ref(firebase_storage, `${path}/${Math.random().toString(36).substring(7)}`);
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

const repostPost = async (postId: string): Promise<boolean> => {
  const postCollectionRef = collection(firebase_db, 'posts');
  const postDocRef = doc(postCollectionRef, postId);
  const postDocSnap = await getDoc(postDocRef);
  if (postDocSnap.exists()) {
    if (await isReposted(postId)) {
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
      notify(postId, firebase_auth.currentUser?.uid || '', `repost your post`);
      return true;
    }
  }
  return false;
};

const addReposter = async (postId: string): Promise<void> => {
  try {
    const postCollectionRef = collection(firebase_db, 'posts', postId, 'reposter');
    await addDoc(postCollectionRef, {
      user: {
        uid: firebase_auth.currentUser?.uid,
      },
    });
  } catch (error) {
    console.error('Error adding reposter:', error);
  }
};

const removeReposter = async (postId: string): Promise<void> => {
  const uid = firebase_auth.currentUser?.uid;
  try {
    const postCollectionRef = collection(firebase_db, 'posts', postId, 'reposter');
    const q = query(postCollectionRef, where("user.uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (docSnap) => {
      await deleteDoc(docSnap.ref);
    });
  } catch (error) {
    console.error('Error removing reposter:', error);
  }
};

const isReposted = async (postId: string): Promise<boolean> => {
  const uid = firebase_auth.currentUser?.uid;
  try {
    const postCollectionRef = collection(firebase_db, 'posts', postId, 'reposter');
    const q = query(postCollectionRef, where("user.uid", "==", uid));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking repost:', error);
    return false;
  }
};

const editPost = async (postId: string, newTitle: string, newContent: string, newPicUrl: string): Promise<void> => {
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

const deletePost = async (postId: string): Promise<void> => {
  const postCollectionRef = collection(firebase_db, 'posts');
  const postDocRef = doc(postCollectionRef, postId);

  const postDocSnap = await getDoc(postDocRef);

  if (postDocSnap.exists()) {
    await deleteDoc(postDocRef);
  } else {
    console.log('Post not found');
  }
};

const changeStatusPost = async (postId: string, status: string): Promise<void> => {
  if (status !== 'Pending'
    && status !== 'Approved'
    && status !== 'In progress'
    && status !== 'Waiting'
    && status !== 'Reject'
    && status !== 'Finished'
  ) {
    console.error('Invalid status:', status);
    return;
  }
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

const getAllPosts = async (): Promise<PostData[]> => {
  try {
    const postCollectionRef = collection(firebase_db, 'posts');
    const postsSnapshot = await getDocs(postCollectionRef);
    const posts = postsSnapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as PostData));
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

const getPost = async (postId: string): Promise<PostData | null> => {
  try {
    const postDocRef = doc(firebase_db, 'posts', postId);
    const postDocSnap = await getDoc(postDocRef);
    if (postDocSnap.exists()) {
      const postData = postDocSnap.data() as PostData;
      postData.id = postId;
      return postData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

const getStatusPosts = async (status: string): Promise<PostData[]> => {
  try {
    const postCollectionRef = collection(firebase_db, 'posts');
    const q = query(postCollectionRef, where("status", "==", status));
    const postsSnapshot = await getDocs(q);
    const posts = postsSnapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as PostData));
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

const userBookmark = async (postId: string): Promise<void> => {
  const userId = firebase_auth.currentUser?.uid;
  if (!userId) return;
  try {
    if (await isBookmarked(postId)) {
      await removeBookmark(postId);
      console.log('remove bookmark');
    } else {
      const userRef = doc(firebase_db, 'users', userId);
      const bookmarkRef = collection(userRef, 'bookmark');
      await addDoc(bookmarkRef, {
        postId: postId,
      });
      console.log('add bookmark');
    }
  } catch (error) {
    console.error('Error adding post ID:', error);
  }
};

const isBookmarked = async (postId: string): Promise<boolean> => {
  const userId = firebase_auth.currentUser?.uid;
  if (!userId) return false;
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
};

const removeBookmark = async (postId: string): Promise<void> => {
  const userId = firebase_auth.currentUser?.uid;
  if (!userId) return;
  try {
    const userRef = doc(firebase_db, 'users', userId);
    const postCollectionRef = collection(userRef, 'bookmark');
    const q = query(postCollectionRef, where("postId", "==", postId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (docSnap) => {
      await deleteDoc(docSnap.ref);
    });
  } catch (error) {
    console.error('Error removing bookmark:', error);
  }
};

const getBookmarkPostsID = async (): Promise<string[]> => {
  const userId = firebase_auth.currentUser?.uid;
  if (!userId) return [];
  try {
    const userRef = doc(firebase_db, 'users', userId);
    const postCollectionRef = collection(userRef, 'bookmark');
    const postSnapshot = await getDocs(postCollectionRef);
    const postIds = postSnapshot.docs.map(docSnap => docSnap.data().postId as string);
    return postIds;
  } catch (error) {
    console.error('Error fetching bookmarked posts:', error);
    return [];
  }
};

// Alias for isBookmarked - keeping for backward compatibility
const isUserBookmarked = async (postId: string): Promise<boolean> => {
  return isBookmarked(postId);
};

const notify = async (postid: string, uid: string, title: string): Promise<void> => {
  try {
    console.log("Create Notify");
    const notifyCollectionRef = collection(firebase_db, 'users', uid, 'notification');
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
};

const getNotification = async (): Promise<NotificationData[]> => {
  const userId = firebase_auth.currentUser?.uid;
  if (!userId) return [];
  try {
    const userRef = doc(firebase_db, 'users', userId);
    const notificationCollectionRef = collection(userRef, 'notification');
    const notificationSnapshot = await getDocs(notificationCollectionRef);
    const notification = notificationSnapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as NotificationData));
    return notification;
  } catch (error) {
    console.error('Error fetching notification:', error);
    return [];
  }
};

const deleteAllNotifications = async (): Promise<void> => {
  const userId = firebase_auth.currentUser?.uid;
  if (!userId) return;
  try {
    const userRef = doc(firebase_db, 'users', userId);
    const notificationCollectionRef = collection(userRef, 'notification');
    const notificationSnapshot = await getDocs(notificationCollectionRef);
    notificationSnapshot.forEach(async (docSnap) => {
      await deleteDoc(docSnap.ref);
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
  }
};

const createComment = async (postId: string, comment: string): Promise<void> => {
  try {
    const commentCollectionRef = collection(firebase_db, 'posts', postId, 'comments');
    const uid = firebase_auth.currentUser?.uid;
    if (!uid) return;
    await addDoc(commentCollectionRef, {
      comment: comment,
      author: uid,
      time: getDate(),
    });
    notify(postId, uid, `comment your post`);
  } catch (error) {
    console.error('Error creating comment:', error);
  }
};

const getAllComments = async (postId: string): Promise<CommentData[]> => {
  try {
    const commentCollectionRef = collection(firebase_db, 'posts', postId, 'comments');
    const commentSnapshot = await getDocs(commentCollectionRef);
    const comment = commentSnapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as CommentData));
    return comment;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

const uploadUserPhoto = async (photo: string | null): Promise<void> => {
  if (!photo) {
    return;
  }
  try {
    const photoUrl = await uploadImage(photo, 'users');
    const userId = firebase_auth.currentUser?.uid;
    if (!userId) return;
    const userRef = doc(firebase_db, 'users', userId);

    await setDoc(userRef, {
      photo: photoUrl,
    }, { merge: true });

    if (firebase_auth.currentUser) {
      updateProfile(firebase_auth.currentUser, { photoURL: photoUrl });
    }
  }
  catch (error) {
    console.error('Error uploading user photo:', error);
  }
};

const getThisUserPhoto = async (): Promise<string | null> => {
  const res = firebase_auth.currentUser?.photoURL || null;
  return res;
};

const getUserPhoto = async (userId: string): Promise<string | undefined> => {
  try {
    const userRef = doc(firebase_db, 'users', userId);
    const userDoc = await getDoc(userRef);
    return userDoc.data()?.photo;
  } catch (error) {
    console.error('Error fetching user photo:', error);
    return undefined;
  }
};

const showCurrentUserInfo = async (info?: string): Promise<void> => {
  const user = firebase_auth.currentUser;
  if (info && user) {
    console.log((user as any)[info]);
  }
  else {
    console.log(user);
  }
};

const setDisplayName = async (name: string): Promise<void> => {
  if (firebase_auth.currentUser) {
    updateProfile(firebase_auth.currentUser, { displayName: name });
    setUserDisplayName(firebase_auth.currentUser.uid, name);
  }
};

const setPhoneNumber = async (phoneNumber: string | undefined): Promise<void> => {
  try {
    if (phoneNumber === undefined) {
      return;
    }
    const uid = firebase_auth.currentUser?.uid;
    if (!uid) return;
    const userRef = doc(firebase_db, 'users', uid);
    await setDoc(userRef, {
      phoneNumber
    }, { merge: true });
  } catch (error) {
    console.error('Error setting user phone number:', error);
  }
};

const getMyPhoneNumber = async (): Promise<string | null> => {
  try {
    const uid = firebase_auth.currentUser?.uid;
    if (!uid) return null;
    const userRef = doc(firebase_db, 'users', uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data().phoneNumber || null;
    } else {
      console.error('User document does not exist');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user phone number:', error);
    return null;
  }
};

const getCurrentUser = (): User | null => {
  return firebase_auth.currentUser;
};

const setUserDisplayName = async (userId: string, name: string): Promise<void> => {
  try {
    const userRef = doc(firebase_db, 'users', userId);
    await setDoc(userRef, {
      displayName: name,
    }, { merge: true });
  } catch (error) {
    console.error('Error setting user displayname:', error);
  }
};

const getDisplayNameOfID = async (uid: string): Promise<string | null> => {
  try {
    const userRef = doc(firebase_db, 'users', uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data().displayName || null;
    } else {
      console.error('User document does not exist');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user displayname:', error);
    return null;
  }
};

const setUserRole = async (role: string): Promise<void> => {
  const uid = firebase_auth.currentUser?.uid;
  if (!uid) return;
  try {
    const userRef = doc(firebase_db, 'users', uid);
    await setDoc(userRef, {
      role: role,
    }, { merge: true });
  } catch (error) {
    console.error('Error setting user role:', error);
  }
};

const getUserRole = async (): Promise<string> => {
  const uid = firebase_auth.currentUser?.uid;
  if (!uid) return "user";
  try {
    const userRef = doc(firebase_db, 'users', uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data().role || "user";
    } else {
      return "user";
    }
  } catch (error) {
    console.error('Error fetching user role:', error);
    return "user";
  }
};

const getUserByUID = async (uid: string): Promise<UserData | null> => {
  try {
    const userRef = doc(firebase_db, 'users', uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    } else {
      console.error('User document does not exist');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const db = {
  createPost,
  editPost,
  getAllPosts,
  deletePost,
  changeStatusPost,
  getPost,
  getStatusPosts,

  repostPost,
  isReposted,
  addReposter,
  removeReposter,

  createComment,
  getAllComments,

  userBookmark,
  getBookmarkPostsID,
  isUserBookmarked,

  getNotification,
  deleteAllNotifications,

  showCurrentUserInfo,
  getCurrentUser,
  getUserByUID,

  uploadUserPhoto,
  getThisUserPhoto,
  getUserPhoto,

  getDisplayNameOfID,
  setDisplayName,
  setUserRole,
  getUserRole,
  getMyPhoneNumber,
  setPhoneNumber,
  getDate,
};
