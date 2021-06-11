import {Response} from "express";
import * as admin from "firebase-admin";
// import {collection, addDoc} from "firebase/firestore";
import * as functions from "firebase-functions";

admin.initializeApp();
type EntryType = {
  title: string;
  text: string;
};

type Request = {
  body: EntryType;
  params: { entryId: string };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const fetchMenuConfig = async (request: Request, response: Response) => {
  try {
    const menu: EntryType[] = [];
    const querySnapshot = await admin.firestore().collection("sidebar").get();
    // functions.logger.info("querySnapshot: ", querySnapshot);
    querySnapshot.forEach((doc: any) => menu.push(doc.data()));
    functions.logger.info("querySnaphot menu: ", menu);
    // eslint-disable-next-line object-curly-spacing
    return response.status(200).json({ data: menu });
  } catch (error) {
    return response.status(500).json(error.message);
  }

  // try {
  //   const allEntries: EntryType[] = [];
  //   const querySnapshot = await db.collection('entries').get()
  //   querySnapshot.forEach((doc: any) => allEntries.push(doc.data()))
  //   return res.status(200).json(allEntries)
  // } catch(error) { return res.status(500).json(error.message) }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const menuConfig = async (request: Request, response: Response) => {
  try {
    functions.logger.info("menu config", request.body);
    admin.firestore().collection("sidebar").add(request.body);
    // const docRef = await addDoc(collection(db, "users"), request.body);
    // console.log("Document written with ID: ", docRef.id);
    return response.status(200).send({status: "success", message: "Added: "});

    // const configData = doc(collection(db, "menuconfig"));
    // await setDoc(doc(configData, "sidebar", request.body));
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const addVideos = async (request: Request, response: Response) => {
  try {
    functions.logger.info("Adding Videos", request.body);
    admin.firestore().collection("pulsevideos").add(request.body);
    // const docRef = await addDoc(collection(db, "users"), request.body);
    // console.log("Document written with ID: ", docRef.id);
    return response
        .status(200)
        .send({status: "success", message: "pulsevideos Added"});

    // const configData = doc(collection(db, "menuconfig"));
    // await setDoc(doc(configData, "sidebar", request.body));
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const fetchVideos = async (request: Request, response: Response) => {
  try {
    const videos: EntryType[] = [];
    const querySnapshot = await admin
        .firestore()
        .collection("pulsevideos")
        .get();
    // functions.logger.info("querySnapshot: ", querySnapshot);
    querySnapshot.forEach((doc: any) => videos.push(doc.data()));
    functions.logger.info("querySnaphot videos: ", videos);
    // eslint-disable-next-line object-curly-spacing
    return response.status(200).json({ data: videos });
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const addProfile = async (request: Request, response: Response) => {
  try {
    functions.logger.info("Adding profile", request.body);
    admin.firestore().collection("profile").add(request.body);
    // const docRef = await addDoc(collection(db, "users"), request.body);
    // console.log("Document written with ID: ", docRef.id);
    return response
        .status(200)
        .send({status: "success", message: "Profile Added"});

    // const configData = doc(collection(db, "menuconfig"));
    // await setDoc(doc(configData, "sidebar", request.body));
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const fetchProfile = async (request: Request, response: Response) => {
  try {
    const profile: EntryType[] = [];
    const querySnapshot = await admin.firestore().collection("profile").get();
    // functions.logger.info("querySnapshot: ", querySnapshot);
    querySnapshot.forEach((doc: any) => profile.push(doc.data()));
    functions.logger.info("querySnaphot profile: ", profile);
    // eslint-disable-next-line object-curly-spacing
    return response.status(200).json({ data: profile });
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const fetchProfileByID = async (request: any, response: any) => {
  try {
    type user = {
      email: string;
    };

    const userObject: user = request.body;

    let profile = {};
    const querySnapshot = await admin
        .firestore()
        .collection("profile")
        .where("email", "==", userObject.email)
        .get();

    // functions.logger.info("querySnapshot: ", querySnapshot.docs);
    querySnapshot.forEach((doc: any) => {
      functions.logger.info("querySnapshot: ", doc);
      profile = doc.data();
    });
    return response.status(200).json({data: profile});
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const addNewUser = async (request: Request, response: Response) => {
  try {
    await admin.firestore().collection("profile").add(request.body);
    return response.status(200).json({data: "User Added Success"});
    // eslint-disable-next-line object-curly-spacing
    // return response.status(200).json({data: "success"});
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export {
  menuConfig,
  fetchMenuConfig,
  addVideos,
  fetchVideos,
  addProfile,
  fetchProfile,
  fetchProfileByID,
  addNewUser,
};
