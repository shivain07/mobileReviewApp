import firestore from "@react-native-firebase/firestore";

const allReviewsReference = firestore().collection("allReviews");
const userCollectionReference = firestore().collection('users');

const getAllReviews = () => {
    return allReviewsReference.get().then((querySnapshot) => {
        let data: any = []
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
        return data;
    });
}
const getUserAllReview = (userId: string) => {
    return userCollectionReference.doc(userId).get().then((docSnapShot) => {
        return docSnapShot.data()?.reviews;
    })
}


export {
    getAllReviews,
    allReviewsReference,
    getUserAllReview,
    userCollectionReference
}