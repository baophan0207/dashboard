import React, { Component } from 'react'

import { Box, IconButton, Slider, Typography } from '@mui/material'

import Icon from '../../../IconLibrary/Icon'

import './VideoPlayer.css'

class VideoPlayer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            videoUrl: '',
            isPlaying: false,
            volume: 50,
            currentTime: 0,
            duration: 0,
            muted: false,
            seeking: false,
        }
        this.videoRef = React.createRef()
    }

    componentDidMount() {
        this.setState({ videoUrl: this.props.videoUrl })
        this.videoRef.current.addEventListener(
            'loadedmetadata',
            this.handleLoadDuration
        )
        this.videoRef.current.addEventListener(
            'timeupdate',
            this.handleTimeUpdate
        )
    }

    componentWillUnmount() {
        this.videoRef.current.removeEventListener(
            'loadedmetadata',
            this.handleLoadDuration
        )
        this.videoRef.current.removeEventListener(
            'timeupdate',
            this.handleTimeUpdate
        )
    }

    handleLoadDuration = () => {
        this.setState({ duration: this.videoRef.current.duration })
    }

    handleTimeUpdate = () => {
        if (this.state.seeking) return
        if (this.state.currentTime === this.state.duration) {
            this.setState({ isPlaying: false })
        }
        this.setState({ currentTime: this.videoRef.current.currentTime })
    }

    handleSeekChange = (event, newValue) => {
        this.setState({ currentTime: newValue })
    }

    // Handle when user stops seeking
    handleSeekCommitted = (event, newValue) => {
        this.videoRef.current.currentTime = newValue
        this.setState({ seeking: false })
    }

    handlePlayPause = () => {
        const video = this.videoRef.current
        if (this.state.isPlaying) {
            video.pause()
        } else {
            video.play()
        }
        this.setState({ isPlaying: !this.state.isPlaying })
    }

    handleMuteUnmute = () => {
        const video = this.videoRef.current

        this.setState({ muted: !this.state.muted }, () => {
            video.muted = this.state.muted
        })
    }

    handleVolumeChange = (e, newVolume) => {
        this.setState({ volume: newVolume })
        this.videoRef.current.volume = newVolume / 100
    }

    handleFullScreen = () => {
        const video = this.videoRef.current
        if (video.requestFullscreen) {
            video.requestFullscreen()
        }
    }

    formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    }

    render() {
        const { videoUrl, isPlaying, volume, muted, currentTime, duration } =
            this.state

        return (
            <Box className="video-player-container" sx={{ flex: 1 }}>
                {/*  Video Player  */}
                <video
                    ref={this.videoRef}
                    onTimeUpdate={this.handleTimeUpdate}
                    src={videoUrl}
                    controls={false}
                    className="video-player"
                />
                {/* Overlay Play/Pause Button */}
                <div className="overlay" onClick={this.handlePlayPause}>
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
                        {this.state.isPlaying ? (
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
                    onChange={this.handleSeekChange}
                    onChangeCommitted={this.handleSeekCommitted}
                />
                {/* Controls */}
                <Box className="control-container">
                    <Box className="control-content">
                        {/* Play/Pause */}
                        <IconButton
                            className="icon-button"
                            onClick={this.handlePlayPause}
                        >
                            {!isPlaying || currentTime === duration ? (
                                <Icon icon={'play'} />
                            ) : (
                                <Icon icon={'pause'} />
                            )}
                        </IconButton>
                        {/* Forward and backward */}
                        <IconButton className="icon-button">
                            <Icon icon={'left_arrow2'} />
                        </IconButton>
                        <IconButton className="icon-button">
                            <Icon icon={'right_arrow2'} />
                        </IconButton>
                        {/* Volume */}
                        <IconButton
                            className="icon-button"
                            onClick={this.handleMuteUnmute}
                        >
                            {volume === 0 || muted ? (
                                <Icon icon={'mute'} />
                            ) : (
                                <Icon icon={'speaker'} />
                            )}
                        </IconButton>

                        <Slider
                            value={volume}
                            onChange={this.handleVolumeChange}
                            sx={{ width: 100 }}
                            className="custom-slider"
                        />
                    </Box>

                    <Box className="control-content">
                        {/*  Current time  */}
                        <Typography className="video-time">
                            {this.formatTime(currentTime)}
                            {' / '}
                            {this.formatTime(duration)}
                        </Typography>
                        <IconButton className="icon-button">
                            <Icon icon={'setting'} />
                        </IconButton>
                        <IconButton
                            className="icon-button"
                            onClick={this.handleFullScreen}
                        >
                            <Icon icon={'square_frame_workbench'} />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        )
    }
}

export default VideoPlayer
