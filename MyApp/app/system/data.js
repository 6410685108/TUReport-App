import { db } from "./db";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { firebase_auth } from "../../firebaseConfig";

const auth = firebase_auth;

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
    } else if (option === 'Pending'){
        sortedPosts = posts.filter(post => post.status === 'Pending');
    } else if (option === 'Approved'){
        sortedPosts = posts.filter(post => post.status === 'Approved');
    } else if (option === 'InProgress'){
        sortedPosts = posts.filter(post => post.status === 'In progress');
    } else if (option === 'Waiting'){
        sortedPosts = posts.filter(post => post.status === 'Waiting');
    } else if (option === 'Finished'){
        sortedPosts = posts.filter(post => post.status === 'Finished');
    } else if (option === 'Reject'){
        sortedPosts = posts.filter(post => post.status === 'Reject');
    } else if (option == 'MyPost') {
        sortedPosts = posts.filter(post => post.author === db.getCurrentUser().uid);
    } else if (option == 'Bookmark') {
        const bookmarkPostId = await db.getBookmarkPostsID();
        sortedPosts = posts.filter(post => bookmarkPostId.includes(post.id));
    }
    return sortedPosts;
}

const parseThaiDate = (timeString) => {
    const [datePart, timePart] = timeString.split(' ');
    const [day, month, year] = datePart.split('/').map(part => parseInt(part));
    const [hour, minute, second] = timePart.split(':').map(part => parseInt(part));
    return new Date(year, month - 1, day, hour, minute, second);
}

const getComments = async (postId) => {
    try {
        const comments = await db.getAllComments(postId);
        return comments;
    } catch (error) {
        console.error('Error fetching comments:', error);
        return [];
    }
}

const login = async (email , password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    } 
};

const register = async (email , password) => {
    try {
        await createUserWithEmailAndPassword(auth,email,password);
        await signInWithEmailAndPassword(auth,email, password)
        try{
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
    } catch (error) {
        alert("Error registering: " + error.message);
        console.error("Registration error:", error);
    }
}

const logout = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.error('Error signing out:', error);
    }
}

const getUserPhotoURL = async (userId) => {
    try {
        let photoUrl = null;
        try{
            photoUrl = await db.getUserPhoto(userId);
        } catch (error) {
            return "https://firebasestorage.googleapis.com/v0/b/tu-reports.appspot.com/o/user_profile_g.png?alt=media&token=f5e20af9-387f-44ab-a4d8-52b68cbc42b1";
        }
        if (!photoUrl) {
           
        }
        return photoUrl;
    } catch (error) {
        console.error('Error fetching user photo:', error);
        return null;
    }
};

const getUserDisplayName = async (userId) => {
    try {
        const displayName = await db.getDisplayNameOfID(userId);
        return displayName;
    } catch (error) {
        console.error('Error fetching user display name:', error);
        return null;
    }
};

const getStatusPosts = async (option,status) => {
    try {
        
        const sortedPosts = await getSortPosts(option);
        const statusPosts = sortedPosts.filter(post => post.status === status);
        return statusPosts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

const data = {
    getSortPosts,
    getComments,
    login,
    logout,
    register,

    getUserPhotoURL,
    getUserDisplayName,
    getStatusPosts,
};

export { data };
