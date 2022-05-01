
/* GLOBALS */

interface Document {
  onbeforeinput: (( this: GlobalEventHandlers, event: Event ) => any) | null,
  onfocusin: (( this: GlobalEventHandlers, event: FocusEvent ) => any) | null,
  onfocusout: (( this: GlobalEventHandlers, event: FocusEvent ) => any) | null
}

interface Element {
  cloneNode ( deep?: boolean ): Element
}

interface HTMLElement {
  cloneNode ( deep?: boolean ): HTMLElement
}

interface SVGElement {
  cloneNode ( deep?: boolean ): SVGElement
}

interface Node {
  recycle? ( node: Node ): void
}

interface Object {
  isPrototypeOf<T extends Object> ( this: T, object: Object ): object is T
}

/* JSX */

declare namespace JSX {

  /* HELPERS */

  type ArrayMaybe<T = unknown> = T[] | T;

  type FunctionMaybe<T = unknown> = ({ (): T }) | T;

  type ObservableMaybe<T = unknown> = ({ (): T }) | T;

  type AllClassProperties = {
    [key: string]: FunctionMaybe<null | undefined | boolean>
  };

  type AllCSSProperties = {
    [key: string]: FunctionMaybe<string | number | null | undefined>
  };

  type DOMCSSProperties = {
    [key in keyof Omit<CSSStyleDeclaration, 'item' | 'setProperty' | 'removeProperty' | 'getPropertyValue' | 'getPropertyPriority'>]?: FunctionMaybe<string | number | null | undefined>
  };

  type HTMLAttributeReferrerPolicy = '' | 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';

  /* MAIN */

  type Child = null | undefined | boolean | bigint | number | string | symbol | Node | Array<Child> | (() => Child) | ((() => Child) & { metadata: any });

  type Children = Child;

  type Element = Child;

  type ElementClass<P = {}> = { render: () => Child };

  type Ref<T = unknown> = (( value: T | undefined ) => unknown);

  interface ClassProperties extends AllClassProperties {}

  interface StyleProperties extends AllCSSProperties, DOMCSSProperties {}

  type TargetedEvent<T extends EventTarget = EventTarget, TypedEvent extends Event = Event> = Omit<TypedEvent, 'currentTarget'> & { readonly currentTarget: T };
  type TargetedAnimationEvent<T extends EventTarget> = TargetedEvent<T, AnimationEvent>;
  type TargetedClipboardEvent<T extends EventTarget> = TargetedEvent<T, ClipboardEvent>;
  type TargetedCompositionEvent<T extends EventTarget> = TargetedEvent<T, CompositionEvent>;
  type TargetedDragEvent<T extends EventTarget> = TargetedEvent<T, DragEvent>;
  type TargetedFocusEvent<T extends EventTarget> = TargetedEvent<T, FocusEvent>;
  type TargetedKeyboardEvent<T extends EventTarget> = TargetedEvent<T, KeyboardEvent>;
  type TargetedMouseEvent<T extends EventTarget> = TargetedEvent<T, MouseEvent>;
  type TargetedPointerEvent<T extends EventTarget> = TargetedEvent<T, PointerEvent>;
  type TargetedTouchEvent<T extends EventTarget> = TargetedEvent<T, TouchEvent>;
  type TargetedTransitionEvent<T extends EventTarget> = TargetedEvent<T, TransitionEvent>;
  type TargetedUIEvent<T extends EventTarget> = TargetedEvent<T, UIEvent>;
  type TargetedWheelEvent<T extends EventTarget> = TargetedEvent<T, WheelEvent>;

  type EventHandler<Event extends TargetedEvent> = { ( this: never, event: Event ): void };
  type AnimationEventHandler<T extends EventTarget> = EventHandler<TargetedAnimationEvent<T>>;
  type ClipboardEventHandler<T extends EventTarget> = EventHandler<TargetedClipboardEvent<T>>;
  type CompositionEventHandler<T extends EventTarget> = EventHandler<TargetedCompositionEvent<T>>;
  type DragEventHandler<T extends EventTarget> = EventHandler<TargetedDragEvent<T>>;
  type FocusEventHandler<T extends EventTarget> = EventHandler<TargetedFocusEvent<T>>;
  type GenericEventHandler<T extends EventTarget> = EventHandler<TargetedEvent<T>>;
  type KeyboardEventHandler<T extends EventTarget> = EventHandler<TargetedKeyboardEvent<T>>;
  type MouseEventHandler<T extends EventTarget> = EventHandler<TargetedMouseEvent<T>>;
  type PointerEventHandler<T extends EventTarget> = EventHandler<TargetedPointerEvent<T>>;
  type TouchEventHandler<T extends EventTarget> = EventHandler<TargetedTouchEvent<T>>;
  type TransitionEventHandler<T extends EventTarget> = EventHandler<TargetedTransitionEvent<T>>;
  type UIEventHandler<T extends EventTarget> = EventHandler<TargetedUIEvent<T>>;
  type WheelEventHandler<T extends EventTarget> = EventHandler<TargetedWheelEvent<T>>;

  type DetailedHTMLProps<Attributes extends HTMLAttributes<T>, T extends EventTarget> = ClassAttributes<T> & Attributes;

  interface ClassAttributes<T> {
    ref?: ArrayMaybe<Ref<T>>
  }

  interface ElementAttributesProperty {
    props: Record<string, any>
  }

  interface ElementChildrenAttribute {
    children: any
  }

  interface IntrinsicAttributes {
    ref?: ArrayMaybe<Ref<any>>
  }

  interface AriaAttributes {
    ariaActivedescendant?: FunctionMaybe<string>,
    ariaAtomic?: FunctionMaybe<boolean | 'true' | 'false'>,
    ariaAutocomplete?: FunctionMaybe<'none' | 'inline' | 'list' | 'both'>,
    ariaBusy?: FunctionMaybe<boolean | 'true' | 'false'>,
    ariaChecked?: FunctionMaybe<boolean | 'false' | 'mixed' | 'true'>,
    ariaColcount?: FunctionMaybe<number>,
    ariaColindex?: FunctionMaybe<number>,
    ariaColspan?: FunctionMaybe<number>,
    ariaControls?: FunctionMaybe<string>,
    ariaCurrent?: FunctionMaybe<boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time'>,
    ariaDescribedby?: FunctionMaybe<string>,
    ariaDetails?: FunctionMaybe<string>,
    ariaDisabled?: FunctionMaybe<boolean | 'true' | 'false'>,
    ariaDropeffect?: FunctionMaybe<'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup'>,
    ariaErrormessage?: FunctionMaybe<string>,
    ariaExpanded?: FunctionMaybe<boolean | 'true' | 'false'>,
    ariaFlowto?: FunctionMaybe<string>,
    ariaGrabbed?: FunctionMaybe<boolean | 'true' | 'false'>,
    ariaHaspopup?: FunctionMaybe<boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'>,
    ariaHidden?: FunctionMaybe<boolean | 'true' | 'false'>,
    ariaInvalid?: FunctionMaybe<boolean | 'false' | 'true' | 'grammar' | 'spelling'>,
    ariaKeyshortcuts?: FunctionMaybe<string>,
    ariaLabel?: FunctionMaybe<string>,
    ariaLabelledby?: FunctionMaybe<string>,
    ariaLevel?: FunctionMaybe<number>,
    ariaLive?: FunctionMaybe<'off' | 'assertive' | 'polite'>,
    ariaModal?: FunctionMaybe<boolean | 'true' | 'false'>,
    ariaMultiline?: FunctionMaybe<boolean | 'true' | 'false'>,
    ariaMultiselectable?: FunctionMaybe<boolean | 'true' | 'false'>,
    ariaOrientation?: FunctionMaybe<'horizontal' | 'vertical'>,
    ariaOwns?: FunctionMaybe<string>,
    ariaPlaceholder?: FunctionMaybe<string>,
    ariaPosinset?: FunctionMaybe<number>,
    ariaPressed?: FunctionMaybe<boolean | 'false' | 'mixed' | 'true'>,
    ariaReadonly?: FunctionMaybe<boolean | 'true' | 'false'>,
    ariaRelevant?: FunctionMaybe<'additions' | 'additions removals' | 'additions text' | 'all' | 'removals' | 'removals additions' | 'removals text' | 'text' | 'text additions' | 'text removals'>,
    ariaRequired?: FunctionMaybe<boolean | 'true' | 'false'>,
    ariaRoledescription?: FunctionMaybe<string>,
    ariaRowcount?: FunctionMaybe<number>,
    ariaRowindex?: FunctionMaybe<number>,
    ariaRowspan?: FunctionMaybe<number>,
    ariaSelected?: FunctionMaybe<boolean | 'true' | 'false'>,
    ariaSetsize?: FunctionMaybe<number>,
    ariaSort?: FunctionMaybe<'none' | 'ascending' | 'descending' | 'other'>,
    ariaValuemax?: FunctionMaybe<number>,
    ariaValuemin?: FunctionMaybe<number>,
    ariaValuenow?: FunctionMaybe<number>,
    ariaValuetext?: FunctionMaybe<string>
  }

  interface EventAttributes<T extends EventTarget> {
    /* IMAGE EVENTS */
    onLoad?: ObservableMaybe<GenericEventHandler<T>>,
    onLoadCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onError?: ObservableMaybe<GenericEventHandler<T>>,
    onErrorCapture?: ObservableMaybe<GenericEventHandler<T>>,
    /* CLIPBOARD EVENTS */
    onCopy?: ObservableMaybe<ClipboardEventHandler<T>>,
    onCopyCapture?: ObservableMaybe<ClipboardEventHandler<T>>,
    onCut?: ObservableMaybe<ClipboardEventHandler<T>>,
    onCutCapture?: ObservableMaybe<ClipboardEventHandler<T>>,
    onPaste?: ObservableMaybe<ClipboardEventHandler<T>>,
    onPasteCapture?: ObservableMaybe<ClipboardEventHandler<T>>,
    /* COMPOSITION EVENTS */
    onCompositionEnd?: ObservableMaybe<CompositionEventHandler<T>>,
    onCompositionEndCapture?: ObservableMaybe<CompositionEventHandler<T>>,
    onCompositionStart?: ObservableMaybe<CompositionEventHandler<T>>,
    onCompositionStartCapture?: ObservableMaybe<CompositionEventHandler<T>>,
    onCompositionUpdate?: ObservableMaybe<CompositionEventHandler<T>>,
    onCompositionUpdateCapture?: ObservableMaybe<CompositionEventHandler<T>>,
    /* DETAILS EVENTS */
    onToggle?: ObservableMaybe<GenericEventHandler<T>>,
    /* FOCUS EVENTS */
    onFocus?: ObservableMaybe<FocusEventHandler<T>>,
    onFocusCapture?: ObservableMaybe<FocusEventHandler<T>>,
    onfocusin?: ObservableMaybe<FocusEventHandler<T>>,
    onfocusinCapture?: ObservableMaybe<FocusEventHandler<T>>,
    onfocusout?: ObservableMaybe<FocusEventHandler<T>>,
    onfocusoutCapture?: ObservableMaybe<FocusEventHandler<T>>,
    onBlur?: ObservableMaybe<FocusEventHandler<T>>,
    onBlurCapture?: ObservableMaybe<FocusEventHandler<T>>,
    /* FORM EVENTS */
    onChange?: ObservableMaybe<KeyboardEventHandler<T>>,
    onChangeCapture?: ObservableMaybe<KeyboardEventHandler<T>>,
    onInput?: ObservableMaybe<GenericEventHandler<T>>,
    onInputCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onBeforeInput?: ObservableMaybe<GenericEventHandler<T>>,
    onBeforeInputCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onSearch?: ObservableMaybe<GenericEventHandler<T>>,
    onSearchCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onSubmit?: ObservableMaybe<GenericEventHandler<T>>,
    onSubmitCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onInvalid?: ObservableMaybe<GenericEventHandler<T>>,
    onInvalidCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onReset?: ObservableMaybe<GenericEventHandler<T>>,
    onResetCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onFormData?: ObservableMaybe<GenericEventHandler<T>>,
    onFormDataCapture?: ObservableMaybe<GenericEventHandler<T>>,
    /* KEYBOARD EVENTS */
    onKeyDown?: ObservableMaybe<KeyboardEventHandler<T>>,
    onKeyDownCapture?: ObservableMaybe<KeyboardEventHandler<T>>,
    onKeyPress?: ObservableMaybe<KeyboardEventHandler<T>>,
    onKeyPressCapture?: ObservableMaybe<KeyboardEventHandler<T>>,
    onKeyUp?: ObservableMaybe<KeyboardEventHandler<T>>,
    onKeyUpCapture?: ObservableMaybe<KeyboardEventHandler<T>>,
    /* MEDIA EVENTS */
    onAbort?: ObservableMaybe<GenericEventHandler<T>>,
    onAbortCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onCanPlay?: ObservableMaybe<GenericEventHandler<T>>,
    onCanPlayCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onCanPlayThrough?: ObservableMaybe<GenericEventHandler<T>>,
    onCanPlayThroughCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onDurationChange?: ObservableMaybe<GenericEventHandler<T>>,
    onDurationChangeCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onEmptied?: ObservableMaybe<GenericEventHandler<T>>,
    onEmptiedCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onEncrypted?: ObservableMaybe<GenericEventHandler<T>>,
    onEncryptedCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onEnded?: ObservableMaybe<GenericEventHandler<T>>,
    onEndedCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onLoadedData?: ObservableMaybe<GenericEventHandler<T>>,
    onLoadedDataCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onLoadedMetadata?: ObservableMaybe<GenericEventHandler<T>>,
    onLoadedMetadataCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onLoadStart?: ObservableMaybe<GenericEventHandler<T>>,
    onLoadStartCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onPause?: ObservableMaybe<GenericEventHandler<T>>,
    onPauseCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onPlay?: ObservableMaybe<GenericEventHandler<T>>,
    onPlayCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onPlaying?: ObservableMaybe<GenericEventHandler<T>>,
    onPlayingCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onProgress?: ObservableMaybe<GenericEventHandler<T>>,
    onProgressCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onRateChange?: ObservableMaybe<GenericEventHandler<T>>,
    onRateChangeCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onSeeked?: ObservableMaybe<GenericEventHandler<T>>,
    onSeekedCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onSeeking?: ObservableMaybe<GenericEventHandler<T>>,
    onSeekingCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onStalled?: ObservableMaybe<GenericEventHandler<T>>,
    onStalledCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onSuspend?: ObservableMaybe<GenericEventHandler<T>>,
    onSuspendCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onTimeUpdate?: ObservableMaybe<GenericEventHandler<T>>,
    onTimeUpdateCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onVolumeChange?: ObservableMaybe<GenericEventHandler<T>>,
    onVolumeChangeCapture?: ObservableMaybe<GenericEventHandler<T>>,
    onWaiting?: ObservableMaybe<GenericEventHandler<T>>,
    onWaitingCapture?: ObservableMaybe<GenericEventHandler<T>>,
    /* MOUSE EVENTS */
    onClick?: ObservableMaybe<MouseEventHandler<T>>,
    onClickCapture?: ObservableMaybe<MouseEventHandler<T>>,
    onContextMenu?: ObservableMaybe<MouseEventHandler<T>>,
    onContextMenuCapture?: ObservableMaybe<MouseEventHandler<T>>,
    onDblClick?: ObservableMaybe<MouseEventHandler<T>>,
    onDblClickCapture?: ObservableMaybe<MouseEventHandler<T>>,
    onDrag?: ObservableMaybe<DragEventHandler<T>>,
    onDragCapture?: ObservableMaybe<DragEventHandler<T>>,
    onDragEnd?: ObservableMaybe<DragEventHandler<T>>,
    onDragEndCapture?: ObservableMaybe<DragEventHandler<T>>,
    onDragEnter?: ObservableMaybe<DragEventHandler<T>>,
    onDragEnterCapture?: ObservableMaybe<DragEventHandler<T>>,
    onDragExit?: ObservableMaybe<DragEventHandler<T>>,
    onDragExitCapture?: ObservableMaybe<DragEventHandler<T>>,
    onDragLeave?: ObservableMaybe<DragEventHandler<T>>,
    onDragLeaveCapture?: ObservableMaybe<DragEventHandler<T>>,
    onDragOver?: ObservableMaybe<DragEventHandler<T>>,
    onDragOverCapture?: ObservableMaybe<DragEventHandler<T>>,
    onDragStart?: ObservableMaybe<DragEventHandler<T>>,
    onDragStartCapture?: ObservableMaybe<DragEventHandler<T>>,
    onDrop?: ObservableMaybe<DragEventHandler<T>>,
    onDropCapture?: ObservableMaybe<DragEventHandler<T>>,
    onMouseDown?: ObservableMaybe<MouseEventHandler<T>>,
    onMouseDownCapture?: ObservableMaybe<MouseEventHandler<T>>,
    onMouseEnter?: ObservableMaybe<MouseEventHandler<T>>,
    onMouseEnterCapture?: ObservableMaybe<MouseEventHandler<T>>,
    onMouseLeave?: ObservableMaybe<MouseEventHandler<T>>,
    onMouseLeaveCapture?: ObservableMaybe<MouseEventHandler<T>>,
    onMouseMove?: ObservableMaybe<MouseEventHandler<T>>,
    onMouseMoveCapture?: ObservableMaybe<MouseEventHandler<T>>,
    onMouseOut?: ObservableMaybe<MouseEventHandler<T>>,
    onMouseOutCapture?: ObservableMaybe<MouseEventHandler<T>>,
    onMouseOver?: ObservableMaybe<MouseEventHandler<T>>,
    onMouseOverCapture?: ObservableMaybe<MouseEventHandler<T>>,
    onMouseUp?: ObservableMaybe<MouseEventHandler<T>>,
    onMouseUpCapture?: ObservableMaybe<MouseEventHandler<T>>,
    /* SELECTION EVENTS */
    onSelect?: ObservableMaybe<GenericEventHandler<T>>,
    onSelectCapture?: ObservableMaybe<GenericEventHandler<T>>,
    /* TOUCH EVENTS */
    onTouchCancel?: ObservableMaybe<TouchEventHandler<T>>,
    onTouchCancelCapture?: ObservableMaybe<TouchEventHandler<T>>,
    onTouchEnd?: ObservableMaybe<TouchEventHandler<T>>,
    onTouchEndCapture?: ObservableMaybe<TouchEventHandler<T>>,
    onTouchMove?: ObservableMaybe<TouchEventHandler<T>>,
    onTouchMoveCapture?: ObservableMaybe<TouchEventHandler<T>>,
    onTouchStart?: ObservableMaybe<TouchEventHandler<T>>,
    onTouchStartCapture?: ObservableMaybe<TouchEventHandler<T>>,
    /* POINTER EVENTS */
    onPointerOver?: ObservableMaybe<PointerEventHandler<T>>,
    onPointerOverCapture?: ObservableMaybe<PointerEventHandler<T>>,
    onPointerEnter?: ObservableMaybe<PointerEventHandler<T>>,
    onPointerEnterCapture?: ObservableMaybe<PointerEventHandler<T>>,
    onPointerDown?: ObservableMaybe<PointerEventHandler<T>>,
    onPointerDownCapture?: ObservableMaybe<PointerEventHandler<T>>,
    onPointerMove?: ObservableMaybe<PointerEventHandler<T>>,
    onPointerMoveCapture?: ObservableMaybe<PointerEventHandler<T>>,
    onPointerUp?: ObservableMaybe<PointerEventHandler<T>>,
    onPointerUpCapture?: ObservableMaybe<PointerEventHandler<T>>,
    onPointerCancel?: ObservableMaybe<PointerEventHandler<T>>,
    onPointerCancelCapture?: ObservableMaybe<PointerEventHandler<T>>,
    onPointerOut?: ObservableMaybe<PointerEventHandler<T>>,
    onPointerOutCapture?: ObservableMaybe<PointerEventHandler<T>>,
    onPointerLeave?: ObservableMaybe<PointerEventHandler<T>>,
    onPointerLeaveCapture?: ObservableMaybe<PointerEventHandler<T>>,
    onGotPointerCapture?: ObservableMaybe<PointerEventHandler<T>>,
    onGotPointerCaptureCapture?: ObservableMaybe<PointerEventHandler<T>>,
    onLostPointerCapture?: ObservableMaybe<PointerEventHandler<T>>,
    onLostPointerCaptureCapture?: ObservableMaybe<PointerEventHandler<T>>,
    /* UI EVENTS */
    onScroll?: ObservableMaybe<UIEventHandler<T>>,
    onScrollCapture?: ObservableMaybe<UIEventHandler<T>>,
    /* WHEEL EVENTS */
    onWheel?: ObservableMaybe<WheelEventHandler<T>>,
    onWheelCapture?: ObservableMaybe<WheelEventHandler<T>>,
    /* ANIMATION EVENTS */
    onAnimationStart?: ObservableMaybe<AnimationEventHandler<T>>,
    onAnimationStartCapture?: ObservableMaybe<AnimationEventHandler<T>>,
    onAnimationEnd?: ObservableMaybe<AnimationEventHandler<T>>,
    onAnimationEndCapture?: ObservableMaybe<AnimationEventHandler<T>>,
    onAnimationIteration?: ObservableMaybe<AnimationEventHandler<T>>,
    onAnimationIterationCapture?: ObservableMaybe<AnimationEventHandler<T>>,
    /* TRANSITION EVENTS */
    onTransitionEnd?: ObservableMaybe<TransitionEventHandler<T>>,
    onTransitionEndCapture?: ObservableMaybe<TransitionEventHandler<T>>
  }

  interface ViewAttributes {
    children?: Children,
    textContent?: FunctionMaybe<string>,
    innerHTML?: FunctionMaybe<string>,
    outerHTML?: FunctionMaybe<string>,
    dangerouslySetInnerHTML?: FunctionMaybe<{
      __html: FunctionMaybe<string>
    }>
  }

  interface DOMAttributes<T extends EventTarget> extends EventAttributes<T>, ViewAttributes {

  }

  interface HTMLAttributes<T extends EventTarget> extends AriaAttributes, DOMAttributes<T> {
    accept?: FunctionMaybe<string>,
    acceptCharset?: FunctionMaybe<FunctionMaybe<string>>,
    accessKey?: FunctionMaybe<FunctionMaybe<string>>,
    action?: FunctionMaybe<string>,
    allow?: FunctionMaybe<string>,
    allowFullScreen?: FunctionMaybe<boolean>,
    allowTransparency?: FunctionMaybe<boolean>,
    alt?: FunctionMaybe<string>,
    as?: FunctionMaybe<string>,
    async?: FunctionMaybe<boolean>,
    autoComplete?: FunctionMaybe< FunctionMaybe<string>>,
    autoCorrect?: FunctionMaybe<string>,
    autofocus?: FunctionMaybe<boolean>,
    autoFocus?: FunctionMaybe<boolean>,
    autoPlay?: FunctionMaybe<boolean>,
    capture?: FunctionMaybe<boolean | string>,
    cellPadding?: FunctionMaybe<number | string>,
    cellSpacing?: FunctionMaybe<number | string>,
    charSet?: FunctionMaybe<string>,
    challenge?: FunctionMaybe<string>,
    checked?: FunctionMaybe<boolean>,
    cite?: FunctionMaybe<string>,
    class?: FunctionMaybe<string | ClassProperties>,
    className?: FunctionMaybe<string>,
    cols?: FunctionMaybe<number>,
    colSpan?: FunctionMaybe<number>,
    content?: FunctionMaybe<string>,
    contentEditable?: FunctionMaybe<boolean | 'true' | 'false' | 'inherit'>,
    contextMenu?: FunctionMaybe<string>,
    controls?: FunctionMaybe<boolean>,
    controlsList?: FunctionMaybe<string>,
    coords?: FunctionMaybe<string>,
    crossOrigin?: FunctionMaybe<string>,
    data?: FunctionMaybe<string>,
    dateTime?: FunctionMaybe<string>,
    default?: FunctionMaybe<boolean>,
    defaultChecked?: FunctionMaybe<boolean>,
    defaultValue?: FunctionMaybe<string>,
    defer?: FunctionMaybe<boolean>,
    dir?: FunctionMaybe<'auto' | 'rtl' | 'ltr'>,
    disabled?: FunctionMaybe<boolean>,
    disableRemotePlayback?: FunctionMaybe<boolean>,
    download?: FunctionMaybe<any>,
    decoding?: FunctionMaybe<'sync' | 'async' | 'auto'>,
    draggable?: FunctionMaybe<boolean | 'true' | 'false'>,
    encType?: FunctionMaybe<string>,
    enterkeyhint?: FunctionMaybe<'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'>,
    form?: FunctionMaybe<string>,
    formAction?: FunctionMaybe<string>,
    formEncType?: FunctionMaybe<string>,
    formMethod?: FunctionMaybe<string>,
    formNoValidate?: FunctionMaybe<boolean>,
    formTarget?: FunctionMaybe<string>,
    frameBorder?: FunctionMaybe<number | string>,
    headers?: FunctionMaybe<string>,
    height?: FunctionMaybe<number | string>,
    hidden?: FunctionMaybe<boolean>,
    high?: FunctionMaybe<number>,
    href?: FunctionMaybe<string>,
    hrefLang?: FunctionMaybe<string>,
    for?: FunctionMaybe<string>,
    htmlFor?: FunctionMaybe<string>,
    httpEquiv?: FunctionMaybe<string>,
    icon?: FunctionMaybe<string>,
    id?: FunctionMaybe<string | number>,
    inputMode?: FunctionMaybe<'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'>,
    integrity?: FunctionMaybe<string>,
    is?: FunctionMaybe<string>,
    keyParams?: FunctionMaybe<string>,
    keyType?: FunctionMaybe<string>,
    kind?: FunctionMaybe<string>,
    label?: FunctionMaybe<string>,
    lang?: FunctionMaybe<string>,
    list?: FunctionMaybe<string>,
    loading?: FunctionMaybe<'eager' | 'lazy'>,
    loop?: FunctionMaybe<boolean>,
    low?: FunctionMaybe<number>,
    manifest?: FunctionMaybe<string>,
    marginHeight?: FunctionMaybe<number>,
    marginWidth?: FunctionMaybe<number>,
    max?: FunctionMaybe<number | string>,
    maxLength?: FunctionMaybe<number>,
    media?: FunctionMaybe<string>,
    mediaGroup?: FunctionMaybe<string>,
    method?: FunctionMaybe<string>,
    min?: FunctionMaybe<number | string>,
    minLength?: FunctionMaybe<number>,
    multiple?: FunctionMaybe<boolean>,
    muted?: FunctionMaybe<boolean>,
    name?: FunctionMaybe<string>,
    nomodule?: FunctionMaybe<boolean>,
    nonce?: FunctionMaybe<string>,
    noValidate?: FunctionMaybe<boolean>,
    open?: FunctionMaybe<boolean>,
    optimum?: FunctionMaybe<number>,
    pattern?: FunctionMaybe<string>,
    ping?: FunctionMaybe<string>,
    placeholder?: FunctionMaybe<string>,
    playsInline?: FunctionMaybe<boolean>,
    poster?: FunctionMaybe<string>,
    preload?: FunctionMaybe<string>,
    radioGroup?: FunctionMaybe<string>,
    readonly?: FunctionMaybe<boolean>,
    readOnly?: FunctionMaybe<boolean>,
    referrerpolicy?: FunctionMaybe<'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'>,
    rel?: FunctionMaybe<string>,
    required?: FunctionMaybe<boolean>,
    reversed?: FunctionMaybe<boolean>,
    /* WAI-ARIA */
    role?: FunctionMaybe<'alert' | 'alertdialog' | 'application' | 'article' | 'banner' | 'button' | 'cell' | 'checkbox' | 'columnheader' | 'combobox' | 'complementary' | 'contentinfo' | 'definition' | 'dialog' | 'directory' | 'document' | 'feed' | 'figure' | 'form' | 'grid' | 'gridcell' | 'group' | 'heading' | 'img' | 'link' | 'list' | 'listbox' | 'listitem' | 'log' | 'main' | 'marquee' | 'math' | 'menu' | 'menubar' | 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' | 'navigation' | 'none' | 'note' | 'option' | 'presentation' | 'progressbar' | 'radio' | 'radiogroup' | 'region' | 'row' | 'rowgroup' | 'rowheader' | 'scrollbar' | 'search' | 'searchbox' | 'separator' | 'slider' | 'spinbutton' | 'status' | 'switch' | 'tab' | 'table' | 'tablist' | 'tabpanel' | 'term' | 'textbox' | 'timer' | 'toolbar' | 'tooltip' | 'tree' | 'treegrid' | 'treeitem'>,
    rows?: FunctionMaybe<number>,
    rowSpan?: FunctionMaybe<number>,
    sandbox?: FunctionMaybe<string>,
    scope?: FunctionMaybe<string>,
    scoped?: FunctionMaybe<boolean>,
    scrolling?: FunctionMaybe<string>,
    seamless?: FunctionMaybe<boolean>,
    selected?: FunctionMaybe<boolean>,
    shape?: FunctionMaybe<string>,
    size?: FunctionMaybe<number>,
    sizes?: FunctionMaybe<string>,
    slot?: FunctionMaybe<string>,
    span?: FunctionMaybe<number>,
    spellCheck?: FunctionMaybe<boolean | 'true' | 'false'>,
    src?: FunctionMaybe<string>,
    srcset?: FunctionMaybe<string>,
    srcDoc?: FunctionMaybe<string>,
    srcLang?: FunctionMaybe<string>,
    srcSet?: FunctionMaybe<string>,
    start?: FunctionMaybe<number>,
    step?: FunctionMaybe<number | string>,
    style?: FunctionMaybe<string | StyleProperties>,
    summary?: FunctionMaybe<string>,
    tabIndex?: FunctionMaybe<number>,
    target?: FunctionMaybe<string>,
    title?: FunctionMaybe<string>,
    type?: FunctionMaybe<string>,
    useMap?: FunctionMaybe<string>,
    value?: FunctionMaybe<string | ReadonlyArray<string> | number>,
    volume?: FunctionMaybe<string | number>,
    width?: FunctionMaybe<number | string>,
    wmode?: FunctionMaybe<string>,
    wrap?: FunctionMaybe<string>,

    // Non-standard Attributes
    autoCapitalize?: FunctionMaybe<'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters'>,
    autoSave?: FunctionMaybe<string>,
    color?: FunctionMaybe<string>,
    disablePictureInPicture?: FunctionMaybe<boolean>,
    results?: FunctionMaybe<number>,
    security?: FunctionMaybe<string>,
    suppressContentEditableWarning?: FunctionMaybe<boolean>,
    suppressHydrationWarning?: FunctionMaybe<boolean>,
    translate?: FunctionMaybe<'yes' | 'no'>,
    unselectable?: FunctionMaybe<'on' | 'off'>,

    // RDFa Attributes
    about?: FunctionMaybe<string>,
    datatype?: FunctionMaybe<string>,
    inlist?: FunctionMaybe<boolean>,
    prefix?: FunctionMaybe<string>,
    property?: FunctionMaybe<string>,
    resource?: FunctionMaybe<string>,
    typeof?: FunctionMaybe<string>,
    vocab?: FunctionMaybe<string>,

    // Microdata Attributes
    itemProp?: FunctionMaybe<string>,
    itemScope?: FunctionMaybe<boolean>,
    itemType?: FunctionMaybe<string>,
    itemID?: FunctionMaybe<string>,
    itemRef?: FunctionMaybe<string>,
}

  interface SVGAttributes<T extends EventTarget = SVGElement> extends HTMLAttributes<T> {
    accentHeight?: FunctionMaybe<number | string>,
    accumulate?: FunctionMaybe<'none' | 'sum'>,
    additive?: FunctionMaybe<'replace' | 'sum'>,
    alignmentBaseline?: FunctionMaybe<'auto' | 'baseline' | 'before-edge' | 'text-before-edge' | 'middle' | 'central' | 'after-edge' | 'text-after-edge' | 'ideographic' | 'alphabetic' | 'hanging' | 'mathematical' | 'inherit'>,
    allowReorder?: FunctionMaybe<'no' | 'yes'>,
    alphabetic?: FunctionMaybe<number | string>,
    amplitude?: FunctionMaybe<number | string>,
    arabicForm?: FunctionMaybe<'initial' | 'medial' | 'terminal' | 'isolated'>,
    ascent?: FunctionMaybe<number | string>,
    attributeName?: FunctionMaybe<string>,
    attributeType?: FunctionMaybe<string>,
    autoReverse?: FunctionMaybe<number | string>,
    azimuth?: FunctionMaybe<number | string>,
    baseFrequency?: FunctionMaybe<number | string>,
    baselineShift?: FunctionMaybe<number | string>,
    baseProfile?: FunctionMaybe<number | string>,
    bbox?: FunctionMaybe<number | string>,
    begin?: FunctionMaybe<number | string>,
    bias?: FunctionMaybe<number | string>,
    by?: FunctionMaybe<number | string>,
    calcMode?: FunctionMaybe<number | string>,
    capHeight?: FunctionMaybe<number | string>,
    clip?: FunctionMaybe<number | string>,
    clipPath?: FunctionMaybe<string>,
    clipPathUnits?: FunctionMaybe<number | string>,
    clipRule?: FunctionMaybe<number | string>,
    colorInterpolation?: FunctionMaybe<number | string>,
    colorInterpolationFilters?: FunctionMaybe<'auto' | 'sRGB' | 'linearRGB' | 'inherit'>,
    colorProfile?: FunctionMaybe<number | string>,
    colorRendering?: FunctionMaybe<number | string>,
    contentScriptType?: FunctionMaybe<number | string>,
    contentStyleType?: FunctionMaybe<number | string>,
    cursor?: FunctionMaybe<number | string>,
    cx?: FunctionMaybe<number | string>,
    cy?: FunctionMaybe<number | string>,
    d?: FunctionMaybe<string>,
    decelerate?: FunctionMaybe<number | string>,
    descent?: FunctionMaybe<number | string>,
    diffuseConstant?: FunctionMaybe<number | string>,
    direction?: FunctionMaybe<number | string>,
    display?: FunctionMaybe<number | string>,
    divisor?: FunctionMaybe<number | string>,
    dominantBaseline?: FunctionMaybe<number | string>,
    dur?: FunctionMaybe<number | string>,
    dx?: FunctionMaybe<number | string>,
    dy?: FunctionMaybe<number | string>,
    edgeMode?: FunctionMaybe<number | string>,
    elevation?: FunctionMaybe<number | string>,
    enableBackground?: FunctionMaybe<number | string>,
    end?: FunctionMaybe<number | string>,
    exponent?: FunctionMaybe<number | string>,
    externalResourcesRequired?: FunctionMaybe<number | string>,
    fill?: FunctionMaybe<string>,
    fillOpacity?: FunctionMaybe<number | string>,
    fillRule?: FunctionMaybe<'nonzero' | 'evenodd' | 'inherit'>,
    filter?: FunctionMaybe<string>,
    filterRes?: FunctionMaybe<number | string>,
    filterUnits?: FunctionMaybe<number | string>,
    floodColor?: FunctionMaybe<number | string>,
    floodOpacity?: FunctionMaybe<number | string>,
    focusable?: FunctionMaybe<number | string>,
    fontFamily?: FunctionMaybe<string>,
    fontSize?: FunctionMaybe<number | string>,
    fontSizeAdjust?: FunctionMaybe<number | string>,
    fontStretch?: FunctionMaybe<number | string>,
    fontStyle?: FunctionMaybe<number | string>,
    fontVariant?: FunctionMaybe<number | string>,
    fontWeight?: FunctionMaybe<number | string>,
    format?: FunctionMaybe<number | string>,
    from?: FunctionMaybe<number | string>,
    fx?: FunctionMaybe<number | string>,
    fy?: FunctionMaybe<number | string>,
    g1?: FunctionMaybe<number | string>,
    g2?: FunctionMaybe<number | string>,
    glyphName?: FunctionMaybe<number | string>,
    glyphOrientationHorizontal?: FunctionMaybe<number | string>,
    glyphOrientationVertical?: FunctionMaybe<number | string>,
    glyphRef?: FunctionMaybe<number | string>,
    gradientTransform?: FunctionMaybe<string>,
    gradientUnits?: FunctionMaybe<string>,
    hanging?: FunctionMaybe<number | string>,
    horizAdvX?: FunctionMaybe<number | string>,
    horizOriginX?: FunctionMaybe<number | string>,
    ideographic?: FunctionMaybe<number | string>,
    imageRendering?: FunctionMaybe<number | string>,
    in2?: FunctionMaybe<number | string>,
    in?: FunctionMaybe<string>,
    intercept?: FunctionMaybe<number | string>,
    k1?: FunctionMaybe<number | string>,
    k2?: FunctionMaybe<number | string>,
    k3?: FunctionMaybe<number | string>,
    k4?: FunctionMaybe<number | string>,
    k?: FunctionMaybe<number | string>,
    kernelMatrix?: FunctionMaybe<number | string>,
    kernelUnitLength?: FunctionMaybe<number | string>,
    kerning?: FunctionMaybe<number | string>,
    keyPoints?: FunctionMaybe<number | string>,
    keySplines?: FunctionMaybe<number | string>,
    keyTimes?: FunctionMaybe<number | string>,
    lengthAdjust?: FunctionMaybe<number | string>,
    letterSpacing?: FunctionMaybe<number | string>,
    lightingColor?: FunctionMaybe<number | string>,
    limitingConeAngle?: FunctionMaybe<number | string>,
    local?: FunctionMaybe<number | string>,
    markerEnd?: FunctionMaybe<string>,
    markerHeight?: FunctionMaybe<number | string>,
    markerMid?: FunctionMaybe<string>,
    markerStart?: FunctionMaybe<string>,
    markerUnits?: FunctionMaybe<number | string>,
    markerWidth?: FunctionMaybe<number | string>,
    mask?: FunctionMaybe<string>,
    maskContentUnits?: FunctionMaybe<number | string>,
    maskUnits?: FunctionMaybe<number | string>,
    mathematical?: FunctionMaybe<number | string>,
    mode?: FunctionMaybe<number | string>,
    numOctaves?: FunctionMaybe<number | string>,
    offset?: FunctionMaybe<number | string>,
    opacity?: FunctionMaybe<number | string>,
    operator?: FunctionMaybe<number | string>,
    order?: FunctionMaybe<number | string>,
    orient?: FunctionMaybe<number | string>,
    orientation?: FunctionMaybe<number | string>,
    origin?: FunctionMaybe<number | string>,
    overflow?: FunctionMaybe<number | string>,
    overlinePosition?: FunctionMaybe<number | string>,
    overlineThickness?: FunctionMaybe<number | string>,
    paintOrder?: FunctionMaybe<number | string>,
    panose1?: FunctionMaybe<number | string>,
    pathLength?: FunctionMaybe<number | string>,
    patternContentUnits?: FunctionMaybe<string>,
    patternTransform?: FunctionMaybe<number | string>,
    patternUnits?: FunctionMaybe<string>,
    pointerEvents?: FunctionMaybe<number | string>,
    points?: FunctionMaybe<string>,
    pointsAtX?: FunctionMaybe<number | string>,
    pointsAtY?: FunctionMaybe<number | string>,
    pointsAtZ?: FunctionMaybe<number | string>,
    preserveAlpha?: FunctionMaybe<number | string>,
    preserveAspectRatio?: FunctionMaybe<string>,
    primitiveUnits?: FunctionMaybe<number | string>,
    r?: FunctionMaybe<number | string>,
    radius?: FunctionMaybe<number | string>,
    refX?: FunctionMaybe<number | string>,
    refY?: FunctionMaybe<number | string>,
    renderingIntent?: FunctionMaybe<number | string>,
    repeatCount?: FunctionMaybe<number | string>,
    repeatDur?: FunctionMaybe<number | string>,
    requiredExtensions?: FunctionMaybe<number | string>,
    requiredFeatures?: FunctionMaybe<number | string>,
    restart?: FunctionMaybe<number | string>,
    result?: FunctionMaybe<string>,
    rotate?: FunctionMaybe<number | string>,
    rx?: FunctionMaybe<number | string>,
    ry?: FunctionMaybe<number | string>,
    scale?: FunctionMaybe<number | string>,
    seed?: FunctionMaybe<number | string>,
    shapeRendering?: FunctionMaybe<number | string>,
    slope?: FunctionMaybe<number | string>,
    spacing?: FunctionMaybe<number | string>,
    specularConstant?: FunctionMaybe<number | string>,
    specularExponent?: FunctionMaybe<number | string>,
    speed?: FunctionMaybe<number | string>,
    spreadMethod?: FunctionMaybe<string>,
    startOffset?: FunctionMaybe<number | string>,
    stdDeviation?: FunctionMaybe<number | string>,
    stemh?: FunctionMaybe<number | string>,
    stemv?: FunctionMaybe<number | string>,
    stitchTiles?: FunctionMaybe<number | string>,
    stopColor?: FunctionMaybe<string>,
    stopOpacity?: FunctionMaybe<number | string>,
    strikethroughPosition?: FunctionMaybe<number | string>,
    strikethroughThickness?: FunctionMaybe<number | string>,
    string?: FunctionMaybe<number | string>,
    stroke?: FunctionMaybe<string>,
    strokeDasharray?: FunctionMaybe<string | number>,
    strokeDashoffset?: FunctionMaybe<string | number>,
    strokeLinecap?: FunctionMaybe<'butt' | 'round' | 'square' | 'inherit'>,
    strokeLinejoin?: FunctionMaybe<'miter' | 'round' | 'bevel' | 'inherit'>,
    strokeMiterlimit?: FunctionMaybe<string | number>,
    strokeOpacity?: FunctionMaybe<number | string>,
    strokeWidth?: FunctionMaybe<number | string>,
    surfaceScale?: FunctionMaybe<number | string>,
    systemLanguage?: FunctionMaybe<number | string>,
    tableValues?: FunctionMaybe<number | string>,
    targetX?: FunctionMaybe<number | string>,
    targetY?: FunctionMaybe<number | string>,
    textAnchor?: FunctionMaybe<string>,
    textDecoration?: FunctionMaybe<number | string>,
    textLength?: FunctionMaybe<number | string>,
    textRendering?: FunctionMaybe<number | string>,
    to?: FunctionMaybe<number | string>,
    transform?: FunctionMaybe<string>,
    u1?: FunctionMaybe<number | string>,
    u2?: FunctionMaybe<number | string>,
    underlinePosition?: FunctionMaybe<number | string>,
    underlineThickness?: FunctionMaybe<number | string>,
    unicode?: FunctionMaybe<number | string>,
    unicodeBidi?: FunctionMaybe<number | string>,
    unicodeRange?: FunctionMaybe<number | string>,
    unitsPerEm?: FunctionMaybe<number | string>,
    vAlphabetic?: FunctionMaybe<number | string>,
    values?: FunctionMaybe<string>,
    vectorEffect?: FunctionMaybe<number | string>,
    version?: FunctionMaybe<string>,
    vertAdvY?: FunctionMaybe<number | string>,
    vertOriginX?: FunctionMaybe<number | string>,
    vertOriginY?: FunctionMaybe<number | string>,
    vHanging?: FunctionMaybe<number | string>,
    vIdeographic?: FunctionMaybe<number | string>,
    viewBox?: FunctionMaybe<string>,
    viewTarget?: FunctionMaybe<number | string>,
    visibility?: FunctionMaybe<number | string>,
    vMathematical?: FunctionMaybe<number | string>,
    widths?: FunctionMaybe<number | string>,
    wordSpacing?: FunctionMaybe<number | string>,
    writingMode?: FunctionMaybe<number | string>,
    x1?: FunctionMaybe<number | string>,
    x2?: FunctionMaybe<number | string>,
    x?: FunctionMaybe<number | string>,
    xChannelSelector?: FunctionMaybe<string>,
    xHeight?: FunctionMaybe<number | string>,
    xlinkActuate?: FunctionMaybe<string>,
    xlinkArcrole?: FunctionMaybe<string>,
    xlinkHref?: FunctionMaybe<string>,
    xlinkRole?: FunctionMaybe<string>,
    xlinkShow?: FunctionMaybe<string>,
    xlinkTitle?: FunctionMaybe<string>,
    xlinkType?: FunctionMaybe<string>,
    xmlBase?: FunctionMaybe<string>,
    xmlLang?: FunctionMaybe<string>,
    xmlns?: FunctionMaybe<string>,
    xmlnsXlink?: FunctionMaybe<string>,
    xmlSpace?: FunctionMaybe<string>,
    y1?: FunctionMaybe<number | string>,
    y2?: FunctionMaybe<number | string>,
    y?: FunctionMaybe<number | string>,
    yChannelSelector?: FunctionMaybe<string>,
    z?: FunctionMaybe<number | string>,
    zoomAndPan?: FunctionMaybe<string>
  }

  interface AnchorHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    download?: FunctionMaybe<boolean>,
    href?: FunctionMaybe<string>,
    hrefLang?: FunctionMaybe<string>,
    media?: FunctionMaybe<string>,
    ping?: FunctionMaybe<string>,
    rel?: FunctionMaybe<string>,
    target?: FunctionMaybe<'_self' | '_blank' | '_parent' | '_top'>,
    type?: FunctionMaybe<string>,
    referrerPolicy?: FunctionMaybe<HTMLAttributeReferrerPolicy>
  }

  interface AudioHTMLAttributes<T extends EventTarget> extends MediaHTMLAttributes<T> {

  }

  interface AreaHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    alt?: FunctionMaybe<string>,
    coords?: FunctionMaybe<string>,
    download?: FunctionMaybe<boolean>,
    href?: FunctionMaybe<string>,
    hrefLang?: FunctionMaybe<string>,
    media?: FunctionMaybe<string>,
    referrerPolicy?: FunctionMaybe<HTMLAttributeReferrerPolicy>,
    rel?: FunctionMaybe<string>,
    shape?: FunctionMaybe<string>,
    target?: FunctionMaybe<string>
  }

  interface BaseHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    href?: FunctionMaybe<string>,
    target?: FunctionMaybe<string>
  }

  interface BlockquoteHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    cite?: FunctionMaybe<string>
  }

  interface ButtonHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    autoFocus?: FunctionMaybe<boolean>,
    disabled?: FunctionMaybe<boolean>,
    form?: FunctionMaybe<string>,
    formAction?: FunctionMaybe<string>,
    formEncType?: FunctionMaybe<string>,
    formMethod?: FunctionMaybe<string>,
    formNoValidate?: FunctionMaybe<boolean>,
    formTarget?: FunctionMaybe<string>,
    name?: FunctionMaybe<string>,
    type?: FunctionMaybe<'submit' | 'reset' | 'button'>,
    value?: FunctionMaybe<string | ReadonlyArray<string> | number>
  }

  interface CanvasHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    height?: FunctionMaybe<number | string>,
    width?: FunctionMaybe<number | string>
  }

  interface ColHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    span?: FunctionMaybe<number>,
    width?: FunctionMaybe<number | string>
  }

  interface ColgroupHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    span?: FunctionMaybe<number>
  }

  interface DataHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    value?: FunctionMaybe<string | ReadonlyArray<string> | number>
  }

  interface DetailsHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    open?: FunctionMaybe<boolean>,
    onToggle?: ObservableMaybe<GenericEventHandler<T>>
  }

  interface DelHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    cite?: FunctionMaybe<string>,
    dateTime?: FunctionMaybe<string>
  }

  interface DialogHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    open?: FunctionMaybe<boolean>
  }

  interface EmbedHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    height?: FunctionMaybe<number | string>,
    src?: FunctionMaybe<string>,
    type?: FunctionMaybe<string>,
    width?: FunctionMaybe<number | string>
  }

  interface FieldsetHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    disabled?: FunctionMaybe<boolean>,
    form?: FunctionMaybe<string>,
    name?: FunctionMaybe<string>
  }

  interface FormHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    acceptCharset?: FunctionMaybe<string>,
    action?: FunctionMaybe<string>,
    autoComplete?: FunctionMaybe<string>,
    encType?: FunctionMaybe<string>,
    method?: FunctionMaybe<string>,
    name?: FunctionMaybe<string>,
    noValidate?: FunctionMaybe<boolean>,
    target?: FunctionMaybe<string>
  }

  interface HtmlHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    manifest?: FunctionMaybe<string>
  }

  interface IframeHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    allow?: FunctionMaybe<string>,
    allowFullScreen?: FunctionMaybe<boolean>,
    allowTransparency?: FunctionMaybe<boolean>,
    /** @deprecated */
    frameBorder?: FunctionMaybe<number | string>,
    height?: FunctionMaybe<number | string>,
    loading?: FunctionMaybe<'eager' | 'lazy'>,
    /** @deprecated */
    marginHeight?: FunctionMaybe<number>,
    /** @deprecated */
    marginWidth?: FunctionMaybe<number>,
    name?: FunctionMaybe<string>,
    referrerPolicy?: FunctionMaybe<HTMLAttributeReferrerPolicy>,
    sandbox?: FunctionMaybe<string>,
    /** @deprecated */
    scrolling?: FunctionMaybe<string>,
    seamless?: FunctionMaybe<boolean>,
    src?: FunctionMaybe<string>,
    srcDoc?: FunctionMaybe<string>,
    width?: FunctionMaybe<number | string>
  }

  interface ImgHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    alt?: FunctionMaybe<string>,
    crossOrigin?: FunctionMaybe<'anonymous' | 'use-credentials' | ''>,
    decoding?: FunctionMaybe<'async' | 'auto' | 'sync'>,
    height?: FunctionMaybe<number | string>,
    loading?: FunctionMaybe<'eager' | 'lazy'>,
    referrerPolicy?: FunctionMaybe<HTMLAttributeReferrerPolicy>,
    sizes?: FunctionMaybe<string>,
    src?: FunctionMaybe<string>,
    srcSet?: FunctionMaybe<string>,
    useMap?: FunctionMaybe<string>,
    width?: FunctionMaybe<number | string>
  }

  interface InsHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    cite?: FunctionMaybe<string>,
    dateTime?: FunctionMaybe<string>
  }

  interface InputHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    accept?: FunctionMaybe<string>,
    alt?: FunctionMaybe<string>,
    autoComplete?: FunctionMaybe<string>,
    autoFocus?: FunctionMaybe<boolean>,
    capture?: FunctionMaybe<boolean | 'user' | 'environment'>,
    checked?: FunctionMaybe<boolean>,
    crossOrigin?: FunctionMaybe<string>,
    disabled?: FunctionMaybe<boolean>,
    enterKeyHint?: FunctionMaybe<'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'>,
    form?: FunctionMaybe<string>,
    formAction?: FunctionMaybe<string>,
    formEncType?: FunctionMaybe<string>,
    formMethod?: FunctionMaybe<string>,
    formNoValidate?: FunctionMaybe<boolean>,
    formTarget?: FunctionMaybe<string>,
    height?: FunctionMaybe<number | string>,
    list?: FunctionMaybe<string>,
    max?: FunctionMaybe<number | string>,
    maxLength?: FunctionMaybe<number>,
    min?: FunctionMaybe<number | string>,
    minLength?: FunctionMaybe<number>,
    multiple?: FunctionMaybe<boolean>,
    name?: FunctionMaybe<string>,
    pattern?: FunctionMaybe<string>,
    placeholder?: FunctionMaybe<string>,
    readOnly?: FunctionMaybe<boolean>,
    required?: FunctionMaybe<boolean>,
    size?: FunctionMaybe<number>,
    src?: FunctionMaybe<string>,
    step?: FunctionMaybe<number | string>,
    type?: FunctionMaybe<'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week'>,
    value?: FunctionMaybe<string | ReadonlyArray<string> | number>,
    width?: FunctionMaybe<number | string>,
    onChange?: ObservableMaybe<KeyboardEventHandler<T>>
  }

  interface KeygenHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    autoFocus?: FunctionMaybe<boolean>,
    challenge?: FunctionMaybe<string>,
    disabled?: FunctionMaybe<boolean>,
    form?: FunctionMaybe<string>,
    keyType?: FunctionMaybe<string>,
    keyParams?: FunctionMaybe<string>,
    name?: FunctionMaybe<string>
  }

  interface LabelHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    form?: FunctionMaybe<string>,
    htmlFor?: FunctionMaybe<string>,
    for?: FunctionMaybe<string>
  }

  interface LiHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    value?: FunctionMaybe<string | ReadonlyArray<string> | number>
  }

  interface LinkHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    as?: FunctionMaybe<string>,
    crossOrigin?: FunctionMaybe<string>,
    href?: FunctionMaybe<string>,
    hrefLang?: FunctionMaybe<string>,
    integrity?: FunctionMaybe<string>,
    media?: FunctionMaybe<string>,
    imageSrcSet?: FunctionMaybe<string>,
    referrerPolicy?: FunctionMaybe<HTMLAttributeReferrerPolicy>,
    rel?: FunctionMaybe<string>,
    sizes?: FunctionMaybe<string>,
    type?: FunctionMaybe<string>,
    charSet?: FunctionMaybe<string>
  }

  interface MapHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    name?: FunctionMaybe<string>
  }

  interface MenuHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    type?: FunctionMaybe<string>
  }

  interface MediaHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    autoPlay?: FunctionMaybe<boolean>,
    controls?: FunctionMaybe<boolean>,
    controlsList?: FunctionMaybe<string>,
    crossOrigin?: FunctionMaybe<string>,
    loop?: FunctionMaybe<boolean>,
    mediaGroup?: FunctionMaybe<string>,
    muted?: FunctionMaybe<boolean>,
    playsInline?: FunctionMaybe<boolean>,
    preload?: FunctionMaybe<string>,
    src?: FunctionMaybe<string>
  }

  interface MetaHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    charSet?: FunctionMaybe<string>,
    content?: FunctionMaybe<string>,
    httpEquiv?: FunctionMaybe<string>,
    name?: FunctionMaybe<string>,
    media?: FunctionMaybe<string>
  }

  interface MeterHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    form?: FunctionMaybe<string>,
    high?: FunctionMaybe<number>,
    low?: FunctionMaybe<number>,
    max?: FunctionMaybe<number | string>,
    min?: FunctionMaybe<number | string>,
    optimum?: FunctionMaybe<number>,
    value?: FunctionMaybe<string | ReadonlyArray<string> | number>
  }

  interface QuoteHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    cite?: FunctionMaybe<string>
  }

  interface ObjectHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    classID?: FunctionMaybe<string>,
    data?: FunctionMaybe<string>,
    form?: FunctionMaybe<string>,
    height?: FunctionMaybe<number | string>,
    name?: FunctionMaybe<string>,
    type?: FunctionMaybe<string>,
    useMap?: FunctionMaybe<string>,
    width?: FunctionMaybe<number | string>,
    wmode?: FunctionMaybe<string>
  }

  interface OlHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    reversed?: FunctionMaybe<boolean>,
    start?: FunctionMaybe<number>,
    type?: FunctionMaybe<'1' | 'a' | 'A' | 'i' | 'I'>
  }

  interface OptgroupHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    disabled?: FunctionMaybe<boolean>,
    label?: FunctionMaybe<string>
  }

  interface OptionHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    disabled?: FunctionMaybe<boolean>,
    label?: FunctionMaybe<string>,
    selected?: FunctionMaybe<boolean>,
    value?: FunctionMaybe<string | ReadonlyArray<string> | number>
  }

  interface OutputHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    form?: FunctionMaybe<string>,
    htmlFor?: FunctionMaybe<string>,
    for?: FunctionMaybe<string>,
    name?: FunctionMaybe<string>
  }

  interface ParamHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    name?: FunctionMaybe<string>,
    value?: FunctionMaybe<string | ReadonlyArray<string> | number>
  }

  interface ProgressHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    max?: FunctionMaybe<number | string>,
    value?: FunctionMaybe<string | ReadonlyArray<string> | number>
  }

  interface SlotHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    name?: FunctionMaybe<string>
  }

  interface ScriptHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    async?: FunctionMaybe<boolean>,
    /** @deprecated */
    charSet?: FunctionMaybe<string>,
    crossOrigin?: FunctionMaybe<string>,
    defer?: FunctionMaybe<boolean>,
    integrity?: FunctionMaybe<string>,
    noModule?: FunctionMaybe<boolean>,
    nonce?: FunctionMaybe<string>,
    referrerPolicy?: FunctionMaybe<HTMLAttributeReferrerPolicy>,
    src?: FunctionMaybe<string>,
    type?: FunctionMaybe<string>
  }

  interface SelectHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    autoComplete?: FunctionMaybe<string>,
    autoFocus?: FunctionMaybe<boolean>,
    disabled?: FunctionMaybe<boolean>,
    form?: FunctionMaybe<string>,
    multiple?: FunctionMaybe<boolean>,
    name?: FunctionMaybe<string>,
    required?: FunctionMaybe<boolean>,
    size?: FunctionMaybe<number>,
    value?: FunctionMaybe<string | ReadonlyArray<string> | number>,
    onChange?: ObservableMaybe<KeyboardEventHandler<T>>
  }

  interface SourceHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    height?: FunctionMaybe<number | string>,
    media?: FunctionMaybe<string>,
    sizes?: FunctionMaybe<string>,
    src?: FunctionMaybe<string>,
    srcSet?: FunctionMaybe<string>,
    type?: FunctionMaybe<string>,
    width?: FunctionMaybe<number | string>
  }

  interface StyleHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    media?: FunctionMaybe<string>,
    nonce?: FunctionMaybe<string>,
    scoped?: FunctionMaybe<boolean>,
    type?: FunctionMaybe<string>
  }

  interface TableHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    cellPadding?: FunctionMaybe<number | string>,
    cellSpacing?: FunctionMaybe<number | string>,
    summary?: FunctionMaybe<string>,
    width?: FunctionMaybe<number | string>
  }

  interface TextareaHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    autoComplete?: FunctionMaybe<string>,
    autoFocus?: FunctionMaybe<boolean>,
    cols?: FunctionMaybe<number>,
    dirName?: FunctionMaybe<string>,
    disabled?: FunctionMaybe<boolean>,
    form?: FunctionMaybe<string>,
    maxLength?: FunctionMaybe<number>,
    minLength?: FunctionMaybe<number>,
    name?: FunctionMaybe<string>,
    placeholder?: FunctionMaybe<string>,
    readOnly?: FunctionMaybe<boolean>,
    required?: FunctionMaybe<boolean>,
    rows?: FunctionMaybe<number>,
    value?: FunctionMaybe<string | ReadonlyArray<string> | number>,
    wrap?: FunctionMaybe<string>,
    onChange?: ObservableMaybe<KeyboardEventHandler<T>>
  }

  interface TdHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    align?: FunctionMaybe<'left' | 'center' | 'right' | 'justify' | 'char'>,
    colSpan?: FunctionMaybe<number>,
    headers?: FunctionMaybe<string>,
    rowSpan?: FunctionMaybe<number>,
    scope?: FunctionMaybe<string>,
    abbr?: FunctionMaybe<string>,
    height?: FunctionMaybe<number | string>,
    width?: FunctionMaybe<number | string>,
    valign?: FunctionMaybe<'top' | 'middle' | 'bottom' | 'baseline'>
  }

  interface ThHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    align?: FunctionMaybe<'left' | 'center' | 'right' | 'justify' | 'char'>,
    colSpan?: FunctionMaybe<number>,
    headers?: FunctionMaybe<string>,
    rowSpan?: FunctionMaybe<number>,
    scope?: FunctionMaybe<string>,
    abbr?: FunctionMaybe<string>
  }

  interface TimeHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    dateTime?: FunctionMaybe<string>
  }

  interface TrackHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    default?: FunctionMaybe<boolean>,
    kind?: FunctionMaybe<string>,
    label?: FunctionMaybe<string>,
    src?: FunctionMaybe<string>,
    srcLang?: FunctionMaybe<string>
  }

  interface VideoHTMLAttributes<T extends EventTarget> extends MediaHTMLAttributes<T> {
    height?: FunctionMaybe<number | string>,
    playsInline?: FunctionMaybe<boolean>,
    poster?: FunctionMaybe<string>,
    width?: FunctionMaybe<number | string>,
    disablePictureInPicture?: FunctionMaybe<boolean>,
    disableRemotePlayback?: FunctionMaybe<boolean>
  }

  interface WebViewHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    allowFullScreen?: FunctionMaybe<boolean>,
    allowpopups?: FunctionMaybe<boolean>,
    autoFocus?: FunctionMaybe<boolean>,
    autosize?: FunctionMaybe<boolean>,
    blinkfeatures?: FunctionMaybe<string>,
    disableblinkfeatures?: FunctionMaybe<string>,
    disableguestresize?: FunctionMaybe<boolean>,
    disablewebsecurity?: FunctionMaybe<boolean>,
    guestinstance?: FunctionMaybe<string>,
    httpreferrer?: FunctionMaybe<string>,
    nodeintegration?: FunctionMaybe<boolean>,
    partition?: FunctionMaybe<string>,
    plugins?: FunctionMaybe<boolean>,
    preload?: FunctionMaybe<string>,
    src?: FunctionMaybe<string>,
    useragent?: FunctionMaybe<string>,
    webpreferences?: FunctionMaybe<string>
  }

  interface IntrinsicElementsMap {
    // HTML
    a: HTMLAnchorElement,
    abbr: HTMLElement,
    address: HTMLElement,
    area: HTMLAreaElement,
    article: HTMLElement,
    aside: HTMLElement,
    audio: HTMLAudioElement,
    b: HTMLElement,
    base: HTMLBaseElement,
    bdi: HTMLElement,
    bdo: HTMLElement,
    big: HTMLElement,
    blockquote: HTMLElement,
    body: HTMLBodyElement,
    br: HTMLBRElement,
    button: HTMLButtonElement,
    canvas: HTMLCanvasElement,
    caption: HTMLElement,
    cite: HTMLElement,
    code: HTMLElement,
    col: HTMLTableColElement,
    colgroup: HTMLTableColElement,
    data: HTMLDataElement,
    datalist: HTMLDataListElement,
    dd: HTMLElement,
    del: HTMLElement,
    details: HTMLElement,
    dfn: HTMLElement,
    dialog: HTMLDialogElement,
    div: HTMLDivElement,
    dl: HTMLDListElement,
    dt: HTMLElement,
    em: HTMLElement,
    embed: HTMLEmbedElement,
    fieldset: HTMLFieldSetElement,
    figcaption: HTMLElement,
    figure: HTMLElement,
    footer: HTMLElement,
    form: HTMLFormElement,
    h1: HTMLHeadingElement,
    h2: HTMLHeadingElement,
    h3: HTMLHeadingElement,
    h4: HTMLHeadingElement,
    h5: HTMLHeadingElement,
    h6: HTMLHeadingElement,
    head: HTMLHeadElement,
    header: HTMLElement,
    hgroup: HTMLElement,
    hr: HTMLHRElement,
    html: HTMLHtmlElement,
    i: HTMLElement,
    iframe: HTMLIFrameElement,
    img: HTMLImageElement,
    input: HTMLInputElement,
    ins: HTMLModElement,
    kbd: HTMLElement,
    keygen: HTMLElement,
    label: HTMLLabelElement,
    legend: HTMLLegendElement,
    li: HTMLLIElement,
    link: HTMLLinkElement,
    main: HTMLElement,
    map: HTMLMapElement,
    mark: HTMLElement,
    menu: HTMLElement,
    menuitem: HTMLElement,
    meta: HTMLMetaElement,
    meter: HTMLElement,
    nav: HTMLElement,
    noindex: HTMLElement,
    noscript: HTMLElement,
    object: HTMLObjectElement,
    ol: HTMLOListElement,
    optgroup: HTMLOptGroupElement,
    option: HTMLOptionElement,
    output: HTMLElement,
    p: HTMLParagraphElement,
    param: HTMLParamElement,
    picture: HTMLElement,
    pre: HTMLPreElement,
    progress: HTMLProgressElement,
    q: HTMLQuoteElement,
    rp: HTMLElement,
    rt: HTMLElement,
    ruby: HTMLElement,
    s: HTMLElement,
    samp: HTMLElement,
    slot: HTMLSlotElement,
    script: HTMLScriptElement,
    section: HTMLElement,
    select: HTMLSelectElement,
    small: HTMLElement,
    source: HTMLSourceElement,
    span: HTMLSpanElement,
    strong: HTMLElement,
    style: HTMLStyleElement,
    sub: HTMLElement,
    summary: HTMLElement,
    sup: HTMLElement,
    table: HTMLTableElement,
    template: HTMLTemplateElement,
    tbody: HTMLTableSectionElement,
    td: HTMLTableDataCellElement,
    textarea: HTMLTextAreaElement,
    tfoot: HTMLTableSectionElement,
    th: HTMLTableHeaderCellElement,
    thead: HTMLTableSectionElement,
    time: HTMLElement,
    title: HTMLTitleElement,
    tr: HTMLTableRowElement,
    track: HTMLTrackElement,
    u: HTMLElement,
    ul: HTMLUListElement,
    var: HTMLElement,
    video: HTMLVideoElement,
    wbr: HTMLElement,
    webview: HTMLElement,

    // SVG
    svg: SVGSVGElement,
    animate: SVGAnimateElement,
    circle: SVGCircleElement,
    animateTransform: SVGAnimateElement,
    clipPath: SVGClipPathElement,
    defs: SVGDefsElement,
    desc: SVGDescElement,
    ellipse: SVGEllipseElement,
    feBlend: SVGFEBlendElement,
    feColorMatrix: SVGFEColorMatrixElement,
    feComponentTransfer: SVGFEComponentTransferElement,
    feComposite: SVGFECompositeElement,
    feConvolveMatrix: SVGFEConvolveMatrixElement,
    feDiffuseLighting: SVGFEDiffuseLightingElement,
    feDisplacementMap: SVGFEDisplacementMapElement,
    feDropShadow: SVGFEDropShadowElement,
    feFlood: SVGFEFloodElement,
    feFuncA: SVGFEFuncAElement,
    feFuncB: SVGFEFuncBElement,
    feFuncG: SVGFEFuncGElement,
    feFuncR: SVGFEFuncRElement,
    feGaussianBlur: SVGFEGaussianBlurElement,
    feImage: SVGFEImageElement,
    feMerge: SVGFEMergeElement,
    feMergeNode: SVGFEMergeNodeElement,
    feMorphology: SVGFEMorphologyElement,
    feOffset: SVGFEOffsetElement,
    feSpecularLighting: SVGFESpecularLightingElement,
    feTile: SVGFETileElement,
    feTurbulence: SVGFETurbulenceElement,
    filter: SVGFilterElement,
    foreignObject: SVGForeignObjectElement,
    g: SVGGElement,
    image: SVGImageElement,
    line: SVGLineElement,
    linearGradient: SVGLinearGradientElement,
    marker: SVGMarkerElement,
    mask: SVGMaskElement,
    path: SVGPathElement,
    pattern: SVGPatternElement,
    polygon: SVGPolygonElement,
    polyline: SVGPolylineElement,
    radialGradient: SVGRadialGradientElement,
    rect: SVGRectElement,
    stop: SVGStopElement,
    symbol: SVGSymbolElement,
    text: SVGTextElement,
    tspan: SVGTSpanElement,
    use: SVGUseElement
  }

  interface IntrinsicElements {
    // HTML
    a: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
    abbr: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    address: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    area: DetailedHTMLProps<AreaHTMLAttributes<HTMLAreaElement>, HTMLAreaElement>,
    article: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    aside: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    audio: DetailedHTMLProps<AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>,
    b: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    base: DetailedHTMLProps<BaseHTMLAttributes<HTMLBaseElement>, HTMLBaseElement>,
    bdi: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    bdo: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    big: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    blockquote: DetailedHTMLProps<BlockquoteHTMLAttributes<HTMLElement>, HTMLElement>,
    body: DetailedHTMLProps<HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>,
    br: DetailedHTMLProps<HTMLAttributes<HTMLBRElement>, HTMLBRElement>,
    button: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    canvas: DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>,
    caption: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    cite: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    code: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    col: DetailedHTMLProps<ColHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>,
    colgroup: DetailedHTMLProps<ColgroupHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>,
    data: DetailedHTMLProps<DataHTMLAttributes<HTMLDataElement>, HTMLDataElement>,
    datalist: DetailedHTMLProps<HTMLAttributes<HTMLDataListElement>, HTMLDataListElement>,
    dd: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    del: DetailedHTMLProps<DelHTMLAttributes<HTMLElement>, HTMLElement>,
    details: DetailedHTMLProps<DetailsHTMLAttributes<HTMLElement>, HTMLElement>,
    dfn: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    dialog: DetailedHTMLProps<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>,
    div: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    dl: DetailedHTMLProps<HTMLAttributes<HTMLDListElement>, HTMLDListElement>,
    dt: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    em: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    embed: DetailedHTMLProps<EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>,
    fieldset: DetailedHTMLProps<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>,
    figcaption: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    figure: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    footer: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    form: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
    h1: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
    h2: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
    h3: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
    h4: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
    h5: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
    h6: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
    head: DetailedHTMLProps<HTMLAttributes<HTMLHeadElement>, HTMLHeadElement>,
    header: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    hgroup: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    hr: DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>,
    html: DetailedHTMLProps<HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>,
    i: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    iframe: DetailedHTMLProps<IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>,
    img: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
    input: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    ins: DetailedHTMLProps<InsHTMLAttributes<HTMLModElement>, HTMLModElement>,
    kbd: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    keygen: DetailedHTMLProps<KeygenHTMLAttributes<HTMLElement>, HTMLElement>,
    label: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
    legend: DetailedHTMLProps<HTMLAttributes<HTMLLegendElement>, HTMLLegendElement>,
    li: DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>,
    link: DetailedHTMLProps<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>,
    main: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    map: DetailedHTMLProps<MapHTMLAttributes<HTMLMapElement>, HTMLMapElement>,
    mark: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    menu: DetailedHTMLProps<MenuHTMLAttributes<HTMLElement>, HTMLElement>,
    menuitem: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    meta: DetailedHTMLProps<MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>,
    meter: DetailedHTMLProps<MeterHTMLAttributes<HTMLElement>, HTMLElement>,
    nav: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    noindex: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    noscript: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    object: DetailedHTMLProps<ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>,
    ol: DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>,
    optgroup: DetailedHTMLProps<OptgroupHTMLAttributes<HTMLOptGroupElement>, HTMLOptGroupElement>,
    option: DetailedHTMLProps<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>,
    output: DetailedHTMLProps<OutputHTMLAttributes<HTMLElement>, HTMLElement>,
    p: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>,
    param: DetailedHTMLProps<ParamHTMLAttributes<HTMLParamElement>, HTMLParamElement>,
    picture: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    pre: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>,
    progress: DetailedHTMLProps<ProgressHTMLAttributes<HTMLProgressElement>, HTMLProgressElement>,
    q: DetailedHTMLProps<QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>,
    rp: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    rt: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    ruby: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    s: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    samp: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    slot: DetailedHTMLProps<SlotHTMLAttributes<HTMLSlotElement>, HTMLSlotElement>,
    script: DetailedHTMLProps<ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>,
    section: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    select: DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
    small: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    source: DetailedHTMLProps<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>,
    span: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>,
    strong: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    style: DetailedHTMLProps<StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>,
    sub: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    summary: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    sup: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    table: DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>,
    template: DetailedHTMLProps<HTMLAttributes<HTMLTemplateElement>, HTMLTemplateElement>,
    tbody: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>,
    td: DetailedHTMLProps<TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>,
    textarea: DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
    tfoot: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>,
    th: DetailedHTMLProps<ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>,
    thead: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>,
    time: DetailedHTMLProps<TimeHTMLAttributes<HTMLElement>, HTMLElement>,
    title: DetailedHTMLProps<HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>,
    tr: DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>,
    track: DetailedHTMLProps<TrackHTMLAttributes<HTMLTrackElement>, HTMLTrackElement>,
    u: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    ul: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>,
    var: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    video: DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>,
    wbr: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    webview: DetailedHTMLProps<WebViewHTMLAttributes<HTMLElement>, HTMLElement>,

    // SVG
    svg: SVGAttributes<SVGSVGElement>,
    animate: SVGAttributes<SVGAnimateElement>,
    circle: SVGAttributes<SVGCircleElement>,
    animateTransform: SVGAttributes<SVGAnimateElement>,
    clipPath: SVGAttributes<SVGClipPathElement>,
    defs: SVGAttributes<SVGDefsElement>,
    desc: SVGAttributes<SVGDescElement>,
    ellipse: SVGAttributes<SVGEllipseElement>,
    feBlend: SVGAttributes<SVGFEBlendElement>,
    feColorMatrix: SVGAttributes<SVGFEColorMatrixElement>,
    feComponentTransfer: SVGAttributes<SVGFEComponentTransferElement>,
    feComposite: SVGAttributes<SVGFECompositeElement>,
    feConvolveMatrix: SVGAttributes<SVGFEConvolveMatrixElement>,
    feDiffuseLighting: SVGAttributes<SVGFEDiffuseLightingElement>,
    feDisplacementMap: SVGAttributes<SVGFEDisplacementMapElement>,
    feDropShadow: SVGAttributes<SVGFEDropShadowElement>,
    feFlood: SVGAttributes<SVGFEFloodElement>,
    feFuncA: SVGAttributes<SVGFEFuncAElement>,
    feFuncB: SVGAttributes<SVGFEFuncBElement>,
    feFuncG: SVGAttributes<SVGFEFuncGElement>,
    feFuncR: SVGAttributes<SVGFEFuncRElement>,
    feGaussianBlur: SVGAttributes<SVGFEGaussianBlurElement>,
    feImage: SVGAttributes<SVGFEImageElement>,
    feMerge: SVGAttributes<SVGFEMergeElement>,
    feMergeNode: SVGAttributes<SVGFEMergeNodeElement>,
    feMorphology: SVGAttributes<SVGFEMorphologyElement>,
    feOffset: SVGAttributes<SVGFEOffsetElement>,
    feSpecularLighting: SVGAttributes<SVGFESpecularLightingElement>,
    feTile: SVGAttributes<SVGFETileElement>,
    feTurbulence: SVGAttributes<SVGFETurbulenceElement>,
    filter: SVGAttributes<SVGFilterElement>,
    foreignObject: SVGAttributes<SVGForeignObjectElement>,
    g: SVGAttributes<SVGGElement>,
    image: SVGAttributes<SVGImageElement>,
    line: SVGAttributes<SVGLineElement>,
    linearGradient: SVGAttributes<SVGLinearGradientElement>,
    marker: SVGAttributes<SVGMarkerElement>,
    mask: SVGAttributes<SVGMaskElement>,
    path: SVGAttributes<SVGPathElement>,
    pattern: SVGAttributes<SVGPatternElement>,
    polygon: SVGAttributes<SVGPolygonElement>,
    polyline: SVGAttributes<SVGPolylineElement>,
    radialGradient: SVGAttributes<SVGRadialGradientElement>,
    rect: SVGAttributes<SVGRectElement>,
    stop: SVGAttributes<SVGStopElement>,
    symbol: SVGAttributes<SVGSymbolElement>,
    text: SVGAttributes<SVGTextElement>,
    tspan: SVGAttributes<SVGTSpanElement>,
    use: SVGAttributes<SVGUseElement>
  }

}
