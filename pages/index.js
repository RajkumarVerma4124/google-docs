import Head from 'next/head'
import Header from '../components/Header'
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import React from 'react';
import Card from '../components/Card';
import Login from '../components/Login';
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import firebase from "firebase";
import DocumentRow from "../components/DocumentRow";

import { useState } from "react";
import { getSession, useSession } from "next-auth/client";
import db from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";


export default function Home() {
  const [session] = useSession(); 
   if (!session) return <Login/>;

  const [showTemplate, setShowTemplate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const [snapshot] = useCollection(
    db
      .collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .orderBy("timestamp", "desc")
  );


  function createDocument() {
    if (!input || input.toString().trim() === "") return;

    db.collection("userDocs").doc(session.user.email).collection("docs").add({
      fileName: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
    setShowModal(false);
  }

   function deleteDocument(id) {
     db.collection("userDocs")
       .doc(session.user.email)
       .collection("docs")
       .doc(id)
       .delete();
   }

   const modal = (
    <Modal active={showModal} toggler={() => setShowModal(false)}>
      <ModalBody>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="outline-none w-full"
          placeholder="Enter name of the document..."
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          onClick={(e) => setShowModal(false)}
          ripple="dark"
        >
          Cancel
        </Button>

        <Button color="blue" onClick={createDocument} ripple="light">
          Create
        </Button>
      </ModalFooter>
    </Modal>
   );

  return (
    <div>
      <Head>
        <title>Google Docs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      {modal}
      <section className="bg-[#f8f9fa] pb-10 px-10">
        <div className="flex flex-col max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-gray-700 text-lg mx-2">Start a new document</h2>
            <div className="flex items-center space-x-2">
              <Button
                className="hidden md:inline-flex"
                color="lightBlue"
                buttonType="outline"
                size="sm"
                rounded={false}
                block={false}
                iconOnly={false}
                ripple="dark"
                onClick={() => setShowTemplate((value) => !value)}
              >
                template <Icon name="favorite" />
              </Button>

              <Button
                color="gray"
                buttonType="outline"
                iconOnly={true}
                ripple="dark"
                className="border-0 rounded-full"
                onClick={() => setShowTemplate((value) => !value)}
              >
                <Icon name="more_vert" size="3xl" />
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-y-4">
            <div onClick={() => setShowModal(true)}>
              <Card title="Blank" image="https://links.papareact.com/pju" />
            </div>
            {/* <Card title="Blank" image="https://links.papareact.com/pju" />
            <Card title="Blank" image="https://links.papareact.com/pju" />
            <Card title="Blank" image="https://links.papareact.com/pju" /> */}
    
            <div className={`${showTemplate ? "inline-flex" : "hidden"}`}>
              <Card title="Resume" image="/resume.png" />
            </div>

            <div className={`${showTemplate ? "inline-flex" : "hidden"}`}>
              <Card title="Recipe" image="/recipe.png" />
            </div>
            <div className={`${showTemplate ? "inline-flex" : "hidden "}`}>
              <Card title="Report" image="/report.png" />
            </div>
            <div className={`${showTemplate ? "inline-flex" : "hidden"}`}>
              <Card title="Pet resume" image="/letter.png" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5 pr-5">
            <h2 className="font-medium flex-grow px-5">My Documents</h2>
            <p className="mr-12"> Date Created</p>
            <Icon name="folder" size="3xl" color="gray" />
          </div>
          {snapshot?.docs.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              date={doc.data().timestamp}
              onDelete={deleteDocument}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
