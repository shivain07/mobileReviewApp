import firestore from "@react-native-firebase/firestore"

const allReviewsReference = firestore().collection("allReviews");
const userId = "RStIzjisaqcrJdHiRq828PfEvn53"
const getAllReviews = () => {
    return allReviewsReference.where("reviewBy.userId", "==", userId).get().then((querySnapshot) => {
        let data: any = []
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
        return data;
    });
}


export {
    getAllReviews,
    allReviewsReference
}