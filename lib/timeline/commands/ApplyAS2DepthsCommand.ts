import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
import MovieClip = require("awayjs-player/lib/display/MovieClip");

// We're using a specific command so we don't need to manage an AS2-like "depth" property, which has no meaning in Away3D's display hierarchy
// This implementation itself is a hack, tho, but it works.
class ApplyAS2DepthsCommand implements FrameCommand
{
    constructor()
    {
    }

    public execute(sourceMovieClip : MovieClip, time:number):void
    {
        var childrenArray = sourceMovieClip["_children"];
        childrenArray.sort(this.sortChildrenByDepth);
    }

    private sortChildrenByDepth(a:DisplayObject, b:DisplayObject) : number
    {
        var da = <number>(a["__AS2Depth"]);
        var db = <number>(b["__AS2Depth"]);
        if (da === undefined) da = 0;
        if (db === undefined) db = 0;
        return da - db;
    }
}
export = ApplyAS2DepthsCommand;