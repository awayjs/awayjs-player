import WaveAudio = require("awayjs-core/lib/data/WaveAudio");
import Event = require("awayjs-core/lib/events/Event");
import AS2MovieClipAdapter = require("awayjs-player/lib/adapters/AS2MovieClipAdapter");
import AS2MCSoundProps = require("awayjs-player/lib/adapters/AS2MCSoundProps");
import AssetLibrary = require("awayjs-core/lib/library/AssetLibrary");

// also contains global AS2 functions
class AS2SoundAdapter
{
    //private _transform : Object;
    private _target : AS2MovieClipAdapter;
    private _soundProps : AS2MCSoundProps;

    private static _globalSoundProps : AS2MCSoundProps = new AS2MCSoundProps();

    private _onGlobalChangeDelegate:(event:Event) => void;

    // TODO: Any real Sound stuff should be externalized for AwayJS use. For now use internally since it's only 2D.
    constructor(target:AS2MovieClipAdapter)
    {
        // not sure how to handle target yet
        this._target = target;
        this._soundProps = (target != null && target.__pSoundProps)? this._target.__pSoundProps : AS2SoundAdapter._globalSoundProps;

        this._onGlobalChangeDelegate = (event:Event) => this.onGlobalChange(event);

        AS2SoundAdapter._globalSoundProps.addEventListener(Event.CHANGE, this._onGlobalChangeDelegate);
    }

    get looping()
    {
        return this._soundProps.loops;
    }

    set looping(value:number)
    {
        this._soundProps.loops = value;
    }

    attachSound(id:string)
    {
        // TODO: This will be AudioAsset or something
        var asset = <WaveAudio>AssetLibrary.getAsset(id);
        var source : HTMLAudioElement;
        if(asset)
            source = <HTMLAudioElement>asset.htmlAudioElement;
        else{
            source = new Audio();
        }
        this._soundProps.audio = <HTMLAudioElement>source.cloneNode();
        this.updateVolume();
    }

    /*getBytesLoaded() : number
    {
        return 1;
    }

    getBytesTotal() : number
    {
        return 1;
    }*/

    getPan() : number
    {
        return this._soundProps.pan;
    }

    setPan(value : number)
    {
        this._soundProps.pan = value;
        // panning not supported at this point
    }

    /*getTransform() : Object
    {
        return this._transform;
    }

    setTransform(value:Object)
    {
        this._transform = value;
    }*/

    getVolume() : number
    {
        return this._soundProps.volume * 100;
    }

    setVolume(value : number)
    {
        this._soundProps.volume = value / 100;
        this.updateVolume();
    }

    /*loadSound(url:string, isStreaming:boolean)
    {
        this.disposeAudio();
        // how to handle isStreaming == false? Manually?
        this._soundProps.audio = new Audio();
        this._soundProps.audio.src = url;
        this.initAudio();
    }*/

    start(offsetInSeconds:number = 0, loops:number = 0)
    {
        if(this._soundProps.audio) {
            this._soundProps.audio.currentTime = offsetInSeconds;
            this._soundProps.loops = loops;
            this._soundProps.audio.play();
        }
    }

    stop(linkageID:string = null)
    {
        if(this._soundProps.audio)
            this._soundProps.audio.pause();
    }

    get position() : number
    {
        if(this._soundProps.audio)
            return this._soundProps.audio.currentTime;
        return 0;
    }

    set position(value : number)
    {
        if(this._soundProps.audio)
            this._soundProps.audio.currentTime = value;
    }

    get duration() : number
    {

        if(this._soundProps.audio)
            return this._soundProps.audio.duration;
        return 0;
    }

    get id3() : Object
    {
        return {};
    }

    private onGlobalChange(event:Event)
    {
        this.updateVolume();
    }

    private updateVolume()
    {
        if(this._soundProps.audio){
            var vol:number =  this._soundProps.volume * AS2SoundAdapter._globalSoundProps.volume;
            if(vol>1)
                vol=1;
            if(vol<0)
                vol=0;
            this._soundProps.audio.volume = vol;
        }
    }
}
export = AS2SoundAdapter;