
/** @jsx createElement */
/** @jsxFrag Fragment */

/* IMPORT */

import {Component, ErrorBoundary, For, Fragment, If, Portal, Switch, Ternary} from '../src';
import {useCleanup, useComputed, useDisposed, useEffect, useError, usePromise} from '../src';
import {$, $$, createElement, render, renderToString, styled, template} from '../src';

/* MAIN */

//TODO: Test all built-in components
//TODO: Test child
//TODO: Test children

const TEST_INTERVAL = 500; // Lowering this makes it easier to spot some memory leaks

const TestNullStatic = (): JSX.Element => {
  return (
    <>
      <h3>Null - Static</h3>
      <p>{null}</p>
    </>
  );
};

const TestNullObservable = (): JSX.Element => {
  const o = $<string>( null );
  const toggle = () => o.update ( prev => ( prev === null ) ? '' : null );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Null - Observable</h3>
      <p>{o}</p>
    </>
  );
};

const TestUndefinedStatic = (): JSX.Element => {
  return (
    <>
      <h3>Undefined - Static</h3>
      <p>{undefined}</p>
    </>
  );
};

const TestUndefinedObservable = (): JSX.Element => {
  const o = $<string>( undefined );
  const toggle = () => o.update ( prev => ( prev === undefined ) ? '' : undefined );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Undefined - Observable</h3>
      <p>{o}</p>
    </>
  );
};

const TestBooleanStatic = (): JSX.Element => {
  return (
    <>
      <h3>Boolean - Static</h3>
      <p>{true}{false}</p>
    </>
  );
};

const TestBooleanObservable = (): JSX.Element => {
  const o = $( true );
  const toggle = () => o.update ( prev => !prev );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Boolean - Observable</h3>
      <p>{o}</p>
    </>
  );
};

const TestBooleanRemoval = (): JSX.Element => {
  const o = $( true );
  const toggle = () => o.update ( prev => prev ? null : true );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Boolean - Removal</h3>
      <p>({o})</p>
    </>
  );
};

const TestNumberStatic = (): JSX.Element => {
  return (
    <>
      <h3>Number - Static</h3>
      <p>{123}</p>
    </>
  );
};

const TestNumberObservable = (): JSX.Element => {
  const o = $( Math.random () );
  const randomize = () => o ( Math.random () );
  setInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>Number - Observable</h3>
      <p>{o}</p>
    </>
  );
};

const TestNumberRemoval = (): JSX.Element => {
  const o = $( Math.random () );
  const randomize = () => o.update ( prev => prev ? null : Math.random () );
  setInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>Number - Removal</h3>
      <p>({o})</p>
    </>
  );
};

const TestBigIntStatic = (): JSX.Element => {
  return (
    <>
      <h3>BigInt - Static</h3>
      <p>{123n}</p>
    </>
  );
};

const TestBigIntObservable = (): JSX.Element => {
  const o = $( BigInt ( Math.random () * 100 | 0 ) );
  const randomize = () => o ( BigInt ( Math.random () * 100 | 0 ) );
  setInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>BigInt - Observable</h3>
      <p>{o}</p>
    </>
  );
};

const TestBigIntRemoval = (): JSX.Element => {
  const o = $( BigInt ( Math.random () * 100 | 0 ) );
  const randomize = () => o.update ( prev => prev ? null : BigInt ( Math.random () * 100 | 0 ) );
  setInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>BigInt - Removal</h3>
      <p>({o})</p>
    </>
  );
};

const TestStringStatic = (): JSX.Element => {
  return (
    <>
      <h3>String - Static</h3>
      <p>{'string'}</p>
    </>
  );
};

const TestStringObservable = (): JSX.Element => {
  const o = $( String ( Math.random () ) );
  const randomize = () => o ( String ( Math.random () ) );
  setInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>String - Observable</h3>
      <p>{o}</p>
    </>
  );
};

const TestStringRemoval = (): JSX.Element => {
  const o = $( String ( Math.random () ) );
  const randomize = () => o.update ( prev => prev ? null : String ( Math.random () ) );
  setInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>String - Removal</h3>
      <p>({o})</p>
    </>
  );
};

const TestSymbolStatic = (): JSX.Element => {
  return (
    <>
      <h3>Symbol - Static</h3>
      <p>{Symbol ()}</p>
    </>
  );
};

const TestSymbolObservable = (): JSX.Element => {
  const o = $( Symbol () );
  const randomize = () => o ( Symbol () );
  setInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>Symbol - Observable</h3>
      <p>{o}</p>
    </>
  );
};

const TestSymbolRemoval = (): JSX.Element => {
  const o = $( Symbol () );
  const randomize = () => o.update ( prev => prev ? null : Symbol () );
  setInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>Symbol - Removal</h3>
      <p>({o})</p>
    </>
  );
};

const TestAttributeStatic = (): JSX.Element => {
  return (
    <>
      <h3>Attribute - Static</h3>
      <p data-color="red">content</p>
    </>
  );
};

const TestAttributeStaticFunction = (): JSX.Element => {
  return (
    <>
      <h3>Attribute - Static Function</h3>
      <p data-color={() => 'danger'}>content</p>
    </>
  );
};

const TestAttributeObservable = (): JSX.Element => {
  const o = $( 'red' );
  const toggle = () => o.update ( prev => ( prev === 'red' ) ? 'blue' : 'red' );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Attribute - Observable</h3>
      <p data-color={o}>content</p>
    </>
  );
};

const TestAttributeObservableBoolean = (): JSX.Element => {
  const o = $( true );
  const toggle = () => o.update ( prev => !prev );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Attribute - Observable Boolean</h3>
      <p data-red={o}>content</p>
    </>
  );
};

const TestAttributeRemoval = (): JSX.Element => {
  const o = $( 'red' );
  const toggle = () => o.update ( prev => ( prev === 'red' ) ? null : 'red' );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Attribute - Removal</h3>
      <p data-color={o}>content</p>
    </>
  );
};

const TestPropertyCheckedStatic = (): JSX.Element => {
  return (
    <>
      <h3>Property - Checked Static</h3>
      <p><input type="checkbox" checked={true} /></p>
    </>
  );
};

const TestPropertyCheckedObservable = (): JSX.Element => {
  const o = $( true );
  const toggle = () => o.update ( prev => !prev );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Property - Checked Observable</h3>
      <p><input type="checkbox" checked={o} /></p>
    </>
  );
};

const TestPropertyCheckedRemoval = (): JSX.Element => {
  const o = $( true );
  const toggle = () => o.update ( prev => prev ? null : true );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Property - Checked Removal</h3>
      <p><input type="checkbox" checked={o} /></p>
    </>
  );
};

const TestPropertyValueStatic = (): JSX.Element => {
  return (
    <>
      <h3>Property - Value Static</h3>
      <p><input value="value" /></p>
    </>
  );
};

const TestPropertyValueObservable = (): JSX.Element => {
  const o = $( String ( Math.random () ) );
  const randomize = () => o ( String ( Math.random () ) );
  setInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>Property - Value Observable</h3>
      <p><input value={o} /></p>
    </>
  );
};

const TestPropertyValueRemoval = (): JSX.Element => {
  const o = $( String ( Math.random () ) );
  const randomize = () => o.update ( prev => prev ? null : String ( Math.random () ) );
  setInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>Property - Value Removal</h3>
      <p><input value={o} /></p>
    </>
  );
};

const TestClassNameStatic = (): JSX.Element => {
  return (
    <>
      <h3>ClassName - Static</h3>
      <p className="red">content</p>
    </>
  );
};

const TestClassNameObservable = (): JSX.Element => {
  const o = $( 'red' );
  const toggle = () => o.update ( prev => ( prev === 'red' ) ? 'blue' : 'red' );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>ClassName - Observable</h3>
      <p className={o}>content</p>
    </>
  );
};

const TestClassNameRemoval = (): JSX.Element => {
  const o = $( 'red' );
  const toggle = () => o.update ( prev => prev ? null : 'red' );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>ClassName - Removal</h3>
      <p className={o}>content</p>
    </>
  );
};

const TestClassStatic = (): JSX.Element => {
  return (
    <>
      <h3>Class - Static</h3>
      <p class={{ red: true, blue: false }}>content</p>
    </>
  );
};

const TestClassStaticString = (): JSX.Element => {
  return (
    <>
      <h3>Class - Static String</h3>
      <p class="red">content</p>
    </>
  );
};

const TestClassObservable = (): JSX.Element => {
  const o = $( true );
  const toggle = () => o.update ( prev => !prev );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Class - Observable</h3>
      <p class={{ red: o }}>content</p>
    </>
  );
};

const TestClassObservableString = (): JSX.Element => {
  const o = $( 'red' );
  const toggle = () => o.update ( prev => ( prev === 'red' ) ? 'blue' : 'red' );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Class - Observable String</h3>
      <p class={o}>content</p>
    </>
  );
};

const TestClassRemoval = (): JSX.Element => {
  const o = $( true );
  const toggle = () => o.update ( prev => prev ? null : true );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Class - Removal</h3>
      <p class={{ red: o }}>content</p>
    </>
  );
};

const TestClassRemovalString = (): JSX.Element => {
  const o = $( 'red' );
  const toggle = () => o.update ( prev => prev ? null : 'red' );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Class - Removal String</h3>
      <p class={o}>content</p>
    </>
  );
};

const TestClassesStatic = (): JSX.Element => {
  return (
    <>
      <h3>Classes - Static</h3>
      <p class={{ red: true, blue: false }}>content</p>
    </>
  );
};

const TestClassesObservable = (): JSX.Element => {
  const o = $({ red: true, blue: false });
  const toggle = () => o.update ( prev => prev.red ? { red: false, blue: true } : { red: true, blue: false } );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Classes - Observable</h3>
      <p class={o}>content</p>
    </>
  );
};

const TestClassesCleanup = (): JSX.Element => {
  const o = $<JSX.ClassProperties>({ red: true });
  const toggle = () => o.update ( prev => prev.red ? { blue: true } : { red: true } );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Classes - Cleanup</h3>
      <p class={o}>content</p>
    </>
  );
};

const TestStyleStatic = (): JSX.Element => {
  return (
    <>
      <h3>Style - Static</h3>
      <p style={{ color: 'green' }}>content</p>
    </>
  );
};

const TestStyleStaticNumeric = (): JSX.Element => {
  return (
    <>
      <h3>Style - Static Numeric</h3>
      <p style={{ flexGrow: 1, height: 50 }}>content</p>
    </>
  );
};

const TestStyleStaticString = (): JSX.Element => {
  return (
    <>
      <h3>Style - Static String</h3>
      <p style="flex-grow: 1; height: 50px;">content</p>
    </>
  );
};

const TestStyleStaticVariable = (): JSX.Element => {
  return (
    <>
      <h3>Style - Static Variable</h3>
      <p style={{ color: 'var(--color)', '--color': 'green' }}>content</p>
    </>
  );
};

const TestStyleObservable = (): JSX.Element => {
  const o = $( 'green' );
  const toggle = () => o.update ( prev => ( prev === 'green' ) ? 'orange' : 'green' );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Style - Observable</h3>
      <p style={{ color: o }}>content</p>
    </>
  );
};

const TestStyleObservableNumeric = (): JSX.Element => {
  const o = $( { flexGrow: 1, width: 50 } );
  const toggle = () => o.update ( prev => ( prev.flexGrow === 1 ) ? { flexGrow: 2, width: 100 } : { flexGrow: 1, width: 50 } );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Style - Static Numeric</h3>
      <p style={o}>content</p>
    </>
  );
};

const TestStyleObservableString = (): JSX.Element => {
  const o = $( 'color: green' );
  const toggle = () => o.update ( prev => ( prev === 'color: green' ) ? 'color: orange' : 'color: green' );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Style - Observable String</h3>
      <p style={o}>content</p>
    </>
  );
};

const TestStyleObservableVariable = (): JSX.Element => {
  const o = $( 'green' );
  const toggle = () => o.update ( prev => ( prev === 'orange' ) ? 'green' : 'orange' );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Style - Observable Variable</h3>
      <p style={{ color: 'var(--color)', '--color': o }}>content</p>
    </>
  );
};

const TestStyleRemoval = (): JSX.Element => {
  const o = $( 'green' );
  const toggle = () => o.update ( prev => prev ? null : 'green' );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Style - Removal</h3>
      <p style={{ color: o }}>content</p>
    </>
  );
};

const TestStylesStatic = (): JSX.Element => {
  return (
    <>
      <h3>Styles - Static</h3>
      <p style={{ color: 'green' }}>content</p>
    </>
  );
};

const TestStylesObservable = (): JSX.Element => {
  const o = $({ color: 'orange', fontWeight: 'normal' });
  const toggle = () => o.update ( prev => ( prev.color === 'orange' ) ? { color: 'green', fontWeight: 'bold' } : { color: 'orange', fontWeight: 'normal' } );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Styles - Observable</h3>
      <p style={o}>content</p>
    </>
  );
};

const TestStylesObservableCleanup = (): JSX.Element => {
  const o = $<JSX.StyleProperties>({ color: 'orange', fontWeight: 'bold' });
  const toggle = () => o.update ( prev => ( prev.color === 'orange' ) ? { fontStyle: 'italic', textDecoration: 'line-through' } : { color: 'orange', fontWeight: 'bold' } );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Styles - Observable Cleanup</h3>
      <p style={o}>content</p>
    </>
  );
};

const TestHTMLInnerHTMLStatic = (): JSX.Element => {
  return (
    <>
      <h3>HTML - innerHTML - Static</h3>
      <p innerHTML="<b>danger</b>" />
    </>
  );
};

const TestHTMLInnerHTMLObservable = (): JSX.Element => {
  const o = $( '<b>danger1</b>' );
  const toggle = () => o.update ( prev => ( prev === '<b>danger1</b>' ) ? '<b>danger2</b>' : '<b>danger1</b>' );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>HTML - innerHTML - Observable</h3>
      <p innerHTML={o} />
    </>
  );
};

const TestHTMLOuterHTMLStatic = (): JSX.Element => {
  return (
    <>
      <h3>HTML - outerHTML - Static</h3>
      <p outerHTML="<b>danger</b>" />
    </>
  );
};

const TestHTMLOuterHTMLObservable = (): JSX.Element => {
  const o = $( '<b>danger1</b>' );
  const toggle = () => o.update ( prev => ( prev === '<b>danger1</b>' ) ? '<b>danger2</b>' : '<b>danger1</b>' );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>HTML - outerHTML - Observable</h3>
      <p outerHTML={o} />
    </>
  );
};

const TestHTMLTextContentStatic = (): JSX.Element => {
  return (
    <>
      <h3>HTML - textContent - Static</h3>
      <p textContent="<b>danger</b>" />
    </>
  );
};

const TestHTMLTextContentObservable = (): JSX.Element => {
  const o = $( '<b>danger1</b>' );
  const toggle = () => o.update ( prev => ( prev === '<b>danger1</b>' ) ? '<b>danger2</b>' : '<b>danger1</b>' );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>HTML - textContent - Observable</h3>
      <p textContent={o} />
    </>
  );
};

const TestHTMLDangerouslySetInnerHTMLStatic = (): JSX.Element => {
  return (
    <>
      <h3>HTML - dangerouslySetInnerHTML - Static</h3>
      <p dangerouslySetInnerHTML={{ __html: '<i>danger</i>' }} />
    </>
  );
};

const TestHTMLDangerouslySetInnerHTMLObservable = (): JSX.Element => {
  const o = $( { __html: '<i>danger</i>' } );
  const toggle = () => o.update ( prev => ( prev.__html === '<i>danger</i>' ) ? { __html: '<b>danger</b>' } : { __html: '<i>danger</i>' } );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>HTML - dangerouslySetInnerHTML - Observable</h3>
      <p dangerouslySetInnerHTML={o} />
    </>
  );
};

const TestHTMLDangerouslySetInnerHTMLObservableString = (): JSX.Element => {
  const o = $( '<i>danger</i>' );
  const toggle = () => o.update ( prev => ( prev === '<i>danger</i>' ) ? '<b>danger</b>' : '<i>danger</i>' );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>HTML - dangerouslySetInnerHTML - Observable String</h3>
      <p dangerouslySetInnerHTML={{ __html: o }} />
    </>
  );
};

const TestEventClickStatic = (): JSX.Element => {
  const o = $( 0 );
  const increment = () => o.update ( prev => prev + 1 );
  return (
    <>
      <h3>Event - Click Static</h3>
      <p><button onClick={increment}>{o}</button></p>
    </>
  );
};

const TestEventClickObservable = (): JSX.Element => {
  const o = $( 0 );
  const onClick = $( () => {} );
  const plus2 = () => o.update ( prev => {
    onClick.set ( minus1 );
    return prev + 2;
  });
  const minus1 = () => o.update ( prev => {
    onClick.set ( plus2 );
    return prev - 1;
  });
  onClick.set ( plus2 );
  return (
    <>
      <h3>Event - Click Observable</h3>
      <p><button onClick={onClick}>{o}</button></p>
    </>
  );
};

const TestEventClickRemoval = (): JSX.Element => {
  const o = $( 0 );
  const onClick = $( () => {} );
  const increment = () => o.update ( prev => {
    onClick.set ( null );
    return prev + 1;
  });
  onClick.set ( increment );
  return (
    <>
      <h3>Event - Click Removal</h3>
      <p><button onClick={onClick}>{o}</button></p>
    </>
  );
};

const TestABCD = () => {
  const AB = (): JSX.ElementObservable => {
    const a = <i>a</i>;
    const b = <u>b</u>;
    const component = $( a );
    const toggle = () => component ( ( component () === a ) ? b : a );
    setInterval ( toggle, TEST_INTERVAL / 2 );
    return component;
  };
  const CD = (): JSX.ElementObservable => {
    const c = <b>c</b>;
    const d = <span>d</span>;
    const component = $( c );
    const toggle = () => component ( ( component () === c ) ? d : c );
    setInterval ( toggle, TEST_INTERVAL / 2 );
    return component;
  };
  const ab = <AB />;
  const cd = <CD />;
  const component = $( ab );
  const toggle = () => component ( ( component () === ab ) ? cd : ab );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Children - ABCD</h3>
      <p>{component}</p>
    </>
  );
};

const TestIfStatic = (): JSX.Element => {
  return (
    <>
      <h3>If - Static</h3>
      <If when={true}>
        <p>true</p>
      </If>
      <If when={false}>
        <p>false</p>
      </If>
    </>
  );
};

const TestIfRemoval = (): JSX.Element => {
  const o = $( true );
  const toggle = () => o.update ( prev => !prev );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>If - Removal</h3>
      <p>(<If when={o}>content</If>)</p>
    </>
  );
};

const TestTernaryStatic = (): JSX.Element => {
  return (
    <>
      <h3>Ternary - Static</h3>
      <Ternary when={true}>
        <p>true (1)</p>
        <p>false (1)</p>
      </Ternary>
      <Ternary when={false}>
        <p>true (2)</p>
        <p>false (2)</p>
      </Ternary>
    </>
  );
};

const TestTernaryObservable = (): JSX.Element => {
  const o = $( true );
  const toggle = () => o.update ( prev => !prev );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Ternary - Observable</h3>
      <Ternary when={o}>
        <p>true</p>
        <p>false</p>
      </Ternary>
    </>
  );
};

const TestSwitchStatic = (): JSX.Element => {
  return (
    <>
      <h3>Switch - Static</h3>
      <Switch when={2}>
        <Switch.Case when={0}>
          <p>0</p>
        </Switch.Case>
        <Switch.Case when={1}>
          <p>1</p>
        </Switch.Case>
        <Switch.Case when={2}>
          <p>2</p>
        </Switch.Case>
        <Switch.Default>
          <p>default</p>
        </Switch.Default>
      </Switch>
    </>
  );
};

const TestSwitchObservable = (): JSX.Element => {
  const o = $( 0 );
  const toggle = () => o.update ( prev => ( prev + 1 ) % 4 );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Switch - Observable</h3>
      <Switch when={o}>
        <Switch.Case when={0}>
          <p>0</p>
        </Switch.Case>
        <Switch.Case when={1}>
          <p>1</p>
        </Switch.Case>
        <Switch.Case when={2}>
          <p>2</p>
        </Switch.Case>
        <Switch.Default>
          <p>default</p>
        </Switch.Default>
      </Switch>
    </>
  );
};

class TestComponentStatic extends Component<{}> {
  render (): JSX.Element {
    return (
      <>
        <h3>Component - Static</h3>
        <p>content</p>
      </>
    );
  }
}

class TestComponentObservable extends Component<{}> {
  getRandom (): number {
    return Math.random ();
  }
  render (): JSX.Element {
    const o = $( this.getRandom () );
    const randomize = () => o ( this.getRandom () );
    setInterval ( randomize, TEST_INTERVAL );
    return (
      <>
        <h3>Component - Observable</h3>
        <p>{o}</p>
      </>
    );
  }
}

const TestFragmentStatic = (): JSX.Element => {
  return (
    <>
      <h3>Fragment - Static</h3>
      <p>content</p>
    </>
  );
};

const TestFragmentStaticDeep = (): JSX.Element => {
  return (
    <>
      <h3>Fragment - Static Deep</h3>
      <>
        <p>first</p>
      </>
      <>
        <p>second</p>
      </>
      <>
        <>
          <>
            <>
              <p>deep</p>
            </>
          </>
        </>
      </>
    </>
  );
};

const TestErrorBundary = (): JSX.Element => {
  const Erroring = (): JSX.Element => {
    const o = $( true );
    const toggle = () => o.update ( prev => !prev );
    setTimeout ( toggle, TEST_INTERVAL );
    return o.on ( value => {
       if ( value ) return <p>content</p>;
       throw new Error ( 'Custom error' );
    });
  };
  const Fallback = ({ error, reset }): JSX.Element => {
    setTimeout ( reset, TEST_INTERVAL );
    return <p>Error caught: {error.message}</p>;
  };
  return (
    <>
      <h3>Error Boundary</h3>
      <ErrorBoundary fallback={Fallback}>
        <Erroring />
      </ErrorBoundary>
    </>
  );
};

const TestChildren = (): JSX.Element => {
  const A = ({ children }): JSX.Element => {
    return <div class="A">{children}</div>;
  };
  const B = ({ children }): JSX.Element => {
    return <div class="B">{children}</div>;
  };
  const C = ({ children }): JSX.Element => {
    return <div class="C">{children}</div>;
  };
  return (
    <>
      <h3>Children</h3>
      <A>
        <B>
          <C>
            <p>content</p>
          </C>
        </B>
      </A>
    </>
  );
};

const TestPortalStatic = (): JSX.Element => {
  return (
    <>
      <h3>Portal - Static</h3>
      <Portal>
        <p>content</p>
      </Portal>
    </>
  );
};

const TestRef = (): JSX.Element => {
  const ref = $<HTMLElement>();
  $.effect ( () => {
    if ( !ref () ) return;
    ref ().textContent = `Got ref - Has parent: ${!!ref ()?.parentElement} - Is connected: ${!!ref ()?.isConnected}`;
  });
  return (
    <>
      <h3>Ref</h3>
      <p ref={ref}>content</p>
    </>
  );
};

const TestStyledStatic = (): JSX.Element => {
  const P = styled.p`
    color: red;
  `;
  return (
    <>
      <h3>Styled - Static</h3>
      <P>content</P>
    </>
  );
};

const TestStyledClass = (): JSX.Element => {
  const blue = styled.class ( 'blue' );
  const red = styled.class ( 'red' );
  const P = styled.p`
    &${blue} {
      color: blue;
    }
    &${red} {
      color: red;
    }
  `;
  const oBlue = $( true );
  const oRed = $( false );
  const toggle = () => oBlue () ? ( oBlue ( false ), oRed ( true ) ) : ( oBlue ( true ), oRed ( false ) );
  setInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Styled - Class</h3>
      <P class={{ [blue.raw]: oBlue, [red.raw]: oRed }}>content</P>
    </>
  );
};

const TestRenderToString = async () => {
  const App = (): JSX.Element => {
    const o = $( String ( Math.random () ) );
    return (
      <div>
        <h3>renderToString</h3>
        <p>{o}</p>
      </div>
    );
  };
  const html = await renderToString ( <App /> );
  console.log ( { html } );
};

TestRenderToString ();

const Test = (): JSX.Element => {
  return (
    <>
      <TestNullStatic />
      <TestNullObservable />
      <TestUndefinedStatic />
      <TestUndefinedObservable />
      <TestBooleanStatic />
      <TestBooleanObservable />
      <TestBooleanRemoval />
      <TestNumberStatic />
      <TestNumberObservable />
      <TestNumberRemoval />
      <TestBigIntStatic />
      <TestBigIntObservable />
      <TestBigIntRemoval />
      <TestStringStatic />
      <TestStringObservable />
      <TestStringRemoval />
      <TestSymbolStatic />
      <TestSymbolObservable />
      <TestSymbolRemoval />
      <TestAttributeStatic />
      <TestAttributeStaticFunction />
      <TestAttributeObservable />
      <TestAttributeObservableBoolean />
      <TestAttributeRemoval />
      <TestPropertyCheckedStatic />
      <TestPropertyCheckedObservable />
      <TestPropertyCheckedRemoval />
      <TestPropertyValueStatic />
      <TestPropertyValueObservable />
      <TestPropertyValueRemoval />
      <TestClassNameStatic />
      <TestClassNameObservable />
      <TestClassNameRemoval />
      <TestClassStatic />
      <TestClassStaticString />
      <TestClassObservable />
      <TestClassObservableString />
      <TestClassRemoval />
      <TestClassRemovalString />
      <TestClassesStatic />
      <TestClassesObservable />
      <TestClassesCleanup />
      <TestStyleStatic />
      <TestStyleStaticNumeric />
      <TestStyleStaticString />
      <TestStyleStaticVariable />
      <TestStyleObservable />
      <TestStyleObservableNumeric />
      <TestStyleObservableString />
      <TestStyleObservableVariable />
      <TestStyleRemoval />
      <TestStylesStatic />
      <TestStylesObservable />
      <TestStylesObservableCleanup />
      <TestHTMLInnerHTMLStatic />
      <TestHTMLInnerHTMLObservable />
      <TestHTMLOuterHTMLStatic />
      <TestHTMLOuterHTMLObservable />
      <TestHTMLTextContentStatic />
      <TestHTMLTextContentObservable />
      <TestHTMLDangerouslySetInnerHTMLStatic />
      <TestHTMLDangerouslySetInnerHTMLObservable />
      <TestHTMLDangerouslySetInnerHTMLObservableString />
      <TestEventClickStatic />
      <TestEventClickObservable />
      <TestEventClickRemoval />
      <TestABCD />
      <TestIfStatic />
      <TestIfRemoval />
      <TestTernaryStatic />
      <TestTernaryObservable />
      <TestSwitchStatic />
      <TestSwitchObservable />
      <TestComponentStatic />
      <TestComponentObservable />
      <TestFragmentStatic />
      <TestFragmentStaticDeep />
      <TestErrorBundary />
      <TestChildren />
      {/* <TestPortalStatic /> */}
      <TestRef />
      <TestStyledStatic />
      <TestStyledClass />
    </>
  );
};

render ( Test, document.getElementById ( 'app' ) );
