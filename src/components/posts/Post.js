import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { nanoid } from '@reduxjs/toolkit';
import { BiSolidBookmark, BiSolidUser } from 'react-icons/bi';
import { MdEdit, MdDelete } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';
import { openUserInfoPage, setAddEditPostMode, setCurrentPath, showNotification } from '../../store';
import { auth, db } from '../../firebase-config';
import MarkdownPreviewRef from '@uiw/react-markdown-preview';
import ReactIcon from '../other/ReactIcon';
import classNames from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  input,
  Checkbox,
} from "@material-tailwind/react";
import axios from "axios";
function Post({ arrayName, onToggleReaction, onTogglePostMark, onEdit, post, showUserData, editButtons }) {
   //Window popup
   const [open, setOpen] = useState(false);
   const [inimessage, finmessage] = useState("");
  const [showFullContent, setShowFullContent] = useState(0);
  const dispatch = useDispatch();

  const postContentRef = useRef();
     //Window handeler
     const handleOpen = () => setOpen((cur) => !cur);
  const setmessage = (e)=>{
    const value = e.target.value;
    finmessage(value)
  }
     const savedata = async(e)=>{
       console.log(inimessage)
      const Name = auth.currentUser.displayName
      const uid = post.uid;
      try {
        const result = await axios.post("https://acebackend.vercel.app/message",{
        inimessage,Name,uid
     })
     dispatch(showNotification({
      id: nanoid(), type: 'info', text: "Successfully commit..."
    }));
      } catch (error) {
        console.log(error);
      }
     }
  useEffect(() => {
    if (postContentRef) {
      if (postContentRef.current.getBoundingClientRect().height > 500) {
        setShowFullContent(1);
      }
    }
  }, [postContentRef]);

  const editPost = () => {
    dispatch(setAddEditPostMode({
      addEditPostMode: 2, editablePostData: post
    }));
    onEdit(post.topics);
  }

  const deletePost = () => {
    const notificationId = nanoid();

    dispatch(showNotification({
      id: notificationId, type: 'Confirm', text: 'Delete post?', post
    }));
  }

  const addReaction = async () => {
    if (!auth.currentUser) {
      dispatch(showNotification({
        id: nanoid(), type: 'Error', text: 'Log in to leave reactions'
      }));

      return;
    }

    try {
      const addReaction = !post.reactions.includes(auth.currentUser.uid);

      await updateDoc(doc(db, 'users', post.uid, 'posts', post.id), {
        reactions: (addReaction) ?
          arrayUnion(auth.currentUser.uid) :
          arrayRemove(auth.currentUser.uid)
      });

      dispatch(onToggleReaction({ arrayName, id: post.id, addReaction, uid: auth.currentUser.uid }));
    } catch (error) {
      dispatch(showNotification({
        id: nanoid(), type: 'Error', text: 'Failed to add reaction'
      }));
    }
  }

  const markPost = async () => {
    if (!auth.currentUser) {
      dispatch(showNotification({
        id: nanoid(), type: 'Error', text: 'Log in to mark posts'
      }));

      return;
    }

    if (editButtons || auth.currentUser.uid === post.uid) return;

    try {
      const markPost = post.marked.indexOf(auth.currentUser.uid) === -1;

      await updateDoc(doc(db, 'users', post.uid, 'posts', post.id), {
        marked: (markPost) ?
          arrayUnion(auth.currentUser.uid) :
          arrayRemove(auth.currentUser.uid)
      });

      dispatch(onTogglePostMark({ arrayName, id: post.id, markPost, uid: auth.currentUser.uid }));
    } catch (error) {
      dispatch(showNotification({
        id: nanoid(), type: 'Error', text: 'Failed to mark post'
      }));
    }
  }

  const openUserInfo = () => {
    if (auth.currentUser?.uid === post.uid) {
      dispatch(setCurrentPath('/profile'));
    } else {
      dispatch(openUserInfoPage(post.userData));
    }
  }

  const formatDate = (date) => {
    const newDate = new Date(date);
    const dateString = `${String(newDate.getDate()).padStart(2, '0')}.${String(newDate.getMonth() + 1).padStart(2, '0')}.${newDate.getFullYear()}`;
    const timeString = `${String(newDate.getHours()).padStart(2, '0')}:${String(newDate.getMinutes()).padStart(2, '0')}`;

    return `${timeString} ${dateString}`
  }

  const topics = post.topics.map((topic) => (
    <p key={topic} className="ml-2 mb-2 px-4 py-1.5 text-lg bg-neutral-1 rounded-xl">{topic}</p>
  ));
const readPost = () => {
  if ('speechSynthesis' in window) {
    // Speech Synthesis is supported 🎉
    const datas = post.content;
    let utterance = new SpeechSynthesisUtterance(datas);
speechSynthesis.speak(utterance);
   }else{
    console.log("nahi karta support");
     // Speech Synthesis is not Supported 😞 
   }
}
  const markPostIcon = classNames('w-[1.6rem]', 'h-[1.6rem]',
    { 'cursor-pointer duration-150 hover:opacity-75 active:scale-125': !(editButtons || auth.currentUser?.uid === post.uid) });

  return (
    <div className="flex flex-col space-y-2 p-4 bg-neutral-2 rounded-lg shadow-md">
      <div className="flex flex-wrap justify-between items-center gap-2">
        {showUserData && post.userData && <div className="flex items-center space-x-4 cursor-pointer" onClick={openUserInfo}>
          {(post.userData.photoURL ) ?
            <img className="w-16 h-16 rounded-full object-cover" src={post.userData.photoURL} alt="User logo" /> :
            <ReactIcon src={<BiSolidUser className="w-16 h-16" />} color="" />}
          <p className="text-2xl">{post.userData.name || 'Anonymous'}</p>
        </div>}

        <div className='card-date'>
        <p className="break-words">{formatDate(post.publishDate)}{post.editDate && ` (edited ${formatDate(post.editDate)})`}</p>
        </div>

       

        {editButtons && <div className="flex space-x-2">
          <ReactIcon src={<MdEdit className="w-8 h-8 cursor-pointer duration-150 hover:opacity-75" onClick={editPost} />} color="#127be3" />
          <ReactIcon src={<MdDelete className="w-8 h-8 cursor-pointer duration-150 hover:opacity-75" onClick={deletePost} />} color="#e32e12" />
        </div>}
      </div>

      <p className="text-2xl font-bold">{post.header}</p>

      <div ref={postContentRef} className="relative overflow-hidden" style={(showFullContent === 1) ? { 'height': '500px' } : {}}>
        <MarkdownPreviewRef className="p-4" source={post.content} />

        {showFullContent === 1 &&
          <div className="absolute z-10 top-[420px] flex justify-center w-full bg-gradient-to-t from-[white] pt-12 pb-1">
            <p className="text-lg text-neutral-4 cursor-pointer" onClick={() => { setShowFullContent(2) }}>Read more ...</p>
          </div>}
        {showFullContent === 2 &&
          <div className="flex justify-center w-full p-1 bg-[white]">
            <p className="text-lg text-neutral-4 cursor-pointer" onClick={() => { setShowFullContent(1) }}>Hide content</p>
          </div>}
      </div>

      <div className="flex justify-between items-end grow space-x-2">
        <div className="flex space-x-2">
          <div className="flex items-center space-x-2">
            <ReactIcon src={<FaHeart className="w-6 h-6 cursor-pointer duration-150 hover:opacity-75 active:scale-125" onClick={addReaction} />}
              color={(post.reactions.includes(auth.currentUser?.uid) ? 
              '#127be3' : '#A1A19C')} />
            <p className="text-2xl">{post.reactions.length}</p>
          </div>

          <div className="flex items-center space-x-2">
            <ReactIcon src={<BiSolidBookmark className={markPostIcon} onClick={markPost} />}
              color={(post.marked.includes(auth.currentUser?.uid) ? '#00A9BC' : '#A1A19C')} />
            <p className="text-2xl">{post.marked.length}</p>
          </div> 
          <div onClick={handleOpen} className="flex items-center space-x-2">
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"/>
</svg>
          </div>

          <div className="flex items-center space-x-2">
               <svg  onClick={readPost} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M18.458 3.11A1 1 0 0 1 19 4v16a1 1 0 0 1-1.581.814L12 16.944V7.056l5.419-3.87a1 1 0 0 1 1.039-.076ZM22 12c0 1.48-.804 2.773-2 3.465v-6.93c1.196.692 2 1.984 2 3.465ZM10 8H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6V8Zm0 9H5v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3Z" clip-rule="evenodd"/>
</svg>

            </div>
            
        </div>

        <p className="flex justify-end flex-wrap -mb-2">{topics}</p>
      </div>

      <Dialog
          size="xs"
          open={open}
          handler={handleOpen}
          className=" flex h-screen items-center  shadow-none"
        >
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex comment-div flex-col gap-4">
              <div className="flex  ">
              <Typography className="flex align-middle m-auto justify-center"  variant="h4" color="blue-gray">
                Comment
              </Typography>
              <button onClick={handleOpen}  className="flex border-2 rounded-full w-8 items-center m-auto justify-center h-8 text-2xl absolute right-10  "  variant="h4" color="blue-gray">
                X
              </button>
              </div>
              <Typography className="-mb-2" variant="h6">
                Message
              </Typography>
              <input className="py-2 px-1" onChange={setmessage}  name="Message" placeholder="Enter your comment..." size="lg" />
            </CardBody>
            <CardFooter className="pt-0">
              <Button className='comment-btn' variant="gradient" onClick={()=>{
                savedata();
                handleOpen()
              }} fullWidth>
                Send
              </Button>
              
              
            </CardFooter>
          </Card>
        </Dialog>
        <ToastContainer />
    </div>
  );
}

export default Post;
