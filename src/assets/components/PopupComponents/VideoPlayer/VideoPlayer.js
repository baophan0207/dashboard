import React, { useState, useEffect, useRef } from 'react'

import { Box, IconButton, Slider, Typography } from '@mui/material'

import Icon from '../../../IconLibrary/Icon'

import './VideoPlayer.css'

const VideoPlayer = (props) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(50)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [muted, setMuted] = useState(false)
    const [seeking, setSeeking] = useState(false)

    const videoRef = useRef()

    useEffect(() => {
        const video = videoRef.current
        video.addEventListener('loadedmetadata', handleLoadDuration)
        video.addEventListener('timeupdate', handleTimeUpdate)

        // Add keyboard controls
        const handleKeyPress = (e) => {
            switch (e.key.toLowerCase()) {
                case ' ':
                case 'k':
                    e.preventDefault()
                    handlePlayPause()
                    break
                case 'f':
                    handleFullScreen()
                    break
                case 'm':
                    handleMuteUnmute()
                    break
                case 'arrowleft':
                    handleSkip(-10)
                    break
                case 'arrowright':
                    handleSkip(10)
                    break
                default:
                    break
            }
        }

        document.addEventListener('keydown', handleKeyPress)

        return () => {
            video.removeEventListener('loadedmetadata', handleLoadDuration)
            video.removeEventListener('timeupdate', handleTimeUpdate)
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [])

    const handleLoadDuration = () => {
        setDuration(videoRef.current.duration)
    }

    const handleTimeUpdate = () => {
        if (seeking) return
        const video = videoRef.current
        if (video.currentTime === video.duration) {
            setIsPlaying(false)
        }
        setCurrentTime(video.currentTime)
    }

    const handleSeekChange = (event, newValue) => {
        setCurrentTime(newValue)
        videoRef.current.currentTime = newValue
    }

    const handleSeekEnd = () => {
        setSeeking(false)
    }

    const handlePlayPause = () => {
        const video = videoRef.current
        if (!video) return

        try {
            if (isPlaying) {
                video.pause()
            } else {
                video.play()
            }
            setIsPlaying(!isPlaying)
        } catch (error) {
            console.error('Error playing/pausing video:', error)
            // Reset playing state if play failed
            setIsPlaying(false)
        }
    }

    const handleMuteUnmute = () => {
        const video = videoRef.current
        const newMutedState = !muted
        video.muted = newMutedState
        setMuted(newMutedState)
    }

    const handleVolumeChange = (e, newVolume) => {
        setVolume(newVolume)
        videoRef.current.volume = newVolume / 100
        localStorage.setItem('videoVolume', newVolume.toString())
    }

    const handleFullScreen = () => {
        const video = videoRef.current
        if (video.requestFullscreen) {
            video.requestFullscreen()
        }
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    }

    const handleSkip = (seconds) => {
        const video = videoRef.current
        video.currentTime = Math.min(
            Math.max(video.currentTime + seconds, 0),
            video.duration
        )
    }

    return (
        <Box className="video-player-container" sx={{ flex: 1 }}>
            {/*  Video Player  */}
            <video
                ref={videoRef}
                onTimeUpdate={handleTimeUpdate}
                src={props.videoUrl}
                controls={false}
                className="video-player"
            />
            {/* Overlay Play/Pause Button */}
            <div className="overlay" onClick={handlePlayPause}>
                <IconButton
                    className="icon-button"
                    sx={{
                        width: '86px',
                        height: '86px',
                        borderWidth: '6px',
                        borderColor: 'gray',
                        backgroundColor: 'transparent',
                        borderStyle: 'solid',
                    }}
                >
                    {isPlaying ? (
                        <Icon icon={'pause'} size={32} /> // Pause button when playing
                    ) : (
                        <Icon icon={'play'} size={32} /> // Play button when paused
                    )}
                </IconButton>
            </div>
            <Slider
                className="custom-slider"
                value={currentTime}
                max={duration}
                step={0.1}
                onChange={handleSeekChange}
                onMouseUp={handleSeekEnd}
                onTouchEnd={handleSeekEnd}
            />
            {/* Controls */}
            <Box className="control-container">
                <Box className="control-content">
                    {/* Play/Pause */}
                    <IconButton
                        className="icon-button"
                        onClick={handlePlayPause}
                    >
                        {!isPlaying || currentTime === duration ? (
                            <Icon icon={'play'} />
                        ) : (
                            <Icon icon={'pause'} />
                        )}
                    </IconButton>
                    {/* Forward and backward */}
                    <IconButton
                        className="icon-button"
                        onClick={() => handleSkip(-10)}
                    >
                        <Icon icon={'left_arrow2'} />
                    </IconButton>
                    <IconButton
                        className="icon-button"
                        onClick={() => handleSkip(10)}
                    >
                        <Icon icon={'right_arrow2'} />
                    </IconButton>
                    {/* Volume */}
                    <IconButton
                        className="icon-button"
                        onClick={handleMuteUnmute}
                    >
                        {volume === 0 || muted ? (
                            <Icon icon={'mute'} />
                        ) : (
                            <Icon icon={'speaker'} />
                        )}
                    </IconButton>

                    <Slider
                        value={volume}
                        onChange={handleVolumeChange}
                        sx={{ width: 100 }}
                        className="custom-slider"
                    />
                </Box>

                <Box className="control-content">
                    {/*  Current time  */}
                    <Typography className="video-time">
                        {formatTime(currentTime)}
                        {' / '}
                        {formatTime(duration)}
                    </Typography>
                    <IconButton className="icon-button">
                        <Icon icon={'setting'} />
                    </IconButton>
                    <IconButton
                        className="icon-button"
                        onClick={handleFullScreen}
                    >
                        <Icon icon={'square_frame_workbench'} />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}

export default VideoPlayer
