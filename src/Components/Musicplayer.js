import React, {useEffect, useState} from 'react';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';
import { FaStepBackward } from 'react-icons/fa';
import { FaStepForward } from 'react-icons/fa';
import {FaRegHeart} from 'react-icons/fa'
import {BsShuffle} from 'react-icons/bs'
import {FiRepeat} from 'react-icons/fi'
//-import css file
import "../iphone_design.css"
//-----------import images----------
import img1 from "../Images/Treat You Better.jpeg"
import img2 from "../Images/Parayuvaan.jpg"
import img3 from "../Images/Dia-2020-250x250.jpg"
import img4 from "../Images/Hymn For The Weekend.jpeg"
import img5 from "../Images/rahul.jpg"
import img6 from "../Images/butta.jpg"
import img7 from "../Images/Neeli Neeli Aakasam.jpg"
import img8 from "../Images/Sanam_Teri_Kasam_2016.jpeg"
import img9 from "../Images/friends.jpg"
import img10 from "../Images/Chhichhore.jpeg"
import img11 from "../Images/curtis-potvin-r66MoMi5hgk-unsplash.jpg"


//---------import songs---------

import song1 from "../Sounds/Shawn Mendes - Treat You Better.mp3"
import  song2 from "../Sounds/Parayuvaan_1.mp3"
import song3 from "../Sounds/[iSongs.info] 01 - Soul Of Dia.mp3"
import song4 from "../Sounds/Coldplay - Hymn For The Weekend.mp3"
import song5 from "../Sounds/[iSongs.info] 01 - Rocky Bhai.mp3"
import song6 from "../Sounds/Butta Bomma-Naasongs.fm.mp3"
import song7 from"../Sounds/[iSongs.info] 01 - Neeli Neeli Aakasam.mp3"
import song8 from "../Sounds/01 - Sanam Teri Kasam (Title Song).mp3"
import song9 from "../Sounds/Friends.mp3"
import song10 from "../Sounds/Khairiyat Sad - Chhichhore (SongsMp3.Com).mp3"
import song11 from "../Sounds/Maroon 5 - Memories.mp3"



const Musicplayer = () => {
    let songs=[song1,song2,song3,song4,song5,song6,song7,song8,song9,song10,song11]
    let images=[img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11]
    let songnames=["Treat You Better","Parayuvaan","Soul Of Dia","Hymn For The Weekend","Rocky Bhai","Butta Bomma-Naasongs",
        "Neeli Neeli Aakasam","Sanam Teri Kasam","Friends","Khairiyat Sad","Memorie"]
    const [addclass,setClass]=useState(false)
    const [heart,setHeart]=useState(false)
    const [repeat,setRepeat]=useState(false)
    const [repeatonce,setRepeatonce]=useState(false)
    const [prevst,setPrev]=useState(0)
    const [currentsong,setCurrentsong]=useState(0);
    const [currenttime,setCurrentTime]=useState(false)
    const [shuffle,setShuffle]=useState(false)
    const [isplay,setIsplay]=useState(false)
    const [autoplayval,setAutoplayval]=useState(false)
    const [samernd,setSamernd]=useState(false)
    const [audioTun] = useState(new Audio())
    let seekrange=document.getElementsByClassName('seekbar')[0]
    // let currentduration=document.getElementById("current_duration")

    document.body.onkeyup= function(e){
        if(e.key==32){
            setIsplay(!isplay)
        }
    }
    useEffect(()=>{
        audioTun.preload=true
        audioTun.src=songs[currentsong];
        console.log(currentsong)
        document.getElementsByClassName("background")[0].style.backgroundImage = "url(" + images[currentsong] + ")";
        document.getElementsByClassName("song_names")[0].innerHTML=songnames[currentsong]
    },[currentsong])

    const toggle=()=>setIsplay(!isplay)

    useEffect(()=>{
        console.log("use statae is called")
        if(isplay){
            if(currenttime){
                setCurrentTime(false)
                audioTun.preload=true
                audioTun.currentTime=0
                audioTun.play()
            }
            else {
                console.log("ncdbvcfxgvcbf")
                audioTun.currentTime = seekrange.value
                audioTun.play()
            }
        }
        else {
            console.log("Pause Button")
            audioTun.pause()
        }
    },[isplay,currentsong,samernd,repeatonce]);

    audioTun.onload=function(){
        seekrange.value=0
    }
    function formatTime(time) {
        var min = Math.floor(time / 60);
        var sec = Math.floor(time % 60);
        return min + ':' + ((sec<10) ? ('0' + sec) : sec);
    }
    const handelRepeat=()=>{
        setRepeat(!repeat)
        setClass(!addclass)
        console.log("repeated",repeat)
    }
    const handleHeart=()=>{
        setHeart(!heart)
    }
    const handelShuffle=()=>{
        setShuffle(!shuffle)
        setClass(!addclass)
        console.log("suffle val",shuffle)
    }
    const autoplayon=()=> {
        if (autoplayval) {
            setAutoplayval(false)
        } else {
            setAutoplayval(true)
            console.log("it is turned on")
        }
    }
    audioTun.ontimeupdate = function () {
        seekrange.value=audioTun.currentTime
        document.getElementById("current_duration").innerHTML=formatTime(audioTun.currentTime)
       seekrange.onchange=function () {
            audioTun.currentTime=seekrange.value
           if (isplay){
               setIsplay(true)
               audioTun.play()
           }
           else {
               setIsplay(false)
           }
        }
        if(autoplayval){
            if(audioTun.ended) {
                    PlayNext();
                    // setIsplay(true)

            }
        }
        else {
            if(audioTun.ended) {
                console.log("hello welcome here")
                setRepeatonce(false)
                if(repeat){
                    console.log("the repeat is on")
                    setCurrentsong(currentsong)
                    setCurrentTime(true)
                    setRepeatonce(true)
                }
                else if  (shuffle) {
                    console.log("suffle val in ended", shuffle)
                    let x = Math.floor((Math.random() * 10) + 1);
                     console.log("previous",prevst)
                    console.log("selected",x)
                     setCurrentTime(true)
                    setSamernd(false)
                    if(prevst===x){
                        setPrev(x)
                        console.log("same value")
                        setSamernd(true)
                        setCurrentsong(x)
                    }else {
                        setPrev(x)
                        setCurrentsong(x)
                    }

                }
            }
        }
    }

    const PlayNext=()=>{
        setCurrentTime(true)
        if (currentsong>=songs.length-1)setCurrentsong(0)
        else setCurrentsong(currentsong +1)
        setIsplay(true)
    }

    const PlayBefore=()=>{
        setCurrentTime(true)
        if(currentsong<=0){
            setCurrentsong(songs.length-1)
        }
        else setCurrentsong(currentsong- 1)
        setIsplay(true)
    }

    audioTun.onloadedmetadata = function() {
        var seekrange=document.getElementsByClassName('seekbar')[0]
        seekrange.max=audioTun.duration
        document.getElementById("Total_time").textContent=formatTime(audioTun.duration)
    };
    return (
        <div>
            <div className="iphone">
                <div className="iphone-top">
                    <span className="camera"></span>
                    <span className="sensor"></span>
                    <span className="speaker"></span>
                </div>
                <div className="top-bar"></div>
                <div className="iphone-screen">
                    <div className="background"></div>
                    <span className="autoplay_txt">AutoPlay</span>
                    <div className="song_names"></div>
                    <input type="checkbox" id="switch" onChange={autoplayon}/><label htmlFor="switch"></label>
                    <div className="seekbar_wrap">
                        <div className="duration" id="current_duration"> 0:00</div>
                        <input className="seekbar" type="range"   min="0" defaultValue="0" max="100"/>
                        <div className= "duration" id="Total_time"></div>
                    </div>
                    <div className="icons_wrap">
                       <FaStepBackward className="icon" onClick={PlayBefore} />
                        <div>
                            {
                                !isplay?<FaPlay className="icon" onClick={toggle}/> :< FaPause className="icon" onClick={()=>setIsplay(toggle)}/>
                            }
                        </div>
                        <FaStepForward className="icon" onClick={PlayNext} />
                    </div>
                    <div className="bottom_icons">
                            <BsShuffle className={shuffle?"bottom_icons_heart":"_icons"} onClick={handelShuffle}/>
                            <FiRepeat className={repeat?"bottom_icons_heart":"_icons"} onClick={handelRepeat}/>
                            <FaRegHeart className={heart?"bottom_icons_heart":"_icons"} onClick={handleHeart}/>
                    </div>

                </div>
                <div className="buttons">
                    <span className="on-off" ></span>
                    <span className="sleep"></span>
                    <span className="up"></span>
                    <span className="down"></span>
                </div>
                <div className="bottom-bar"></div>
                <div className="iphone-bottom">
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default Musicplayer;