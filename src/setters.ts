
/* IMPORT */

import {$} from '~/observable';
import template from '~/template';
import {castArray, isArray, isBoolean, isFunction, isNil, isNode, isObservable, isPropertyNonDimensional, isString, isText, isUndefined, keys} from '~/utils';
import {Child, ChildMounted, ChildPrepared, EventListener, FunctionResolver, ObservableResolver} from '~/types';

/* HELPERS */

const resolveObservable = <T> ( value: ObservableResolver<T> ): T => {

  if ( !isObservable ( value ) ) return value;

  return resolveObservable ( value () );

};

const resolveObservableOrFunction = <T> ( value: ObservableResolver<FunctionResolver<T>> ): T => {

  if ( !isFunction ( value ) ) return value;

  return resolveObservableOrFunction ( value () );

};

const normalizeChildren = ( children: Child[] ): Child[] => {

  // It flattes the array and removes nil and boolean values, quickly

  for ( let i = children.length - 1; i >= 0; i-- ) {

    const child = children[i];

    if ( isNil ( child ) || isBoolean ( child ) ) {

      children.splice ( i, 1 );

    } else if ( isArray ( child ) ) {

      for ( let ci = child.length -1; ci >= 0; ci-- ) {

        const childChild = child[ci];

        if ( isNil ( childChild ) || isBoolean ( childChild ) ) {

          child.splice ( ci, 1 );

        }

      }

      children.splice ( i, 1, ...child );

    }

  }

  return children;

};

const prepareChildren = ( children: Child[] ): ChildPrepared => {

  children = normalizeChildren ( children );

  if ( children.length === 0 ) return null;

  if ( children.length === 1 ) return prepareChild ( children[0] );

  const childrenPrepared: ChildPrepared = new Array ( children.length );

  for ( let i = children.length - 1; i >= 0; i-- ) {

    childrenPrepared[i] = prepareChild ( children[i] );

  }

  return childrenPrepared;

};

const prepareChild = ( child: Child ): ChildPrepared => {

  if ( isNil ( child ) ) return null;

  if ( isBoolean ( child ) ) return null;

  if ( isNode ( child ) ) return child;

  if ( isFunction ( child ) ) return child;

  if ( isArray ( child ) ) {

    if ( child.length === 0 ) return null;

    if ( child.length === 1 ) return prepareChild ( child[0] );

    return prepareChildren ( child );

  }

  return String ( child );

};

const removeChildren = ( parent: HTMLElement, children: ChildMounted ): void => {

  for ( let i = 0, l = children.length; i < l; i++ ) {

    const child = children[i];

    if ( isArray ( child ) ) {

      removeChildren ( parent, child );

    } else if ( isNode ( child ) ) {

      parent.removeChild ( child );

    }

  }

};

const getChildrenNextSibling = ( children: ChildMounted ): Node | null | undefined => {

  for ( let i = children.length - 1; i >= 0; i-- ) {

    const child = children[i];

    if ( isArray ( child ) ) {

      const nextSibling = getChildrenNextSibling ( child );

      if ( !isUndefined ( nextSibling ) ) return nextSibling;

    } else {

      return child.nextSibling || null;

    }

  }

};

/* MAIN */

const setAbstract = <T> ( value: ObservableResolver<T>, setter: (( value: T, valuePrev?: T ) => void) ): void => {

  if ( isObservable ( value ) ) {

    let valuePrev: T | undefined;

    $.effect ( () => {

      const valueNext = resolveObservable ( value );

      setter ( valueNext, valuePrev );

      valuePrev = valueNext;

    });

  } else {

    setter ( value );

  }

};

const setAttributeStatic = ( attributes: NamedNodeMap, key: string, value: null | undefined | boolean | number | string ): void => {

  const attr = attributes.getNamedItem ( key );

  if ( isNil ( value ) || isFunction ( value ) || value === false ) {

    if ( attr ) {

      attributes.removeNamedItem ( key );

    }

  } else {

    value = ( value === true ) ? '' : String ( value );

    if ( attr ) {

      attr.value = value;

    } else {

      const attr = document.createAttribute ( key );

      attr.value = value;

      attributes.setNamedItem ( attr );

    }

  }

};

const setAttribute = ( element: HTMLElement, key: string, value: ObservableResolver<null | undefined | boolean | number | string> ): void => {

  const {attributes} = element;

  setAbstract ( value, value => {

    setAttributeStatic ( attributes, key, value );

  });

};

const setChildReplacement = ( child: Child, childPrev: Node ): void => {

  if ( isString ( child ) && isText ( childPrev ) ) {

    childPrev.data = child;

  } else {

    const parent = childPrev.parentElement;

    if ( !parent ) throw new Error ( 'Invalid child replacement' );

    setChild ( parent, child, [childPrev] );

  }

};

const setChildStatic = ( parent: HTMLElement, child: Child, childrenPrev: ChildMounted, childrenPrevSibling: Node | null = null ): ChildMounted => {

  //TODO: Optimize this massively, after it works reliably, currently it may not quite work and it certainly has **terrible** performance
  //URL: https://github.com/adamhaile/surplus/blob/2aca5a36ceb6a7cbb4d609cd04ee631714602f91/src/runtime/content.ts
  //URL: https://github.com/adamhaile/surplus/blob/2aca5a36ceb6a7cbb4d609cd04ee631714602f91/src/runtime/insert.ts
  //URL: https://github.com/luwes/sinuous/blob/master/packages/sinuous/h/src/h.js
  //URL: https://github.com/ryansolid/dom-expressions/blob/main/packages/dom-expressions/src/client.js

  if ( childrenPrev.length === 0 && template.isProxy ( child ) ) { // Template proxy function

    const placeholder = new Text ();

    parent.insertBefore ( placeholder, null );

    ( child as any )( parent, 'child', placeholder ); //TSC

    return [placeholder];

  } else { // Regular child

    const childrenNext = castArray ( ( isArray ( child ) ? prepareChildren ( child ) : prepareChild ( child ) ) ?? new Comment () );
    const childrenNextSibling = getChildrenNextSibling ( childrenPrev ) || childrenPrevSibling;

    removeChildren ( parent, childrenPrev );

    for ( let i = 0, l = childrenNext.length; i < l; i++ ) {

      const childNext = childrenNext[i];

      if ( isFunction ( childNext ) ) {

        let childrenPrev: ChildMounted = [];

        $.effect ( () => {

          childrenNext[i] = childrenPrev = setChildStatic ( parent, resolveObservableOrFunction ( childNext ), childrenPrev, childrenNextSibling );

        });

      } else if ( isString ( childNext ) ) {

        const textNode = new Text ( childNext );

        parent.insertBefore ( textNode, childrenNextSibling );

        childrenNext[i] = textNode;

      } else if ( isNode ( childNext ) ) {

        parent.insertBefore ( childNext, childrenNextSibling );

      }

    }

    return childrenNext as ChildMounted; //TSC

  }

};

const setChild = ( parent: HTMLElement, child: Child, childrenPrev: ChildMounted = [], childrenPrevSibling: Node | null = null ): ChildMounted => {

  setAbstract ( child, child => {

    childrenPrev = setChildStatic ( parent, child, childrenPrev, childrenPrevSibling );

  });

  return childrenPrev;

};

const setChildren = ( parent: HTMLElement, children: Child[] ): void => {

  for ( let i = 0, l = children.length; i < l; i++ ) {

    setChild ( parent, children[i] );

  }

};

const setClassStatic = ( classList: DOMTokenList, key: string, value: null | undefined | boolean ): void => {

  classList.toggle ( key, !!value );

};

const setClass = ( classList: DOMTokenList, key: string, value: ObservableResolver<null | undefined | boolean> ): void => {

  setAbstract ( value, value => {

    setClassStatic ( classList, key, value );

  });

};

const setClassesStatic = ( element: HTMLElement, object: string | Record<string, ObservableResolver<boolean>>, objectPrev?: string | Record<string, ObservableResolver<boolean>> ): void => {

  if ( isString ( object ) ) {

    element.className = object;

  } else {

    const {classList} = element;

    if ( objectPrev ) {

      if ( isString ( objectPrev ) ) {

        element.className = '';

      } else {

        for ( const key in objectPrev ) {

          if ( key in object ) continue;

          setClass ( classList, key, false );

        }

      }

    }

    for ( const key in object ) {

      setClass ( classList, key, object[key] );

    }

  }

};

const setClasses = ( element: HTMLElement, object: ObservableResolver<string | Record<string, ObservableResolver<boolean>>> ): void => {

  setAbstract ( object, ( object, objectPrev ) => {

    setClassesStatic ( element, object, objectPrev );

  });

};

const setEventStatic = (() => {

  //TODO: Support capturing events
  //TODO: Maybe support more events: [onmousemove, onmouseout, onmouseover, onpointerdown, onpointermove, onpointerout, onpointerover, onpointerup, ontouchend, ontouchmove, ontouchstart]

  const delegatedEvents = <const> {
    onbeforeinput: '_onbeforeinput',
    onclick: '_onclick',
    ondblclick: '_ondblclick',
    onfocusin: '_onfocusin',
    onfocusout: '_onfocusout',
    oninput: '_oninput',
    onkeydown: '_onkeydown',
    onkeyup: '_onkeyup',
    onmousedown: '_onmousedown',
    onmouseup: '_onmouseup'
  };

  for ( const event of keys ( delegatedEvents ) ) {

    const key = delegatedEvents[event];

    document[event] = ( event: Event ): void => {

      let node = event.composedPath ()[0] as Node | null;

      Object.defineProperty ( event, 'currentTarget', {
        configurable: true,
        get () {
          return node || document;
        }
      });

      while ( node ) {

        const handler = node[key];

        if ( handler ) {

          handler ( event );

          if ( event.cancelBubble ) break;

        }

        node = node.parentNode;

      }

    };

  }

  return ( element: HTMLElement, event: string, value: null | undefined | EventListener ): void => {

    if ( event.endsWith ( 'capture' ) ) {

      const type = event.slice ( 2, -7 );
      const key = `_${event}`;

      const valuePrev = element[key];

      if ( valuePrev ) element.removeEventListener ( type, valuePrev, { capture: true } );

      if ( value ) element.addEventListener ( type, value, { capture: true } );

      element[key] = value;

    } else {

      const key: string = delegatedEvents[event] || event;

      element[key] = value;

    }

  };

})();

const setEvent = ( element: HTMLElement, event: string, value: ObservableResolver<null | undefined | EventListener> ): void => {

  setAbstract ( value, value => {

    setEventStatic ( element, event, value );

  });

};

const setHTMLStatic = ( element: HTMLElement, value: null | undefined | number | string ): void => {

  element.innerHTML = String ( value ?? '' );

};

const setHTML = ( element: HTMLElement, value: ObservableResolver<{ __html: ObservableResolver<null | undefined | number | string> }> ): void => {

  setAbstract ( value, value => {

    setAbstract ( value.__html, html => {

      setHTMLStatic ( element, html );

    });

  });

};

const setPropertyStatic = ( element: HTMLElement, key: string, value: null | undefined | boolean | number | string ): void => {

  value = ( key === 'className' ) ? ( value ?? '' ) : value;

  element[key] = value;

};

const setProperty = ( element: HTMLElement, key: string, value: ObservableResolver<null | undefined | boolean | number | string> ): void => {

  setAbstract ( value, value => {

    setPropertyStatic ( element, key, value );

  });

};

const setRef = <T> ( element: T, value?: (( value: T ) => unknown)): void => {

  if ( isUndefined ( value ) ) return;

  if ( !isFunction ( value ) ) throw new Error ( 'Invalid ref' );

  queueMicrotask ( () => { // Scheduling a microtask to dramatically increase the probability that the element gets mounted in the meantime, which would be more convenient

    value ( element );

  });

};

const setStyleStatic = ( style: CSSStyleDeclaration, key: string, value: null | undefined | number | string ): void => {

  if ( key.charCodeAt ( 0 ) === 45 ) { // /^-/

    style.setProperty ( key, String ( value ) );

  } else if ( isNil ( value ) ) {

    style[key] = null;

  } else {

    style[key] = ( isString ( value ) || isPropertyNonDimensional ( key ) ? value : `${value}px` );

  }

};

const setStyle = ( style: CSSStyleDeclaration, key: string, value: ObservableResolver<null | undefined | number | string> ): void => {

  setAbstract ( value, value => {

    setStyleStatic ( style, key, value );

  });

};

const setStylesStatic = ( style: CSSStyleDeclaration, object: string | Record<string, ObservableResolver<null | undefined | number | string>>, objectPrev?: string | Record<string, ObservableResolver<null | undefined | number | string>> ): void => {

  if ( isString ( object ) ) {

    style.cssText = object;

  } else {

    if ( objectPrev ) {

      if ( isString ( objectPrev ) ) {

        style.cssText = '';

      } else {

        for ( const key in objectPrev ) {

          if ( key in object ) continue;

          setStyleStatic ( style, key, null );

        }

      }

    }

    for ( const key in object ) {

      setStyle ( style, key, object[key] );

    }

  }

};

const setStyles = ( element: HTMLElement, object: ObservableResolver<string | Record<string, ObservableResolver<null | undefined | number | string>>> ): void => {

  const {style} = element;

  setAbstract ( object, ( object, objectPrev ) => {

    setStylesStatic ( style, object, objectPrev );

  });

};

const setProp = ( element: HTMLElement, key: string, value: any ): void => {

  if ( template.isProxy ( value ) ) {

    value ( element, key );

  } else if ( key === 'children' ) {

    setChildren ( element, value );

  } else if ( key === 'ref' ) {

    setRef ( element, value );

  } else if ( key === 'style' ) {

    setStyles ( element, value );

  } else if ( key === 'class' ) {

    setClasses ( element, value );

  } else if ( key === 'innerHTML' || key === 'outerHTML' || key === 'textContent' ) {

    // Forbidden props

  } else if ( key === 'dangerouslySetInnerHTML' ) {

    setHTML ( element, value );

  } else if ( ( key.charCodeAt ( 0 ) === 111 || key.charCodeAt ( 0 ) === 79 ) && ( key.charCodeAt ( 1 ) === 110 || key.charCodeAt ( 1 ) === 78 ) ) { // /^on/i

    setEvent ( element, key.toLowerCase (), value );

  } else if ( key in element ) {

    setProperty ( element, key, value );

  } else {

    setAttribute ( element, key, value );

  }

};

const setProps = ( element: HTMLElement, object: Record<string, any> ): void => {

  for ( const key in object ) {

    setProp ( element, key, object[key] );

  }

};

/* EXPORT */

export {setAbstract, setAttributeStatic, setAttribute, setChildReplacement, setChildStatic, setChild, setChildren, setClassStatic, setClass, setClassesStatic, setClasses, setEventStatic, setEvent, setHTMLStatic, setHTML, setPropertyStatic, setProperty, setRef, setStyleStatic, setStyle, setStylesStatic, setStyles, setProp, setProps};
