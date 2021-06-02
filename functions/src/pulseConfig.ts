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

export {menuConfig, fetchMenuConfig};
