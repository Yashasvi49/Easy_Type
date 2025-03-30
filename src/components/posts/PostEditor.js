import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { MdPreview, MdClear, MdArrowBack, MdPublish, MdSave } from 'react-icons/md';
import { addPost, setPostContent, showNotification, updatePost } from '../../store';
import { auth, db } from '../../firebase-config';
import MarkdownPreviewRef from '@uiw/react-markdown-preview';
import Button from '../other/Button';
import Input from '../input/Input';
import ReactIcon from '../other/ReactIcon';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function PostEditor({ topics }) {
  const [textToCopy, setTextToCopy] = useState('');

  const { editablePostData } = useSelector((state) => state.userPostsReducer);

  const [postTitle, setPostTitle] = useState(editablePostData?.header || '');
  const [previewMode, setPreviewMode] = useState(false);

  const dispatch = useDispatch();

  const publishPost = async () => {
    if (topics.length === 0) {
      dispatch(showNotification({
        id: nanoid(), type: 'Error', text: 'Select at least one topic'
      }));

      return;
    }

    const now = new Date();

    if (editablePostData) {
      try {
        const post = {
          header: postTitle,
          content: postContent,
          topics,
          editDate: now.getTime()
        };

        await updateDoc(doc(db, 'users', auth.currentUser.uid, 'posts', editablePostData.id), { ...post, editDate: now });

        dispatch(showNotification({
          id: nanoid(), type: 'Info', text: 'Post successfully updated'
        }));
        dispatch(updatePost(post));
      } catch (error) {
        dispatch(showNotification({
          id: nanoid(), type: 'Error', text: 'Failed to update post'
        }));
      }
    } else {
      try {
        const post = {
          uid: auth.currentUser.uid,
          header: postTitle,
          content: postContent,
          topics,
          reactions: [],
          marked: [],
          publishDate: now.getTime(),
          editDate: ''
        };

        await addDoc(collection(db, 'users', auth.currentUser.uid, 'posts'), { ...post, publishDate: now });

        dispatch(showNotification({
          id: nanoid(), type: 'Info', text: 'Post successfully published'
        }));
        dispatch(addPost(post));
      } catch (error) {
        dispatch(showNotification({
          id: nanoid(), type: 'Error', text: 'Failed to publish post'
        }));
      }
    }
  }

  const openPreviewMode = () => {
    if (!postTitle || !postContent) {
      dispatch(showNotification({
        id: nanoid(), type: 'Error', text: 'Enter the title and content of the post'
      }));

      return;
    }

    setPreviewMode(!previewMode);
  }

  const handleInput = (text) => {
    setTextToCopy(text)
    dispatch(setPostContent(text));
  }

  const clearContent = () => {
    dispatch(showNotification({
      id: nanoid(), type: 'Confirm', text: 'Clear post content?'
    }));
  }

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
const {postContent}= useSelector((state) => state.userPostsReducer);
  const [ContentOfPost, setContent] = useState(postContent);
  return (
    <div className="flex flex-col space-y-4 grow w-full p-6 border-b-2 border-neutral-3 overflow-auto">
      {(previewMode) ?
        <MarkdownPreviewRef className="grow border-b-2 border-neutral-3" source={postContent} /> :
        <><Input value={postTitle} onChange={(text) => { setPostTitle(text) }} type="text" placeholder="Post title" largeFont />
        
          <textarea className=" bg-neutral-1 grow p-4 text-xl border-[3px] border-neutral-3 rounded-lg focus:outline-none"
            placeholder="Enter Markdown text ..." value={textToCopy} onInput={(event) => { handleInput(event.target.value) }} /></>}
 <textarea className=" bg-neutral-1 grow p-4 text-l border-[3px] border-neutral-3 rounded-lg focus:outline-none"
            placeholder="Enter Markdown text ..." value={transcript} />

      <div className="flex flex-row sm:flex-col justify-between">
       <div className='flex items-center gap-3'>
      <Button onClick={startListening}>
              <ReactIcon src={<MdPublish className="w-6 h-6" />} color="white" />
            <span>Start Listening</span>
      </Button>  
      <Button onClick={()=>{
    SpeechRecognition.stopListening();
    let testing = ContentOfPost + ' ' + transcript+ ' ';
    setContent(testing)
   dispatch(setPostContent(testing));
   
console.log("kch to bolo baapu",testing);
      }}>
              <ReactIcon src={<MdPublish className="w-6 h-6" />} color="white" />
            <span>Stop Listening</span>
      </Button>
      </div>
     <div className='flex items-center gap-3'>
        <Button onClick={openPreviewMode} secondary>
          {(previewMode) ?
            <ReactIcon src={<MdArrowBack className="w-6 h-6" />} color="black" /> :
            <ReactIcon src={<MdPreview className="w-6 h-6" />} color="black" />}
          <span className="text-[black]">{(previewMode) ? 'Back to editing' : 'Preview'}</span>
        </Button>
    
        {(previewMode) ?
          <Button onClick={publishPost}>
            {(editablePostData) ?
              <ReactIcon src={<MdSave className="w-6 h-6" />} color="white" /> :
              <ReactIcon src={<MdPublish className="w-6 h-6" />} color="white" />}
            <span>{(editablePostData) ? 'Save changes' : 'Publish post'}</span>
          </Button> :
          <Button onClick={clearContent} error>
            <ReactIcon src={<MdClear className="w-6 h-6" />} color="white" />
            <span>Clear</span>
          </Button>}
      </div >
      </div>
    </div>
  );
}

export default PostEditor;
