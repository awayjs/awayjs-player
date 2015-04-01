declare module "awayjs-player/lib/adapters/AS2ColorAdapter" {
	import AS2SymbolAdapter = require("awayjs-player/lib/adapters/AS2SymbolAdapter");
	export = AS2SymbolAdapter;
	
}

declare module "awayjs-player/lib/adapters/AS2MovieClipAdapter" {
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	import AS2SymbolAdapter = require("awayjs-player/lib/adapters/AS2SymbolAdapter");
	import MovieClipAdapter = require("awayjs-player/lib/adapters/MovieClipAdapter");
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	import MovieClipEvent = require("awayjs-player/lib/events/MovieClipEvent");
	class AS2MovieClipAdapter extends AS2SymbolAdapter implements MovieClipAdapter {
	    private currentFrameIndex;
	    private _nameChangeCallback;
	    private _onEnterFrame;
	    private _onRelease;
	    constructor(adaptee: DisplayObjectContainer);
	    _framesloaded: number;
	    _currentframe: number;
	    _totalFrames: number;
	    enabled: boolean;
	    duplicateMovieClip(name: string, depth: number, initObject: Object): MovieClip;
	    getBytesLoaded(): number;
	    getBytesTotal(): number;
	    getInstanceAtDepth(depth: number): MovieClip;
	    getNextHighestDepth(): number;
	    globalToLocal(pt: any): void;
	    gotoAndPlay(frame: any): void;
	    gotoAndStop(frame: any): void;
	    localToGlobal(pt: any): void;
	    nextFrame(): void;
	    play(): void;
	    prevFrame(): void;
	    setMask(mc: DisplayObject): void;
	    stop(): void;
	    swapDepths(target: DisplayObject): void;
	    clone(newAdaptee: DisplayObjectContainer): MovieClipAdapter;
	    onEnterFrame: Function;
	    onRelease: Function;
	    _parent: AS2MovieClipAdapter;
	    _pRegisterChild(child: DisplayObject): void;
	    _pUnregisterChild(child: DisplayObject): void;
	    _pOnChildAdded(event: MovieClipEvent): void;
	    private _pOnChildRemoved(event);
	    private _pOnChildNameChanged(event);
	    private _gotoFrame(frame);
	    private _updateDepths(target);
	    private sortChildrenByDepth(a, b);
	    private _replaceEventListener(eventType, currentListener, newListener);
	}
	export = AS2MovieClipAdapter;
	
}

declare module "awayjs-player/lib/adapters/AS2SymbolAdapter" {
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	import AS2MovieClipAdapter = require("awayjs-player/lib/adapters/AS2MovieClipAdapter");
	class AS2SymbolAdapter {
	    private _adaptee;
	    private __quality;
	    private static ROOT;
	    private static REFERENCE_TIME;
	    private static CLASS_REPLACEMENTS;
	    constructor(adaptee: DisplayObjectContainer);
	    adaptee: DisplayObjectContainer;
	    _name: string;
	    _rotation: number;
	    _x: number;
	    _y: number;
	    _xscale: number;
	    _yscale: number;
	    _visible: boolean;
	    getDepth(): number;
	    _quality: string;
	    quality: string;
	    trace(): void;
	    getTimer(): Number;
	    _alpha: number;
	    _url: string;
	    _root: AS2MovieClipAdapter;
	    random(range: number): number;
	    classReplacements: Object;
	}
	export = AS2SymbolAdapter;
	
}

declare module "awayjs-player/lib/adapters/MovieClipAdapter" {
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	interface MovieClipAdapter {
	    adaptee: DisplayObjectContainer;
	    clone(newAdaptee: DisplayObjectContainer): MovieClipAdapter;
	    classReplacements: Object;
	}
	export = MovieClipAdapter;
	
}

declare module "awayjs-player/lib/display/MovieClip" {
	import DisplayObjectContainer = require("awayjs-display/lib/containers/DisplayObjectContainer");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import MovieClipAdapter = require("awayjs-player/lib/adapters/MovieClipAdapter");
	import TimelineKeyFrame = require("awayjs-player/lib/timeline/TimelineKeyFrame");
	class MovieClip extends DisplayObjectContainer {
	    static assetType: string;
	    private _keyFrames;
	    private _time;
	    private _currentFrameIndex;
	    private _fps;
	    private _isPlaying;
	    private _loop;
	    private _numFrames;
	    private _prototype;
	    private _adapter;
	    private _potentialChildren;
	    constructor();
	    numFrames: number;
	    jumpToLabel(label: string): void;
	    currentFrameIndex: number;
	    adapter: MovieClipAdapter;
	    name: string;
	    addChild(child: DisplayObject): DisplayObject;
	    removeChild(child: DisplayObject): DisplayObject;
	    fps: number;
	    assetType: string;
	    /**
	     * Starts playback of animation from current position
	     */
	    play(): void;
	    /**
	     * should be called right before the call to away3d-render.
	     */
	    update(timeDelta: number): void;
	    /**
	     * Add a new TimelineFrame.
	     */
	    addFrame(newFrame: TimelineKeyFrame): void;
	    /**
	     * Returns the child ID for this MovieClip
	     */
	    getPotentialChild(id: number): DisplayObject;
	    /**
	     * Returns the child ID for this MovieClip
	     */
	    registerPotentialChild(prototype: DisplayObject): number;
	    activateChild(id: number): void;
	    deactivateChild(id: number): void;
	    /**
	     * This is called inside the TimelineFrame.execute() function.
	     */
	    private executeFrameScript(frameScript);
	    /**
	     * Stop playback of animation and hold current position
	     */
	    stop(): void;
	    clone(): DisplayObject;
	    private resetPlayHead();
	    private advanceFrame(skipFrames?);
	    private updateKeyFrames(skipFrames);
	    logHierarchy(depth?: number): void;
	    printHierarchyName(depth: number, target: DisplayObject): void;
	}
	export = MovieClip;
	
}

declare module "awayjs-player/lib/events/MovieClipEvent" {
	import Event = require("awayjs-core/lib/events/Event");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	class MovieClipEvent extends Event {
	    static NAME_CHANGED: string;
	    static CHILD_ADDED: string;
	    static CHILD_REMOVED: string;
	    displayObject: DisplayObject;
	    constructor(type: string, displayObject: DisplayObject);
	}
	export = MovieClipEvent;
	
}

declare module "awayjs-player/lib/factories/TimelineSceneGraphFactory" {
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	interface TimelineSceneGraphFactory {
	    createMovieClip(): MovieClip;
	}
	export = TimelineSceneGraphFactory;
	
}

declare module "awayjs-player/lib/partition/Partition2DNode" {
	import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import NodeBase = require("awayjs-display/lib/partition/NodeBase");
	class Partition2DNode extends NodeBase {
	    private _root;
	    private _maskConfigID;
	    private _index;
	    constructor(root: DisplayObject);
	    acceptTraverser(traverser: CollectorBase): void;
	    traverseSceneGraph(displayObject: any, traverser: CollectorBase, maskID?: number, appliedMasks?: DisplayObject[]): void;
	    private traverseChildren(container, traverser, maskID, appliedMasks);
	    iAddNode(node: NodeBase): void;
	}
	export = Partition2DNode;
	
}

declare module "awayjs-player/lib/factories/AS2SceneGraphFactory" {
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	import TimelineSceneGraphFactory = require("awayjs-player/lib/factories/TimelineSceneGraphFactory");
	class AS2SceneGraphFactory implements TimelineSceneGraphFactory {
	    createMovieClip(): MovieClip;
	}
	export = AS2SceneGraphFactory;
	
}

declare module "awayjs-player/lib/renderer/Mask" {
	import DisplayObject = require("awayjs-display/lib/base/DisplayObject");
	import RenderableBase = require("awayjs-renderergl/lib/pool/RenderableBase");
	import Stage = require("awayjs-stagegl/lib/base/Stage");
	import Renderer2D = require("awayjs-player/lib/renderer/Renderer2D");
	class Mask {
	    private _stage;
	    private _renderer;
	    private _registeredMasks;
	    constructor(stage: Stage, renderer: Renderer2D);
	    registerMask(obj: RenderableBase): void;
	    renderMasks(masks: DisplayObject[]): void;
	    reset(): void;
	    private _draw(renderable);
	}
	export = Mask;
	
}

declare module "awayjs-player/lib/partition/Partition2D" {
	import DisplayObject = require("awayjs-display/lib/containers/DisplayObjectContainer");
	import Partition = require("awayjs-display/lib/partition/Partition");
	class Partition2D extends Partition {
	    constructor(root: DisplayObject);
	}
	export = Partition2D;
	
}

declare module "awayjs-player/lib/renderer/RenderableSort2D" {
	import IRenderable = require("awayjs-display/lib/pool/IRenderable");
	import IEntitySorter = require("awayjs-display/lib/sort/IEntitySorter");
	/**
	 * @class away.sort.RenderableMergeSort
	 */
	class RenderableMergeSort implements IEntitySorter {
	    sortBlendedRenderables(head: IRenderable): IRenderable;
	    sortOpaqueRenderables(head: IRenderable): IRenderable;
	}
	export = RenderableMergeSort;
	
}

declare module "awayjs-player/lib/timeline/TimelineKeyFrame" {
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
	class TimelineKeyFrame {
	    private _startTime;
	    private _endTime;
	    private _duration;
	    private _frameCommands;
	    private _frameConstructCommands;
	    private _frameDestructCommands;
	    private _isActive;
	    constructor();
	    addCommand(command: FrameCommand): void;
	    addConstructCommand(command: FrameCommand): void;
	    addDestructCommand(command: FrameCommand): void;
	    startTime: number;
	    duration: number;
	    endTime: number;
	    isActive: boolean;
	    setFrameTime(startTime: number, duration: number): void;
	    activate(sourceMovieClip: MovieClip): void;
	    deactivate(sourceMovieClip: MovieClip): void;
	    update(sourceMovieClip: MovieClip, time: number): void;
	}
	export = TimelineKeyFrame;
	
}

declare module "awayjs-player/lib/renderer/Renderer2D" {
	import CollectorBase = require("awayjs-display/lib/traverse/CollectorBase");
	import Stage = require("awayjs-stagegl/lib/base/Stage");
	import DefaultRenderer = require("awayjs-renderergl/lib/DefaultRenderer");
	import IRendererPoolClass = require("awayjs-renderergl/lib/pool/IRendererPoolClass");
	import RenderableBase = require("awayjs-renderergl/lib/pool/RenderableBase");
	class Renderer2D extends DefaultRenderer {
	    private _mask;
	    constructor(rendererPoolClass?: IRendererPoolClass, stage?: Stage);
	    drawRenderables(renderable: RenderableBase, entityCollector: CollectorBase): void;
	    applyRenderable(renderable: RenderableBase): void;
	}
	export = Renderer2D;
	
}

declare module "awayjs-player/lib/timeline/commands/AddChildAtDepthCommand" {
	import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	class AddChildAtDepthCommand implements FrameCommand {
	    private _childID;
	    private _target_depth;
	    constructor(childID: number, target_depth: number);
	    execute(sourceMovieClip: MovieClip, time: number): void;
	}
	export = AddChildAtDepthCommand;
	
}

declare module "awayjs-player/lib/timeline/InterpolationObject" {
	/**
	 * TimeLineObject represents a unique object that is (or will be) used by a TimeLine.
	 *  A TimeLineObject basically consists of an objID, and an IAsset.
	 *  The FrameCommands hold references to these TimeLineObjects, so they can access and modify the IAssets
	
	 */
	class InterpolationObject {
	    private _type;
	    private _startValue;
	    private _startTime;
	    private _endValue;
	    private _endTime;
	    private _duration;
	    constructor(type: number, startValue: any, endValue: any, startTime: number, endTime: number);
	    getState(time: number, speed: number): any;
	}
	export = InterpolationObject;
	
}

declare module "awayjs-player/lib/timeline/commands/AddChildCommand" {
	import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	class AddChildCommand implements FrameCommand {
	    private _childID;
	    constructor(childID: number);
	    execute(sourceMovieClip: MovieClip, time: number): void;
	}
	export = AddChildCommand;
	
}

declare module "awayjs-player/lib/timeline/commands/ApplyAS2DepthsCommand" {
	import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	class ApplyAS2DepthsCommand implements FrameCommand {
	    constructor();
	    execute(sourceMovieClip: MovieClip, time: number): void;
	    private sortChildrenByDepth(a, b);
	}
	export = ApplyAS2DepthsCommand;
	
}

declare module "awayjs-player/lib/timeline/commands/ExecuteScriptCommand" {
	import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	class ExecuteScriptCommand implements FrameCommand {
	    private _script;
	    private _translatedScript;
	    constructor(script: Function);
	    constructor(script: string);
	    execute(sourceMovieClip: MovieClip, time: number): void;
	    translateScript(classReplacements: any): void;
	}
	export = ExecuteScriptCommand;
	
}

declare module "awayjs-player/lib/timeline/commands/FrameCommand" {
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	/**
	 * IMPORTANT: FrameCommands are NOT allowed to store references to actual objects, only childIDs. This prevents complex
	 * cross-command object reference management when instancing. It also allows commands and frames instances to be shared
	 * across MovieClip instances.
	 */
	interface FrameCommand {
	    execute(sourceMovieClip: MovieClip, time: number): void;
	}
	export = FrameCommand;
	
}

declare module "awayjs-player/lib/timeline/commands/RemoveChildCommand" {
	import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	class RemoveChildCommand implements FrameCommand {
	    private _childID;
	    constructor(childID: number);
	    execute(sourceMovieClip: MovieClip, time: number): void;
	}
	export = RemoveChildCommand;
	
}

declare module "awayjs-player/lib/timeline/commands/RemoveChildrenAtDepthCommand" {
	import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	class RemoveChildrenAtDepthCommand implements FrameCommand {
	    private _depth_to_remove;
	    constructor(depth_to_remove: Array<number>);
	    execute(sourceMovieClip: MovieClip, time: number): void;
	}
	export = RemoveChildrenAtDepthCommand;
	
}

declare module "awayjs-player/lib/timeline/commands/SetInstanceNameCommand" {
	import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	class SetInstanceNameCommand implements FrameCommand {
	    private _targetID;
	    private _name;
	    constructor(targetID: number, name: string);
	    execute(sourceMovieClip: MovieClip, time: number): void;
	}
	export = SetInstanceNameCommand;
	
}

declare module "awayjs-player/lib/timeline/commands/UpdatePropertyCommand" {
	import FrameCommand = require("awayjs-player/lib/timeline/commands/FrameCommand");
	import MovieClip = require("awayjs-player/lib/display/MovieClip");
	class UpdatePropertyCommand implements FrameCommand {
	    private _targetID;
	    private _propertyName;
	    private _value;
	    constructor(targetID: number, propertyName: string, value: any);
	    execute(sourceMovieClip: MovieClip, time: number): void;
	}
	export = UpdatePropertyCommand;
	
}

