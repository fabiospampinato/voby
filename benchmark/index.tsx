
/** @jsx createElement */
/** @jsxFrag Fragment */

/* IMPORT */

import {For} from '../src';
import {$, $$, createElement, render, styled, template} from '../src';
import type {Observable} from '../src/types';

/* MAIN */

type IDatum = Observable<{ id: string, label: string, selected: boolean }>;

type IData = IDatum[];

const rand = ( max: number ): number => {
  return Math.round ( Math.random () * 1000 ) % max;
};

const uuid = (() => {
  let counter = 0;
  return () => String ( counter++ );
})();

const buildData = (() => {
  const adjectives = ['pretty', 'large', 'big', 'small', 'tall', 'short', 'long', 'handsome', 'plain', 'quaint', 'clean', 'elegant', 'easy', 'angry', 'crazy', 'helpful', 'mushy', 'odd', 'unsightly', 'adorable', 'important', 'inexpensive', 'cheap', 'expensive', 'fancy'];
  const colors = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange'];
  const nouns = ['table', 'chair', 'house', 'bbq', 'desk', 'car', 'pony', 'cookie', 'sandwich', 'burger', 'pizza', 'mouse', 'keyboard'];
  return ( length: number ): IData => {
    const data: IData = new Array ( length );
    for ( let i = 0; i < length; i++ ) {
      const id = uuid ();
      const adjective = adjectives[rand ( adjectives.length )];
      const color = colors[rand ( colors.length )];
      const noun = nouns[rand ( nouns.length )];
      const label = `${adjective} ${color} ${noun}`;
      const selected = false;
      const datum: IDatum = $( { id, label, selected } );
      data[i] = datum;
    };
    return data;
  };
})();

const Model = (() => {

  /* STATE */

  let data$ = $( [] );
  let selected$: IDatum | null = null;

  /* API */

  const run = (): void => {
    runWith ( 1000 );
  };

  const runLots = (): void => {
    runWith ( 10000 );
  };

  const runWith = ( length: number ): void => {
    data$ ( buildData ( length ) );
  };

  const add = (): void => {
    data$ ( [...data$ (), ...buildData ( 1000 )] );
  };

  const update = (): void => {
    const data = data$ ();
    for ( let i = 0, l = data.length; i < l; i += 10 ) {
      const datum$ = data[i];
      const datum = datum$ ();
      datum.label += ' !!!';
      datum$ ( {...datum} );
    }
  };

  const swapRows = (): void => {
    const data = data$ ();
    if ( data.length <= 998 ) return;
    const pos1$ = data[1];
    const pos1 = pos1$ ();
    const pos998$ = data[998];
    const pos998 = pos998$ ();
    pos1$ ( pos998 );
    pos998$ ( pos1 );
  };

  const clear = (): void => {
    data$ ( [] );
  };

  const remove = ( id: string ): void => {
    const data = data$ ();
    const index = data.findIndex ( datum => datum.sample ().id === id );
    data$ ( [...data.slice ( 0, index ), ...data.slice ( index + 1 )] );
  };

  const select = ( id: string ): void => {
    if ( selected$ ) {
      const datum = selected$ ();
      datum.selected = false;
      selected$ ( { ...datum } );
    }
    const data = data$ ();
    const datum$ = data.find ( datum => datum.sample ().id === id )!;
    const datum = datum$ ();
    datum.selected = true;
    datum$ ( {...datum} );
    selected$ = datum$;
  };

  return { data$, selected$, run, runLots, runWith, add, update, swapRows, clear, remove, select };

})();

const Button = ({ id, text, onClick }: { id: string, text: string, onClick: Function }) => {
  return (
    <div class="col-sm-6 smallpad">
      <button id={id} class="btn btn-primary btn-block" type="button" onClick={onClick}>{text}</button>
    </div>
  );
};

const RowDynamic = ({ id, cls, label, onSelect, onRemove }: { id: string, cls: string, label: string, onSelect: Function, onRemove: Function }) => (
  <tr class={cls}>
    <td class="col-md-1">{id}</td>
    <td class="col-md-4">
      <a onclick={onSelect}>{label}</a>
    </td>
    <td class="col-md-1">
      <a onclick={onRemove}>
        <span class="glyphicon glyphicon-remove" ariaHidden={true}></span>
      </a>
    </td>
    <td class="col-md-6"></td>
  </tr>
);

const RowTemplate = template ( RowDynamic );

const App = () => {
  const {data$, run, runLots, add, update, clear, swapRows, select, remove} = Model;
  return (
    <div class="container">
      <div class="jumbotron">
        <div class="row">
          <div class="col-md-6">
            <h1>Voby</h1>
          </div>
          <div class="col-md-6">
            <div class="row">
              <Button id="run" text="Create 1,000 rows" onClick={run} />
              <Button id="runlots" text="Create 10,000 rows" onClick={runLots} />
              <Button id="add" text="Append 1,000 rows" onClick={add} />
              <Button id="update" text="Update every 10th row" onClick={update} />
              <Button id="clear" text="Clear" onClick={clear} />
              <Button id="swaprows" text="Swap Rows" onClick={swapRows} />
            </div>
          </div>
        </div>
      </div>
      <table class="table table-hover table-striped test-data">
        <tbody>
          <For values={data$}>
            {datum$ => {
              const datum = datum$.sample ();
              const id = datum.id;
              const label = datum.label;
              const cls = datum.selected ? 'danger' : '';
              const onSelect = () => select ( id );
              const onRemove = () => remove ( id );
              const props = {id, label, cls, onSelect, onRemove};
              return RowTemplate ( props );
              // return RowDynamic ( props );
            }}
          </For>
        </tbody>
      </table>
      <span class="preloadicon glyphicon glyphicon-remove" ariaHidden={true}></span>
    </div>
  );
};

render ( <App />, document.getElementById ( 'app' ) );

window['model'] = Model;
