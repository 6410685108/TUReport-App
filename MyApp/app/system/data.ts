import { db, PostData, CommentData } from "./db";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { firebase_auth } from "../../firebaseConfig";

const auth = firebase_auth;

const getSortPosts = async (option: string): Promise<PostData[]> => {
  let posts: PostData[] = [];
  try {
    const allposts = await db.getAllPosts();
    posts = allposts;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
  let sortedPosts = [...posts].sort((a, b) => {
    const timeA = parseThaiDate(a.time);
    const timeB = parseThaiDate(b.time);
    return timeB.getTime() - timeA.getTime();
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
  } else if (option === 'Repost') {
    sortedPosts.sort((a, b) => b.repost - a.repost);
  } else if (option === 'Pending') {
    sortedPosts = posts.filter(post => post.status === 'Pending');
  } else if (option === 'Approved') {
    sortedPosts = posts.filter(post => post.status === 'Approved');
  } else if (option === 'InProgress') {
    sortedPosts = posts.filter(post => post.status === 'In progress');
  } else if (option === 'Waiting') {
    sortedPosts = posts.filter(post => post.status === 'Waiting');
  } else if (option === 'Finished') {
    sortedPosts = posts.filter(post => post.status === 'Finished');
  } else if (option === 'Reject') {
    sortedPosts = posts.filter(post => post.status === 'Reject');
  } else if (option == 'MyPost') {
    const currentUser = db.getCurrentUser();
    if (currentUser) {
      sortedPosts = posts.filter(post => post.author === currentUser.uid);
    }
  } else if (option == 'Bookmark') {
    const bookmarkPostId = await db.getBookmarkPostsID();
    sortedPosts = posts.filter(post => bookmarkPostId.includes(post.id));
  }
  return sortedPosts;
};

const parseThaiDate = (timeString: string): Date => {
  const [datePart, timePart] = timeString.split(' ');
  const [day, month, year] = datePart.split('/').map(part => Number.parseInt(part, 10));
  const [hour, minute, second] = timePart.split(':').map(part => Number.parseInt(part, 10));
  return new Date(year, month - 1, day, hour, minute, second);
};

const getComments = async (postId: string): Promise<CommentData[]> => {
  try {
    const comments = await db.getAllComments(postId);
    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

const login = async (email: string, password: string): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    alert(error.message);
  }
};

const register = async (email: string, password: string): Promise<void> => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await signInWithEmailAndPassword(auth, email, password);
    try {
      await db.uploadUserPhoto(
        "https://firebasestorage.googleapis.com/v0/b/tu-reports.appspot.com/o/user_profile_g.png?alt=media&token=f5e20af9-387f-44ab-a4d8-52b68cbc42b1"
      );
    } catch (error) {
      console.error('Error uploading user photo:', error);
    }

    const displayname = email.split("@")[0];
    Promise.all([
      db.setDisplayName(displayname),
      db.setUserRole("user"),
    ]);
  } catch (error: any) {
    alert("Error registering: " + error.message);
    console.error("Registration error:", error);
  }
};

const logout = async (): Promise<void> => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

const getUserPhotoURL = async (userId: string): Promise<string | null> => {
  try {
    let photoUrl: string | null = null;
    try {
      photoUrl = await db.getUserPhoto(userId) || null;
    } catch (error) {
      console.error('Error fetching photo:', error);
      return "https://firebasestorage.googleapis.com/v0/b/tu-reports.appspot.com/o/user_profile_g.png?alt=media&token=f5e20af9-387f-44ab-a4d8-52b68cbc42b1";
    }
    if (!photoUrl) {
      return "https://firebasestorage.googleapis.com/v0/b/tu-reports.appspot.com/o/user_profile_g.png?alt=media&token=f5e20af9-387f-44ab-a4d8-52b68cbc42b1";
    }
    return photoUrl;
  } catch (error) {
    console.error('Error fetching user photo:', error);
    return null;
  }
};

const getUserDisplayName = async (userId: string): Promise<string | null> => {
  try {
    const displayName = await db.getDisplayNameOfID(userId);
    return displayName;
  } catch (error) {
    console.error('Error fetching user display name:', error);
    return null;
  }
};

const getStatusPosts = async (option: string, status: string): Promise<PostData[]> => {
  try {
    const sortedPosts = await getSortPosts(option);
    const statusPosts = sortedPosts.filter(post => post.status === status);
    return statusPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const data = {
  getSortPosts,
  getComments,
  login,
  logout,
  register,

  getUserPhotoURL,
  getUserDisplayName,
  getStatusPosts,
};
