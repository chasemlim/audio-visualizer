export default class Pad { 

    // Pass in Audio Context from board
    constructor(soundType, audioCtx) {
        this.soundType = soundType;
        this.audioCtx = audioCtx;
        this.audioBuffer;
        this.sampleSource;
        this.volume = 0;

        this.setupSample()
    }

    determineSound() {
        switch (this.soundType) {
            case 'hihat':
                return 'src/assets/audio/hihat.wav';
            case 'tom1':
                return 'src/assets/audio/tom1.wav';
            case 'tom2':
                return 'src/assets/audio/tom2.wav';
            case 'tom3':
                return 'src/assets/audio/tom3.wav';
            case 'tom4':
                return 'src/assets/audio/tom4.wav';
            case 'snare1':
                return 'src/assets/audio/snare1.wav';
            case 'snare2':
                return 'src/assets/audio/snare2.wav';
            case 'clap':
                return 'src/assets/audio/clap.wav';
            case 'kick':
                return 'src/assets/audio/kick.wav';
            default:
                return 'src/assets/audio/drums.wav';
        }
    } //

    async getFile(audioCtx, filepath) { // this works now
        const res = await fetch(filepath);

        const arrayBuffer = await res.arrayBuffer();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        this.audioBuffer = audioBuffer;    
        return audioBuffer;
    }

    async setupSample() {
        const filePath = this.determineSound();
        
        const sample = await this.getFile(this.audioCtx, filePath);

        const sampleSource = this.audioCtx.createBufferSource();
        sampleSource.buffer = sample;
        sampleSource.connect(this.audioCtx.destination);
        this.sampleSource = sampleSource;

        return sample;
    }


    play() {
        const sampleSource = this.audioCtx.createBufferSource();
        sampleSource.buffer = this.audioBuffer;
        sampleSource.connect(this.audioCtx.destination);
        this.sampleSource = sampleSource;

        this.sampleSource.start();
        return this.sampleSource;
    }
}